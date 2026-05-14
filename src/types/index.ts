// ============================================================
// Floria - TypeScript Types
// ============================================================

export type CareLevel = 'easy' | 'moderate' | 'expert'
export type LightRequirement = 'full_sun' | 'partial_shade' | 'shade' | 'indirect'
export type WaterFrequency = 'daily' | 'twice_week' | 'weekly' | 'biweekly' | 'monthly'
export type GrowthSpeed = 'slow' | 'moderate' | 'fast'
export type GardenStyle = 'mediterranean' | 'tropical' | 'minimal' | 'natural' | 'formal' | 'cottage'
export type PlanType = 'free' | 'pro' | 'professional'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

// ============================================================
// PLANT
// ============================================================
export interface Plant {
  id: string
  scientific_name: string
  common_name: string
  common_names: string[]
  family: string | null
  origin: string[]
  description: string | null
  uses: string[]
  care_level: CareLevel
  light: LightRequirement
  water: WaterFrequency
  humidity_min: number | null
  humidity_max: number | null
  temp_min_c: number | null
  temp_max_c: number | null
  height_min_cm: number | null
  height_max_cm: number | null
  growth_speed: GrowthSpeed | null
  evergreen: boolean
  flowering: boolean
  flowering_months: number[]
  indoor: boolean
  outdoor: boolean
  pot_suitable: boolean
  soil_types: string[]
  hardiness_zones: string[]
  garden_styles: GardenStyle[]
  cover_image: string | null
  images: string[]
  tags: string[]
  slug: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface PlantCombination {
  id: string
  plant_a_id: string
  plant_b_id: string
  compatibility_score: number
  aesthetic_score: number
  notes: string | null
  style_tags: string[]
  plant_a?: Plant
  plant_b?: Plant
}

// ============================================================
// PROFILE
// ============================================================
export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  climate_zone: string | null
  plan: PlanType
  identifications_this_month: number
  is_professional: boolean
  profession: string | null
  created_at: string
  updated_at: string
}

// ============================================================
// GARDEN
// ============================================================
export interface Garden {
  id: string
  user_id: string
  name: string
  description: string | null
  style: GardenStyle | null
  area_sqm: number | null
  location: string | null
  climate_zone: string | null
  is_public: boolean
  cover_image: string | null
  created_at: string
  updated_at: string
  garden_plants?: GardenPlant[]
}

export interface GardenPlant {
  id: string
  garden_id: string
  plant_id: string
  quantity: number
  position_x: number | null
  position_y: number | null
  notes: string | null
  added_at: string
  plant?: Plant
}

// ============================================================
// IDENTIFICATION
// ============================================================
export interface Identification {
  id: string
  user_id: string
  image_url: string
  api_response: PlantIdResponse | null
  matched_plant_id: string | null
  confidence: number | null
  suggestions: PlantIdSuggestion[]
  created_at: string
  matched_plant?: Plant
}

export interface PlantIdResponse {
  id: number
  custom_id: string | null
  meta_data: Record<string, unknown>
  uploaded_datetime: number
  finished_datetime: number
  result: {
    is_plant: { probability: number; binary: boolean }
    classification: {
      suggestions: PlantIdSuggestion[]
    }
  }
}

export interface PlantIdSuggestion {
  id: number
  name: string
  probability: number
  similar_images: Array<{
    id: string
    url: string
    license_name: string
    license_url: string
    citation: string
    similarity: number
    url_small: string
  }>
  details?: {
    common_names: string[]
    taxonomy: Record<string, string>
    url: string
    gbif_id: number
    inaturalist_id: number
    rank: string
    description: { value: string; citation: string }
    synonyms: string[]
    image: { value: string; citation: string; license_name: string; license_url: string }
    edible_parts: string[] | null
    watering: { max: number; min: number } | null
    propagation_methods: string[] | null
  }
}

// ============================================================
// SUBSCRIPTION
// ============================================================
export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: PlanType
  status: SubscriptionStatus
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// ============================================================
// PLANT FILTERS
// ============================================================
export interface PlantFilters {
  search?: string
  care_level?: CareLevel[]
  light?: LightRequirement[]
  water?: WaterFrequency[]
  indoor?: boolean
  outdoor?: boolean
  pot_suitable?: boolean
  garden_styles?: GardenStyle[]
  flowering?: boolean
  growth_speed?: GrowthSpeed[]
  tags?: string[]
  height_max_cm?: number
}

// ============================================================
// FREE TIER LIMITS
// ============================================================
export const FREE_TIER_LIMITS = {
  identifications_per_month: 3,
  gardens_max: 1,
  search_per_day: 10,
  can_export: false,
  ai_combinations: false,
} as const

export const PRO_TIER_LIMITS = {
  identifications_per_month: Infinity,
  gardens_max: Infinity,
  search_per_day: Infinity,
  can_export: true,
  ai_combinations: true,
} as const
