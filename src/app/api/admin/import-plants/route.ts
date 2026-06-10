import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import plantsData from './data.json'

const ADMIN_TOKEN = 'floria-audit-2026'
const CHUNK = 50

export const maxDuration = 300
export const dynamic = 'force-dynamic'

// Importa la base de 510 plantas del Excel v5 a Supabase.
// Uso: GET /api/admin/import-plants?token=floria-audit-2026
// Requiere migración 004 aplicada (columnas ubicacion, flower_colors, etc.)
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

  // Slugs y nombres ya existentes (para no romper URLs ni chocar unique)
  const { data: existing, error: exErr } = await supabase
    .from('plants')
    .select('scientific_name, slug')
  if (exErr) {
    return NextResponse.json({ error: exErr.message }, { status: 500 })
  }
  const existingBySci = new Map(
    (existing ?? []).map(p => [p.scientific_name.toLowerCase(), p.slug as string | null])
  )
  const takenSlugs = new Set((existing ?? []).map(p => p.slug).filter(Boolean) as string[])

  const plants = (plantsData as Record<string, unknown>[]).map(p => {
    const sci = (p.scientific_name as string).toLowerCase()
    const row = { ...p }
    if (existingBySci.has(sci)) {
      // planta existente: conservar su slug actual (URLs estables)
      const current = existingBySci.get(sci)
      if (current) row.slug = current
      else delete row.slug
    } else {
      // planta nueva: garantizar slug único
      let slug = row.slug as string
      let n = 2
      while (takenSlugs.has(slug)) slug = `${row.slug}-${n++}`
      row.slug = slug
      takenSlugs.add(slug)
    }
    return row
  })

  let upserted = 0
  const errors: { chunk: number; message: string }[] = []

  for (let i = 0; i < plants.length; i += CHUNK) {
    const chunk = plants.slice(i, i + CHUNK)
    // upsert por scientific_name: actualiza datos sin pisar cover_image
    const { error } = await supabase
      .from('plants')
      .upsert(chunk, { onConflict: 'scientific_name', ignoreDuplicates: false })

    if (error) {
      errors.push({ chunk: i, message: error.message })
      if (error.message.includes('column') || error.message.includes('schema cache')) {
        return NextResponse.json({
          error: 'Faltan columnas en la tabla plants',
          detail: error.message,
          fix: 'Ejecutar supabase/migrations/004_add_filter_columns.sql en Supabase → SQL Editor y reintentar',
          upserted,
        }, { status: 500 })
      }
    } else {
      upserted += chunk.length
    }
  }

  const { count } = await supabase
    .from('plants')
    .select('id', { count: 'exact', head: true })
    .eq('published', true)

  return NextResponse.json({
    ok: errors.length === 0,
    upserted,
    total_in_file: plants.length,
    total_published: count,
    errors,
    next_steps: errors.length === 0
      ? 'Listo. Para fotos faltantes: /api/admin/audit-images?token=floria-audit-2026&mode=fix&batch=25'
      : 'Revisar errores y reintentar',
  })
}
