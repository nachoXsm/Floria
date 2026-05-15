'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
  garden_styles: string[]
  cover_image: string | null
  slug: string
  tags: string[]
}

const CARE_COLOR: Record<string, string> = {
  easy: '#16a34a',
  moderate: '#d97706',
  expert: '#dc2626',
}

const CARE_LABELS: Record<string, string> = {
  easy: 'Facil',
  moderate: 'Moderado',
  expert: 'Experto',
}

export default function ExplorePage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(loadPlants, 300)

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [search])

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

    const { data, count } = await query

    setPlants((data || []) as Plant[])
    setTotal(count || 0)
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
      <nav style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1120px',
        zIndex: 50,
        backgroundColor: 'rgba(249,252,248,0.92)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(231,239,230,0.9)',
        boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px 0 20px',
        borderRadius: '999px',
        height: '60px',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
          <img src="/logo-floria.png" alt="Floria" style={{ width: '200px', height: 'auto', display: 'block' }} />
        </a>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="/explore" style={{ color: '#1E3D2B', textDecoration: 'none', fontSize: '13px', fontWeight: 700, padding: '8px 12px' }}>Explorar</a>
          <a href="/identify" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '8px 12px' }}>Identificar</a>
          <a href="/auth/login" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '13px', fontWeight: 500, padding: '8px 12px' }}>Mi cuenta</a>
        </div>
      </nav>

      <div style={{ padding: '104px 24px 32px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #C5D9C2',
              fontSize: '14px',
              color: '#1E3D2B',
              backgroundColor: 'white',
              outline: 'none',
            }}
          />

          <span style={{ fontSize: '13px', color: '#4C7F5B', whiteSpace: 'nowrap' }}>
            {total} plantas
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
            <p>Cargando plantas...</p>
          </div>
        ) : plants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#4C7F5B' }}>
            <p>No se encontraron plantas.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {plants.map((plant) => (
              <a key={plant.id} href={`/plant/${plant.slug || plant.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #E7EFE6',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    height: '140px',
                    backgroundColor: '#E7EFE6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
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

                  <div style={{ padding: '12px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '15px', color: '#1E3D2B', margin: '0 0 3px' }}>
                      {plant.common_name}
                    </h3>

                    <p style={{ fontSize: '11px', color: '#4C7F5B', fontStyle: 'italic', margin: '0 0 10px' }}>
                      {plant.scientific_name}
                    </p>

                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {plant.care_level && (
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: `${CARE_COLOR[plant.care_level]}18`,
                          color: CARE_COLOR[plant.care_level],
                          fontWeight: 600,
                        }}>
                          {CARE_LABELS[plant.care_level]}
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
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
