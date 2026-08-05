import { unstable_cache } from 'next/cache'
import type { Plant } from '@/types'

export type Taxonomy = {
  orden?: string
  familia?: string
  genero?: string
  clase?: string
  filo?: string
}

export type CareInfo = {
  agua: string
  luz: string
  temperatura: string
  zona: string
  suelo: string
  ubicacion: string
  toxicidad: string
  toxica: boolean
}

export type Enrichment = {
  taxonomy: Taxonomy
  care: CareInfo
}

// Taxonomía desde GBIF (gratis, sin key, muy confiable)
export const getTaxonomy = unstable_cache(
  async (scientificName: string): Promise<Taxonomy> => {
    try {
      const url = `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(scientificName)}`
      const res = await fetch(url, { signal: AbortSignal.timeout(7000) })
      if (!res.ok) return {}
      const d = await res.json()
      return {
        orden: d.order ?? undefined,
        familia: d.family ?? undefined,
        genero: d.genus ?? undefined,
        clase: d.class ?? undefined,
        filo: d.phylum ?? undefined,
      }
    } catch {
      return {}
    }
  },
  ['gbif-taxonomy'],
  { revalidate: 60 * 60 * 24 * 30 } // 30 días
)

const LIGHT_TEXT: Record<string, string> = {
  full_sun: 'Prefiere pleno sol: al menos 6 horas de luz directa por día. Ubicala en el punto más soleado.',
  partial_shade: 'Le va mejor la media sombra o luz filtrada. Evitá el sol directo del mediodía en verano.',
  shade: 'Tolera bien la sombra. Ideal para rincones con poca luz directa.',
  indirect: 'Necesita luz brillante pero indirecta. Cerca de una ventana sin sol directo es perfecto.',
}
const WATER_TEXT: Record<string, string> = {
  daily: 'Riego frecuente: mantené el sustrato siempre húmedo, regando casi a diario en épocas cálidas.',
  twice_week: 'Regá unas dos veces por semana, manteniendo el suelo húmedo pero sin encharcar.',
  weekly: 'Riego semanal aproximado. Dejá secar la capa superior del sustrato entre riegos.',
  biweekly: 'Poco riego: cada 10-15 días suele alcanzar. Dejá secar bien el sustrato entre riegos.',
  monthly: 'Muy poco riego. Tolera la sequía; regá solo cuando el sustrato esté completamente seco.',
}
const LIGHT_SHORT: Record<string, string> = {
  full_sun: 'Pleno sol', partial_shade: 'Media sombra', shade: 'Sombra', indirect: 'Brillante, indirecta',
}
const SOIL_TEXT: Record<string, string> = {
  full_sun: 'Suelo con buen drenaje', partial_shade: 'Suelo fértil y húmedo',
  shade: 'Suelo rico en materia orgánica', indirect: 'Mezcla para macetas que drena bien',
}

// Datos de cuidado: usa campos de la base y completa con texto derivado.
// (En el futuro se puede reemplazar por generación IA por planta.)
export function getCareInfo(plant: Plant): CareInfo {
  const temp = plant.temp_min_c != null && plant.temp_max_c != null
    ? `${plant.temp_min_c}–${plant.temp_max_c}° C`
    : '15–25° C aprox.'
  const zona = plant.hardiness_zones?.length ? plant.hardiness_zones.join(', ') : '9 a 11'
  const suelo = plant.soil_types?.length ? plant.soil_types.join(', ') : (SOIL_TEXT[plant.light] ?? 'Suelo con buen drenaje')
  const ubic = plant.indoor && plant.outdoor ? 'Interior y exterior' : plant.indoor ? 'Interior' : 'Exterior'
  return {
    agua: WATER_TEXT[plant.water] ?? 'Regá manteniendo el sustrato apenas húmedo, sin encharcar.',
    luz: LIGHT_TEXT[plant.light] ?? 'Ubicala en un lugar luminoso.',
    temperatura: temp,
    zona,
    suelo,
    ubicacion: ubic,
    toxicidad: 'Consultá con un especialista antes de consumir cualquier planta.',
    toxica: false,
  }
}

export function lightShort(light: string): string {
  return LIGHT_SHORT[light] ?? 'Luz media'
}

export async function enrichPlant(plant: Plant): Promise<Enrichment> {
  const taxonomy = await getTaxonomy(plant.scientific_name)
  if (!taxonomy.familia && plant.family) taxonomy.familia = plant.family
  if (!taxonomy.genero) taxonomy.genero = plant.scientific_name.replace(/^×\s*/, '').split(' ')[0]
  return { taxonomy, care: getCareInfo(plant) }
}
