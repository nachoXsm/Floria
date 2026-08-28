import { NextRequest, NextResponse } from 'next/server'

// Descarga una foto (por URL) del lado del servidor y la devuelve en base64,
// para que el navegador pueda quitarle el fondo sin bloqueos de CORS.

const ADMIN_TOKEN = 'floria-audit-2026'

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { url } = await request.json().catch(() => ({}))
  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 })
  }
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'FloriaBot/1.0' } })
    if (!r.ok) return NextResponse.json({ error: `Fetch ${r.status}` }, { status: 502 })
    const type = r.headers.get('content-type') || 'image/jpeg'
    if (!type.startsWith('image/')) return NextResponse.json({ error: 'No es una imagen' }, { status: 415 })
    const b64 = Buffer.from(await r.arrayBuffer()).toString('base64')
    return NextResponse.json({ dataUrl: `data:${type};base64,${b64}` })
  } catch (e) {
    return NextResponse.json({ error: 'No se pudo descargar', detail: String(e).slice(0, 160) }, { status: 502 })
  }
}
