import { notFound } from 'next/navigation'
import { getPlantBySlug } from '@/lib/queries/plants'
import type { Plant } from '@/types'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import FichaContent from './FichaContent'
import { enrichPlant } from '@/lib/enrich'

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

  const enrichment = await enrichPlant(plant as Plant)

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F2E9DD',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
      paddingBottom: '90px',
    }}>
      <Nav />
      <FichaContent plant={plant as Plant} enrichment={enrichment} combinations={combinations} />
      <BottomNav />
    </main>
  )
}
