import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL en .env.local');
if (!serviceRoleKey) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY en .env.local');

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Plant = {
  id: string;
  common_name: string;
  scientific_name: string;
};

async function findImage(scientificName: string) {
  const url = new URL('https://api.inaturalist.org/v1/taxa');
  url.searchParams.set('q', scientificName);
  url.searchParams.set('rank', 'species');
  url.searchParams.set('per_page', '1');

  const response = await fetch(url);
  if (!response.ok) throw new Error(`iNaturalist respondio ${response.status}`);

  const data = await response.json();
  const photo = data.results?.[0]?.default_photo;

  if (!photo?.medium_url) return null;

  return {
    url: photo.medium_url,
    source: 'inaturalist',
    attribution: photo.attribution ?? null,
  };
}

async function main() {
  const { data, error } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name')
    .is('cover_image', null)
    .eq('published', true)
    .order('common_name')
    .limit(50);

  if (error) throw error;

  const plants = (data ?? []) as Plant[];
  console.log(`Plantas sin imagen: ${plants.length}`);

  for (const plant of plants) {
    try {
      const image = await findImage(plant.scientific_name);

      if (!image) {
        console.log(`Sin imagen: ${plant.common_name}`);
        continue;
      }

      const { error: updateError } = await supabase
        .from('plants')
        .update({
          cover_image: image.url,
          image_source: image.source,
          image_attribution: image.attribution,
          image_fetched_at: new Date().toISOString(),
        })
        .eq('id', plant.id);

      if (updateError) throw updateError;

      console.log(`Imagen agregada: ${plant.common_name}`);
    } catch (error) {
      console.error(`Error con ${plant.common_name}:`, error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
