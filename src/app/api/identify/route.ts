import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

// ─────────────────────────────────────────────────────────────────────────────
// FREEMIUM
// Cualquiera puede identificar hasta FREE_LIMIT plantas por mes (incluso sin
// registrarse). Al agotar la cuota se devuelve 429 con code FREE_LIMIT_REACHED y
// el front muestra un cartel invitando a registrarse / pasar a Pro.
//  - Invitados (sin sesión): la cuota se lleva en una cookie.
//  - Registrados free: la cuota se lleva en profiles.identifications_this_month.
//  - Pro / professional: ilimitado.
// ─────────────────────────────────────────────────────────────────────────────

const FREE_LIMIT = 3
const GUEST_COOKIE = 'floria_free_ident'

function nextMonthISO(now: Date) {
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const admin = createAdminClient()
  const now = new Date()

  // ── Determinar cuota usada y si es Pro ──
  let isPro = false
  let used = 0
  let hasProfile = false

  if (user) {
    const PROFILE_COLS = 'plan, identifications_this_month, identifications_reset_at'
    let { data: profile } = await supabase
      .from('profiles')
      .select(PROFILE_COLS)
      .eq('id', user.id)
      .maybeSingle()

    // Auto-provisionar el perfil si falta (usuarios registrados antes del trigger
    // on_auth_user_created). Evita el 404 "Perfil no encontrado" que parecía un bug.
    if (!profile) {
      const { data: created } = await admin
        .from('profiles')
        .upsert({ id: user.id }, { onConflict: 'id' })
        .select(PROFILE_COLS)
        .single()
      profile = created
    }

    if (profile) {
      hasProfile = true
      // Reset mensual de la cuota
      if (now > new Date(profile.identifications_reset_at)) {
        await admin.from('profiles')
          .update({ identifications_this_month: 0, identifications_reset_at: nextMonthISO(now) })
          .eq('id', user.id)
        profile.identifications_this_month = 0
      }
      isPro = profile.plan === 'pro' || profile.plan === 'professional'
      used = profile.identifications_this_month ?? 0
    }
  } else {
    // Invitado: contar por cookie (se resetea cada mes)
    try {
      const raw = request.cookies.get(GUEST_COOKIE)?.value
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.reset && now <= new Date(parsed.reset)) used = parsed.count || 0
      }
    } catch {
      used = 0
    }
  }

  // ── Chequeo de límite freemium ──
  if (!isPro && used >= FREE_LIMIT) {
    return NextResponse.json({
      error: 'Llegaste al límite de identificaciones gratuitas',
      code: 'FREE_LIMIT_REACHED',
      limit: FREE_LIMIT,
      registered: !!user,
      upgrade_url: '/pricing',
    }, { status: 429 })
  }

  // ── Imagen ──
  const formData = await request.formData()
  const imageFile = formData.get('image') as File | null
  if (!imageFile) {
    return NextResponse.json({ error: 'No se recibió imagen' }, { status: 400 })
  }
  const imageBuffer = await imageFile.arrayBuffer()
  const contentType = imageFile.type || 'image/jpeg'
  const safeName = imageFile.name || 'foto.jpg'

  // Guardar la imagen es opcional (invitados → carpeta 'guest'); si falla seguimos.
  let publicUrl = ''
  try {
    const folder = user?.id ?? 'guest'
    const fileName = `${folder}/${Date.now()}-${safeName}`
    const { data: storageData, error: storageError } = await admin.storage
      .from('identifications')
      .upload(fileName, imageBuffer, { contentType, upsert: false })
    if (!storageError && storageData) {
      publicUrl = admin.storage.from('identifications').getPublicUrl(storageData.path).data.publicUrl
    }
  } catch {
    // guardado opcional
  }

  // ── Pl@ntNet ──
  const plantnetForm = new FormData()
  plantnetForm.append('images', new Blob([imageBuffer], { type: contentType }), safeName)

  const plantnetRes = await fetch(
    `https://my-api.plantnet.org/v2/identify/all?include-related-images=false&lang=es&api-key=${process.env.PLANTNET_API_KEY}`,
    { method: 'POST', body: plantnetForm }
  )

  if (!plantnetRes.ok) {
    const detail = await plantnetRes.text()
    return NextResponse.json({
      error: 'Error en la API de identificación',
      status: plantnetRes.status,
      detail: detail.slice(0, 500),
      has_key: !!process.env.PLANTNET_API_KEY,
    }, { status: 502 })
  }

  const plantnetData = await plantnetRes.json()

  const isPlant = (plantnetData.results?.length ?? 0) > 0
  const suggestions = (plantnetData.results ?? []).slice(0, 3).map((r: {
    species: { scientificName: string; commonNames?: string[] }
    score: number
  }) => ({
    name: r.species.scientificName,
    probability: r.score,
    details: {
      common_names: r.species.commonNames ?? [],
      description: { value: '' },
      watering: null,
    }
  }))
  const topSuggestion = suggestions[0]
  const plantIdData = { result: { is_plant: { binary: isPlant }, classification: { suggestions } } }

  let matchedPlantId: string | null = null
  let matchedPlantSlug: string | null = null
  let confidence: number | null = null

  if (topSuggestion) {
    confidence = topSuggestion.probability
    const { data: matches } = await supabase
      .from('plants')
      .select('id, slug')
      .ilike('scientific_name', `%${topSuggestion.name}%`)
      .limit(1)
    if (matches?.[0]) {
      matchedPlantId = matches[0].id
      matchedPlantSlug = matches[0].slug
    }
  }

  // Guardar historial solo para usuarios con perfil (best-effort, nunca bloquea).
  let identificationId: string | undefined
  if (user?.id && hasProfile) {
    try {
      const { data: identification } = await admin.from('identifications').insert({
        user_id: user.id,
        image_url: publicUrl,
        api_response: plantIdData,
        matched_plant_id: matchedPlantId,
        confidence,
        suggestions: suggestions.slice(0, 5),
      }).select('id').single()
      identificationId = identification?.id
    } catch {
      // historial opcional
    }
  }

  const response = NextResponse.json({
    id: identificationId,
    image_url: publicUrl,
    suggestions: suggestions.slice(0, 5),
    matched_plant_id: matchedPlantId,
    matched_plant_slug: matchedPlantSlug,
    confidence,
    is_plant: isPlant,
    remaining: isPro ? null : Math.max(0, FREE_LIMIT - (used + 1)),
  })

  // ── Incrementar cuota (los Pro no cuentan) ──
  if (!isPro) {
    if (user?.id && hasProfile) {
      await admin.from('profiles')
        .update({ identifications_this_month: used + 1 })
        .eq('id', user.id)
    } else if (!user) {
      response.cookies.set(GUEST_COOKIE, JSON.stringify({ count: used + 1, reset: nextMonthISO(now) }), {
        httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 40,
      })
    }
  }

  return response
}
