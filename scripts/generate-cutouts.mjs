// Genera la biblioteca de recortes de plantas para las láminas de cantero.
// Por especie: (1) genera una imagen aislada con FLUX en Cloudflare Workers AI (gratis),
// (2) le quita el fondo localmente con @imgly (gratis, sin API),
// (3) sube el PNG transparente a Supabase Storage y guarda la URL en plants.cutout_image.
//
// Uso:
//   node scripts/generate-cutouts.mjs [cantidad]      // p.ej. 15 (default 15)
//   node scripts/generate-cutouts.mjs --all           // todas las que falten
//
// Requiere en .env.local (o en el entorno):
//   CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import { removeBackground } from '@imgly/background-removal-node'

// --- cargar .env.local si existe ---
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
for (const [k, v] of Object.entries({ CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY })) {
  if (!v) { console.error(`✗ Falta la variable ${k}`); process.exit(1) }
}

const BUCKET = 'plant-cutouts'
const arg = process.argv[2]
const ALL = arg === '--all'
const LIMIT = ALL ? 10000 : (parseInt(arg, 10) || 15)

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g')
const slugify = (s) => (s || '').toLowerCase().normalize('NFD').replace(DIACRITICS, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)

// Genera imagen con Cloudflare Workers AI (FLUX.1-schnell). Devuelve un Buffer JPEG.
async function generate(prompt) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, steps: 8 }),
  })
  if (!res.ok) throw new Error(`Cloudflare ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const b64 = data?.result?.image
  if (!b64) throw new Error('Cloudflare: sin imagen')
  return Buffer.from(b64, 'base64')
}

async function main() {
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {})

  const { data: plants, error } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name')
    .eq('published', true)
    .is('cutout_image', null)
    .order('common_name')
    .limit(LIMIT)
  if (error) { console.error('✗ Supabase:', error.message); process.exit(1) }
  if (!plants?.length) { console.log('✓ No hay plantas pendientes de recorte.'); return }

  console.log(`→ Generando ${plants.length} recortes con Cloudflare + quita-fondo local…\n`)
  let ok = 0, fail = 0
  for (const [i, p] of plants.entries()) {
    const tag = `[${i + 1}/${plants.length}] ${p.scientific_name}`
    try {
      const prompt = `A single ${p.common_name} plant (${p.scientific_name}), whole plant shown from the side in elevation view, isolated on a plain solid white background, photorealistic, botanically accurate, natural colors, soft studio lighting, centered, entire plant visible from base to top, no pot, no text, no people.`
      const jpeg = await generate(prompt)
      const cutBlob = await removeBackground(new Blob([jpeg], { type: 'image/jpeg' }))
      const png = Buffer.from(await cutBlob.arrayBuffer())

      const path = `${slugify(p.scientific_name || p.common_name || p.id)}.png`
      const up = await supabase.storage.from(BUCKET).upload(path, png, { contentType: 'image/png', upsert: true })
      if (up.error) throw new Error(up.error.message)
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
      await supabase.from('plants').update({ cutout_image: pub.publicUrl }).eq('id', p.id)

      ok++; console.log(`✓ ${tag}`)
    } catch (e) {
      fail++; console.log(`✗ ${tag} — ${String(e.message || e).slice(0, 160)}`)
    }
  }
  console.log(`\n✓ Listo: ${ok} recortes generados, ${fail} con error.`)
}

main().catch(e => { console.error(e); process.exit(1) })
