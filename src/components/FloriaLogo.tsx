type Props = {
  variant?: 'full' | 'icon'
  size?: number
  color?: string
  textColor?: string
}

export default function FloriaLogo({
  variant = 'full',
  size = 40,
  color = '#1E3D2B',
  textColor,
}: Props) {
  const tc = textColor ?? color

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Almost-complete circle, gap at upper-right (~1 o'clock) */}
      <path
        d="M 42,11 A 22,22 0 1,1 46,15"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Stem */}
      <line x1="28" y1="39" x2="28" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Left leaf — dark forest green */}
      <path
        d="M 28,39 C 21,31 12,22 14,14 C 21,22 25,31 28,39 Z"
        fill="#2C5A3D"
      />

      {/* Center leaf — medium sage green, tallest */}
      <path
        d="M 28,39 C 22,25 22,13 28,8 C 34,13 34,25 28,39 Z"
        fill="#5A9070"
      />

      {/* Right leaf — soft pink/salmon */}
      <path
        d="M 28,39 C 35,31 44,22 42,14 C 35,22 31,31 28,39 Z"
        fill="#D4A090"
      />
    </svg>
  )

  if (variant === 'icon') return icon

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', lineHeight: 1 }}>
      {icon}
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: size * 0.72,
        color: tc,
        fontWeight: 500,
        letterSpacing: '-0.5px',
        lineHeight: 1,
      }}>
        Floria
      </span>
    </div>
  )
}
