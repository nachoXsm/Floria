'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

type Plant = {
  id: string
  common_name: string
  scientific_name: string
  care_level: string
  light: string
  water: string
  indoor: boolean
  outdoor: boolean
  pot_suitable: boolean
  flowering: boolean
  growth_speed: string | null
  garden_styles: string[]
  cover_image: string | null
  slug: string | null
  tags: string[]
}

const CARE_COLOR: Record<string, string> = {
  easy: '#16a34a',
  moderate: '#d97706',
  expert: '#dc2626',
}

const CARE_LABELS: Record<string, string> = {
  easy: 'Fácil',
  moderate: 'Moderado',
  expert: 'Experto',
}

type FilterChip = { label: string; field: string; value: string | boolean }

const FILTER_GROUPS: { label: string; chips: FilterChip[] }[] = [
  {
    label: 'Ubicación',
    chips: [
      { label: 'Interior', field: 'indoor', value: true },
      { label: 'Exterior', field: 'outdoor', value: true },
      { label: 'Apto maceta', field: 'pot_suitable', value: true },
      { label: 'Florece', field: 'flowering', value: true },
    ],
  },
  {
    label: 'Cuidado',
    chips: [
      { label: 'Fácil', field: 'care_level', value: 'easy' },
      { label: 'Moderado', field: 'care_level', value: 'moderate' },
      { label: 'Experto', field: 'care_level', value: 'expert' },
      { label: 'Crecimiento rápido', field: 'growth_speed', value: 'fast' },
    ],
  },
  {
    label: 'Luz',
    chips: [
      { label: 'Sol directo', field: 'light', value: 'full_sun' },
      { label: 'Semi sombra', field: 'light', value: 'partial_shade' },
      { label: 'Sombra', field: 'light', value: 'shade' },
      { label: 'Luz indirecta', field: 'light', value: 'indirect' },
    ],
  },
  {
    label: 'Estilo',
    chips: [
      { label: 'Tropical', field: 'garden_style', value: 'tropical' },
      { label: 'Mediterráneo', field: 'garden_style', value: 'mediterranean' },
      { label: 'Minimalista', field: 'garden_style', value: 'minimal' },
      { label: 'Natural', field: 'garden_style', value: 'natural' },
      { label: 'Formal', field: 'garden_style', value: 'formal' },
      { label: 'Cottage', field: 'garden_style', value: 'cottage' },
    ],
  },
]

export default function ExplorePage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([])
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(loadPlants, 280)
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current) }
  }, [search, activeFilters])

  function toggleFilter(chip: FilterChip) {
    setActiveFilters(prev => {
      const exists = prev.some(f => f.field === chip.field && f.value === chip.value)
      if (exists) return prev.filter(f => !(f.field === chip.field && f.value === chip.value))
      // Para booleanos únicos (indoor, outdoor, pot_suitable, flowering), reemplazar si ya existe el mismo field
      if (typeof chip.value === 'boolean') {
        return [...prev.filter(f => f.field !== chip.field), chip]
      }
      return [...prev, chip]
    })
  }

  function isActive(chip: FilterChip) {
    return activeFilters.some(f => f.field === chip.field && f.value === chip.value)
  }

  async function loadPlants() {
    setLoading(true)

    let query = supabase
      .from('plants')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .limit(60)
      .order('common_name')

    if (search) {
      query = query.or(`common_name.ilike.%${search}%,scientific_name.ilike.%${search}%`)
    }

    for (const f of activeFilters) {
      if (f.field === 'indoor' || f.field === 'outdoor' || f.field === 'pot_suitable' || f.field === 'flowering') {
        query = query.eq(f.field, f.value)
      } else if (f.field === 'care_level' || f.field === 'light' || f.field === 'growth_speed') {
        // Para múltiples valores del mismo campo, usamos .in() construido abajo
      } else if (f.field === 'garden_style') {
        // se maneja abajo
      }
    }

    // Agrupar filtros multi-valor por campo
    const careLevels = activeFilters.filter(f => f.field === 'care_level').map(f => f.value as string)
    const lights = activeFilters.filter(f => f.field === 'light').map(f => f.value as string)
    const growthSpeeds = activeFilters.filter(f => f.field === 'growth_speed').map(f => f.value as string)
    const gardenStyles = activeFilters.filter(f => f.field === 'garden_style').map(f => f.value as string)

    if (careLevels.length) query = query.in('care_level', careLevels)
    if (lights.length) query = query.in('light', lights)
    if (growthSpeeds.length) query = query.in('growth_speed', growthSpeeds)
    if (gardenStyles.length) query = query.overlaps('garden_styles', gardenStyles)

    const { data, count } = await query
    setPlants((data || []) as Plant[])
    setTotal(count || 0)
    setLoading(false)
  }

  return (
    <main className="mobile-page-pb" style={{ minHeight: '100vh', backgroundColor: '#F9FCF8', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
      <Nav />

      <div style={{ padding: '88px 16px 40px', maxWidth: '1120px', margin: '0 auto' }}>

        {/* TÍTULO */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 54px)',
            color: '#1E3D2B', margin: '0 0 8px', fontWeight: 500, letterSpacing: '-1px',
          }}>
            Explorá el catálogo
          </h1>
          <p style={{ color: '#4C7F5B', fontSize: '15px', margin: 0 }}>
            {total > 0 ? `${total} especies disponibles` : 'Cargando...'}
          </p>
        </div>

        {/* BUSCADOR */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#A7C4A1' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path d="m21 21-4.35-4.35" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre común o científico..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px 14px 44px', borderRadius: '16px',
              border: '1px solid #C5D9C2', fontSize: '14px', color: '#1E3D2B',
              backgroundColor: 'white', outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            }}
          />
        </div>

        {/* FILTROS */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #E7EFE6',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          {FILTER_GROUPS.map(group => (
            <div key={group.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#7A9E82',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                minWidth: '68px',
                flexShrink: 0,
              }}>
                {group.label}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {group.chips.map(chip => {
                  const active = isActive(chip)
                  return (
                    <button
                      key={`${chip.field}-${chip.value}`}
                      onClick={() => toggleFilter(chip)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        border: active ? '1px solid #1E3D2B' : '1px solid #D4E4D0',
                        backgroundColor: active ? '#1E3D2B' : '#F9FCF8',
                        color: active ? 'white' : '#345E43',
                        fontSize: '12px',
                        fontWeight: active ? 600 : 500,
                        cursor: 'pointer',
                        fontFamily: 'Montserrat, system-ui, sans-serif',
                        transition: 'all 0.15s',
                      }}
                    >
                      {chip.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {activeFilters.length > 0 && (
            <div style={{ borderTop: '1px solid #E7EFE6', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: '#7A9E82', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', minWidth: '68px' }}>
                Activos
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                {activeFilters.map(f => (
                  <span
                    key={`${f.field}-${f.value}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '999px',
                      backgroundColor: '#E7EFE6', color: '#1E3D2B',
                      fontSize: '11px', fontWeight: 600,
                    }}
                  >
                    {f.label}
                    <button
                      onClick={() => toggleFilter(f)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#4C7F5B', lineHeight: 1, fontSize: '13px' }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setActiveFilters([])}
                  style={{
                    padding: '4px 12px', borderRadius: '999px',
                    border: '1px solid #E8C4B9', backgroundColor: '#FFF4F1',
                    color: '#9F3A2F', fontSize: '11px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'Montserrat, system-ui, sans-serif',
                  }}
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid #E7EFE6', height: '230px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #f9f9f9 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
              }} />
            ))}
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#4C7F5B' }}>
            <p style={{ fontSize: '40px', margin: '0 0 16px' }}>🌿</p>
            <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#1E3D2B', margin: '0 0 8px' }}>
              Sin resultados
            </p>
            <p style={{ fontSize: '14px' }}>Probá con otros filtros o términos de búsqueda</p>
            {activeFilters.length > 0 && (
              <button onClick={() => setActiveFilters([])} style={{
                marginTop: '16px', padding: '10px 24px', borderRadius: '999px',
                border: 'none', backgroundColor: '#1E3D2B', color: 'white',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Montserrat, system-ui, sans-serif',
              }}>
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {plants.map(plant => (
              <Link key={plant.id} href={`/plant/${plant.slug ?? plant.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden',
                  border: '1px solid #E7EFE6', cursor: 'pointer',
                  transition: 'all 0.2s', height: '100%',
                }}>
                  <div style={{
                    height: '150px', backgroundColor: '#E7EFE6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative',
                  }}>
                    {plant.cover_image ? (
                      <Image
                        src={plant.cover_image}
                        alt={plant.common_name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 220px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '40px' }}>🌿</span>
                    )}
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '16px', color: '#1E3D2B', margin: '0 0 3px', lineHeight: 1.2,
                    }}>
                      {plant.common_name}
                    </h3>
                    <p style={{ fontSize: '11px', color: '#4C7F5B', fontStyle: 'italic', margin: '0 0 10px' }}>
                      {plant.scientific_name}
                    </p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {plant.care_level && (
                        <span style={{
                          fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
                          backgroundColor: `${CARE_COLOR[plant.care_level]}18`,
                          color: CARE_COLOR[plant.care_level], fontWeight: 600,
                        }}>
                          {CARE_LABELS[plant.care_level]}
                        </span>
                      )}
                      {plant.indoor && !plant.outdoor && (
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#EFF6FF', color: '#1E40AF' }}>
                          Interior
                        </span>
                      )}
                      {plant.flowering && (
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#FDF2F8', color: '#9D174D' }}>
                          Florece
                        </span>
                      )}
                      {plant.pot_suitable && (
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#F0FDF4', color: '#166534' }}>
                          Maceta
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  )
}
