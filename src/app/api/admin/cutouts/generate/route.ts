import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Genera la imagen aislada de una planta con Cloudflare Workers AI (FLUX, gratis).
// Devuelve el JPEG en base64 para que el navegador le quite el fondo.
// Requiere env en Vercel: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN

const ADMIN_TOKEN = 'floria-audit-2026'

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const acc = process.env.CLOUDFLARE_ACCOUNT_ID
  const key = process.env.CLOUDFLARE_API_TOKEN
  if (!acc || !key) {
    return NextResponse.json({ error: 'Faltan CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN en Vercel' }, { status: 503 })
  }

  const { plantId } = await request.json().catch(() => ({}))
  if (!plantId) return NextResponse.json({ error: 'Falta plantId' }, { status: 400 })

  const supabase = createAdminClient()
  const { data: plant } = await supabase
    .from('plants').select('common_name, scientific_name').eq('id', plantId).single()
  if (!plant) return NextResponse.json({ error: 'Planta no encontrada' }, { status: 404 })

  const prompt = `A single ${plant.common_name} plant (${plant.scientific_name}), whole plant shown from the side in elevation view, isolated on a plain solid white background, photorealistic, botanically accurate, natural colors, soft studio lighting, centered, entire plant visible from base to top, no pot, no text, no people.`

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${acc}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, steps: 8 }),
      },
    )
    if (!res.ok) {
      return NextResponse.json({ error: 'Cloudflare', detail: (await res.text()).slice(0, 300) }, { status: 502 })
    }
    const data = await res.json()
    const image = data?.result?.image
    if (!image) return NextResponse.json({ error: 'Sin imagen de Cloudflare' }, { status: 502 })
    return NextResponse.json({ image }) // base64 JPEG
  } catch (e) {
    return NextResponse.json({ error: 'Error de conexión', detail: String(e).slice(0, 200) }, { status: 502 })
  }
}
