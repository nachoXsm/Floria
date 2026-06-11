import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_TOKEN = 'floria-audit-2026'

type Plant = {
  id: string
  common_name: string
  scientific_name: string
  cover_image: string | null
}

type InatTaxon = {
  id: number
  name: string
  default_photo?: { medium_url: string; attribution: string }
}

const PLANTAE_TAXON_ID = 47126

// Plants that need a different search term than their scientific name
const SEARCH_OVERRIDES: Record<string, string> = {
  'impatiens noli-tangere': 'Impatiens walleriana',
  'magnolia stellata': 'Magnolia stellata',
  'malva sylvestris': 'Malva sylvestris',
  'lolium perenne': 'Lolium perenne',
  'triadica sebifera': 'Triadica sebifera',
  'petunia × hybrida': 'Petunia',
  'platanus × hispanica': 'Platanus acerifolia',
  'rosa spp.': 'Rosa canina',
  'salvia × sylvestris': 'Salvia nemorosa',
  "salvia 'amistad'": 'Salvia guaranitica',
  'salvia × jamensis': 'Salvia microphylla',
  "salvia 'wendy\\'s wish'": 'Salvia',
  'cytisus × praecox': 'Cytisus scoparius',
  'rhododendron spp.': 'Rhododendron',
  'canna × generalis': 'Canna indica',
  'canna indica': 'Canna indica',
  'phragmites australis': 'Phragmites australis',
  'abelia × grandiflora': 'Abelia',
  'anemone × hybrida': 'Anemone hupehensis',
  'citrus limon': 'Citrus limon',
  // Nombres con paréntesis o sufijos de cultivo
  'olea europaea (maceta)': 'Olea europaea',
  'citrus sinensis': 'Citrus sinensis',
  'eriobotrya japonica': 'Eriobotrya japonica',
  'persea drymifolia': 'Persea americana',
  'cyclolepis genistoides': 'Cyclolepis genistoides',
  'minthostachys setosa': 'Minthostachys mollis',
  'lippia graveolens': 'Lippia graveolens',
  'ugni molinae': 'Ugni molinae',
  'murraya paniculata': 'Murraya paniculata',
  'moringa oleifera': 'Moringa oleifera',
  // Orquídeas (spp. → género)
  'cymbidium spp.': 'Cymbidium',
  'phalaenopsis spp.': 'Phalaenopsis',
  'nymphaea spp.': 'Nymphaea',
  // Híbridos y cultivares
  'alocasia × amazonica': 'Alocasia amazonica',
  "peperomia caperata 'rosso'": 'Peperomia caperata',
  "peperomia rotundifolia": 'Peperomia rotundifolia',
  "dracaena reflexa 'song of india'": 'Dracaena reflexa',
  "dracaena fragrans 'compacta'": 'Dracaena fragrans',
  "dracaena fragrans 'lemon lime'": 'Dracaena fragrans',
  "chlorophytum comosum 'vittatum'": 'Chlorophytum comosum',
  "cordyline fruticosa": 'Cordyline fruticosa',
  "spathiphyllum 'sensation'": 'Spathiphyllum',
  "dischidia nummularia": 'Dischidia nummularia',
  "columnea gloriosa": 'Columnea gloriosa',
  "ctenanthe burle-marxii": 'Ctenanthe',
  "crossandra infundibuliformis": 'Crossandra infundibuliformis',
  "neoregelia carolinae": 'Neoregelia carolinae',
  "asplenium nidus": 'Asplenium nidus',
  "rhapis excelsa": 'Rhapis excelsa',
  "phoenix roebelenii": 'Phoenix roebelenii',
  "chamaedorea elegans": 'Chamaedorea elegans',
  "pachira aquatica": 'Pachira aquatica',
  "beaucarnea recurvata": 'Beaucarnea recurvata',
  "oxalis triangularis": 'Oxalis triangularis',
  "dendrobium nobile": 'Dendrobium nobile',
  "pyrus communis": 'Pyrus communis',
  "petroselinum crispum": 'Petroselinum crispum',
  "nandina domestica": 'Nandina domestica',
  "nepeta cataria": 'Nepeta cataria',
  "pyrus calleryana 'bradford'": 'Pyrus calleryana',
}

// Plants where Wikimedia is more reliable than iNaturalist
const PREFER_WIKIMEDIA = new Set([
  'citrus limon', 'phragmites australis', 'canna × generalis', 'canna indica',
])

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

function buildSearchVariants(scientificName: string): string[] {
  const variants: string[] = [scientificName]
  // Remove hybrid marker and cultivar suffix: "Abelia × grandiflora" → "Abelia grandiflora"
  const noHybrid = scientificName.replace(/\s*×\s*/g, ' ').replace(/\s*'[^']*'/g, '').trim()
  if (noHybrid !== scientificName) variants.push(noHybrid)
  // Remove spp. / sp. → just genus
  const noSpp = scientificName.replace(/\s+(spp?\..*|×.*)$/i, '').trim()
  if (noSpp !== scientificName && noSpp !== noHybrid) variants.push(noSpp)
  // Just genus
  const genus = scientificName.split(/\s+/)[0]
  if (genus && !variants.includes(genus)) variants.push(genus)
  return variants.filter((v, i) => variants.indexOf(v) === i)
}

async function getBestImage(scientificName: string): Promise<{ url: string; source: string } | null> {
  const key = scientificName.toLowerCase()
  if (PREFER_WIKIMEDIA.has(key)) {
    const wiki = await searchWikimedia(SEARCH_OVERRIDES[key] ?? scientificName)
    if (wiki) return { url: wiki, source: 'wikimedia' }
  }
  const inat = await searchInat(scientificName)
  if (inat) return { url: inat.url, source: 'inaturalist' }
  const wiki = await searchWikimedia(scientificName)
  if (wiki) return { url: wiki, source: 'wikimedia' }
  return null
}

async function searchInat(query: string, excludeUrls?: Set<string>): Promise<{ url: string; name: string; attribution: string } | null> {
  const override = SEARCH_OVERRIDES[query.toLowerCase()]
  const variants = override ? [override, ...buildSearchVariants(query)] : buildSearchVariants(query)
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]
    // For genus-only searches (last variant, single word), drop rank filter
    const isGenus = !variant.includes(' ')
    const rankParam = isGenus ? '' : '&rank=species'
    try {
      // taxon_id=47126 restringe la búsqueda al reino Plantae (evita animales homónimos)
      const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(variant)}${rankParam}&taxon_id=${PLANTAE_TAXON_ID}&per_page=5`
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) continue
      const data = await res.json()
      const results: InatTaxon[] = data.results ?? []
      const withPhoto = results.filter(r => r.default_photo?.medium_url)
      // Preferir el taxón cuyo nombre coincide exactamente con lo buscado
      const best = withPhoto.find(r => r.name.toLowerCase() === variant.toLowerCase()) ?? withPhoto[0] ?? null
      if (!best?.default_photo?.medium_url) continue
      let photoUrl = best.default_photo.medium_url
      let attribution = best.default_photo.attribution ?? ''
      // Si la foto ya está usada por otra planta, buscar una alternativa del mismo taxón
      if (excludeUrls?.has(photoUrl)) {
        const alt = await getAlternateTaxonPhoto(best.id, excludeUrls)
        if (!alt) continue
        photoUrl = alt.url
        attribution = alt.attribution
      }
      return { url: photoUrl, name: best.name, attribution }
    } catch {
      continue
    }
  }
  return null
}

async function getAlternateTaxonPhoto(taxonId: number, excludeUrls: Set<string>): Promise<{ url: string; attribution: string } | null> {
  try {
    const res = await fetch(`https://api.inaturalist.org/v1/taxa/${taxonId}`, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const data = await res.json()
    const photos: { photo?: { medium_url?: string; attribution?: string } }[] = data.results?.[0]?.taxon_photos ?? []
    for (const tp of photos) {
      const u = tp.photo?.medium_url
      if (u && !excludeUrls.has(u)) return { url: u, attribution: tp.photo?.attribution ?? '' }
    }
    return null
  } catch {
    return null
  }
}

async function searchWikimedia(scientificName: string): Promise<string | null> {
  try {
    const encoded = encodeURIComponent(scientificName)
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&format=json&pithumbsize=500&origin=*`
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
    if (!res.ok) return null
    const data = await res.json()
    const pages = Object.values(data.query?.pages ?? {}) as any[]
    const thumb = pages[0]?.thumbnail?.source
    return thumb ?? null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const mode = req.nextUrl.searchParams.get('mode') ?? 'audit' // audit | fix
  const batchSize = parseInt(req.nextUrl.searchParams.get('batch') ?? '20')
  const offset = parseInt(req.nextUrl.searchParams.get('offset') ?? '0')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  // ── AUDIT MODE: list plants with missing images ──
  if (mode === 'audit') {
    const { data: noImg } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .is('cover_image', null)
      .order('common_name')

    const { data: all, count } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image', { count: 'exact' })
      .eq('published', true)
      .order('common_name')
      .range(offset, offset + batchSize - 1)

    return NextResponse.json({
      total: count,
      no_image_count: (noImg ?? []).length,
      no_image: (noImg ?? []).map((p: Plant) => ({ id: p.id, name: p.common_name, scientific: p.scientific_name })),
      batch_offset: offset,
      batch: (all ?? []).map((p: Plant) => ({ id: p.id, name: p.common_name, scientific: p.scientific_name, has_image: !!p.cover_image })),
    })
  }

  // ── FIX MODE: find and update missing or wikimedia images ──
  if (mode === 'fix') {
    const baseQuery = supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .order('common_name')
      .range(offset, offset + batchSize - 1)

    const { data: nullPlants } = await baseQuery.is('cover_image', null)
    const { data: wikiPlants } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .like('cover_image', '%wikimedia%')
      .order('common_name')
      .range(offset, offset + batchSize - 1)

    const seen = new Set<string>()
    const plants = [...(nullPlants ?? []), ...(wikiPlants ?? [])].filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })

    const results: { name: string; scientific: string; status: string; source: string; url?: string }[] = []

    for (const plant of (plants ?? []) as Plant[]) {
      await sleep(500)
      // Try iNaturalist first
      const inat = await searchInat(plant.scientific_name)
      if (inat) {
        await supabase.from('plants').update({
          cover_image: inat.url,
          image_source: 'inaturalist',
          image_attribution: inat.attribution,
          image_fetched_at: new Date().toISOString(),
        }).eq('id', plant.id)
        results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'fixed', source: 'inat', url: inat.url })
        continue
      }

      // Fallback: Wikimedia
      await sleep(300)
      const wiki = await searchWikimedia(plant.scientific_name)
      if (wiki) {
        await supabase.from('plants').update({
          cover_image: wiki,
          image_source: 'wikimedia',
          image_attribution: `Wikimedia Commons / ${plant.scientific_name}`,
          image_fetched_at: new Date().toISOString(),
        }).eq('id', plant.id)
        results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'fixed', source: 'wikimedia', url: wiki })
        continue
      }

      results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'not_found', source: 'none' })
    }

    return NextResponse.json({ processed: results.length, results })
  }

  // ── VALIDATE MODE: check each plant image via Plant.id and flag mismatches ──
  if (mode === 'validate') {
    const { data: plants } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .not('cover_image', 'is', null)
      .order('common_name')
      .range(offset, offset + batchSize - 1)

    const results: { name: string; scientific: string; image: string; identified_as: string; match: boolean; score: number }[] = []

    for (const plant of (plants ?? []) as Plant[]) {
      await sleep(400)
      try {
        // Use iNaturalist CV (free, no key needed) to identify the image
        const formData = new FormData()
        // Fetch the image and send as blob
        const imgRes = await fetch(plant.cover_image!, { signal: AbortSignal.timeout(8000) })
        if (!imgRes.ok) { results.push({ name: plant.common_name, scientific: plant.scientific_name, image: plant.cover_image!, identified_as: 'IMG_ERROR', match: false, score: 0 }); continue }
        const imgBlob = await imgRes.blob()
        formData.append('image', imgBlob, 'plant.jpg')

        const res = await fetch('https://api.inaturalist.org/v1/computervision/score_image', {
          method: 'POST',
          body: formData,
          signal: AbortSignal.timeout(15000),
        })
        if (!res.ok) { results.push({ name: plant.common_name, scientific: plant.scientific_name, image: plant.cover_image!, identified_as: 'API_ERROR', match: false, score: 0 }); continue }
        const data = await res.json()
        const top = data.results?.[0]
        const identified: string = top?.taxon?.name ?? 'unknown'
        const score = Math.round((top?.combined_score ?? 0) * 100)
        const expectedGenus = plant.scientific_name.split(' ')[0].toLowerCase()
        const foundGenus = identified.split(' ')[0].toLowerCase()
        const match = foundGenus === expectedGenus
        results.push({ name: plant.common_name, scientific: plant.scientific_name, image: plant.cover_image!, identified_as: identified, match, score })
      } catch {
        results.push({ name: plant.common_name, scientific: plant.scientific_name, image: plant.cover_image!, identified_as: 'TIMEOUT', match: false, score: 0 })
      }
    }

    const mismatches = results.filter(r => !r.match)
    return NextResponse.json({ total: results.length, mismatches: mismatches.length, ok: results.filter(r => r.match), wrong: mismatches })
  }

  // ── CLEAR MODE: reset cover_image for a list of plants by common name ──
  if (mode === 'clear') {
    const PLANTS_TO_CLEAR = [
      'Abelia','Achira Amarilla','Alegría del hogar','Anémona Japonesa',
      'Árbol de Sebo','Azalea','Caña de Ámbar','Jazmín Magno','Limonero',
      'Malvavisco','Pasto Inglés / Ray Grass','Petunia','Plátano',
      'Retama Amarilla Enana','Rosal','Salvia × Silvestris','Salvia Amistad',
      'Salvia Nelson','Salvia Wendy\'s Wish',
    ]
    const { data, error } = await supabase
      .from('plants')
      .update({ cover_image: null, image_source: null, image_attribution: null })
      .in('common_name', PLANTS_TO_CLEAR)
      .select('common_name')
    return NextResponse.json({ cleared: (data ?? []).length, names: (data ?? []).map((p: any) => p.common_name), error: error?.message })
  }

  // ── CLEARFIX MODE: clear the 19 problematic plants and immediately re-fetch images ──
  if (mode === 'clearfix') {
    const PLANTS_TO_FIX = [
      'Abelia','Achira Amarilla','Alegría del hogar','Anémona Japonesa',
      'Árbol de Sebo','Azalea','Caña de Ámbar','Jazmín Magno','Limonero',
      'Malvavisco','Pasto Inglés / Ray Grass','Petunia','Plátano',
      'Retama Amarilla Enana','Rosal','Salvia × Silvestris','Salvia Amistad',
      'Salvia Nelson',"Salvia Wendy's Wish",
    ]
    // Step 1: clear
    await supabase.from('plants')
      .update({ cover_image: null, image_source: null, image_attribution: null })
      .in('common_name', PLANTS_TO_FIX)

    // Step 2: fetch all now-null plants
    const { data: plants } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .in('common_name', PLANTS_TO_FIX)
      .order('common_name')

    const results: { name: string; scientific: string; status: string; source: string; url?: string }[] = []

    for (const plant of (plants ?? []) as Plant[]) {
      await sleep(600)
      const best = await getBestImage(plant.scientific_name)
      if (best) {
        await supabase.from('plants').update({
          cover_image: best.url,
          image_source: best.source,
          image_fetched_at: new Date().toISOString(),
        }).eq('id', plant.id)
        results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'fixed', source: best.source, url: best.url })
      } else {
        results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'not_found', source: 'none' })
      }
    }

    const fixed = results.filter(r => r.status === 'fixed').length
    const notFound = results.filter(r => r.status === 'not_found')
    return NextResponse.json({ total: results.length, fixed, not_found: notFound.map(r => r.name), results })
  }

  // ── DEDUPE MODE: detect plants sharing the same cover_image and assign distinct photos ──
  if (mode === 'dedupe') {
    const { data: all } = await supabase
      .from('plants')
      .select('id, common_name, scientific_name, cover_image')
      .eq('published', true)
      .not('cover_image', 'is', null)
      .order('common_name')

    const byUrl = new Map<string, Plant[]>()
    for (const p of (all ?? []) as Plant[]) {
      const list = byUrl.get(p.cover_image!) ?? []
      list.push(p)
      byUrl.set(p.cover_image!, list)
    }

    const usedUrls = new Set(byUrl.keys())
    const dupGroups = Array.from(byUrl.values()).filter(g => g.length > 1)
    const results: { name: string; scientific: string; status: string; url?: string }[] = []
    let processed = 0

    for (const group of dupGroups) {
      // mantener la foto para la primera planta del grupo, re-buscar para el resto
      for (const plant of group.slice(1)) {
        if (processed >= batchSize) break
        processed++
        await sleep(600)
        const inat = await searchInat(plant.scientific_name, usedUrls)
        if (inat) {
          usedUrls.add(inat.url)
          await supabase.from('plants').update({
            cover_image: inat.url,
            image_source: 'inaturalist',
            image_attribution: inat.attribution,
            image_fetched_at: new Date().toISOString(),
          }).eq('id', plant.id)
          results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'fixed', url: inat.url })
        } else {
          results.push({ name: plant.common_name, scientific: plant.scientific_name, status: 'no_alternative' })
        }
      }
      if (processed >= batchSize) break
    }

    const remaining = dupGroups.reduce((n, g) => n + g.length - 1, 0) - results.filter(r => r.status === 'fixed').length
    return NextResponse.json({ duplicate_groups: dupGroups.length, processed: results.length, remaining_duplicates: remaining, results })
  }

  // ── FIXONE MODE: re-fetch image for a single plant by common name ──
  if (mode === 'fixone') {
    const name = req.nextUrl.searchParams.get('name')
    if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })
    const { data: plants } = await supabase
      .from('plants').select('id, common_name, scientific_name, cover_image')
      .eq('published', true).ilike('common_name', name).limit(1)
    const plant = (plants ?? [])[0] as Plant | undefined
    if (!plant) return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    await supabase.from('plants').update({ cover_image: null, image_source: null }).eq('id', plant.id)
    const best = await getBestImage(plant.scientific_name)
    if (!best) return NextResponse.json({ status: 'not_found', name: plant.common_name })
    await supabase.from('plants').update({ cover_image: best.url, image_source: best.source, image_fetched_at: new Date().toISOString() }).eq('id', plant.id)
    return NextResponse.json({ status: 'fixed', name: plant.common_name, source: best.source, url: best.url })
  }

  // ── OVERRIDE MODE: fix a single plant by id or name with a specific URL ──
  if (mode === 'override') {
    const id = req.nextUrl.searchParams.get('id')
    const name = req.nextUrl.searchParams.get('name')
    const url = req.nextUrl.searchParams.get('url')
    if ((!id && !name) || !url) return NextResponse.json({ error: 'Missing id/name or url' }, { status: 400 })
    const filter = id
      ? supabase.from('plants').update({ cover_image: url, image_source: 'manual', image_attribution: 'Manual override', image_fetched_at: new Date().toISOString() }).eq('id', id)
      : supabase.from('plants').update({ cover_image: url, image_source: 'manual', image_attribution: 'Manual override', image_fetched_at: new Date().toISOString() }).ilike('common_name', name!)
    const { error } = await filter
    return NextResponse.json({ ok: !error, error: error?.message })
  }

  return NextResponse.json({ error: 'Unknown mode' }, { status: 400 })
}
