import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import plantsData from './data.json'

const ADMIN_TOKEN = 'floria-audit-2026'
const CHUNK = 50

export const maxDuration = 300
export const dynamic = 'force-dynamic'

function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

// Importa la base de 510 plantas del Excel v5 a Supabase.
// Uso: GET /api/admin/import-plants?token=floria-audit-2026
// Matching por nombre científico normalizado (case/espacios insensible).
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: existing, error: exErr } = await supabase
    .from('plants')
    .select('id, scientific_name, slug')
  if (exErr) {
    return NextResponse.json({ error: exErr.message }, { status: 500 })
  }

  const existingBySci = new Map(
    (existing ?? []).map(p => [norm(p.scientific_name), { id: p.id as string, slug: p.slug as string | null }])
  )
  const takenSlugs = new Set((existing ?? []).map(p => p.slug).filter(Boolean) as string[])

  const updates: Record<string, unknown>[] = []
  const inserts: Record<string, unknown>[] = []

  for (const p of plantsData as Record<string, unknown>[]) {
    const match = existingBySci.get(norm(p.scientific_name as string))
    if (match) {
      // existente: actualizar por id, sin tocar slug ni scientific_name ni cover_image
      const row: Record<string, unknown> = { ...p, id: match.id }
      delete row.slug
      delete row.scientific_name
      updates.push(row)
    } else {
      const row = { ...p }
      let slug = row.slug as string
      let n = 2
      while (takenSlugs.has(slug)) slug = `${row.slug}-${n++}`
      row.slug = slug
      takenSlugs.add(slug)
      inserts.push(row)
    }
  }

  let updated = 0
  let inserted = 0
  const failures: { plant: string; message: string }[] = []

  for (const row of updates) {
    const { id, ...fields } = row as Record<string, unknown> & { id: string }
    const { error } = await supabase.from('plants').update(fields).eq('id', id)
    if (error) failures.push({ plant: String(row.common_name), message: error.message })
    else updated++
  }

  for (let i = 0; i < inserts.length; i += CHUNK) {
    const chunk = inserts.slice(i, i + CHUNK)
    const { error } = await supabase.from('plants').insert(chunk)
    if (error) {
      for (const row of chunk) {
        let { error: e2 } = await supabase.from('plants').insert([row])
        if (e2 && e2.message.includes('slug')) {
          // último recurso: slug con sufijo aleatorio
          row.slug = `${row.slug}-${Math.random().toString(36).slice(2, 6)}`
          ;({ error: e2 } = await supabase.from('plants').insert([row]))
        }
        if (e2) failures.push({ plant: String(row.common_name), message: e2.message })
        else inserted++
      }
    } else {
      inserted += chunk.length
    }
  }

  const { count } = await supabase
    .from('plants')
    .select('id', { count: 'exact', head: true })
    .eq('published', true)

  return NextResponse.json({
    ok: failures.length === 0,
    updated,
    inserted,
    total_in_file: (plantsData as unknown[]).length,
    total_published: count,
    failures,
    next_steps: 'Para fotos faltantes: /api/admin/audit-images?token=floria-audit-2026&mode=fix&batch=25',
  })
}
