// lib/queries/plants.ts
import { createClient } from '@/lib/supabase/server'
import type { Plant, PlantFilters } from '@/types'

export async function getPlants(filters: PlantFilters = {}, page = 1, limit = 24) {
  const supabase = createClient()
  const offset = (page - 1) * limit

  let query = supabase
    .from('plants')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .range(offset, offset + limit - 1)

  // Búsqueda de texto
  if (filters.search) {
    query = query.or(
      `common_name.ilike.%${filters.search}%,scientific_name.ilike.%${filters.search}%`
    )
  }

  // Filtros
  if (filters.care_level?.length) {
    query = query.in('care_level', filters.care_level)
  }
  if (filters.light?.length) {
    query = query.in('light', filters.light)
  }
  if (filters.water?.length) {
    query = query.in('water', filters.water)
  }
  if (filters.indoor !== undefined) {
    query = query.eq('indoor', filters.indoor)
  }
  if (filters.outdoor !== undefined) {
    query = query.eq('outdoor', filters.outdoor)
  }
  if (filters.pot_suitable !== undefined) {
    query = query.eq('pot_suitable', filters.pot_suitable)
  }
  if (filters.flowering !== undefined) {
    query = query.eq('flowering', filters.flowering)
  }
  if (filters.growth_speed?.length) {
    query = query.in('growth_speed', filters.growth_speed)
  }
  if (filters.garden_styles?.length) {
    query = query.overlaps('garden_styles', filters.garden_styles)
  }
  if (filters.height_max_cm) {
    query = query.lte('height_min_cm', filters.height_max_cm)
  }
  if (filters.tags?.length) {
    query = query.overlaps('tags', filters.tags)
  }

  const { data, error, count } = await query.order('common_name')

  if (error) throw error
  return { plants: data as Plant[], total: count ?? 0 }
}

export async function getPlantBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plants')
    .select(`
      *,
      plant_combinations_a:plant_combinations!plant_a_id(
        *,
        plant_b:plants!plant_b_id(id, common_name, cover_image, slug, care_level)
      ),
      plant_combinations_b:plant_combinations!plant_b_id(
        *,
        plant_a:plants!plant_a_id(id, common_name, cover_image, slug, care_level)
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data as Plant & {
    plant_combinations_a: Array<{ plant_b: Partial<Plant> }>
    plant_combinations_b: Array<{ plant_a: Partial<Plant> }>
  }
}

export async function getPlantById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Plant
}

export async function getFeaturedPlants(limit = 8) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('plants')
    .select('id, common_name, scientific_name, cover_image, slug, care_level, light, indoor, outdoor')
    .eq('published', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Partial<Plant>[]
}
