'use client'

import { usePathname } from 'next/navigation'

const tabs = [
  {
    href: '/',
    label: 'Inicio',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1E3D2B' : 'none'} stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: '/explore',
    label: 'Explorar',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    href: '/luna',
    label: 'Luna',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={active ? '#1E3D2B' : 'none'}/>
      </svg>
    ),
  },
  {
    href: '/huerta',
    label: 'Huerta',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 0 20"/>
        <path d="M12 2C6.5 2 4 7 4 12s2.5 10 8 10"/>
        <path d="M12 22V12"/>
        <path d="M12 12C8 8 4 9 2 12"/>
        <path d="M12 12c4-4 8-3 10 0"/>
      </svg>
    ),
  },
  {
    href: '/identify',
    label: 'Identificar',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    href: '/auth/login',
    label: 'Perfil',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1E3D2B' : '#4C7F5B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(249,252,248,0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(231,239,230,0.9)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom)',
      height: 'calc(64px + env(safe-area-inset-bottom))',
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.href
        return (
          <a key={tab.href} href={tab.href} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '16px',
            backgroundColor: active ? 'rgba(30,61,43,0.07)' : 'transparent',
            transition: 'background 0.15s',
            minWidth: '60px',
          }}>
            {tab.icon(active)}
            <span style={{
              fontSize: '10px',
              fontWeight: active ? 700 : 500,
              color: active ? '#1E3D2B' : '#4C7F5B',
              letterSpacing: '0.2px',
            }}>{tab.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
