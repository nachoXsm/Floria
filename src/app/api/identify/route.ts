import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

const FREE_LIMIT = 3

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, identifications_this_month, identifications_reset_at')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
  }

  const admin = createAdminClient()
  const now = new Date()
  const resetAt = new Date(profile.identifications_reset_at)

  if (now > resetAt) {
    await admin.from('profiles').update({
      identifications_this_month: 0,
      identifications_reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()
    }).eq('id', user.id)
    profile.identifications_this_month = 0
  }

  if (profile.plan === 'free' && profile.identifications_this_month >= FREE_LIMIT) {
    return NextResponse.json({
      error: 'Límite mensual alcanzado',
      code: 'FREE_LIMIT_REACHED',
      limit: FREE_LIMIT,
      upgrade_url: '/pricing'
    }, { status: 429 })
  }

  const formData = await request.formData()
  const imageFile = formData.get('image') as File | null

  if (!imageFile) {
    return NextResponse.json({ error: 'No se recibió imagen' }, { status: 400 })
  }

  const fileName = `${user.id}/${Date.now()}-${imageFile.name}`
  const imageBuffer = await imageFile.arrayBuffer()

  // Guardar la imagen es opcional: si falla (bucket inexistente, etc.) seguimos igual
  let publicUrl = ''
  const { data: storageData, error: storageError } = await admin.storage
    .from('identifications')
    .upload(fileName, imageBuffer, { contentType: imageFile.type, upsert: false })

  if (!storageError && storageData) {
    const { data: urlData } = admin.storage.from('identifications').getPublicUrl(storageData.path)
    publicUrl = urlData.publicUrl
  }

  // Pl@ntNet: modelo especializado en botánica, 500 req/día gratis sin tarjeta.
  const plantnetForm = new FormData()
  plantnetForm.append('images', new Blob([imageBuffer], { type: imageFile.type }), imageFile.name)

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

  // Pl@ntNet devuelve null si no es planta (score muy bajo) o resultados vacíos
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
    const { data: existingPlant } = await supabase
      .from('plants')
      .select('id, slug')
      .ilike('scientific_name', `%${topSuggestion.name}%`)
      .single()
    if (existingPlant) {
      matchedPlantId = existingPlant.id
      matchedPlantSlug = existingPlant.slug
    }
  }

  const { data: identification } = await admin.from('identifications').insert({
    user_id: user.id,
    image_url: publicUrl,
    api_response: plantIdData,
    matched_plant_id: matchedPlantId,
    confidence,
    suggestions: suggestions.slice(0, 5),
  }).select().single()

  await admin.from('profiles')
    .update({ identifications_this_month: profile.identifications_this_month + 1 })
    .eq('id', user.id)

  return NextResponse.json({
    id: identification?.id,
    image_url: publicUrl,
    suggestions: suggestions.slice(0, 5),
    matched_plant_id: matchedPlantId,
    matched_plant_slug: matchedPlantSlug,
    confidence,
    is_plant: isPlant,
  })
}
