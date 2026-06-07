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
      <Image
        src="/logo-floria-icon.png"
        alt="Floria"
        width={size}
        height={size}
        style={{ display: 'block', borderRadius: size * 0.22, flexShrink: 0 }}
        priority
      />
    )
  }

  // Full variant: use horizontal logo PNG
  // Aspect ratio del logo horizontal: ~3.5:1 aprox
  const logoWidth = Math.round(size * 3.5)
  return (
    <Image
      src="/logo-floria.png"
      alt="Floria"
      width={logoWidth}
      height={size}
      style={{ display: 'block', flexShrink: 0, objectFit: 'contain' }}
      priority
    />
  )
}
