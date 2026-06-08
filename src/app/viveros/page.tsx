'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

const PROVINCIAS = [
  'Buenos Aires', 'CABA', 'Córdoba', 'Santa Fe', 'Mendoza',
  'Tucumán', 'Entre Ríos', 'Salta', 'Misiones', 'Chaco',
  'Corrientes', 'Santiago del Estero', 'San Juan', 'Jujuy',
  'Río Negro', 'Neuquén', 'Formosa', 'Chubut', 'San Luis',
  'Catamarca', 'La Rioja', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego',
]

// Viveros curados con datos reales conocidos
type Vivero = {
  nombre: string
  provincia: string
  localidad: string
  especialidad: string[]
  descripcion: string
  maps?: string
  instagram?: string
  web?: string
}

const VIVEROS_DESTACADOS: Vivero[] = [
  {
    nombre: 'Vivero Agronomía',
    provincia: 'CABA',
    localidad: 'Agronomía',
    especialidad: ['Ornamentales', 'Frutales', 'Hierbas'],
    descripcion: 'Uno de los viveros más completos de CABA, en el barrio de Agronomía. Gran variedad de plantas de interior y exterior.',
    maps: 'https://www.google.com/maps/search/viveros+caba+agronomia',
  },
  {
    nombre: 'Los Aromos Vivero',
    provincia: 'Buenos Aires',
    localidad: 'Pilar',
    especialidad: ['Árboles', 'Arbustos', 'Paisajismo'],
    descripcion: 'Especializado en árboles y arbustos para parques y jardines. Asesoramiento en paisajismo.',
    maps: 'https://www.google.com/maps/search/viveros+pilar+buenos+aires',
  },
  {
    nombre: 'Vivero El Pinar',
    provincia: 'Córdoba',
    localidad: 'Córdoba Capital',
    especialidad: ['Nativas', 'Ornamentales', 'Frutales'],
    descripcion: 'Fuerte en plantas nativas del centro del país. Propicia la biodiversidad local.',
    maps: 'https://www.google.com/maps/search/viveros+cordoba+capital',
  },
  {
    nombre: 'Vivero San Cayetano',
    provincia: 'Santa Fe',
    localidad: 'Rosario',
    especialidad: ['Interior', 'Suculentas', 'Cactus'],
    descripcion: 'Referente en plantas de interior y suculentas en Rosario. Muy buen asesoramiento.',
    maps: 'https://www.google.com/maps/search/viveros+rosario+santa+fe',
  },
  {
    nombre: 'Vivero La Consulta',
    provincia: 'Mendoza',
    localidad: 'San Carlos',
    especialidad: ['Frutales', 'Vid', 'Olivos'],
    descripcion: 'Especializado en frutales y plantas para zonas áridas. Ideal para clima cuyo.',
    maps: 'https://www.google.com/maps/search/viveros+mendoza',
  },
]

const ESPECIALIDADES = ['Ornamentales', 'Frutales', 'Nativas', 'Suculentas', 'Interior', 'Árboles', 'Hierbas', 'Cactus']

export default function ViverosPage() {
  const [provincia, setProvincia] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [filtroEsp, setFiltroEsp] = useState<string | null>(null)
  const [buscado, setBuscado] = useState(false)

  const mapsQuery = encodeURIComponent(
    `viveros de plantas${localidad ? ' ' + localidad : ''}${provincia ? ' ' + provincia : ''} Argentina`
  )
  const mapsUrl = `https://www.google.com/maps/search/${mapsQuery}`

  const viverosFiltrados = VIVEROS_DESTACADOS.filter(v => {
    const matchProv = !provincia || v.provincia.toLowerCase().includes(provincia.toLowerCase())
    const matchLoc = !localidad || v.localidad.toLowerCase().includes(localidad.toLowerCase())
    const matchEsp = !filtroEsp || v.especialidad.includes(filtroEsp)
    return matchProv && matchLoc && matchEsp
  })

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
      paddingBottom: '100px',
    }}>
      <Nav />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '88px 20px 0' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{ fontSize: '32px' }}>🪴</span>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C7F5B', fontWeight: 600, margin: 0 }}>Argentina</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '38px', fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Encontrá un Vivero</h1>
            </div>
          </div>
          <p style={{ color: '#4C7F5B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
            Buscá viveros cerca tuyo por provincia o localidad.
          </p>
        </div>

        {/* Buscador */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)',
          borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)',
          padding: '24px', boxShadow: '0 8px 30px rgba(30,61,43,0.07)',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E3D2B', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Provincia</label>
              <select
                value={provincia}
                onChange={e => setProvincia(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '14px',
                  border: '1px solid #DDE9DA', fontSize: '13px', color: '#1E3D2B',
                  outline: 'none', backgroundColor: '#F9FCF8',
                  fontFamily: 'Montserrat, system-ui, sans-serif', cursor: 'pointer',
                }}
              >
                <option value="">Todas</option>
                {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E3D2B', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Localidad</label>
              <input
                value={localidad}
                onChange={e => setLocalidad(e.target.value)}
                placeholder="Ej: Palermo, Tigre..."
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '14px',
                  border: '1px solid #DDE9DA', fontSize: '13px', color: '#1E3D2B',
                  outline: 'none', boxSizing: 'border-box', backgroundColor: '#F9FCF8',
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                }}
              />
            </div>
          </div>

          {/* Especialidad */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E3D2B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Especialidad</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {ESPECIALIDADES.map(e => (
                <button key={e} onClick={() => setFiltroEsp(filtroEsp === e ? null : e)} style={{
                  padding: '6px 14px', borderRadius: '999px',
                  border: `1px solid ${filtroEsp === e ? '#1E3D2B' : '#DDE9DA'}`,
                  backgroundColor: filtroEsp === e ? '#E7EFE6' : 'white',
                  color: filtroEsp === e ? '#1E3D2B' : '#4C7F5B',
                  cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                }}>{e}</button>
              ))}
            </div>
          </div>

          {/* Botón abrir Maps */}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => setBuscado(true)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            width: '100%', padding: '15px', borderRadius: '999px', border: 'none',
            backgroundColor: '#1E3D2B', color: 'white', fontSize: '15px', fontWeight: 700,
            fontFamily: 'Montserrat, system-ui, sans-serif', textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(30,61,43,0.2)',
            boxSizing: 'border-box',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Buscar viveros en Google Maps
          </a>
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#4C7F5B', margin: '10px 0 0' }}>
            Abre Google Maps con viveros cercanos a tu zona
          </p>
        </div>

        {/* Viveros destacados */}
        {viverosFiltrados.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, margin: '0 0 14px' }}>
              ⭐ Viveros destacados
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {viverosFiltrados.map(v => (
                <div key={v.nombre} style={{
                  backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: '22px',
                  border: '1px solid rgba(231,239,230,0.9)', padding: '20px',
                  boxShadow: '0 2px 8px rgba(30,61,43,0.05)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '16px', color: '#1E3D2B' }}>{v.nombre}</div>
                      <div style={{ fontSize: '13px', color: '#4C7F5B', marginTop: '2px' }}>
                        📍 {v.localidad}, {v.provincia}
                      </div>
                    </div>
                    {v.maps && (
                      <a href={v.maps} target="_blank" rel="noopener noreferrer" style={{
                        padding: '8px 14px', borderRadius: '999px', border: '1px solid #DDE9DA',
                        backgroundColor: 'white', color: '#4C7F5B', fontSize: '12px', fontWeight: 600,
                        textDecoration: 'none', flexShrink: 0, marginLeft: '12px',
                      }}>Ver mapa</a>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.6, margin: '0 0 10px' }}>{v.descripcion}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {v.especialidad.map(e => (
                      <span key={e} style={{
                        fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                        backgroundColor: '#E7EFE6', color: '#1E3D2B', fontWeight: 600,
                      }}>{e}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip para agregar vivero */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '20px',
          border: '1px solid rgba(231,239,230,0.9)', padding: '20px 22px',
          display: 'flex', alignItems: 'flex-start', gap: '14px',
        }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#1E3D2B', marginBottom: '4px' }}>¿Conocés un vivero?</div>
            <p style={{ fontSize: '13px', color: '#4C7F5B', lineHeight: 1.6, margin: 0 }}>
              Si querés sugerir un vivero para agregarlo a nuestra guía, usá el formulario de contacto en tu perfil.
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
