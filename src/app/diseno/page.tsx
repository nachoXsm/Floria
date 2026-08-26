import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import { createClient } from '@/lib/supabase/server'
import DisenoClient from './DisenoClient'

export const metadata: Metadata = {
  title: 'Diseñá tu cantero — Floria',
}

export type PlantOption = {
  id: string
  common_name: string
  scientific_name: string
  cover_image: string | null
  plant_type: string | null
  cutout_image?: string | null
  flower_colors?: string[] | null
  height_min_cm?: number | null
  height_max_cm?: number | null
  light?: string | null
}

const BASE_COLS = 'id, common_name, scientific_name, cover_image, plant_type, flower_colors, height_min_cm, height_max_cm, light'

export default async function DisenoPage() {
  const supabase = createClient()

  // Traemos cutout_image si existe; si la columna aún no fue creada, reintentamos sin ella.
  let data: PlantOption[] | null = null
  const withCutout = await supabase
    .from('plants')
    .select(`${BASE_COLS}, cutout_image`)
    .eq('published', true)
    .order('common_name')
  if (withCutout.error) {
    const fallback = await supabase
      .from('plants')
      .select(BASE_COLS)
      .eq('published', true)
      .order('common_name')
    data = (fallback.data ?? []) as PlantOption[]
  } else {
    data = (withCutout.data ?? []) as PlantOption[]
  }

  const plants = data ?? []

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F2E9DD', color: '#1E3D2B', fontFamily: 'Montserrat, system-ui, sans-serif', paddingBottom: '90px' }}>
      <Nav />
      <DisenoClient plants={plants} />
      <BottomNav />
    </main>
  )
}
