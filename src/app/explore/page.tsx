'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Plant = {
  id: string
  common_name: string
  scientific_name: string
  care_level: string
  light: string
  water: string
  indoor: boolean
  outdoor: boolean
  cover_image: string | null
  slug: string
  tags: string[]
  description: string | null
}

const CARE_LABELS: Record<string, string> = { easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }
const LIGHT_LABELS: Record<string, string> = { full_sun: 'Pleno sol', partial_shade: 'Semisombra', shade: 'Sombra', indirect: 'Luz indirecta' }
const WATER_LABELS: Record<string, string> = { daily: 'Diario', twice_week: '2x semana', weekly: 'Semanal', biweekly: 'Quincenal', monthly: 'Mensual' }

export default function ExplorePage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCare, setFilterCare] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterLight, setFilterLight] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadPlants()
  }, [search, filterCare, filterLocation, filterLight])

  async function loadPlants() {
    setLoading(true)
    let query = supabase
      .from('plants')
      .select('id, common_name, scientific_name, care_level, light, water, indoor, outdoor, cover_image, slug, tags, description')
      .eq('published', true)
      .limit(48)
      .order('common_name')

    if (search) {
      query = query.or(`common_name.ilike.%${search}%,scientific_name.ilike.%${search}%`)
    }
    if (filterCare) query = query.eq('care_level', filterCare)
    if (filterLocation === 'indoor') query = query.eq('indoor', true)
    if (filterLocation === 'outdoor') query = query.eq('outdoor', true)
    if (filterLight) query = query.eq('light', filterLight)

    const { data } = await query
    setPlants(data || [])
    setLoading(false)
  }

  const careColor: Record<string, string> = {
    easy: '#16a34a',
    moderate: '#d97706',
    expert: '#dc2626',
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'white', borderBottom: '1px solid #E7EFE6',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '64px'
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 600, color: '#1E3D2B', textDecoration: 'none' }}>🌿 Floria</a>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <a href="/explore" style={{ color: '#1E3D2B', textDecoration: 'none', fontWeight: 600 }}>Explorar</a>
          <a href="/identify" style={{ color: '#4C7F5B', textDecoration: 'none' }}>Identificar</a>
          <a href="/auth/login" style={{ color: '#4C7F5B', textDecoration: 'none' }}>Mi cuenta</a>
        </div>
      </nav>

      <div style={{ paddingTop: '80px', padding: '80px 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: '#1E3D2B', marginBottom: '8px' }}>
            Explorar plantas
          </h1>
          <p style={{ color: '#4C7F5B', fontSize: '15px' }}>
            {plants.length} especies encontradas
          </p>
        </div>

        {/* SEARCH */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍  Buscar por nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px', borderRadius: '16px',
              border: '1px solid #C5D9C2', fontSize: '15px', color: '#1E3D2B',
              backgroundColor: 'white', outline: 'none', boxSizing: 'border-box',
              boxShadow: '0 2px 8px rgba(30,61,43,0.06)'
            }}
          />
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { label: 'Todas', value: '', key: 'care' },
            { label: '🟢 Fácil', value: 'easy', key: 'care' },
            { label: '🟡 Moderado', value: 'moderate', key: 'care' },
            { label: '🔴 Experto', value: 'expert', key: 'care' },
          ].map(f => (
            <button key={f.value + 'care'} onClick={() => setFilterCare(f.value)} style={{
              padding: '8px 18px', borderRadius: '999px', border: '1px solid',
              borderColor: filterCare === f.value ? '#1E3D2B' : '#C5D9C2',
              backgroundColor: filterCare === f.value ? '#1E3D2B' : 'white',
              color: filterCare === f.value ? 'white' : '#4C7F5B',
              fontSize: '13px', cursor: 'pointer', fontWeight: filterCare === f.value ? 600 : 400,
            }}>{f.label}</button>
          ))}
          <div style={{ width: '1px', backgroundColor: '#E7EFE6', margin: '0 4px' }} />
          {[
            { label: 'Todos', value: '' },
            { label: '🏠 Interior', value: 'indoor' },
            { label: '☀️ Exterior', value: 'outdoor' },
          ].map(f => (
            <button key={f.value + 'loc'} onClick={() => setFilterLocation(f.value)} style={{
              padding: '8px 18px', borderRadius: '999px', border: '1px solid',
              borderColor: filterLocation === f.value ? '#1E3D2B' : '#C5D9C2',
              backgroundColor: filterLocation === f.value ? '#1E3D2B' : 'white',
              color: filterLocation === f.value ? 'white' : '#4C7F5B',
              fontSize: '13px', cursor: 'pointer', fontWeight: filterLocation === f.value ? 600 : 400,
            }}>{f.label}</button>
          ))}
        </div>

        {/* GRID */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
            <p style={{ fontSize: '32px', marginBottom: '16px' }}>🌿</p>
            <p>Cargando plantas...</p>
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
            <p style={{ fontSize: '32px', marginBottom: '16px' }}>🔍</p>
            <p>No se encontraron plantas con esos filtros.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {plants.map(plant => (
              <a key={plant.id} href={`/plant/${plant.slug || plant.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden',
                  border: '1px solid #E7EFE6', transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(30,61,43,0.12)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  {/* Image */}
                  <div style={{ height: '160px', backgroundColor: '#E7EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {plant.cover_image ? (
                      <img src={plant.cover_image} alt={plant.common_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '48px' }}>🌿</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#1E3D2B', margin: '0 0 4px' }}>
                      {plant.common_name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#4C7F5B', fontStyle: 'italic', margin: '0 0 12px' }}>
                      {plant.scientific_name}
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {plant.care_level && (
                        <span style={{
                          fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                          backgroundColor: `${careColor[plant.care_level]}20`,
                          color: careColor[plant.care_level], fontWeight: 600
                        }}>
                          {CARE_LABELS[plant.care_level]}
                        </span>
                      )}
                      {plant.indoor && (
                        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', backgroundColor: '#E7EFE6', color: '#1E3D2B' }}>
                          Interior
                        </span>
                      )}
                      {plant.outdoor && (
                        <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', backgroundColor: '#FEF9EE', color: '#854F0B' }}>
                          Exterior
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
