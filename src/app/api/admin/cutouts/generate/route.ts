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
    .from('plants').select('common_name, scientific_name, plant_type').eq('id', plantId).single()
  if (!plant) return NextResponse.json({ error: 'Planta no encontrada' }, { status: 404 })

  // Descriptor de porte según el tipo, para que salga el ejemplar maduro y completo
  // (no en maceta, no un plantín, no solo la flor).
  const t = (plant.plant_type ?? '').toLowerCase()
  const has = (...k: string[]) => k.some(x => t.includes(x))
  let form = 'a mature, fully-grown, well-established specimen at its full natural landscape size, showing the entire plant with all its foliage and flowers'
  if (has('árbol', 'arbol', 'tree')) form = 'a mature full-grown tree with a full broad canopy of foliage and a visible trunk'
  else if (has('arbusto', 'shrub')) form = 'a large mature shrub forming a dense, rounded, bushy globular mass full of branches and foliage from the ground up'
  else if (has('gramín', 'gramin', 'grass')) form = 'a full mature ornamental grass clump, dense fountain-shaped mound with many arching blades and flower plumes'
  else if (has('bulb')) form = 'a full mature clump showing the strap-like basal foliage AND the flower stems together (not just a single flower), the complete plant'
  else if (has('herbá', 'herba', 'herb', 'aromá', 'aroma')) form = 'a full mature bushy clump: a mound of abundant foliage from the base with its characteristic tall flower spikes or stems, the whole plant'
  else if (has('trepad', 'climb')) form = 'a mature climbing plant with abundant foliage and flowers cascading, full and leafy'
  else if (has('palm')) form = 'a mature palm with a full crown of fronds and its trunk'
  else if (has('helecho', 'fern')) form = 'a full mature fern with a complete rosette of many arching fronds from the base'
  else if (has('sucul', 'cact', 'succ')) form = 'a mature, full-size specimen with all its structure visible'
  else if (has('tapiz', 'ground')) form = 'a mature spreading groundcover mat, full and dense'

  const prompt = `${form}. Species: ${plant.common_name} (${plant.scientific_name}). Show ONLY the plant itself, cleanly isolated on a plain solid pure white background as a catalog cutout — absolutely NO pot, NO container, NO planter, NO soil, NO dirt, NO ground, NO grass, NO rocks, NO shadow and NO reflection under or around the plant, nothing beneath it. The complete plant from the base of its stems to the very top, floating on pure white. Photorealistic, botanically accurate for the species, natural healthy colors, side elevation view, soft even studio lighting, centered. No text, no labels, no watermark, no people, no hands.`

  // Respaldo gratis cuando Cloudflare se queda sin cuota diaria: Pollinations (FLUX).
  async function pollinations(): Promise<string> {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&model=flux&seed=${Math.floor(Math.random() * 1e6)}`
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Pollinations ${r.status}`)
    const buf = Buffer.from(await r.arrayBuffer())
    return buf.toString('base64')
  }

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${acc}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, steps: 8 }),
      },
    )
    const data = res.ok ? await res.json() : null
    const image = data?.result?.image
    if (image) return NextResponse.json({ image, source: 'cloudflare' }) // base64 JPEG

    // Cloudflare falló o sin cuota → respaldo Pollinations
    try {
      const alt = await pollinations()
      return NextResponse.json({ image: alt, source: 'pollinations' })
    } catch (e2) {
      const detail = res.ok ? 'Cloudflare sin imagen' : (await res.text()).slice(0, 200)
      return NextResponse.json({ error: 'Cloudflare y respaldo fallaron', detail: `${detail} · ${String(e2).slice(0, 120)}` }, { status: 502 })
    }
  } catch {
    // Error de red con Cloudflare → intentar respaldo directo
    try {
      const alt = await pollinations()
      return NextResponse.json({ image: alt, source: 'pollinations' })
    } catch (e2) {
      return NextResponse.json({ error: 'No se pudo generar', detail: String(e2).slice(0, 200) }, { status: 502 })
    }
  }
}
