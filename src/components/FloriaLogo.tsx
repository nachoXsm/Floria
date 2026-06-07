type Props = {
  variant?: 'full' | 'icon'
  size?: number
  /** Color del círculo, tallo y texto. Por defecto #1E3D2B */
  color?: string
  /** Color del texto si es diferente al ícono */
  textColor?: string
  /** Versión sobre fondo oscuro — hojas en tonos claros */
  light?: boolean
}

export default function FloriaLogo({
  variant = 'full',
  size = 40,
  color = '#1E3D2B',
  textColor,
  light = false,
}: Props) {
  const tc = textColor ?? color

  // Colores de las hojas según contexto
  const leafLeft   = light ? '#7BBF8A' : '#2C5A3D'   // hoja grande verde oscuro / verde claro
  const leafCenter = light ? '#A8D4B0' : '#5A9A72'   // hoja central verde medio
  const leafPink   = light ? '#F0C4B8' : '#E8AFA0'   // pétalo rosa
  const circleColor = color

  // SVG icon — viewBox 56×56, círculo centro (28,28) radio 22
  // Arco: de (46,15) sentido horario 320° hasta (42,11) — hueco en 1:00-1:30
  // Unión de hojas: (27,35)  Tallo: (27,35)→(27,44)
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Floria"
    >
      {/* Círculo casi completo, hueco superior-derecho */}
      <path
        d="M 46,15 A 22,22 0 1,1 42,11"
        stroke={circleColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Tallo */}
      <line x1="27" y1="35" x2="27" y2="44" stroke={circleColor} strokeWidth="2" strokeLinecap="round"/>

      {/* Hoja izquierda — grande, verde oscuro, apunta abajo-izquierda */}
      <path
        d="M 27,35 C 22,28 11,29 10,37 C 10,44 22,42 27,35 Z"
        fill={leafLeft}
      />

      {/* Hoja central — más alta, verde medio, apunta arriba con leve inclinación izquierda */}
      <path
        d="M 27,35 C 32,24 28,12 22,9 C 16,12 18,24 27,35 Z"
        fill={leafCenter}
      />
      {/* Nervio central sutil */}
      <path
        d="M 27,35 C 25,24 23,14 22,9"
        stroke={light ? 'rgba(255,255,255,0.25)' : 'rgba(30,61,43,0.2)'}
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Pétalo rosa — arriba-derecha, redondeado */}
      <path
        d="M 27,35 C 25,27 34,16 40,19 C 44,24 37,33 27,35 Z"
        fill={leafPink}
      />
    </svg>
  )

  if (variant === 'icon') return icon

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1 }}>
      {icon}
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: size * 0.75,
        color: tc,
        fontWeight: 500,
        letterSpacing: '-0.5px',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        Floria
      </span>
    </div>
  )
}
