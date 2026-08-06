import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const ADMIN_TOKEN = 'floria-audit-2026'

type Row = { slug: string; name_en?: string; name_pt?: string; desc_en?: string; desc_pt?: string }

// GET /api/admin/import-translations?token=floria-audit-2026&offset=0&limit=300
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const offset = parseInt(req.nextUrl.searchParams.get('offset') ?? '0', 10)
  const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '300', 10)

  const file = path.join(process.cwd(), 'src/app/api/admin/import-translations/data.json')
  let rows: Row[]
  try {
    rows = JSON.parse(fs.readFileSync(file, 'utf-8'))
  } catch {
    return NextResponse.json({ error: 'No se encontró data.json de traducciones' }, { status: 404 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const slice = rows.slice(offset, offset + limit)
  let updated = 0
  const failures: string[] = []

  for (const r of slice) {
    if (!r.slug) continue
    const { error } = await supabase.from('plants').update({
      common_name_en: r.name_en ?? null,
      common_name_pt: r.name_pt ?? null,
      description_en: r.desc_en ?? null,
      description_pt: r.desc_pt ?? null,
    }).eq('slug', r.slug)
    if (error) failures.push(`${r.slug}: ${error.message}`)
    else updated++
  }

  return NextResponse.json({
    total: rows.length,
    processed: slice.length,
    updated,
    next_offset: offset + limit < rows.length ? offset + limit : null,
    failures: failures.slice(0, 10),
  })
}
