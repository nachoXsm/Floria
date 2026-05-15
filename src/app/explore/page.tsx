'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
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

const CARE_COLOR: Record<string, string> = { easy: '#16a34a', moderate: '#d97706', expert: '#dc2626' }
const CARE_LABELS: Record<string, string> = { easy: 'Fácil', moderate: 'Moderado', expert: 'Experto' }

const FILTERS = {
  tipo: [
    { label: 'Todos', value: '' },
    { label: 'Árbol', value: 'árbol' },
    { label: 'Arbusto', value: 'arbusto' },
    { label: 'Herbácea', value: 'herbácea' },
    { label: 'Suculenta', value: 'suculenta' },
    { label: 'Gramínea', value: 'gramínea' },
    { label: 'Trepadora', value: 'trepadora' },
    { label: 'Tapizante', value: 'tapizante' },
    { label: 'Palmera', value: 'palmera' },
    { label: 'Acuática', value: 'acuática' },
  ],
  cuidado: [
    { label: 'Todos', value: '' },
    { label: 'Fácil', value: 'easy' },
    { label: 'Moderado', value: 'moderate' },
    { label: 'Experto', value: 'expert' },
  ],
  ubicacion: [
    { label: 'Todos', value: '' },
    { label: 'Interior', value: 'indoor' },
    { label: 'Exterior', value: 'outdoor' },
  ],
  luz: [
    { label: 'Todas', value: '' },
    { label: 'Pleno sol', value: 'full_sun' },
    { label: 'Semisombra', value: 'partial_shade' },
    { label: 'Sombra', value: 'shade' },
    { label: 'Luz indirecta', value: 'indirect' },
  ],
  riego: [
    { label: 'Todos', value: '' },
    { label: 'Diario', value: 'daily' },
    { label: '2x semana', value: 'twice_week' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Quincenal', value: 'biweekly' },
    { label: 'Mensual', value: 'monthly' },
  ],
  ciclo: [
    { label: 'Todos', value: '' },
    { label: 'Perenne', value: 'perenne' },
    { label: 'Anual', value: 'anual' },
  ],
  floracion: [
    { label: 'Todas', value: '' },
    { label: 'Con floración', value: 'si' },
    { label: 'Sin floración', value: 'no' },
  ],
  maceta: [
    { label: 'Todas', value: '' },
    { label: 'Apto maceta', value: 'si' },
    { label: 'Solo suelo', value: 'no' },
  ],
  estilo: [
    { label: 'Todos', value: '' },
    { label: 'Mediterráneo', value: 'mediterranean' },
    { label: 'Tropical', value: 'tropical' },
    { label: 'Minimalista', value: 'minimal' },
    { label: 'Natural', value: 'natural' },
    { label: 'Formal', value: 'formal' },
    { label: 'Cottage', value: 'cottage' },
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
      <p style={{ fontSize: '12px', fontWeight: 700, color: '#1E3D2B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value === value ? '' : opt.value)} style={{
            padding: '6px 14px', borderRadius: '999px', border: '1px solid',
            borderColor: value === opt.value ? '#1E3D2B' : '#C5D9C2',
            backgroundColor: value === opt.value ? '#1E3D2B' : 'white',
            color: value === opt.value ? 'white' : '#4C7F5B',
            fontSize: '12px', cursor: 'pointer', fontWeight: value === opt.value ? 600 : 400,
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
    if (f
