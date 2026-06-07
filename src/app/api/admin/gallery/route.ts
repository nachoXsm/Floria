import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_TOKEN = 'floria-audit-2026'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== ADMIN_TOKEN) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: plants } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name, cover_image, image_source')
    .eq('published', true)
    .order('common_name')

  const rows = (plants ?? []).map((p: any) => {
    const src = p.cover_image ?? ''
    const source = p.image_source ?? '?'
    const broken = !src ? 'background:#fee2e2' : ''
    const wiki = src.includes('wikimedia') ? 'background:#fef9c3' : ''
    return `
    <div style="border:1px solid #ddd;border-radius:8px;overflow:hidden;${broken || wiki}">
      ${src
        ? `<img src="${src}" alt="${p.common_name}" style="width:100%;height:160px;object-fit:cover;display:block" onerror="this.style.background='#fee2e2';this.alt='ERROR'">`
        : `<div style="height:160px;background:#fee2e2;display:flex;align-items:center;justify-content:center;color:#991b1b;font-size:12px">SIN IMAGEN</div>`
      }
      <div style="padding:8px">
        <div style="font-weight:600;font-size:13px">${p.common_name}</div>
        <div style="font-size:11px;color:#666;font-style:italic">${p.scientific_name}</div>
        <div style="font-size:10px;color:#999;margin-top:4px">src: ${source}</div>
      </div>
    </div>`
  }).join('')

  const noImage = (plants ?? []).filter((p: any) => !p.cover_image).length
  const wikiCount = (plants ?? []).filter((p: any) => p.cover_image?.includes('wikimedia')).length

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Floria — Galería de imágenes</title>
<style>
  body { font-family: sans-serif; margin: 0; padding: 20px; background: #f8faf8; }
  h1 { color: #1e3d2b; }
  .stats { display:flex; gap:16px; margin-bottom:24px; }
  .stat { background:white; border-radius:8px; padding:12px 20px; border:1px solid #ddd; }
  .stat strong { display:block; font-size:24px; color:#1e3d2b; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:16px; }
  .legend { display:flex; gap:16px; margin-bottom:16px; font-size:13px; }
  .legend span { display:inline-block; width:14px; height:14px; border-radius:3px; }
</style>
</head>
<body>
<h1>Floria — Galería de imágenes</h1>
<div class="stats">
  <div class="stat"><strong>${(plants ?? []).length}</strong>plantas totales</div>
  <div class="stat"><strong style="color:${noImage > 0 ? '#dc2626' : '#16a34a'}">${noImage}</strong>sin imagen</div>
  <div class="stat"><strong style="color:${wikiCount > 0 ? '#ca8a04' : '#16a34a'}">${wikiCount}</strong>de Wikimedia</div>
</div>
<div class="legend">
  <div><span style="background:#fee2e2"></span> Sin imagen / error</div>
  <div><span style="background:#fef9c3"></span> Wikimedia (puede fallar)</div>
</div>
<div class="grid">${rows}</div>
</body>
</html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
