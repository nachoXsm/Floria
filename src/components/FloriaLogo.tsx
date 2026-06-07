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
  const circleStroke = color ?? (light ? '#FFFFFF' : '#5C7A68')
  const tc = textColor ?? (light ? '#FFFFFF' : '#4A7260')

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Arco de círculo — casi completo, gap en 1:00-2:00
          Centro (46,50) radio 36
          Punto a 60°: (46+36*sin60, 50-36*cos60) = (77.2, 32)
          Punto a 25°: (46+36*sin25, 50-36*cos25) = (61.2, 17.4)
          Arco largo horario: large-arc=1 sweep=1                    */}
      <path
        d="M 77,32 A 36,36 0 1,1 61,17"
        stroke={circleStroke}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Hoja izquierda — verde oscuro, apunta arriba-izquierda */}
      <path
        d="M 46,78 C 30,72 14,52 20,36 C 28,26 40,52 46,78 Z"
        fill="#4A7260"
      />

      {/* Hoja central — verde claro, apunta arriba */}
      <path
        d="M 46,78 C 40,58 38,32 46,18 C 54,32 52,58 46,78 Z"
        fill="#7DB88E"
      />

      {/* Hoja derecha — rosa/salmón, apunta arriba-derecha */}
      <path
        d="M 46,78 C 62,72 76,52 70,36 C 62,26 52,52 46,78 Z"
        fill="#E8B5A4"
      />
    </svg>
  )

  if (variant === 'icon') return icon

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.2, lineHeight: 1 }}>
      {icon}
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: size * 0.75,
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
