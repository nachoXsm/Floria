type Props = {
  variant?: 'full' | 'icon'
  size?: number
  color?: string
  textColor?: string
  light?: boolean
}

export default function FloriaLogo({
  variant = 'full',
  size = 40,
  color,
  textColor,
  light = false,
}: Props) {
  // Colores exactos del logo real
  const circleStroke = color ?? (light ? '#FFFFFF' : '#5C7A68')
  const leafLeft     = '#4A7260'   // verde oscuro
  const leafCenter   = '#7DB88E'   // verde medio/claro
  const leafPink     = '#E8B5A4'   // rosa/salmón
  const tc = textColor ?? (light ? '#FFFFFF' : '#4A7260')

  // viewBox 0 0 48 52
  // Círculo: centro (22,26) radio 17
  // Gap superior-derecho: de ~60° a ~30° horario (hueco pequeño ~1:00–2:00)
  // Punto en 65° horario desde 12: (22+17*sin65, 26-17*cos65) = (37.4, 18.8)
  // Punto en 28° horario desde 12: (22+17*sin28, 26-17*cos28) = (29.98, 10.99)
  const icon = (
    <svg
      width={size}
      height={Math.round(size * 52 / 48)}
      viewBox="0 0 48 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Floria"
    >
      {/* Arco de círculo — gap en 1:00-2:00 */}
      <path
        d="M 37.4,18.8 A 17,17 0 1,1 30,11"
        stroke={circleStroke}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hoja izquierda — grande, verde oscuro, apunta arriba-izquierda */}
      <path
        d="M 22,40 C 11,33 6,20 10,13 C 15,8 20,21 22,40 Z"
        fill={leafLeft}
      />

      {/* Hoja central — alta y estrecha, verde claro, apunta arriba */}
      <path
        d="M 22,40 C 19,28 18,13 22,7 C 26,13 25,28 22,40 Z"
        fill={leafCenter}
      />

      {/* Hoja derecha — rosa/salmón, apunta arriba-derecha */}
      <path
        d="M 22,40 C 31,34 38,23 35,16 C 31,10 24,23 22,40 Z"
        fill={leafPink}
      />
    </svg>
  )

  if (variant === 'icon') return icon

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.22, lineHeight: 1 }}>
      {icon}
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: size * 0.8,
        color: tc,
        fontWeight: 500,
        letterSpacing: '-0.3px',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        Floria
      </span>
    </div>
  )
}
