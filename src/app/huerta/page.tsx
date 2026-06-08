'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

// Datos almacenados en meses del hemisferio sur (0=Enero).
// Para hemisferio norte, desplazamos +6 al leer y -6 al guardar.
function toSur(mes: number, hemisferio: 'sur' | 'norte') {
  return hemisferio === 'norte' ? (mes + 6) % 12 : mes
}
function toDisplay(mesSur: number, hemisferio: 'sur' | 'norte') {
  return hemisferio === 'norte' ? (mesSur + 6) % 12 : mesSur
}

type Tarea = 'siembra_directa' | 'siembra_indoor' | 'trasplante' | 'cosecha'

type HuertaItem = {
  nombre: string
  emoji: string
  tipo: 'verdura' | 'hierba' | 'fruta'
  tareas: Partial<Record<Tarea, number[]>> // meses 0-11
  consejo?: string
}

const HUERTA: HuertaItem[] = [
  // VERDURAS DE HOJA
  { nombre: 'Lechuga', emoji: '🥬', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    siembra_indoor: [6,7,8],
    trasplante: [1,2,3,8,9,10],
    cosecha: [2,3,4,10,11,0],
  }, consejo: 'Evitá las heladas. Prefiere temperaturas frescas entre 15-20°C.' },
  { nombre: 'Espinaca', emoji: '🌿', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    cosecha: [2,3,4,10,11,0],
  }, consejo: 'Crece bien en semisombra. Ideal para otoño e invierno.' },
  { nombre: 'Acelga', emoji: '🥦', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    trasplante: [2,3,9,10],
    cosecha: [3,4,5,10,11,0,1],
  }, consejo: 'Muy resistente. Se puede cosechar hoja por hoja.' },
  { nombre: 'Rúcula', emoji: '🌱', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    cosecha: [2,3,4,10,11,0],
  }, consejo: 'Crece muy rápido, lista en 30 días. Odiá el calor intenso.' },
  { nombre: 'Repollo', emoji: '🥬', tipo: 'verdura', tareas: {
    siembra_indoor: [5,6,7],
    trasplante: [7,8,9],
    cosecha: [10,11,0,1],
  }, consejo: 'Necesita mucho espacio. Trasplantá cuando tenga 4-5 hojas.' },

  // VERDURAS DE FRUTO
  { nombre: 'Tomate', emoji: '🍅', tipo: 'verdura', tareas: {
    siembra_indoor: [6,7,8],
    trasplante: [8,9,10],
    cosecha: [11,0,1,2,3],
  }, consejo: 'Sembrá indoor en agosto, trasplantá en octubre. Necesita sol pleno.' },
  { nombre: 'Pimiento', emoji: '🫑', tipo: 'verdura', tareas: {
    siembra_indoor: [6,7],
    trasplante: [9,10],
    cosecha: [0,1,2,3],
  }, consejo: 'Similar al tomate. Le gusta el calor. Más tiempo para madurar.' },
  { nombre: 'Berenjena', emoji: '🍆', tipo: 'verdura', tareas: {
    siembra_indoor: [7,8],
    trasplante: [9,10],
    cosecha: [0,1,2],
  }, consejo: 'Necesita calor y sol. Cosechar antes de que la piel pierda brillo.' },
  { nombre: 'Zapallo', emoji: '🎃', tipo: 'verdura', tareas: {
    siembra_directa: [8,9,10],
    cosecha: [1,2,3,4],
  }, consejo: 'Planta rastrera, necesita mucho espacio. Regá en la base.' },
  { nombre: 'Pepino', emoji: '🥒', tipo: 'verdura', tareas: {
    siembra_directa: [9,10,11],
    cosecha: [0,1,2,3],
  }, consejo: 'Necesita mucho calor. Cosechar frecuentemente para estimular producción.' },
  { nombre: 'Zucchini', emoji: '🥒', tipo: 'verdura', tareas: {
    siembra_directa: [8,9,10],
    cosecha: [11,0,1,2,3],
  }, consejo: 'Muy productivo. Cosechar chico para sabor más suave.' },

  // RAÍCES Y BULBOS
  { nombre: 'Zanahoria', emoji: '🥕', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    cosecha: [3,4,5,10,11,0],
  }, consejo: 'Suelo suelto y profundo. No trasplantar — siembra directa siempre.' },
  { nombre: 'Remolacha', emoji: '🫐', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    cosecha: [3,4,5,10,11,0],
  }, consejo: 'Tolera el frío. Cosechar cuando la raíz tiene el tamaño de una pelota de golf.' },
  { nombre: 'Rabanito', emoji: '🔴', tipo: 'verdura', tareas: {
    siembra_directa: [0,1,2,3,8,9,10,11],
    cosecha: [1,2,3,4,9,10,11,0],
  }, consejo: 'Listo en 25 días. Ideal para principiantes.' },
  { nombre: 'Ajo', emoji: '🧄', tipo: 'verdura', tareas: {
    siembra_directa: [3,4,5],
    cosecha: [10,11,0],
  }, consejo: 'Plantar dientes en otoño. Cosechar cuando las hojas se amarillan.' },
  { nombre: 'Cebolla', emoji: '🧅', tipo: 'verdura', tareas: {
    siembra_indoor: [3,4,5,6],
    trasplante: [6,7,8],
    cosecha: [10,11,0,1],
  }, consejo: 'Plantar en lunares menguantes para mejor desarrollo del bulbo.' },
  { nombre: 'Puerro', emoji: '🌱', tipo: 'verdura', tareas: {
    siembra_indoor: [4,5,6,7],
    trasplante: [7,8,9],
    cosecha: [11,0,1,2],
  }, consejo: 'Muy resistente al frío. Blanquear cubriendo la base con tierra.' },

  // LEGUMBRES
  { nombre: 'Poroto', emoji: '🫘', tipo: 'verdura', tareas: {
    siembra_directa: [9,10,11],
    cosecha: [0,1,2,3],
  }, consejo: 'No trasplantar. Siembra directa en suelo cálido.' },
  { nombre: 'Arveja', emoji: '🫛', tipo: 'verdura', tareas: {
    siembra_directa: [2,3,4,8,9],
    cosecha: [5,6,10,11],
  }, consejo: 'Prefiere el frío. Necesita tutor para trepar.' },
  { nombre: 'Chaucha', emoji: '🫛', tipo: 'verdura', tareas: {
    siembra_directa: [9,10,11,0],
    cosecha: [0,1,2,3,4],
  }, consejo: 'Variedad enana no necesita tutor. Cosechar antes de que estén duras.' },

  // HIERBAS AROMÁTICAS
  { nombre: 'Albahaca', emoji: '🌿', tipo: 'hierba', tareas: {
    siembra_indoor: [7,8,9],
    siembra_directa: [9,10,11],
    trasplante: [9,10,11],
    cosecha: [11,0,1,2,3,4],
  }, consejo: 'Ama el calor. Sacar flores para prolongar cosecha.' },
  { nombre: 'Perejil', emoji: '🌿', tipo: 'hierba', tareas: {
    siembra_directa: [0,1,2,3,7,8,9,10,11],
    cosecha: [2,3,4,5,10,11,0,1],
  }, consejo: 'Germinación lenta (3 semanas). Remojar las semillas 24h antes.' },
  { nombre: 'Cilantro', emoji: '🌿', tipo: 'hierba', tareas: {
    siembra_directa: [0,1,2,7,8,9,10,11],
    cosecha: [2,3,4,10,11,0],
  }, consejo: 'Bolting rápido en calor. Sembrar escalonado cada 3 semanas.' },
  { nombre: 'Orégano', emoji: '🌿', tipo: 'hierba', tareas: {
    siembra_indoor: [7,8,9],
    trasplante: [10,11,0],
    cosecha: [11,0,1,2,3,4,5,6,7,8,9,10],
  }, consejo: 'Perenne. Cosechar antes de florecer para mejor aroma.' },
  { nombre: 'Tomillo', emoji: '🌿', tipo: 'hierba', tareas: {
    siembra_indoor: [7,8],
    trasplante: [10,11],
    cosecha: [0,1,2,3,4,5,6,7,8,9,10,11],
  }, consejo: 'Perenne y resistente. Prefiere suelo bien drenado.' },
  { nombre: 'Menta', emoji: '🌿', tipo: 'hierba', tareas: {
    trasplante: [8,9,10,11,0,1,2,3],
    cosecha: [0,1,2,3,4,5,6,7,8,9,10,11],
  }, consejo: 'Invasiva — mejor en maceta. Se propaga por esquejes.' },
  { nombre: 'Romero', emoji: '🌿', tipo: 'hierba', tareas: {
    trasplante: [8,9,10],
    cosecha: [0,1,2,3,4,5,6,7,8,9,10,11],
  }, consejo: 'Perenne y muy resistente. Poco riego. Propagación por esquejes.' },

  // FRUTAS
  { nombre: 'Frutilla', emoji: '🍓', tipo: 'fruta', tareas: {
    trasplante: [2,3,4,8,9],
    cosecha: [10,11,0,1,2,3],
  }, consejo: 'Plantar en otoño para cosechar en primavera-verano. Renovar plantas cada 3 años.' },
  { nombre: 'Melón', emoji: '🍈', tipo: 'fruta', tareas: {
    siembra_indoor: [8,9],
    siembra_directa: [10,11],
    cosecha: [1,2,3],
  }, consejo: 'Necesita mucho calor y sol. Cosechar cuando desprende aroma dulce.' },
  { nombre: 'Sandía', emoji: '🍉', tipo: 'fruta', tareas: {
    siembra_directa: [10,11],
    cosecha: [1,2,3],
  }, consejo: 'Planta de mucho espacio. Golpear — sonido hueco = lista.' },
]

const TAREA_CONFIG: Record<Tarea, { label: string; color: string; bg: string; icon: string }> = {
  siembra_directa: { label: 'Siembra directa', color: '#1E3D2B', bg: '#E7EFE6', icon: '🌱' },
  siembra_indoor: { label: 'Siembra indoor', color: '#4C7F5B', bg: '#F0F7EE', icon: '🏠' },
  trasplante: { label: 'Trasplante', color: '#7A5C1E', bg: '#FDF3E3', icon: '🪴' },
  cosecha: { label: 'Cosecha', color: '#8B3A2F', bg: '#FEF0EE', icon: '🧺' },
}

const TIPO_CONFIG: Record<string, { label: string; color: string }> = {
  verdura: { label: 'Verdura', color: '#1E3D2B' },
  hierba: { label: 'Hierba', color: '#4C7F5B' },
  fruta: { label: 'Fruta', color: '#8B3A2F' },
}

function getTareasDelMes(item: HuertaItem, mesDisplay: number, hemisferio: 'sur' | 'norte'): Tarea[] {
  const mesSur = toSur(mesDisplay, hemisferio)
  return (Object.entries(item.tareas) as [Tarea, number[]][])
    .filter(([, meses]) => meses.includes(mesSur))
    .map(([tarea]) => tarea)
}

export default function HuertaPage() {
  const mesActualReal = new Date().getMonth()
  const [hemisferio, setHemisferio] = useState<'sur' | 'norte'>('sur')
  const [showHemisferioModal, setShowHemisferioModal] = useState(false)
  // mesSeleccionado está siempre en espacio "display" (lo que ve el usuario)
  const [mesSeleccionado, setMesSeleccionado] = useState(mesActualReal)
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null)
  const [filtroTarea, setFiltroTarea] = useState<Tarea | null>(null)
  const [itemExpandido, setItemExpandido] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('floria-hemisferio') as 'sur' | 'norte' | null
    if (saved) {
      setHemisferio(saved)
    } else {
      setShowHemisferioModal(true)
    }
  }, [])

  function elegirHemisferio(h: 'sur' | 'norte') {
    setHemisferio(h)
    localStorage.setItem('floria-hemisferio', h)
    setShowHemisferioModal(false)
  }

  const itemsDelMes = HUERTA.filter(item => {
    const tareas = getTareasDelMes(item, mesSeleccionado, hemisferio)
    if (tareas.length === 0) return false
    if (filtroTipo && item.tipo !== filtroTipo) return false
    if (filtroTarea && !tareas.includes(filtroTarea)) return false
    return true
  })

  const prevMes = () => setMesSeleccionado(m => (m - 1 + 12) % 12)
  const nextMes = () => setMesSeleccionado(m => (m + 1) % 12)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
      paddingBottom: '100px',
    }}>
      <Nav />

      {/* Modal hemisferio */}
      {showHemisferioModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '28px', padding: '36px 32px',
            maxWidth: '380px', width: '100%', textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌍</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', color: '#1E3D2B', margin: '0 0 8px' }}>¿Dónde estás?</h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', lineHeight: 1.6, margin: '0 0 24px' }}>
              Las estaciones son opuestas según el hemisferio. Elegí tu ubicación para ver las fechas correctas.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => elegirHemisferio('sur')} style={{
                flex: 1, padding: '16px', borderRadius: '18px', border: '2px solid #1E3D2B',
                backgroundColor: '#1E3D2B', color: 'white', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700, fontFamily: 'Montserrat, system-ui, sans-serif',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🇦🇷</div>
                Hemisferio Sur
                <div style={{ fontSize: '11px', fontWeight: 400, opacity: 0.8, marginTop: '3px' }}>Argentina, Chile, Brasil...</div>
              </button>
              <button onClick={() => elegirHemisferio('norte')} style={{
                flex: 1, padding: '16px', borderRadius: '18px', border: '2px solid #DDE9DA',
                backgroundColor: 'white', color: '#1E3D2B', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700, fontFamily: 'Montserrat, system-ui, sans-serif',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🌍</div>
                Hemisferio Norte
                <div style={{ fontSize: '11px', fontWeight: 400, color: '#4C7F5B', marginTop: '3px' }}>Europa, EEUU, México...</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ paddingTop: '88px', padding: '88px 20px 0' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <span style={{ fontSize: '32px' }}>🥕</span>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C7F5B', fontWeight: 600, margin: 0 }}>Sección</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '40px', fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Mi Huerta</h1>
            </div>
          </div>
          <p style={{ color: '#4C7F5B', fontSize: '14px', lineHeight: 1.7, marginTop: '12px' }}>
            Qué sembrar, trasplantar y cosechar cada mes del año.
          </p>
          <button onClick={() => setShowHemisferioModal(true)} style={{
            marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '999px', border: '1px solid #DDE9DA',
            backgroundColor: 'rgba(255,255,255,0.8)', cursor: 'pointer',
            fontSize: '12px', fontWeight: 600, color: '#4C7F5B',
            fontFamily: 'Montserrat, system-ui, sans-serif',
          }}>
            {hemisferio === 'sur' ? '🌎 Hemisferio Sur' : '🌍 Hemisferio Norte'}
            <span style={{ opacity: 0.6 }}>· cambiar</span>
          </button>
        </div>
      </div>

      {/* Selector de mes */}
      <div style={{ padding: '24px 20px 0', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1px solid rgba(231,239,230,0.9)',
          padding: '20px 24px',
          boxShadow: '0 8px 30px rgba(30,61,43,0.07)',
        }}>
          {/* Nav de mes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button onClick={prevMes} style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #DDE9DA',
              backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', color: '#1E3D2B',
            }}>‹</button>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '28px', fontWeight: 600, color: '#1E3D2B', lineHeight: 1,
              }}>{MESES[mesSeleccionado]}</div>
              {mesSeleccionado === mesActualReal && (
                <span style={{
                  fontSize: '10px', backgroundColor: '#1E3D2B', color: 'white',
                  padding: '2px 10px', borderRadius: '999px', fontWeight: 600,
                  letterSpacing: '1px', display: 'inline-block', marginTop: '4px',
                }}>AHORA</span>
              )}
            </div>

            <button onClick={nextMes} style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #DDE9DA',
              backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', color: '#1E3D2B',
            }}>›</button>
          </div>

          {/* Mini calendario anual */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {MESES.map((mes, i) => (
              <button key={i} onClick={() => setMesSeleccionado(i)} style={{
                padding: '5px 8px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: i === mesSeleccionado ? 700 : 500,
                fontFamily: 'Montserrat, system-ui, sans-serif',
                backgroundColor: i === mesSeleccionado ? '#1E3D2B' : i === mesActualReal ? '#E7EFE6' : 'transparent',
                color: i === mesSeleccionado ? 'white' : i === mesActualReal ? '#1E3D2B' : '#4C7F5B',
                minWidth: '36px',
                letterSpacing: '0.3px',
              }}>{mes.slice(0, 3)}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ padding: '16px 20px 0', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Filtro por tarea */}
          {(Object.entries(TAREA_CONFIG) as [Tarea, typeof TAREA_CONFIG[Tarea]][]).map(([key, cfg]) => (
            <button key={key} onClick={() => setFiltroTarea(filtroTarea === key ? null : key)} style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: `1px solid ${filtroTarea === key ? cfg.color : '#DDE9DA'}`,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              backgroundColor: filtroTarea === key ? cfg.bg : 'rgba(255,255,255,0.7)',
              color: filtroTarea === key ? cfg.color : '#4C7F5B',
            }}>{cfg.icon} {cfg.label}</button>
          ))}
          {/* Filtro por tipo */}
          {Object.entries(TIPO_CONFIG).map(([key, cfg]) => (
            <button key={key} onClick={() => setFiltroTipo(filtroTipo === key ? null : key)} style={{
              padding: '7px 14px',
              borderRadius: '999px',
              border: `1px solid ${filtroTipo === key ? cfg.color : '#DDE9DA'}`,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              backgroundColor: filtroTipo === key ? '#E7EFE6' : 'rgba(255,255,255,0.7)',
              color: filtroTipo === key ? cfg.color : '#4C7F5B',
            }}>{cfg.label}</button>
          ))}
        </div>
      </div>

      {/* Resumen del mes */}
      <div style={{ padding: '16px 20px 0', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {(Object.entries(TAREA_CONFIG) as [Tarea, typeof TAREA_CONFIG[Tarea]][]).map(([key, cfg]) => {
            const count = HUERTA.filter(item => getTareasDelMes(item, mesSeleccionado, hemisferio).includes(key)).length
            if (count === 0) return null
            return (
              <div key={key} style={{
                flex: '1 1 120px',
                backgroundColor: cfg.bg,
                borderRadius: '18px',
                padding: '14px 16px',
                border: `1px solid ${cfg.color}22`,
              }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{cfg.icon}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: cfg.color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: '11px', color: cfg.color, fontWeight: 600, marginTop: '2px' }}>{cfg.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lista de plantas */}
      <div style={{ padding: '16px 20px 0', maxWidth: '680px', margin: '0 auto' }}>
        {itemsDelMes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 24px',
            backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '24px',
            border: '1px solid rgba(231,239,230,0.9)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌾</div>
            <p style={{ color: '#4C7F5B', fontSize: '15px', margin: 0 }}>No hay actividad para este filtro en {MESES[mesSeleccionado]}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {itemsDelMes.map(item => {
              const tareas = getTareasDelMes(item, mesSeleccionado, hemisferio)
              const expandido = itemExpandido === item.nombre
              return (
                <div
                  key={item.nombre}
                  onClick={() => setItemExpandido(expandido ? null : item.nombre)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(231,239,230,0.9)',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    boxShadow: expandido ? '0 8px 24px rgba(30,61,43,0.1)' : '0 2px 8px rgba(30,61,43,0.04)',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px', color: '#1E3D2B' }}>{item.nombre}</div>
                        <div style={{ fontSize: '11px', color: '#4C7F5B', fontWeight: 500, marginTop: '2px' }}>
                          {TIPO_CONFIG[item.tipo].label}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {tareas.map(t => (
                        <span key={t} style={{
                          fontSize: '16px',
                          backgroundColor: TAREA_CONFIG[t].bg,
                          borderRadius: '8px',
                          padding: '4px 6px',
                        }} title={TAREA_CONFIG[t].label}>{TAREA_CONFIG[t].icon}</span>
                      ))}
                      <span style={{ color: '#4C7F5B', fontSize: '14px', marginLeft: '4px' }}>{expandido ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {expandido && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(231,239,230,0.9)' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {tareas.map(t => (
                          <span key={t} style={{
                            backgroundColor: TAREA_CONFIG[t].bg,
                            color: TAREA_CONFIG[t].color,
                            fontSize: '12px',
                            fontWeight: 600,
                            padding: '5px 12px',
                            borderRadius: '999px',
                            border: `1px solid ${TAREA_CONFIG[t].color}33`,
                          }}>{TAREA_CONFIG[t].icon} {TAREA_CONFIG[t].label}</span>
                        ))}
                      </div>

                      {/* Calendario anual de esta planta */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#1E3D2B', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Calendario anual</div>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {MESES.map((_, i) => {
                            const tareasEseMes = getTareasDelMes(item, i, hemisferio)
                            const esMesActual = i === mesSeleccionado
                            const color = tareasEseMes.includes('cosecha') ? '#FEF0EE'
                              : tareasEseMes.includes('siembra_directa') ? '#E7EFE6'
                              : tareasEseMes.includes('trasplante') ? '#FDF3E3'
                              : tareasEseMes.includes('siembra_indoor') ? '#F0F7EE'
                              : '#F5F5F5'
                            return (
                              <div key={i} style={{
                                flex: 1,
                                height: '32px',
                                backgroundColor: color,
                                borderRadius: '6px',
                                border: esMesActual ? '2px solid #1E3D2B' : '1px solid transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '8px',
                                fontWeight: esMesActual ? 700 : 500,
                                color: tareasEseMes.length > 0 ? '#1E3D2B' : '#B0C0B0',
                              }}>
                                {MESES[i].slice(0,1)}
                              </div>
                            )
                          })}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                          {[
                            { color: '#E7EFE6', label: 'Siembra directa' },
                            { color: '#F0F7EE', label: 'Indoor' },
                            { color: '#FDF3E3', label: 'Trasplante' },
                            { color: '#FEF0EE', label: 'Cosecha' },
                          ].map(l => (
                            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <div style={{ width: '10px', height: '10px', backgroundColor: l.color, borderRadius: '3px', border: '1px solid #DDD' }} />
                              <span style={{ fontSize: '10px', color: '#4C7F5B' }}>{l.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {item.consejo && (
                        <div style={{
                          backgroundColor: '#F9FCF8',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          border: '1px solid #E7EFE6',
                        }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E3D2B', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Consejo</div>
                          <div style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.6 }}>{item.consejo}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
