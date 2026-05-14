'use client'
import { useState, useEffect, useRef } from 'react'
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
  pot_suitable: boolean
  flowering: boolean
  evergreen: boolean
  growth_speed: string | null
  garden_styles: string[]
  cover_image: string | null
  slug: string
  tags: string[]
  description: string | null
  plant_type: string | null
}

const CARE_COLOR: Record<string, string> = { easy: '#4C7F5B', moderate: '#B58A3A', expert: '#9F3A2F' }
const CARE_LABELS: Record<string, string> = { easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }

const FILTERS = {
  tipo: [
    { label: 'Todos', value: '' },
    { label: '🌳 Árbol', value: 'árbol' },
    { label: '🌿 Arbusto', value: 'arbusto' },
    { label: '🌸 Herbácea', value: 'herbácea' },
    { label: '🌵 Suculenta', value: 'suculenta' },
    { label: '🎋 Gramínea', value: 'gramínea' },
    { label: '🍃 Trepadora', value: 'trepadora' },
    { label: '🌱 Tapizante', value: 'tapizante' },
    { label: '🌴 Palmera', value: 'palmera' },
    { label: '💧 Acuática', value: 'acuática' },
  ],
  cuidado: [
    { label: 'Todos', value: '' },
    { label: '🟢 Fácil', value: 'easy' },
    { label: '🟡 Moderado', value: 'moderate' },
    { label: '🔴 Experto', value: 'expert' },
  ],
  ubicacion: [
    { label: 'Todos', value: '' },
    { label: '🏠 Interior', value: 'indoor' },
    { label: '☀️ Exterior', value: 'outdoor' },
  ],
  luz: [
    { label: 'Todas', value: '' },
    { label: '☀️ Pleno sol', value: 'full_sun' },
    { label: '⛅ Semisombra', value: 'partial_shade' },
    { label: '🌥️ Sombra', value: 'shade' },
    { label: '💡 Luz indirecta', value: 'indirect' },
  ],
  riego: [
    { label: 'Todos', value: '' },
    { label: '💧 Diario', value: 'daily' },
    { label: '💧 2x semana', value: 'twice_week' },
    { label: '💧 Semanal', value: 'weekly' },
    { label: '💧 Quincenal', value: 'biweekly' },
    { label: '💧 Mensual', value: 'monthly' },
  ],
  ciclo: [
    { label: 'Todos', value: '' },
    { label: '🌿 Perenne', value: 'perenne' },
    { label: '🍂 Anual', value: 'anual' },
  ],
  floracion: [
    { label: 'Todas', value: '' },
    { label: '🌸 Con floración', value: 'si' },
    { label: '🌿 Sin floración', value: 'no' },
  ],
  maceta: [
    { label: 'Todas', value: '' },
    { label: '🪴 Apto maceta', value: 'si' },
    { label: '🌍 Solo suelo', value: 'no' },
  ],
  estilo: [
    { label: 'Todos', value: '' },
    { label: '🫒 Mediterráneo', value: 'mediterranean' },
    { label: '🌴 Tropical', value: 'tropical' },
    { label: '⬜ Minimalista', value: 'minimal' },
    { label: '🌾 Natural', value: 'natural' },
    { label: '🏛️ Formal', value: 'formal' },
    { label: '🌷 Cottage', value: 'cottage' },
  ],
}

function FilterGroup({ title, options, value, onChange }: {
  title: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, color: '#1E3D2B', textTransform: 'uppercase', letterSpacing: '1.6px', marginBottom: '10px' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value === value ? '' : opt.value)} style={{
            padding: '8px 14px', borderRadius: '999px', border: '1px solid',
            borderColor: value === opt.value ? '#1E3D2B' : '#C5D9C2',
            backgroundColor: value === opt.value ? '#1E3D2B' : '#F9FCF8',
            color: value === opt.value ? 'white' : '#4C7F5B',
            fontSize: '12px', cursor: 'pointer', fontWeight: value === opt.value ? 600 : 500, fontFamily: 'Montserrat, system-ui, sans-serif',
          }}>{opt.label}</button>
        ))}
      </div>
    </div>
  )
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const [fTipo, setFTipo] = useState('')
  const [fCuidado, setFCuidado] = useState('')
  const [fUbicacion, setFUbicacion] = useState('')
  const [fLuz, setFLuz] = useState('')
  const [fRiego, setFRiego] = useState('')
  const [fCiclo, setFCiclo] = useState('')
  const [fFloracion, setFloracion] = useState('')
  const [fMaceta, setFMaceta] = useState('')
  const [fEstilo, setFEstilo] = useState('')

  const supabase = createClient()
  const searchTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(loadPlants, 300)
  }, [search, fTipo, fCuidado, fUbicacion, fLuz, fRiego, fCiclo, fFloracion, fMaceta, fEstilo])

  async function loadPlants() {
    setLoading(true)
    let query = supabase
      .from('plants')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .limit(60)
      .order('common_name')

    if (search) query = query.or(`common_name.ilike.%${search}%,scientific_name.ilike.%${search}%`)
    if (fCuidado) query = query.eq('care_level', fCuidado)
    if (fUbicacion === 'indoor') query = query.eq('indoor', true)
    if (fUbicacion === 'outdoor') query = query.eq('outdoor', true)
    if (fLuz) query = query.eq('light', fLuz)
    if (fRiego) query = query.eq('water', fRiego)
    if (fCiclo === 'perenne') query = query.eq('evergreen', true)
    if (fCiclo === 'anual') query = query.eq('evergreen', false)
    if (fFloracion === 'si') query = query.eq('flowering', true)
    if (fFloracion === 'no') query = query.eq('flowering', false)
    if (fMaceta === 'si') query = query.eq('pot_suitable', true)
    if (fMaceta === 'no') query = query.eq('pot_suitable', false)
    if (fTipo) query = query.contains('tags', [fTipo])
    if (fEstilo) query = query.contains('garden_styles', [fEstilo])

    const { data, count } = await query
    setPlants(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  const activeFilters = [fTipo, fCuidado, fUbicacion, fLuz, fRiego, fCiclo, fFloracion, fMaceta, fEstilo].filter(Boolean).length

  function clearAll() {
    setFTipo(''); setFCuidado(''); setFUbicacion(''); setFLuz('')
    setFRiego(''); setFCiclo(''); setFloracion(''); setFMaceta(''); setFEstilo('')
    setSearch('')
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F9FCF8 0%, #F2E9DD 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
    }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
        width: 'calc(100% - 32px)', maxWidth: '1180px',
        backgroundColor: 'rgba(249,252,248,0.86)', backdropFilter: 'blur(18px)',
        border: '1px solid rgba(231,239,230,0.95)',
        boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px 12px 22px', borderRadius: '999px'
      }}>
        <a href="/" style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '28px', fontWeight: 600, color: '#1E3D2B', textDecoration: 'none', letterSpacing: '-0.5px'
        }}>Floria</a>
        <div style={{ display: 'flex', gap: '18px', fontSize: '13px', alignItems: 'center' }}>
          <a href="/explore" style={{ color: '#1E3D2B', textDecoration: 'none', fontWeight: 600 }}>Explorar</a>
          <a href="/identify" style={{ color: '#4C7F5B', textDecoration: 'none', fontWeight: 500 }}>Identificar</a>
          <a href="/auth/login" style={{
            color: 'white', textDecoration: 'none', backgroundColor: '#1E3D2B',
            borderRadius: '999px', padding: '10px 16px', fontWeight: 600
          }}>Mi cuenta</a>
        </div>
      </nav>

      <div style={{ paddingTop: '104px', display: 'flex', minHeight: 'calc(100vh - 64px)' }}>

        {/* SIDEBAR FILTROS */}
        <aside style={{
          width: showFilters ? '280px' : '0',
          minWidth: showFilters ? '280px' : '0',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          backgroundColor: 'rgba(255,255,255,0.82)',
          borderRight: '1px solid #E7EFE6',
          boxShadow: showFilters ? '18px 0 48px rgba(30,61,43,0.06)' : 'none',
          padding: showFilters ? '28px 24px' : '0',
        }}>
          {showFilters && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', color: '#1E3D2B', margin: 0 }}>Filtros</h2>
                {activeFilters > 0 && (
                  <button onClick={clearAll} style={{ fontSize: '12px', color: '#9F3A2F', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Limpiar ({activeFilters})
                  </button>
                )}
              </div>
              <FilterGroup title="Tipo de planta" options={FILTERS.tipo} value={fTipo} onChange={setFTipo} />
              <FilterGroup title="Nivel de cuidado" options={FILTERS.cuidado} value={fCuidado} onChange={setFCuidado} />
              <FilterGroup title="Ubicación" options={FILTERS.ubicacion} value={fUbicacion} onChange={setFUbicacion} />
              <FilterGroup title="Necesidad de luz" options={FILTERS.luz} value={fLuz} onChange={setFLuz} />
              <FilterGroup title="Riego" options={FILTERS.riego} value={fRiego} onChange={setFRiego} />
              <FilterGroup title="Ciclo de vida" options={FILTERS.ciclo} value={fCiclo} onChange={setFCiclo} />
              <FilterGroup title="Floración" options={FILTERS.floracion} value={fFloracion} onChange={setFloracion} />
              <FilterGroup title="Apto maceta" options={FILTERS.maceta} value={fMaceta} onChange={setFMaceta} />
              <FilterGroup title="Estilo de jardín" options={FILTERS.estilo} value={fEstilo} onChange={setFEstilo} />
            </>
          )}
        </aside>

        {/* CONTENIDO */}
        <div style={{ flex: 1, padding: '28px', minWidth: 0 }}>

          {/* BARRA SUPERIOR */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{
              padding: '13px 20px', borderRadius: '999px', border: '1px solid #C5D9C2',
              backgroundColor: showFilters ? '#1E3D2B' : 'rgba(255,255,255,0.9)',
              color: showFilters ? 'white' : '#1E3D2B',
              fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              ⚙️ Filtros {activeFilters > 0 && `(${activeFilters})`}
            </button>
            <input
              type="text"
              placeholder="🔍  Buscar por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, padding: '13px 20px', borderRadius: '999px',
                border: '1px solid #C5D9C2', fontSize: '14px', color: '#1E3D2B',
                backgroundColor: 'rgba(255,255,255,0.9)', outline: 'none', boxShadow: '0 12px 30px rgba(30,61,43,0.05)', fontFamily: 'Montserrat, system-ui, sans-serif',
              }}
            />
            <span style={{ fontSize: '13px', color: '#4C7F5B', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {total} plantas
            </span>
          </div>

          {/* GRID */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
              <p style={{ fontSize: '40px', marginBottom: '16px' }}>🌿</p>
              <p>Cargando plantas...</p>
            </div>
          ) : plants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
              <p style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</p>
              <p>No se encontraron plantas con esos filtros.</p>
              <button onClick={clearAll} style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '999px', border: 'none', backgroundColor: '#1E3D2B', color: 'white', cursor: 'pointer' }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '22px' }}>
              {plants.map(plant => (
                <a key={plant.id} href={`/plant/${plant.slug || plant.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden',
                    border: '1px solid #E7EFE6', cursor: 'pointer',
                    boxShadow: '0 16px 40px rgba(30,61,43,0.06)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(30,61,43,0.1)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(30,61,43,0.06)'
                    }}
                  >
                    <div style={{ height: '180px', backgroundColor: '#E7EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {plant.cover_image
                        ? <img src={plant.cover_image} alt={plant.common_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: '40px' }}>🌿</span>
                      }
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#1E3D2B', margin: '0 0 3px' }}>
                        {plant.common_name}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#4C7F5B', fontStyle: 'italic', margin: '0 0 10px' }}>
                        {plant.scientific_name}
                      </p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {plant.care_level && (
                          <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
                            backgroundColor: `${CARE_COLOR[plant.care_level]}18`,
                            color: CARE_COLOR[plant.care_level], fontWeight: 600
                          }}>{CARE_LABELS[plant.care_level]}</span>
                        )}
                        {plant.flowering && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#FDF2F8', color: '#9D174D' }}>Florece</span>}
                        {plant.pot_suitable && <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#F0FDF4', color: '#166534' }}>🪴 Maceta</span>}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
