import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Genera un render de cantero combinando las plantas elegidas, vía Replicate FLUX.
// Requiere la variable de entorno REPLICATE_API_TOKEN.

type SelectedPlant = { common_name: string; scientific_name: string; plant_type?: string | null }

const STYLE_PROMPTS: Record<string, string> = {
  jardin: 'a landscaped garden bed in an outdoor yard, natural soil, surrounding lawn',
  balcon: 'a modern balcony with planters and pots, urban background, wooden deck',
  interior: 'a bright interior living space with potted plants near a large window',
  cantero: 'a designed garden border bed along a path, mixed planting',
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const plants: SelectedPlant[] = body?.plants ?? []
  const space: string = body?.space ?? 'jardin'

  if (!plants.length) {
    return NextResponse.json({ error: 'Elegí al menos una planta' }, { status: 400 })
  }
  if (plants.length > 6) {
    return NextResponse.json({ error: 'Máximo 6 plantas por render' }, { status: 400 })
  }

  const plantList = plants
    .map(p => `${p.common_name} (${p.scientific_name})`)
    .join(', ')
  const scene = STYLE_PROMPTS[space] ?? STYLE_PROMPTS.jardin

  const prompt = `Professional photorealistic landscape design photograph of ${scene}, featuring these plants combined harmoniously: ${plantList}. Lush, healthy plants, botanically accurate, natural daylight, soft shadows, high detail, magazine-quality landscaping photography, realistic textures. No text, no labels, no people.`

  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json({
      error: 'El generador de imágenes no está configurado todavía',
      detail: 'Falta REPLICATE_API_TOKEN',
      has_key: false,
    }, { status: 503 })
  }

  try {
    // Prefer: wait hace la llamada síncrona (espera a que termine, hasta 60s)
    const res = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio: '4:3',
          output_format: 'webp',
          output_quality: 90,
          num_outputs: 1,
        },
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return NextResponse.json({
        error: 'Error generando el render',
        status: res.status,
        detail: detail.slice(0, 400),
      }, { status: 502 })
    }

    const data = await res.json()
    const output = Array.isArray(data.output) ? data.output[0] : data.output
    if (!output) {
      return NextResponse.json({ error: 'No se obtuvo imagen', detail: JSON.stringify(data).slice(0, 300) }, { status: 502 })
    }

    return NextResponse.json({ image_url: output, prompt })
  } catch (e) {
    return NextResponse.json({ error: 'Error de conexión con el generador', detail: String(e).slice(0, 200) }, { status: 502 })
  }
}
