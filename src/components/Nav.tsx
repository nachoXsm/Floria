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
      padding: '0 8px 0 14px',
      borderRadius: '999px',
      height: '64px',
    }}>
      {/* Logo — centrado verticalmente */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', height: '100%', textDecoration: 'none', paddingLeft: '2px' }}>
        <FloriaLogo size={56} light={!!dark} />
      </a>

      {/* Desktop links — hidden on mobile via CSS class */}
      <div className="nav-desktop-links" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[
          { href: '/jardinero', label: '🌿 Jardinero IA' },
          { href: '/explore', label: 'Explorar' },
          { href: '/huerta', label: 'Huerta' },
          { href: '/bitacora', label: 'Bitácora' },
          { href: '/luna', label: 'Luna' },
          { href: '/plagas', label: 'Plagas' },
          { href: '/viveros', label: 'Viveros' },
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

      {/* Botón perfil — siempre visible en mobile */}
      <a href="/perfil" className="nav-profile-btn" style={{
        width: '40px',
        height: '40px',
        borderRadius: '999px',
        backgroundColor: isActive('/perfil')
          ? (dark ? '#F9FCF8' : '#1E3D2B')
          : (dark ? 'rgba(255,255,255,0.12)' : '#E7EFE6'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        flexShrink: 0,
        border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(30,61,43,0.1)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={isActive('/perfil') ? (dark ? '#1E3D2B' : 'white') : (dark ? '#C5D9C2' : '#1E3D2B')}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    </nav>
  )
}

