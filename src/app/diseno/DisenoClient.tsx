'use client'
import { useState, useMemo } from 'react'
import type { PlantOption } from './page'

const SPACES = [
  { id: 'jardin', label: 'Jardín', icon: '🌳' },
  { id: 'cantero', label: 'Cantero / Borde', icon: '🌷' },
  { id: 'balcon', label: 'Balcón', icon: '🪴' },
  { id: 'interior', label: 'Interior', icon: '🏠' },
]

export default function DisenoClient({ plants }: { plants: PlantOption[] }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<PlantOption[]>([])
  const [space, setSpace] = useState('jardin')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return plants
      .filter(p =>
        p.common_name?.toLowerCase().includes(q) ||
        p.scientific_name?.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, plants])

  const toggle = (p: PlantOption) => {
    setSelected(prev => {
      if (prev.find(x => x.id === p.id)) return prev.filter(x => x.id !== p.id)
      if (prev.length >= 6) return prev
      return [...prev, p]
    })
    setQuery('')
  }

  const generate = async () => {
    if (!selected.length) return
    setLoading(true)
    setError(null)
    setImage(null)
    try {
      const res = await fetch('/api/diseno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space,
          plants: selected.map(p => ({
            common_name: p.common_name,
            scientific_name: p.scientific_name,
            plant_type: p.plant_type,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError((data.error || 'No se pudo generar el render') + (data.detail ? ` · ${data.detail}` : ''))
        return
      }
      setImage(data.image_url)
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 20px 20px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '40px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.05 }}>
        Diseñá tu cantero
      </h1>
      <p style={{ fontSize: '14px', color: '#4C7F5B', margin: '0 0 28px', lineHeight: 1.6 }}>
        Elegí hasta 6 plantas y la IA genera un render de cómo se verían combinadas.
      </p>

      {/* PASO 1 — Espacio */}
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C4773B', margin: '0 0 10px' }}>1 · ¿Dónde?</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {SPACES.map(s => (
          <button key={s.id} onClick={() => setSpace(s.id)} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '10px 16px', borderRadius: '999px', cursor: 'pointer',
            border: space === s.id ? '1.5px solid #1E3D2B' : '1.5px solid rgba(30,61,43,0.15)',
            backgroundColor: space === s.id ? '#1E3D2B' : 'rgba(255,255,255,0.6)',
            color: space === s.id ? '#F2E9DD' : '#1E3D2B',
            fontSize: '13px', fontWeight: 600,
          }}>
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>

      {/* PASO 2 — Plantas */}
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#C4773B', margin: '0 0 10px' }}>2 · ¿Qué plantas? ({selected.length}/6)</p>

      {/* Seleccionadas */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {selected.map(p => (
            <span key={p.id} onClick={() => toggle(p)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: '#E7EFE6', color: '#1E3D2B',
              borderRadius: '999px', padding: '7px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>
              {p.common_name}
              <span style={{ fontSize: '15px', lineHeight: 1, color: '#4C7F5B' }}>×</span>
            </span>
          ))}
        </div>
      )}

      {/* Buscador */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar planta por nombre…"
        disabled={selected.length >= 6}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 18px', borderRadius: '16px',
          border: '1px solid rgba(30,61,43,0.12)',
          backgroundColor: 'rgba(255,255,255,0.75)',
          fontSize: '14px', color: '#1E3D2B', outline: 'none',
          marginBottom: results.length ? '8px' : '0',
        }}
      />

      {/* Resultados */}
      {results.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(30,61,43,0.1)', marginBottom: '8px' }}>
          {results.map(p => {
            const isSel = !!selected.find(x => x.id === p.id)
            return (
              <button key={p.id} onClick={() => toggle(p)} style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                border: 'none', borderBottom: '1px solid #F2E9DD',
                backgroundColor: isSel ? '#E7EFE6' : 'white',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#E7EFE6', flexShrink: 0 }}>
                  {p.cover_image && <img src={p.cover_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1E3D2B' }}>{p.common_name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#4C7F5B', fontStyle: 'italic' }}>{p.scientific_name}</p>
                </div>
                <span style={{ fontSize: '18px', color: isSel ? '#4C7F5B' : '#A7C4A1' }}>{isSel ? '✓' : '+'}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* GENERAR */}
      <button onClick={generate} disabled={loading || !selected.length} style={{
        width: '100%', marginTop: '24px', padding: '16px',
        borderRadius: '999px', border: 'none', cursor: selected.length ? 'pointer' : 'not-allowed',
        backgroundColor: selected.length ? '#1E3D2B' : 'rgba(30,61,43,0.3)',
        color: '#F2E9DD', fontSize: '15px', fontWeight: 700,
        boxShadow: selected.length ? '0 12px 30px rgba(30,61,43,0.25)' : 'none',
      }}>
        {loading ? 'Generando render…' : 'Generar render ✨'}
      </button>

      {loading && (
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#4C7F5B', marginTop: '14px' }}>
          Esto puede tardar unos segundos…
        </p>
      )}

      {error && (
        <div style={{ marginTop: '18px', padding: '16px', backgroundColor: '#FEF0EE', border: '1px solid #FAD9D4', borderRadius: '16px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#8B3A2F' }}>{error}</p>
        </div>
      )}

      {/* RESULTADO */}
      {image && (
        <div style={{ marginTop: '24px' }}>
          <img src={image} alt="Render del cantero" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 50px rgba(30,61,43,0.2)' }} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button onClick={generate} disabled={loading} style={{
              flex: 1, padding: '13px', borderRadius: '999px', cursor: 'pointer',
              border: '1.5px solid rgba(30,61,43,0.2)', backgroundColor: 'rgba(255,255,255,0.7)',
              color: '#1E3D2B', fontSize: '13px', fontWeight: 700,
            }}>Generar otra versión</button>
            <a href={image} download target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: '13px', borderRadius: '999px', textAlign: 'center', textDecoration: 'none',
              backgroundColor: '#1E3D2B', color: '#F2E9DD', fontSize: '13px', fontWeight: 700,
            }}>Descargar</a>
          </div>
        </div>
      )}
    </div>
  )
}
