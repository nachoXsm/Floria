'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

// ─── CÁLCULO DE FASE LUNAR ────────────────────────────────────────────────────
// Luna nueva de referencia: 6 Enero 2000 00:00 UTC → JD 2451549.5
const SYNODIC = 29.53058867
const REF_JD = 2451549.5

function dateToJD(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

function getMoonAge(date: Date): number {
  const jd = dateToJD(date)
  return ((jd - REF_JD) % SYNODIC + SYNODIC) % SYNODIC
}

type Fase = {
  nombre: string
  nombreCorto: string
  emoji: string
  descripcion: string
  plantas: { categoria: string; ejemplos: string; accion: string }[]
  evitar: string[]
  color: string
  bgColor: string
  rango: [number, number]
}

const FASES: Fase[] = [
  {
    nombre: 'Luna Nueva',
    nombreCorto: 'Nueva',
    emoji: '🌑',
    descripcion: 'La tierra "respira" hacia adentro. La savia circula lentamente. Es el momento de planificar, preparar el suelo y abonar. Las semillas sembradas ahora absorben agua con lentitud pero germinan de forma pareja.',
    plantas: [
      { categoria: 'Legumbres', ejemplos: 'Poroto, arveja, chaucha, lenteja', accion: 'Sembrar directo' },
      { categoria: 'Raíces', ejemplos: 'Zanahoria, remolacha, nabo', accion: 'Sembrar directo' },
      { categoria: 'Suelo', ejemplos: 'Compost, humus, abono verde', accion: 'Incorporar al suelo' },
    ],
    evitar: ['Trasplantar', 'Cosechar frutas', 'Podar en exceso'],
    color: '#1E3D2B',
    bgColor: '#E7EFE6',
    rango: [0, 3.7],
  },
  {
    nombre: 'Luna Creciente',
    nombreCorto: 'Creciente',
    emoji: '🌒',
    descripcion: 'La savia sube hacia las partes aéreas con fuerza creciente. Excelente momento para todo lo que crece sobre la tierra: hojas, tallos y flores. Las semillas absorben agua con facilidad y germinan rápido.',
    plantas: [
      { categoria: 'Plantas de hoja', ejemplos: 'Lechuga, espinaca, acelga, rúcula, repollo', accion: 'Sembrar y trasplantar' },
      { categoria: 'Hierbas aromáticas', ejemplos: 'Albahaca, perejil, cilantro, menta, tomillo', accion: 'Sembrar y dividir matas' },
      { categoria: 'Flores ornamentales', ejemplos: 'Caléndula, lavanda, geranio, rosa', accion: 'Sembrar y trasplantar' },
      { categoria: 'Césped', ejemplos: 'Ray grass, kikuyo, bermuda', accion: 'Sembrar para más follaje' },
    ],
    evitar: ['Podar árboles', 'Sembrar raíces'],
    color: '#2D6A4F',
    bgColor: '#D8F3DC',
    rango: [3.7, 11],
  },
  {
    nombre: 'Cuarto Creciente',
    nombreCorto: 'Cuarto ☽',
    emoji: '🌓',
    descripcion: 'Alta energía lunar. La humedad del suelo alcanza su punto máximo. Ideal para plantas de fruto: la savia nutre especialmente las flores y frutos. Momento óptimo para la mayoría de los trasplantes.',
    plantas: [
      { categoria: 'Frutas y frutos', ejemplos: 'Tomate, pimiento, pepino, zapallo, frutilla', accion: 'Sembrar indoor y trasplantar' },
      { categoria: 'Árboles frutales', ejemplos: 'Limonero, naranjo, duraznero, manzano', accion: 'Plantar y trasplantar' },
      { categoria: 'Plantas trepadoras', ejemplos: 'Pasionaria, madreselva, enredadera', accion: 'Plantar' },
      { categoria: 'Herbáceas ornamentales', ejemplos: 'Agapanto, hosta, helecho', accion: 'Dividir y trasplantar' },
    ],
    evitar: ['Trabajar el suelo en exceso', 'Sembrar raíces'],
    color: '#7A5C1E',
    bgColor: '#FDF3E3',
    rango: [11, 14.75],
  },
  {
    nombre: 'Luna Llena',
    nombreCorto: 'Llena',
    emoji: '🌕',
    descripcion: 'Máxima luminosidad y energía. La savia está en su punto más alto — en hojas, flores y frutos. Mejor momento del mes para cosechar. Las plantas tienen mayor aroma, sabor y principios activos. También es ideal para trasplantar porque el suelo retiene mejor la humedad.',
    plantas: [
      { categoria: 'Cosecha de frutas', ejemplos: 'Todo tipo de frutas al máximo de sabor', accion: 'Cosechar' },
      { categoria: 'Cosecha de hierbas', ejemplos: 'Para secar, conservar o hacer tinturas', accion: 'Cosechar en el pico de aceites esenciales' },
      { categoria: 'Semillas', ejemplos: 'Recolección de semillas propias', accion: 'Recolectar y guardar' },
      { categoria: 'Trasplante general', ejemplos: 'Cualquier especie', accion: 'Trasplantar con menor estrés' },
    ],
    evitar: ['Sembrar (exceso de humedad puede pudrir semillas)', 'Podar'],
    color: '#8B6914',
    bgColor: '#FEF9E7',
    rango: [14.75, 18.5],
  },
  {
    nombre: 'Luna Menguante',
    nombreCorto: 'Menguante',
    emoji: '🌖',
    descripcion: 'La savia desciende hacia las raíces. Momento ideal para todo lo que crece bajo tierra: tubérculos, bulbos y raíces. La energía va hacia abajo, fortaleciendo el sistema radicular.',
    plantas: [
      { categoria: 'Raíces y tubérculos', ejemplos: 'Zanahoria, remolacha, papa, batata, nabo', accion: 'Sembrar y cosechar' },
      { categoria: 'Bulbos', ejemplos: 'Ajo, cebolla, puerro, tulipán, narciso', accion: 'Plantar bulbos' },
      { categoria: 'Árboles y arbustos', ejemplos: 'Toda especie de porte leñoso', accion: 'Plantar para mejor arraigo' },
      { categoria: 'Plantas perennes', ejemplos: 'Romero, lavanda, salvia, agapanto', accion: 'Dividir y replantar' },
    ],
    evitar: ['Sembrar plantas de hoja', 'Trasplantar plantas de fruto'],
    color: '#5C3A7A',
    bgColor: '#F3E8FF',
    rango: [18.5, 22.25],
  },
  {
    nombre: 'Cuarto Menguante',
    nombreCorto: 'Cuarto ☾',
    emoji: '🌘',
    descripcion: 'Energía en descenso. El suelo está receptivo para el trabajo de mantenimiento. Es el momento de cuidar, limpiar y preparar el jardín para el próximo ciclo. Las podas en esta fase reducen el rebrote.',
    plantas: [
      { categoria: 'Poda', ejemplos: 'Árboles, arbustos, rosales, frutales', accion: 'Podar para reducir rebrote' },
      { categoria: 'Deshierbe', ejemplos: 'Todo el jardín y huerta', accion: 'Arrancar malezas (no rebrotan fácil)' },
      { categoria: 'Abono y compost', ejemplos: 'Compost maduro, humus de lombriz', accion: 'Incorporar al suelo' },
      { categoria: 'Abono verde', ejemplos: 'Mostaza, trébol, centeno', accion: 'Sembrar como cobertura' },
    ],
    evitar: ['Sembrar', 'Trasplantar', 'Cosechar'],
    color: '#3A5C7A',
    bgColor: '#E8F4FD',
    rango: [22.25, 29.53],
  },
]

function getFase(age: number): Fase {
  return FASES.find(f => age >= f.rango[0] && age < f.rango[1]) ?? FASES[5]
}

function MoonDisc({ age, size = 80 }: { age: number; size?: number }) {
  const r = size / 2 - 4
  const cx = size / 2
  const cy = size / 2
  const creciendo = age < 14.75

  let fill: React.ReactNode
  if (age < 1.5 || age > 28) {
    fill = <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
  } else if (age >= 14 && age <= 16) {
    fill = <circle cx={cx} cy={cy} r={r} fill="#F9E97E" />
  } else {
    // Fase intermedia: elipse interior para simular cuarto
    const pct = age < 14.75 ? age / 14.75 : (age - 14.75) / 14.75
    const rx2 = Math.max(1, r * Math.abs(Math.cos(pct * Math.PI)))
    const sweepInner = creciendo ? 0 : 1
    fill = (
      <path
        d={`M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${rx2} ${r} 0 1 ${sweepInner} ${cx} ${cy - r} Z`}
        fill="#F9E97E"
      />
    )
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} rx={size * 0.2} fill="#0D1E15" />
      {fill}
    </svg>
  )
}

// Genera los próximos 30 días con su fase
function getProximos30(desde: Date) {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(desde)
    d.setDate(d.getDate() + i)
    const age = getMoonAge(d)
    const fase = getFase(age)
    return { fecha: d, age, fase }
  })
}

const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function LunaPage() {
  const hoy = new Date()
  const moonAge = getMoonAge(hoy)
  const faseActual = getFase(moonAge)
  const diasCiclo = Math.floor(moonAge) + 1
  const pctCiclo = Math.round((moonAge / SYNODIC) * 100)

  const proximaFase = FASES.find(f => f.rango[0] > moonAge)
  const diasHasta = proximaFase ? Math.ceil(proximaFase.rango[0] - moonAge) : Math.ceil(SYNODIC - moonAge)
  const nombreProxima = proximaFase?.nombre ?? 'Luna Nueva'
  const emojiProxima = proximaFase?.emoji ?? '🌑'

  const proximos = getProximos30(hoy)
  const [diaSeleccionado, setDiaSeleccionado] = useState(0)
  const diaInfo = proximos[diaSeleccionado]

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0D1E15 0%, #1E3D2B 50%, #1A3325 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#F9FCF8',
      paddingBottom: '100px',
    }}>
      <Nav dark />

      {/* Hero con luna */}
      <div style={{ paddingTop: '96px', padding: '96px 20px 0', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#A7C4A1', fontWeight: 600, margin: '0 0 20px' }}>Calendario lunar</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <MoonDisc age={moonAge} size={120} />
        </div>

        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 500, margin: '0 0 8px', lineHeight: 1.1 }}>
          {faseActual.emoji} {faseActual.nombre}
        </h1>
        <p style={{ color: '#A7C4A1', fontSize: '14px', margin: '0 0 24px' }}>
          Día {diasCiclo} del ciclo · {pctCiclo}% completado
        </p>

        {/* Barra de ciclo */}
        <div style={{ maxWidth: '320px', margin: '0 auto 32px' }}>
          <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pctCiclo}%`, background: 'linear-gradient(90deg, #4C7F5B, #F9E97E)', borderRadius: '999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '10px', color: '#A7C4A1' }}>🌑 Nueva</span>
            <span style={{ fontSize: '10px', color: '#A7C4A1' }}>🌕 Llena</span>
          </div>
        </div>

        {/* Descripción */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
          borderRadius: '24px', padding: '22px 24px', border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'left', marginBottom: '16px',
        }}>
          <p style={{ color: '#C5D9C2', fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
            {faseActual.descripcion}
          </p>
        </div>

        {/* Próxima fase */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '18px',
          padding: '14px 20px', border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '32px', textAlign: 'left',
        }}>
          <span style={{ fontSize: '28px' }}>{emojiProxima}</span>
          <div>
            <div style={{ fontSize: '11px', color: '#A7C4A1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Próxima fase</div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>{nombreProxima}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#F9E97E', lineHeight: 1 }}>{diasHasta}</div>
            <div style={{ fontSize: '11px', color: '#A7C4A1' }}>día{diasHasta !== 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* Qué hacer y evitar */}
      <div style={{ padding: '0 20px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(167,196,161,0.2)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✅</span> Hacer ahora
            </div>
            {faseActual.plantas.map(p => (
              <div key={p.categoria} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#A7C4A1' }}>{p.categoria}</div>
                <div style={{ fontSize: '11px', color: '#C5D9C2', lineHeight: 1.5 }}>{p.accion}: {p.ejemplos}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'rgba(139,58,47,0.15)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(139,58,47,0.3)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px', color: '#F4A49A' }}>
              <span>⏳</span> Evitar
            </div>
            {faseActual.evitar.map(e => (
              <div key={e} style={{ fontSize: '12px', color: '#F4A49A', lineHeight: 1.6, padding: '4px 0', borderBottom: '1px solid rgba(139,58,47,0.2)' }}>
                {e}
              </div>
            ))}
          </div>
        </div>

        {/* Ciclo visual completo */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)', padding: '22px',
          marginBottom: '16px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#A7C4A1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Ciclo completo · {SYNODIC.toFixed(1)} días
          </div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
            {FASES.map((f, i) => {
              const dur = f.rango[1] - f.rango[0]
              const activa = f.nombre === faseActual.nombre
              return (
                <div key={i} style={{ flex: dur, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '100%', height: activa ? '48px' : '36px',
                    borderRadius: '10px',
                    backgroundColor: activa ? 'rgba(249,233,126,0.25)' : 'rgba(255,255,255,0.06)',
                    border: activa ? '1px solid rgba(249,233,126,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: activa ? '20px' : '16px',
                    transition: 'all 0.2s',
                  }}>{f.emoji}</div>
                  <div style={{ fontSize: '8px', color: activa ? '#F9E97E' : '#A7C4A1', fontWeight: activa ? 700 : 400, textAlign: 'center', lineHeight: 1.2 }}>
                    {f.nombreCorto}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Próximos 30 días */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)', padding: '22px',
          marginBottom: '16px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#A7C4A1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Próximos 30 días
          </div>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px' }}>
            {proximos.map((d, i) => {
              const activo = i === diaSeleccionado
              const esHoy = i === 0
              return (
                <button key={i} onClick={() => setDiaSeleccionado(i)} style={{
                  flexShrink: 0, width: '52px',
                  padding: '10px 4px',
                  borderRadius: '14px',
                  border: activo ? '1px solid rgba(249,233,126,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: activo ? 'rgba(249,233,126,0.15)' : 'transparent',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                }}>
                  <div style={{ fontSize: '9px', color: activo ? '#F9E97E' : '#A7C4A1', fontWeight: 600 }}>
                    {esHoy ? 'HOY' : DIAS_SEMANA[d.fecha.getDay()]}
                  </div>
                  <div style={{ fontSize: '12px', color: activo ? '#F9E97E' : '#F9FCF8', fontWeight: activo ? 700 : 400 }}>
                    {d.fecha.getDate()}
                  </div>
                  <div style={{ fontSize: '16px' }}>{d.fase.emoji}</div>
                </button>
              )
            })}
          </div>

          {/* Detalle del día seleccionado */}
          {diaSeleccionado > 0 && (
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                {diaInfo.fase.emoji} {diaInfo.fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#F9E97E', marginBottom: '8px' }}>{diaInfo.fase.nombre}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {diaInfo.fase.plantas.map(p => (
                  <span key={p.categoria} style={{
                    fontSize: '11px', padding: '4px 10px', borderRadius: '999px',
                    backgroundColor: 'rgba(255,255,255,0.08)', color: '#C5D9C2', border: '1px solid rgba(255,255,255,0.1)',
                  }}>{p.categoria}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guía completa de siembra lunar */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)', padding: '22px',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#A7C4A1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Guía de siembra lunar
          </div>
          {FASES.map(f => (
            <div key={f.nombre} style={{
              padding: '16px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{f.emoji}</span>
                <div style={{ fontWeight: 700, fontSize: '14px', color: f.nombre === faseActual.nombre ? '#F9E97E' : '#F9FCF8' }}>
                  {f.nombre}
                  {f.nombre === faseActual.nombre && <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: 'rgba(249,233,126,0.2)', color: '#F9E97E', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>AHORA</span>}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {f.plantas.map(p => (
                  <div key={p.categoria} style={{
                    backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: '12px',
                    padding: '8px 12px', border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#C5D9C2', marginBottom: '2px' }}>{p.categoria}</div>
                    <div style={{ fontSize: '11px', color: '#F9FCF8' }}>{p.accion}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
