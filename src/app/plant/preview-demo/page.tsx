import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import FichaContent from '../[slug]/FichaContent'
import type { Plant } from '@/types'
import type { Enrichment } from '@/lib/enrich'

// PÁGINA TEMPORAL SOLO PARA PREVIEW — se elimina antes de push
const demoPlant = {
  id: 'demo', scientific_name: 'Ficus lyrata', common_name: 'Ficus lira', common_names: ['Ficus lira'],
  family: 'Moraceae', origin: [], description: 'El Ficus lyrata, conocido como higuera de hoja de violín, es un árbol tropical de interior con grandes hojas coriáceas en forma de violín, de color verde oscuro y brillante. Muy valorado como planta ornamental de interior por su porte escultural y elegante.',
  uses: [], care_level: 'moderate', light: 'indirect', water: 'weekly',
  humidity_min: 40, humidity_max: 60, temp_min_c: 18, temp_max_c: 24,
  height_min_cm: 150, height_max_cm: 300, growth_speed: 'moderate', evergreen: true,
  flowering: false, flowering_months: [], indoor: true, outdoor: false, pot_suitable: true,
  soil_types: ['Mezcla para macetas que drena bien'], hardiness_zones: ['10', '11', '12'],
  garden_styles: [], ubicacion: 'Interior', plant_type: 'tree', flower_colors: null,
  design_compatibility: null, sowing_season: null, region: 'Todo Argentina', is_native: false,
  companion_plants: null, cover_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ficus_lyrata1.jpg/640px-Ficus_lyrata1.jpg',
  images: [], tags: [], slug: 'ficus-lira', published: true, created_at: '', updated_at: '',
} as unknown as Plant

const demoEnrichment: Enrichment = {
  taxonomy: { orden: 'Rosales', genero: 'Ficus', familia: 'Moraceae', clase: 'Magnoliopsida', filo: 'Tracheophyta' },
  care: {
    agua: 'Riego semanal aproximado. Dejá secar la capa superior del sustrato entre riegos; no tolera el encharcamiento.',
    luz: 'Necesita luz brillante pero indirecta. Cerca de una ventana sin sol directo es perfecto.',
    temperatura: '18–24° C', zona: '10, 11, 12', suelo: 'Mezcla para macetas que drena bien',
    ubicacion: 'Interior', toxicidad: 'Ligeramente tóxica por ingestión. Mantené alejada de mascotas y niños; consultá a un especialista.', toxica: true,
  },
}

export default function PreviewDemo() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F2E9DD', color: '#1E3D2B', fontFamily: 'Montserrat, system-ui, sans-serif', paddingBottom: '90px' }}>
      <Nav />
      <FichaContent plant={demoPlant} enrichment={demoEnrichment} combinations={[]} />
      <BottomNav />
    </main>
  )
}
