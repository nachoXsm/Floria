'use client'

import { usePathname } from 'next/navigation'
import FloriaLogo from './FloriaLogo'

type NavProps = { dark?: boolean }

export default function Nav({ dark }: NavProps) {
  const pathname = usePathname()

  const linkColor = dark ? '#C5D9C2' : '#4C7F5B'
  const activeLinkColor = dark ? 'white' : '#1E3D2B'

  const isActive = (href: string) => pathname === href

  return (
    <nav style={{
      position: 'fixed',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1120px',
      zIndex: 50,
      backgroundColor: dark ? 'rgba(30,61,43,0.92)' : 'rgba(249,252,248,0.92)',
      backdropFilter: 'blur(18px)',
      border: dark ? '1px solid rgba(167,196,161,0.2)' : '1px solid rgba(231,239,230,0.9)',
      boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px 0 16px',
      borderRadius: '999px',
      height: '56px',
    }}>
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <FloriaLogo size={44} color={dark ? '#C5D9C2' : '#1E3D2B'} />
      </a>

      {/* Desktop links — hidden on mobile via CSS class */}
      <div className="nav-desktop-links" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[
          { href: '/explore', label: 'Explorar' },
          { href: '/huerta', label: 'Huerta' },
          { href: '/luna', label: 'Luna' },
          { href: '/identify', label: 'Identificar' },
          { href: '/pricing', label: 'Precios' },
        ].map(link => (
          <a key={link.href} href={link.href} style={{
            color: isActive(link.href) ? activeLinkColor : linkColor,
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: isActive(link.href) ? 600 : 500,
            padding: '8px 12px',
            borderRadius: '999px',
            backgroundColor: isActive(link.href) ? (dark ? 'rgba(255,255,255,0.1)' : 'rgba(30,61,43,0.06)') : 'transparent',
          }}>{link.label}</a>
        ))}
        <a href="/auth/login" style={{
          backgroundColor: dark ? '#F9FCF8' : '#1E3D2B',
          color: dark ? '#1E3D2B' : 'white',
          padding: '9px 18px',
          borderRadius: '999px',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          marginLeft: '4px',
          whiteSpace: 'nowrap',
        }}>Iniciar sesión</a>
      </div>
    </nav>
  )
}
