import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Recibe el PNG recortado (transparente, en base64) desde el navegador,
// lo sube a Supabase Storage y guarda la URL en plants.cutout_image.

const ADMIN_TOKEN = 'floria-audit-2026'
const BUCKET = 'plant-cutouts'
const DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g')
const slugify = (s: string) => (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { plantId, png } = await request.json().catch(() => ({}))
  if (!plantId || !png) return NextResponse.json({ error: 'Falta plantId o png' }, { status: 400 })

  const supabase = createAdminClient()
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {})

  const { data: plant } = await supabase
    .from('plants').select('scientific_name, common_name').eq('id', plantId).single()
  if (!plant) return NextResponse.json({ error: 'Planta no encontrada' }, { status: 404 })

  const base64 = String(png).replace(/^data:image\/\w+;base64,/, '')
  const bytes = Buffer.from(base64, 'base64')
  const path = `${slugify(plant.scientific_name || plant.common_name || plantId)}.png`

  const up = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: 'image/png', upsert: true })
  if (up.error) return NextResponse.json({ error: 'Storage', detail: up.error.message }, { status: 502 })

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
  await supabase.from('plants').update({ cutout_image: pub.publicUrl }).eq('id', plantId)

  return NextResponse.json({ url: pub.publicUrl })
}
