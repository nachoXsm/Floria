import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Pipeline de recortes de plantas para las láminas de cantero.
// Por cada especie: (1) genera una imagen aislada con FLUX, (2) le quita el fondo,
// (3) sube el PNG transparente a Supabase Storage y (4) guarda la URL en plants.cutout_image.
//
// Uso (admin):
//   POST /api/admin/cutouts?token=floria-cutouts-2026
//   body opcional: { "scientific_names": ["Salvia guaranitica", ...], "limit": 15 }
//   Sin body procesa hasta `limit` (def. 15) plantas publicadas sin recorte.
//
// Requiere env: REPLICATE_API_TOKEN, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

export const maxDuration = 300

const ADMIN_TOKEN = 'floria-cutouts-2026'
const BUCKET = 'plant-cutouts'
// Modelo de quita-fondo en Replicate (ajustable si se prefiere otro).
const BG_MODEL = 'lucataco/remove-bg'

type Plant = { id: string; common_name: string; scientific_name: string; cutout_image?: string | null }

const DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g')
function slugify(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(DIACRITICS, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
}

// Llama a un modelo de Replicate en modo síncrono y devuelve la primera salida (URL).
async function replicate(model: string, input: Record<string, unknown>): Promise<string> {
  const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Prefer': 'wait',
    },
    body: JSON.stringify({ input }),
  })
  if (!res.ok) throw new Error(`Replicate ${model}: ${res.status} ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const out = Array.isArray(data.output) ? data.output[0] : data.output
  if (!out) throw new Error(`Replicate ${model}: sin salida`)
  return out as string
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json({ error: 'Falta REPLICATE_API_TOKEN' }, { status: 503 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Bucket público (se crea si no existe)
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {})

  const body = await request.json().catch(() => ({}))
  const names: string[] | undefined = body?.scientific_names
  const limit: number = Math.min(body?.limit ?? 15, 40)

  let plants: Plant[] = []
  if (names?.length) {
    const { data } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cutout_image')
      .in('scientific_name', names)
    plants = (data ?? []) as Plant[]
  } else {
    const { data } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cutout_image')
      .eq('published', true)
      .is('cutout_image', null)
      .order('common_name')
      .limit(limit)
    plants = (data ?? []) as Plant[]
  }

  const results: { plant: string; ok: boolean; url?: string; error?: string }[] = []

  for (const p of plants) {
    try {
      const prompt = `A single ${p.common_name} plant (${p.scientific_name}), full plant shown from the side in elevation view, isolated on a plain solid white background, photorealistic, botanically accurate, natural colors, soft studio lighting, centered, whole plant visible from base to top. No pot, no text, no people, no shadow on ground.`

      // 1) Imagen aislada
      const raw = await replicate('black-forest-labs/flux-schnell', {
        prompt, aspect_ratio: '3:4', output_format: 'png', num_outputs: 1,
      })
      // 2) Quitar fondo → PNG transparente
      const cut = await replicate(BG_MODEL, { image: raw })

      // 3) Subir a Storage
      const bytes = new Uint8Array(await (await fetch(cut)).arrayBuffer())
      const path = `${slugify(p.scientific_name || p.common_name || p.id)}.png`
      const up = await supabase.storage.from(BUCKET).upload(path, bytes, {
        contentType: 'image/png', upsert: true,
      })
      if (up.error) throw new Error(`storage: ${up.error.message}`)
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)

      // 4) Guardar URL
      await supabase.from('plants').update({ cutout_image: pub.publicUrl }).eq('id', p.id)
      results.push({ plant: p.scientific_name, ok: true, url: pub.publicUrl })
    } catch (e) {
      results.push({ plant: p.scientific_name, ok: false, error: String(e).slice(0, 200) })
    }
  }

  return NextResponse.json({
    processed: results.length,
    ok: results.filter(r => r.ok).length,
    failed: results.filter(r => !r.ok).length,
    results,
  })
}
