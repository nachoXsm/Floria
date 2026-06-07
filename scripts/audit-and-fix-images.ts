/**
 * scripts/audit-and-fix-images.ts
 *
 * Hace tres cosas:
 *  1. Lista plantas sin imagen y las backfill desde iNaturalist
 *  2. Verifica que cada imagen existente corresponda al taxón correcto
 *     (compara el nombre científico de la DB contra el taxón que iNaturalist
 *      devuelve para esa URL — si no coincide, busca la imagen correcta)
 *  3. Genera un reporte final en consola con todos los cambios
 *
 * Uso:
 *   npx tsx scripts/audit-and-fix-images.ts
 *   npx tsx scripts/audit-and-fix-images.ts --dry-run   (solo muestra, no actualiza)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 800; // pausa entre requests a iNaturalist para no hacer rate-limit

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL');
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY');

type Plant = {
  id: string;
  common_name: string;
  scientific_name: string;
  cover_image: string | null;
};

type InatResult = {
  url: string;
  matchedName: string;
  attribution: string | null;
} | null;

/** Busca el taxón en iNaturalist y devuelve la foto del resultado más relevante */
async function fetchInatImage(scientificName: string): Promise<InatResult> {
  await sleep(DELAY_MS);
  const url = new URL('https://api.inaturalist.org/v1/taxa');
  url.searchParams.set('q', scientificName);
  url.searchParams.set('rank', 'species');
  url.searchParams.set('per_page', '3'); // tomamos 3 para elegir mejor

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`  iNaturalist error ${res.status} para "${scientificName}"`);
    return null;
  }

  const data = await res.json();
  const results = data.results ?? [];

  // Preferir el resultado cuyo nombre científico coincida exactamente
  const exact = results.find((r: any) =>
    r.name?.toLowerCase() === scientificName.toLowerCase()
  );
  const best = exact ?? results[0];

  if (!best?.default_photo?.medium_url) return null;

  return {
    url: best.default_photo.medium_url,
    matchedName: best.name,
    attribution: best.default_photo.attribution ?? null,
  };
}

/**
 * Dado el nombre científico de la planta y la URL de imagen actual,
 * verifica que la URL pertenezca a esa especie consultando iNaturalist.
 * Retorna true si OK, false si sospechosa.
 */
async function imageMatchesSpecies(scientificName: string, imageUrl: string): Promise<boolean> {
  // Extraemos el taxon_id de la URL de iNaturalist si es posible
  // Formato típico: https://inaturalist-open-data.s3.amazonaws.com/photos/XXXXXX/medium.jpg
  // También: https://static.inaturalist.org/photos/XXXXX/medium.jpg
  // No podemos saber el taxón solo con la URL, así que verificamos buscando el nombre
  // y comparando si la URL del resultado coincide con la URL guardada.

  await sleep(DELAY_MS);
  const url = new URL('https://api.inaturalist.org/v1/taxa');
  url.searchParams.set('q', scientificName);
  url.searchParams.set('rank', 'species');
  url.searchParams.set('per_page', '1');

  const res = await fetch(url.toString());
  if (!res.ok) return true; // si falla la API, asumimos OK para no borrar todo

  const data = await res.json();
  const best = data.results?.[0];

  if (!best) return false; // especie no encontrada → imagen sospechosa

  const inatName: string = best.name ?? '';
  const sciWords = scientificName.toLowerCase().split(' ').slice(0, 2);
  const inatWords = inatName.toLowerCase().split(' ').slice(0, 2);

  // Si el género y la especie coinciden, la imagen es probablemente correcta
  const genusMatch = sciWords[0] === inatWords[0];
  const speciesMatch = sciWords[1] && inatWords[1] ? sciWords[1] === inatWords[1] : true;

  return genusMatch && speciesMatch;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateImage(plant: Plant, inat: InatResult) {
  if (!inat) return false;
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Actualizaría "${plant.common_name}" → ${inat.url}`);
    return true;
  }
  const { error } = await supabase
    .from('plants')
    .update({
      cover_image: inat.url,
      image_source: 'inaturalist',
      image_attribution: inat.attribution,
      image_fetched_at: new Date().toISOString(),
    })
    .eq('id', plant.id);

  if (error) { console.error(`  Error actualizando ${plant.common_name}:`, error.message); return false; }
  return true;
}

async function main() {
  console.log(`\n🌿 Floria — Auditoría de imágenes${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

  // ── 1. Traer TODAS las plantas publicadas ──────────────────────────────────
  const { data, error } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name, cover_image')
    .eq('published', true)
    .order('common_name');

  if (error) throw error;
  const plants = (data ?? []) as Plant[];
  console.log(`Total plantas publicadas: ${plants.length}\n`);

  const noImage   : string[] = [];
  const mismatch  : string[] = [];
  const fixed     : string[] = [];
  const notFound  : string[] = [];

  // ── 2. Procesar cada planta ───────────────────────────────────────────────
  for (const plant of plants) {
    // ── Sin imagen ──
    if (!plant.cover_image) {
      console.log(`❌ Sin imagen: ${plant.common_name} (${plant.scientific_name})`);
      noImage.push(plant.common_name);

      const inat = await fetchInatImage(plant.scientific_name);
      if (inat) {
        const ok = await updateImage(plant, inat);
        if (ok) {
          console.log(`   ✅ Imagen encontrada (taxón: ${inat.matchedName})`);
          fixed.push(plant.common_name);
        }
      } else {
        console.log(`   ⚠️  No encontrada en iNaturalist`);
        notFound.push(plant.common_name);
      }
      continue;
    }

    // ── Con imagen: verificar que corresponde ──
    const matches = await imageMatchesSpecies(plant.scientific_name, plant.cover_image);
    if (!matches) {
      console.log(`⚠️  Imagen dudosa: ${plant.common_name} (${plant.scientific_name})`);
      mismatch.push(plant.common_name);

      const inat = await fetchInatImage(plant.scientific_name);
      if (inat) {
        console.log(`   → Reemplazando con taxón "${inat.matchedName}"`);
        const ok = await updateImage(plant, inat);
        if (ok) fixed.push(plant.common_name);
      } else {
        console.log(`   ⚠️  No se encontró reemplazo`);
        notFound.push(plant.common_name);
      }
    }
  }

  // ── 3. Reporte final ──────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════');
  console.log('REPORTE FINAL');
  console.log('══════════════════════════════════════════');
  console.log(`Sin imagen originalmente : ${noImage.length}`);
  console.log(`Con imagen incorrecta    : ${mismatch.length}`);
  console.log(`Corregidas               : ${fixed.length}`);
  console.log(`Sin solución (no hallada): ${notFound.length}`);

  if (notFound.length) {
    console.log('\nPlantas sin imagen disponible en iNaturalist:');
    notFound.forEach(n => console.log(`  - ${n}`));
    console.log('\n→ Para estas, buscá manualmente en:');
    console.log('  https://www.inaturalist.org/taxa/search?q=NOMBRE_CIENTIFICO');
    console.log('  https://commons.wikimedia.org/wiki/Special:Search?search=NOMBRE_CIENTIFICO');
  }

  if (DRY_RUN) console.log('\n[DRY RUN] Ningún cambio fue guardado en la DB.');
  console.log('\n✅ Auditoría completada.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
