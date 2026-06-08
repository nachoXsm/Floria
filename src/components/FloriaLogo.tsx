import Image from 'next/image'

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
  light = false,
}: Props) {
  if (variant === 'icon') {
    return (
      <div
        role="img"
        aria-label="Floria"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          backgroundImage: 'url("/logo-floria-icon.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1E3D2B',
          flexShrink: 0,
        }}
      />
    )
  }

  // Full variant: use horizontal logo PNG
  // Aspect ratio del logo horizontal: ~3.5:1 aprox
  const logoWidth = Math.round(size * 3.5)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexShrink: 0,
      filter: light ? 'brightness(0) invert(1)' : 'none',
    }}>
      <Image
        src="/logo-floria.png"
        alt="Floria"
        width={logoWidth}
        height={size}
        style={{ display: 'block', objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
