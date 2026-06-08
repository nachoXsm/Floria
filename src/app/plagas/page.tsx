'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

type Severidad = 'alta' | 'media' | 'baja'
type Categoria = 'insecto' | 'hongo' | 'bacteria' | 'virus' | 'acaro' | 'otro'

type Plaga = {
  nombre: string
  nombreCientifico?: string
  categoria: Categoria
  severidad: Severidad
  emoji: string
  plantasAfectadas: string[]
  sintomas: string[]
  prevencion: string[]
  tratamiento: string[]
  tratamientoOrganico: string[]
  epoca: string
}

const PLAGAS: Plaga[] = [
  // INSECTOS
  {
    nombre: 'Pulgón',
    nombreCientifico: 'Aphididae',
    categoria: 'insecto',
    severidad: 'media',
    emoji: '🐛',
    plantasAfectadas: ['Rosa', 'Tomate', 'Pimiento', 'Albahaca', 'Limonero', 'Ornamentales en general'],
    sintomas: ['Hojas enrolladas o deformadas', 'Pegajosidad (melaza) en hojas y tallos', 'Colonias de insectos pequeños en brotes tiernos', 'Decoloración amarillenta de hojas nuevas'],
    prevencion: ['Plantar albahaca o lavanda como repelente natural', 'Favorecer la presencia de mariquitas (las comen)', 'Regar de mañana para evitar humedad nocturna', 'Revisar brotes tiernos semanalmente'],
    tratamiento: ['Agua a presión en hojas afectadas', 'Insecticida sistémico (imidacloprid) en casos graves', 'Aceite de neem diluido (2-3 aplicaciones)'],
    tratamientoOrganico: ['Agua jabonosa (jabón neutro) rociada en brotes', 'Ajo macerado + agua como spray', 'Introducir mariquitas o crisopas'],
    epoca: 'Primavera–verano, especialmente en brotes nuevos',
  },
  {
    nombre: 'Mosca Blanca',
    nombreCientifico: 'Trialeurodes vaporariorum',
    categoria: 'insecto',
    severidad: 'media',
    emoji: '🦟',
    plantasAfectadas: ['Tomate', 'Pimiento', 'Berenjena', 'Pepino', 'Frutilla', 'Plantas de interior'],
    sintomas: ['Nubecita blanca al mover la planta', 'Hojas amarillas y débiles', 'Presencia de larvas blancas en el envés', 'Melaza pegajosa en hojas bajas'],
    prevencion: ['Trampas amarillas adhesivas', 'Ventilación adecuada en invernaderos', 'No exceder el riego', 'Revisar plantas importadas antes de introducirlas'],
    tratamiento: ['Insecticida a base de piretrinas', 'Aceite de neem (repetir cada 5 días)', 'Jabón potásico en envés de hojas'],
    tratamientoOrganico: ['Extracto de ajo y cebolla como repelente', 'Trampas cromáticas amarillas', 'Introducción de Encarsia formosa (parasitoide)'],
    epoca: 'Todo el año en interior, primavera-verano en exterior',
  },
  {
    nombre: 'Araña Roja',
    nombreCientifico: 'Tetranychus urticae',
    categoria: 'acaro',
    severidad: 'alta',
    emoji: '🕷️',
    plantasAfectadas: ['Tomate', 'Pimiento', 'Rosa', 'Judías', 'Frutilla', 'Plantas ornamentales'],
    sintomas: ['Puntitos amarillentos en el haz de las hojas', 'Tela fina en el envés y entre ramas', 'Hojas bronceadas y secas', 'Caída prematura de hojas'],
    prevencion: ['Mantener humedad ambiental alta (riegos frecuentes)', 'Evitar exceso de nitrógeno', 'Limpiar hojas caídas del suelo', 'No secar el ambiente en exceso'],
    tratamiento: ['Acaricida específico (abamectina o spiromesifen)', 'Aplicar 2-3 veces con 7 días de intervalo', 'Retirar y quemar material muy afectado'],
    tratamientoOrganico: ['Extracto de ajo o cebolla rociado', 'Aceite de neem concentrado', 'Introducir Phytoseiulus persimilis (ácaro depredador)', 'Aumentar humedad con nebulizaciones'],
    epoca: 'Verano seco y caluroso, ambientes con baja humedad',
  },
  {
    nombre: 'Trips',
    nombreCientifico: 'Frankliniella occidentalis',
    categoria: 'insecto',
    severidad: 'media',
    emoji: '🐜',
    plantasAfectadas: ['Pimiento', 'Tomate', 'Cebolla', 'Flores ornamentales', 'Rosa'],
    sintomas: ['Cicatrices plateadas en hojas y pétalos', 'Puntos negros de excremento', 'Flores deformadas', 'Insectos muy pequeños y alargados (1-2mm)'],
    prevencion: ['Trampas azules adhesivas', 'Mallas antiinsectos en invernadero', 'Eliminar malezas cercanas'],
    tratamiento: ['Spinosad (origen natural, efectivo)', 'Insecticidas sistémicos en casos graves', 'Tirar flores afectadas inmediatamente'],
    tratamientoOrganico: ['Aceite de neem al 2%', 'Depredadores como Amblyseius cucumeris', 'Trampas cromáticas azules'],
    epoca: 'Primavera y verano, mayor riesgo en épocas secas',
  },
  {
    nombre: 'Cochinilla Algodonosa',
    nombreCientifico: 'Planococcus citri',
    categoria: 'insecto',
    severidad: 'media',
    emoji: '🤍',
    plantasAfectadas: ['Limonero', 'Naranjo', 'Cactus', 'Suculentas', 'Plantas de interior', 'Orquídeas'],
    sintomas: ['Masas blancas algodonosas en axilas y tallos', 'Debilitamiento general de la planta', 'Hojas amarillas y caídas', 'Melaza pegajosa'],
    prevencion: ['No abonar con exceso de nitrógeno', 'Revisar plantas nuevas antes de ubicar', 'Mantener ventilación en plantas de interior'],
    tratamiento: ['Alcohol isopropílico con algodón en cada insecto', 'Insecticida sistémico (imidacloprid)', 'Aceite de parafina en invierno'],
    tratamientoOrganico: ['Frotado manual con alcohol + agua jabonosa', 'Aceite de neem (varios tratamientos)', 'Introducir Cryptolaemus montrouzieri'],
    epoca: 'Todo el año especialmente en plantas de interior y cítricos',
  },

  // HONGOS
  {
    nombre: 'Oídio',
    nombreCientifico: 'Erysiphe spp.',
    categoria: 'hongo',
    severidad: 'media',
    emoji: '⬜',
    plantasAfectadas: ['Rosa', 'Calabaza', 'Pepino', 'Tomate', 'Frutilla', 'Vid', 'Manzano'],
    sintomas: ['Polvo blanco harinoso en hojas y tallos', 'Hojas deformadas y curvadas', 'Caída prematura de flores', 'Crecimiento atrofiado'],
    prevencion: ['Buena circulación de aire entre plantas', 'Evitar riego por aspersión', 'Plantar variedades resistentes', 'No exceder el abono nitrogenado'],
    tratamiento: ['Fungicida a base de azufre mojable', 'Bicarbonato de potasio (más efectivo que sódico)', 'Fungicidas sistémicos (trifloxistrobina) en casos graves'],
    tratamientoOrganico: ['Bicarbonato de sodio (1 cucharadita/litro + jabón neutro)', 'Leche diluida al 10% (comprobado científicamente)', 'Aceite de neem preventivo'],
    epoca: 'Primavera y otoño, con temperatura templada y alta humedad nocturna',
  },
  {
    nombre: 'Botrytis (Moho Gris)',
    nombreCientifico: 'Botrytis cinerea',
    categoria: 'hongo',
    severidad: 'alta',
    emoji: '🩶',
    plantasAfectadas: ['Frutilla', 'Tomate', 'Lechuga', 'Rosa', 'Uva', 'Plantas anuales'],
    sintomas: ['Masa gris-marrón polvorienta en tejidos', 'Manchas marrones acuosas en hojas y frutos', 'Tejidos blandos y necróticos', 'Avanza rápido en condiciones húmedas'],
    prevencion: ['Espaciado adecuado entre plantas', 'Ventilación permanente', 'Regar en la base, nunca mojar follaje', 'Retirar inmediatamente material necrótico'],
    tratamiento: ['Fungicida sistémico (iprodiona o fenhexamida)', 'Tirar partes afectadas en bolsa cerrada (no compostar)', 'Mejorar drenaje del suelo'],
    tratamientoOrganico: ['Bacillus subtilis (fungicida biológico)', 'Trichoderma como preventivo', 'Aceite de árbol de té diluido'],
    epoca: 'Otoño e invierno, con temperatura baja y humedad muy alta',
  },
  {
    nombre: 'Mildiu',
    nombreCientifico: 'Plasmopara viticola / Peronospora spp.',
    categoria: 'hongo',
    severidad: 'alta',
    emoji: '🟡',
    plantasAfectadas: ['Vid', 'Tomate', 'Pepino', 'Lechuga', 'Albahaca', 'Rosas'],
    sintomas: ['Manchas amarillas aceitosas en el haz', 'Pelusa blanca o gris en el envés', 'Hojas que se secan desde los bordes', 'Necrosis rápida en condiciones húmedas'],
    prevencion: ['Caldo bordelés preventivo antes de lluvias', 'Plantar con separación suficiente', 'Variedades resistentes', 'Evitar riego por aspersión'],
    tratamiento: ['Fungicidas cúpricos (caldo bordelés, oxicloruro de cobre)', 'Fungicidas sistémicos (metalaxil) en ataques avanzados'],
    tratamientoOrganico: ['Caldo bordelés artesanal (cobre + cal)', 'Cola de caballo en decocción como preventivo', 'Extracto de propóleo'],
    epoca: 'Primavera-verano con lluvias frecuentes y temperaturas de 15-25°C',
  },
  {
    nombre: 'Fusariosis',
    nombreCientifico: 'Fusarium oxysporum',
    categoria: 'hongo',
    severidad: 'alta',
    emoji: '🟤',
    plantasAfectadas: ['Tomate', 'Pimiento', 'Clavel', 'Espárrago', 'Plantas anuales'],
    sintomas: ['Amarillamiento de hojas inferiores', 'Marchitez repentina aunque el suelo esté húmedo', 'Coloración marrón-naranja en el interior del tallo', 'Muerte de la planta en días'],
    prevencion: ['Rotación de cultivos obligatoria', 'Desinfección de herramientas', 'Suelo bien drenado', 'Usar plantas certificadas sin enfermedad'],
    tratamiento: ['No tiene cura — retirar y quemar la planta afectada', 'Desinfectar el suelo con solarización o vapor', 'Fungicidas preventivos en el resto'],
    tratamientoOrganico: ['Trichoderma harzianum como preventivo en el suelo', 'Solarización del suelo en verano (plástico transparente)', 'Rotación obligatoria con gramíneas'],
    epoca: 'Todo el año, especialmente verano con suelos cálidos',
  },

  // BACTERIAS Y VIRUS
  {
    nombre: 'Virus del Mosaico del Tomate',
    nombreCientifico: 'Tomato mosaic virus (ToMV)',
    categoria: 'virus',
    severidad: 'alta',
    emoji: '🟩',
    plantasAfectadas: ['Tomate', 'Pimiento', 'Berenjena', 'Pepino'],
    sintomas: ['Mosaico verde-amarillo en hojas', 'Hojas afiladas y deformadas', 'Frutos con manchas amarillas y deformados', 'Planta raquítica y débil'],
    prevencion: ['Semillas certificadas y tratadas', 'Control de pulgones (vectores)', 'Lavado de manos antes de manipular plantas', 'Desinfectar herramientas con lejía diluida'],
    tratamiento: ['No tiene cura — eliminar planta afectada', 'Controlar los pulgones transmisores', 'Usar guantes para no transmitir por contacto'],
    tratamientoOrganico: ['Control preventivo de pulgones con neem', 'Semillas propias solo de plantas sanas', 'Desinfección con alcohol de utensilios'],
    epoca: 'Todo el año, transmitido principalmente por pulgones',
  },
  {
    nombre: 'Cancro Bacteriano',
    nombreCientifico: 'Pseudomonas syringae',
    categoria: 'bacteria',
    severidad: 'alta',
    emoji: '🔴',
    plantasAfectadas: ['Manzano', 'Duraznero', 'Cerezo', 'Tomate', 'Rosas'],
    sintomas: ['Lesiones oscuras en corteza que exudan goma', 'Manchas angulares acuosas en hojas', 'Ramas que se secan y mueren (cancros)', 'Flores que no abren o se tornan marrones'],
    prevencion: ['Podar solo con tiempo seco', 'Desinfectar tijeras entre cortes (alcohol)', 'Evitar heridas innecesarias', 'Caldo bordelés en otoño-invierno'],
    tratamiento: ['Cortar y quemar ramas afectadas', 'Pincelar heridas con caldo bordelés', 'Antibióticos cúpricos en casos graves'],
    tratamientoOrganico: ['Pasta bordelesa en heridas de poda', 'Extracto de cebolla como antiséptico natural', 'Poda rigurosa y quema del material'],
    epoca: 'Otoño e invierno, después de lluvias o heladas',
  },
]

const CATEGORIA_CONFIG: Record<Categoria, { label: string; color: string; bg: string }> = {
  insecto:   { label: 'Insecto',   color: '#1E3D2B', bg: '#E7EFE6' },
  hongo:     { label: 'Hongo',     color: '#7A5C1E', bg: '#FDF3E3' },
  bacteria:  { label: 'Bacteria',  color: '#8B3A2F', bg: '#FEF0EE' },
  virus:     { label: 'Virus',     color: '#5C3A7A', bg: '#F3E8FF' },
  acaro:     { label: 'Ácaro',     color: '#3A5C7A', bg: '#E8F4FD' },
  otro:      { label: 'Otro',      color: '#555',    bg: '#F5F5F5' },
}

const SEVERIDAD_CONFIG: Record<Severidad, { label: string; color: string; dot: string }> = {
  alta:   { label: 'Riesgo alto',   color: '#8B3A2F', dot: '#DC2626' },
  media:  { label: 'Riesgo medio',  color: '#7A5C1E', dot: '#D97706' },
  baja:   { label: 'Riesgo bajo',   color: '#1E3D2B', dot: '#16A34A' },
}

export default function PlagasPage() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | null>(null)
  const [filtroSeveridad, setFiltroSeveridad] = useState<Severidad | null>(null)
  const [expandida, setExpandida] = useState<string | null>(null)
  const [tabExpandida, setTabExpandida] = useState<'sintomas' | 'prevencion' | 'tratamiento'>('sintomas')

  const plagasFiltradas = PLAGAS.filter(p => {
    const q = busqueda.toLowerCase()
    const matchQ = !q || p.nombre.toLowerCase().includes(q) || p.plantasAfectadas.some(x => x.toLowerCase().includes(q))
    const matchCat = !filtroCategoria || p.categoria === filtroCategoria
    const matchSev = !filtroSeveridad || p.severidad === filtroSeveridad
    return matchQ && matchCat && matchSev
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
            <span style={{ fontSize: '32px' }}>🐛</span>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C7F5B', fontWeight: 600, margin: 0 }}>Guía</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '38px', fontWeight: 600, margin: 0, lineHeight: 1.1 }}>Plagas y Enfermedades</h1>
            </div>
          </div>
          <p style={{ color: '#4C7F5B', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
            Identificá problemas, prevenilo antes de que lleguen y actuá con los mejores tratamientos, orgánicos o convencionales.
          </p>
        </div>

        {/* Buscador */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar plaga o planta afectada..."
            style={{
              width: '100%', padding: '14px 18px 14px 44px', borderRadius: '999px',
              border: '1px solid #DDE9DA', fontSize: '14px', color: '#1E3D2B',
              outline: 'none', boxSizing: 'border-box', backgroundColor: 'rgba(255,255,255,0.88)',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {(Object.entries(CATEGORIA_CONFIG) as [Categoria, typeof CATEGORIA_CONFIG[Categoria]][]).map(([key, cfg]) => (
            <button key={key} onClick={() => setFiltroCategoria(filtroCategoria === key ? null : key)} style={{
              padding: '6px 14px', borderRadius: '999px', border: `1px solid ${filtroCategoria === key ? cfg.color : '#DDE9DA'}`,
              backgroundColor: filtroCategoria === key ? cfg.bg : 'rgba(255,255,255,0.7)',
              color: filtroCategoria === key ? cfg.color : '#4C7F5B',
              cursor: 'pointer', fontSize: '12px', fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
            }}>{cfg.label}</button>
          ))}
          {(['alta', 'media', 'baja'] as Severidad[]).map(s => (
            <button key={s} onClick={() => setFiltroSeveridad(filtroSeveridad === s ? null : s)} style={{
              padding: '6px 14px', borderRadius: '999px',
              border: `1px solid ${filtroSeveridad === s ? SEVERIDAD_CONFIG[s].color : '#DDE9DA'}`,
              backgroundColor: filtroSeveridad === s ? '#FFF' : 'rgba(255,255,255,0.7)',
              color: filtroSeveridad === s ? SEVERIDAD_CONFIG[s].color : '#4C7F5B',
              cursor: 'pointer', fontSize: '12px', fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: SEVERIDAD_CONFIG[s].dot, display: 'inline-block' }} />
              {SEVERIDAD_CONFIG[s].label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {plagasFiltradas.map(plaga => {
            const catCfg = CATEGORIA_CONFIG[plaga.categoria]
            const sevCfg = SEVERIDAD_CONFIG[plaga.severidad]
            const abierta = expandida === plaga.nombre
            return (
              <div key={plaga.nombre} style={{
                backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
                borderRadius: '22px', border: '1px solid rgba(231,239,230,0.9)',
                overflow: 'hidden',
                boxShadow: abierta ? '0 8px 30px rgba(30,61,43,0.1)' : '0 2px 8px rgba(30,61,43,0.04)',
              }}>
                {/* Cabecera */}
                <button onClick={() => setExpandida(abierta ? null : plaga.nombre)} style={{
                  width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center',
                  gap: '14px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'Montserrat, system-ui, sans-serif',
                }}>
                  <span style={{ fontSize: '30px', flexShrink: 0 }}>{plaga.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#1E3D2B' }}>{plaga.nombre}</div>
                    {plaga.nombreCientifico && (
                      <div style={{ fontSize: '11px', color: '#4C7F5B', fontStyle: 'italic', marginTop: '1px' }}>{plaga.nombreCientifico}</div>
                    )}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 10px', borderRadius: '999px', backgroundColor: catCfg.bg, color: catCfg.color }}>{catCfg.label}</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 10px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#F9FCF8', color: sevCfg.color, border: '1px solid #E7EFE6' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: sevCfg.dot, display: 'inline-block' }} />{sevCfg.label}
                      </span>
                    </div>
                  </div>
                  <span style={{ color: '#4C7F5B', fontSize: '14px', transform: abierta ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▾</span>
                </button>

                {/* Contenido expandido */}
                {abierta && (
                  <div style={{ padding: '0 20px 20px' }}>
                    {/* Plantas afectadas */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#4C7F5B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Plantas afectadas</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {plaga.plantasAfectadas.map(p => (
                          <span key={p} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', backgroundColor: '#E7EFE6', color: '#1E3D2B', fontWeight: 500 }}>{p}</span>
                        ))}
                      </div>
                    </div>

                    {/* Época */}
                    <div style={{ marginBottom: '16px', padding: '10px 14px', backgroundColor: '#FDF3E3', borderRadius: '14px', border: '1px solid #F0DDB0' }}>
                      <span style={{ fontSize: '12px', color: '#7A5C1E' }}>📅 <strong>Época de riesgo:</strong> {plaga.epoca}</span>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', backgroundColor: '#F0F7EE', borderRadius: '999px', padding: '3px', marginBottom: '14px', gap: '2px' }}>
                      {([
                        { key: 'sintomas' as const, label: '🔎 Síntomas' },
                        { key: 'prevencion' as const, label: '🛡️ Prevención' },
                        { key: 'tratamiento' as const, label: '💊 Tratamiento' },
                      ]).map(tab => (
                        <button key={tab.key} onClick={() => setTabExpandida(tab.key)} style={{
                          flex: 1, padding: '9px 4px', borderRadius: '999px', border: 'none',
                          cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                          fontFamily: 'Montserrat, system-ui, sans-serif',
                          backgroundColor: tabExpandida === tab.key ? 'white' : 'transparent',
                          color: tabExpandida === tab.key ? '#1E3D2B' : '#4C7F5B',
                          boxShadow: tabExpandida === tab.key ? '0 2px 8px rgba(30,61,43,0.1)' : 'none',
                        }}>{tab.label}</button>
                      ))}
                    </div>

                    {tabExpandida === 'sintomas' && (
                      <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                        {plaga.sintomas.map(s => <li key={s} style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.7, marginBottom: '4px' }}>{s}</li>)}
                      </ul>
                    )}

                    {tabExpandida === 'prevencion' && (
                      <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                        {plaga.prevencion.map(s => <li key={s} style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.7, marginBottom: '4px' }}>{s}</li>)}
                      </ul>
                    )}

                    {tabExpandida === 'tratamiento' && (
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#7A5C1E', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          🧪 Tratamiento convencional
                        </div>
                        <ul style={{ margin: '0 0 14px', padding: '0 0 0 18px' }}>
                          {plaga.tratamiento.map(s => <li key={s} style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.7, marginBottom: '4px' }}>{s}</li>)}
                        </ul>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E3D2B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          🌿 Tratamiento orgánico
                        </div>
                        <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                          {plaga.tratamientoOrganico.map(s => <li key={s} style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.7, marginBottom: '4px' }}>{s}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {plagasFiltradas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 24px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              <p style={{ color: '#4C7F5B', fontSize: '15px', margin: 0 }}>No se encontraron resultados.</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
