import { notFound } from 'next/navigation'
import { getPlantBySlug } from '@/lib/queries/plants'
import type { Plant } from '@/types'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import FichaContent from './FichaContent'
import { enrichPlant } from '@/lib/enrich'
import { color, font } from '@/lib/ui'
import { getServerLang } from '@/lib/i18n-server'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const plant = await getPlantBySlug(params.slug)
    return {
      title: `${plant.common_name} — Floria`,
      description: plant.description ?? `Ficha botánica de ${plant.scientific_name}`,
    }
  } catch {
    return { title: 'Planta — Floria' }
  }
}

export default async function PlantPage({ params }: Props) {
  let plant
  try {
    plant = await getPlantBySlug(params.slug)
  } catch {
    notFound()
  }

  const combinations: Partial<Plant>[] = [
    ...(plant.plant_combinations_a?.map((c: { plant_b: Partial<Plant> }) => c.plant_b) ?? []),
    ...(plant.plant_combinations_b?.map((c: { plant_a: Partial<Plant> }) => c.plant_a) ?? []),
  ]

  // Servir nombre/descripción en el idioma elegido si hay traducción
  const lang = getServerLang()
  const p = plant as unknown as Record<string, unknown>
  if (lang === 'en') {
    if (p.common_name_en) plant.common_name = p.common_name_en as string
    if (p.description_en) plant.description = p.description_en as string
  } else if (lang === 'pt') {
    if (p.common_name_pt) plant.common_name = p.common_name_pt as string
    if (p.description_pt) plant.description = p.description_pt as string
  }

  const enrichment = await enrichPlant(plant as Plant)

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: color.bg,
      fontFamily: font.sans,
      color: color.ink,
      paddingBottom: '110px',
    }}>
      <Nav />
      <FichaContent plant={plant as Plant} enrichment={enrichment} combinations={combinations} />
      <BottomNav />
    </main>
  )
}
