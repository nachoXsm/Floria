'use client'
import { useRef } from 'react'
import type { PlantOption } from './page'

// Compositor de láminas de cantero: arma una vista de elevación con los recortes
// (cutout_image) de las plantas elegidas, ordenadas por altura, con paleta de
// colores, fila de especies y título por exposición. 100% en el cliente (gratis).

const COLOR_HEX: Record<string, string> = {
  blanco: '#EDE7D8', amarillo: '#EAB308', naranja: '#F97316', rosa: '#F472B6',
  rojo: '#DC2626', violeta: '#8B5CF6', azul: '#3B82F6', verde: '#6FA04E', verdoso: '#6FA04E',
}
const LIGHT_TITLE: Record<string, string> = {
  full_sun: 'PLENO SOL', partial_shade: 'SEMISOMBRA', shade: 'SOMBRA', indirect: 'LUZ INDIRECTA',
  'sol directo': 'PLENO SOL', 'semi sombra': 'SEMISOMBRA', 'sombra': 'SOMBRA', 'luz indirecta': 'LUZ INDIRECTA',
}

function heightOf(p: PlantOption): number {
  return p.height_max_cm ?? p.height_min_cm ?? 60
}

// Orden centro-afuera: la más alta al medio, decreciendo hacia los bordes.
function centerOut<T>(sortedDesc: T[]): T[] {
  const out: T[] = []
  sortedDesc.forEach((item, i) => {
    if (i % 2 === 0) out.push(item)      // pares al final (derecha)
    else out.unshift(item)               // impares al principio (izquierda)
  })
  return out
}

export default function LaminaCantero({ plants, title = 'CANTERO' }: { plants: PlantOption[]; title?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  const W = 1080, H = 1350
  const stripX = 90, stripW = W - 180
  const baseline = 780          // línea de tierra (parte superior de la tira)

  // Exposición dominante
  const lightCounts: Record<string, number> = {}
  for (const p of plants) {
    const key = (p.light ?? '').toLowerCase()
    if (LIGHT_TITLE[key]) lightCounts[key] = (lightCounts[key] ?? 0) + 1
  }
  const domLight = Object.entries(lightCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  const exposure = domLight ? LIGHT_TITLE[domLight] : 'MIXTO'

  // Paleta (colores únicos, en orden de aparición)
  const palette: string[] = []
  for (const p of plants) {
    for (const c of p.flower_colors ?? []) {
      const hex = COLOR_HEX[c.toLowerCase()]
      if (hex && !palette.includes(hex)) palette.push(hex)
    }
  }

  // Elevación: ordenar por altura y disponer centro-afuera
  const bySize = [...plants].sort((a, b) => heightOf(b) - heightOf(a))
  const arranged = centerOut(bySize)
  const maxH = heightOf(bySize[0] ?? plants[0]) || 100
  const slotW = stripW / Math.max(arranged.length, 1)
  const MAX_PX = 430, MIN_PX = 120

  const download = () => {
    const svg = svgRef.current
    if (!svg) return
    const xml = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([xml], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `lamina-cantero-${Date.now()}.svg`
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(30,61,43,0.2)' }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width="100%" xmlns="http://www.w3.org/2000/svg"
          fontFamily="Montserrat, Arial, sans-serif">
          <defs>
            <linearGradient id="lc-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FBFDF9" /><stop offset="1" stopColor="#EEF4EA" />
            </linearGradient>
            <linearGradient id="lc-soil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5A4632" /><stop offset="1" stopColor="#3C2E1F" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width={W} height={H} fill="#FFFFFF" />
          <rect x="24" y="24" width={W - 48} height={H - 48} rx="26" fill="url(#lc-sky)" stroke="#E1EADD" />

          {/* Título */}
          <text x={W / 2} y="112" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="52" fill="#1E3D2B" letterSpacing="2">{title}</text>
          <text x={W / 2} y="160" textAnchor="middle" fontSize="28" fontWeight="700" fill="#4C7F5B"
            letterSpacing="6">{exposure}</text>

          {/* Paleta */}
          {palette.map((hex, i) => {
            const n = palette.length
            const cx = W / 2 - ((n - 1) * 56) / 2 + i * 56
            return <circle key={i} cx={cx} cy="220" r="25" fill={hex} stroke="#00000010" />
          })}

          {/* Tira de tierra */}
          <rect x={stripX} y={baseline} width={stripW} height="66" rx="12" fill="url(#lc-soil)" />

          {/* Plantas (recortes o silueta de respaldo) */}
          {arranged.map((p, i) => {
            const h = heightOf(p)
            const px = Math.max(MIN_PX, Math.min(MAX_PX, (h / maxH) * MAX_PX))
            const boxW = slotW * 1.35
            const cx = stripX + slotW * i + slotW / 2
            const x = cx - boxW / 2
            const y = baseline + 6 - px
            if (p.cutout_image) {
              return (
                <image key={p.id} href={p.cutout_image} x={x} y={y} width={boxW} height={px}
                  preserveAspectRatio="xMidYMax meet" />
              )
            }
            // Fallback silueta suave si todavía no tiene recorte
            const col = (p.flower_colors?.[0] && COLOR_HEX[p.flower_colors[0].toLowerCase()]) || '#6FA04E'
            const isGrass = (p.plant_type ?? '').toLowerCase().includes('gram')
            return (
              <g key={p.id} opacity="0.9">
                {isGrass ? (
                  <g stroke={col} strokeWidth="4" strokeLinecap="round" fill="none">
                    {[-30, -12, 4, 20, 36].map((dx, k) => (
                      <path key={k} d={`M${cx + dx},${baseline + 4} C${cx + dx},${baseline - px * 0.6} ${cx + dx * 1.4},${baseline - px * 0.9} ${cx + dx * 1.8},${baseline - px}`} />
                    ))}
                  </g>
                ) : (
                  <ellipse cx={cx} cy={baseline + 4 - px * 0.45} rx={boxW * 0.42} ry={px * 0.5} fill="#5C8B44" />
                )}
              </g>
            )
          })}

          {/* Fila de especies */}
          {plants.slice(0, 6).map((p, i) => {
            const n = Math.min(plants.length, 6)
            const gap = (W - 180) / n
            const cx = 90 + gap * i + gap / 2
            const cy = 960
            const img = p.cutout_image || p.cover_image
            const clip = `clip-${p.id}`
            return (
              <g key={p.id}>
                <clipPath id={clip}><circle cx={cx} cy={cy} r="58" /></clipPath>
                <circle cx={cx} cy={cy} r="60" fill="#EEF4EA" stroke="#E1EADD" strokeWidth="4" />
                {img && <image href={img} x={cx - 58} y={cy - 58} width="116" height="116"
                  preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clip})`} />}
                <text x={cx} y={cy + 92} textAnchor="middle" fontSize="19" fontStyle="italic" fill="#345E43">
                  {(p.scientific_name ?? '').split(' ').slice(0, 2).join(' ')}
                </text>
              </g>
            )
          })}

          {/* Branding */}
          <line x1={W / 2 - 160} y1="1178" x2={W / 2 + 160} y2="1178" stroke="#D8E4D2" />
          <text x={W / 2} y="1226" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="40" fill="#1E3D2B" letterSpacing="4">FLORIA</text>
          <text x={W / 2} y="1258" textAnchor="middle" fontSize="15" fill="#7A9E82" letterSpacing="5">
            DISEÑO DE CANTEROS</text>
        </svg>
      </div>

      <button onClick={download} style={{
        width: '100%', marginTop: '14px', padding: '14px', borderRadius: '999px', border: 'none',
        cursor: 'pointer', backgroundColor: '#1E3D2B', color: '#F2E9DD', fontSize: '14px', fontWeight: 700,
      }}>Descargar lámina</button>
    </div>
  )
}

// deploy trigger
