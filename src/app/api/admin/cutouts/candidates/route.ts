import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Devuelve fotos reales candidatas de una planta (iNaturalist + Wikipedia)
// para que el admin elija cuál representa mejor a la especie y recortarla.

const ADMIN_TOKEN = 'floria-audit-2026'
const PLANTAE = 47126

type Candidate = { url: string; thumb: string; source: string; attribution?: string }

const big = (u: string) => u.replace(/\/(square|small|medium)\.(jpe?g|png)/i, '/large.$2')

function variants(sci: string): string[] {
  const v = [sci]
  const noHy = sci.replace(/\s*×\s*/g, ' ').replace(/\s*'[^']*'/g, '').trim()
  if (noHy && !v.includes(noHy)) v.push(noHy)
  const genus = sci.split(/\s+/)[0]
  if (genus && !v.includes(genus)) v.push(genus)
  return v
}

async function inatCandidates(sci: string): Promise<Candidate[]> {
  for (const q of variants(sci)) {
    try {
      const isGenus = !q.includes(' ')
      const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(q)}${isGenus ? '' : '&rank=species'}&taxon_id=${PLANTAE}&per_page=5`
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) continue
      const data = await res.json()
      const results = (data.results ?? []) as { id: number; name: string; default_photo?: { medium_url?: string } }[]
      const best = results.find(r => r.name.toLowerCase() === q.toLowerCase() && r.default_photo?.medium_url)
        ?? results.find(r => r.default_photo?.medium_url)
      if (!best) continue
      const det = await fetch(`https://api.inaturalist.org/v1/taxa/${best.id}`, { signal: AbortSignal.timeout(8000) })
      if (!det.ok) continue
      const dd = await det.json()
      const photos = (dd.results?.[0]?.taxon_photos ?? []) as { photo?: { medium_url?: string; attribution?: string } }[]
      const out: Candidate[] = []
      for (const tp of photos.slice(0, 8)) {
        const m = tp.photo?.medium_url
        if (m) out.push({ url: big(m), thumb: m, source: 'iNaturalist', attribution: tp.photo?.attribution })
      }
      if (out.length) return out
    } catch { continue }
  }
  return []
}

async function wikiCandidate(sci: string): Promise<Candidate[]> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(sci)}&prop=pageimages&format=json&pithumbsize=800&origin=*`
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
    if (!res.ok) return []
    const data = await res.json()
    const pages = Object.values(data.query?.pages ?? {}) as { thumbnail?: { source?: string } }[]
    const thumb = pages[0]?.thumbnail?.source
    return thumb ? [{ url: thumb, thumb, source: 'Wikipedia' }] : []
  } catch { return [] }
}

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('token') !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { plantId } = await request.json().catch(() => ({}))
  if (!plantId) return NextResponse.json({ error: 'Falta plantId' }, { status: 400 })

  const supabase = createAdminClient()
  const { data: plant } = await supabase
    .from('plants').select('scientific_name').eq('id', plantId).single()
  if (!plant) return NextResponse.json({ error: 'Planta no encontrada' }, { status: 404 })

  const [inat, wiki] = await Promise.all([
    inatCandidates(plant.scientific_name),
    wikiCandidate(plant.scientific_name),
  ])
  return NextResponse.json({ candidates: [...inat, ...wiki] })
}
