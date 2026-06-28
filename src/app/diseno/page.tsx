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
}

export default async function DisenoPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name, cover_image, plant_type')
    .eq('published', true)
    .order('common_name')

  const plants = (data ?? []) as PlantOption[]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F2E9DD', color: '#1E3D2B', fontFamily: 'Montserrat, system-ui, sans-serif', paddingBottom: '90px' }}>
      <Nav />
      <DisenoClient plants={plants} />
      <BottomNav />
    </main>
  )
}
