'use client'

import { usePathname } from 'next/navigation'

// Íconos finos de línea (usan currentColor — el color lo pone el contenedor)
const tabs = [
  {
    href: '/', label: 'Inicio',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.8L12 3l9 6.8V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    href: '/explore', label: 'Explorar',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: '/jardinero', label: 'Jardinero IA',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V12l3 3-3 3v1a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-1l-3-3 3-3V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z" />
      </svg>
    ),
  },
  {
    href: '/luna', label: 'Luna',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    href: '/huerta', label: 'Huerta',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21V9" /><path d="M12 12C12 8 9 5 4 5c0 5 3 7 8 7z" /><path d="M12 14c0-3.3 2.5-6 6.5-6 0 4-2.5 6-6.5 6z" />
      </svg>
    ),
  },
  {
    href: '/bitacora', label: 'Bitácora',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" /><path d="M8.5 3.5v17" />
        <path d="M13.6 9.2c-1.4 0-2.5 1.1-2.5 2.5 1.4 0 2.5-1.1 2.5-2.5z" /><path d="M14 9.2c1.4 0 2.5 1.1 2.5 2.5-1.4 0-2.5-1.1-2.5-2.5z" /><path d="M13.8 8.6v6" />
      </svg>
    ),
  },
  {
    href: '/identify', label: 'Identificar',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    href: '/perfil', label: 'Perfil',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 'calc(10px + env(safe-area-inset-bottom))',
      left: '12px',
      right: '12px',
      zIndex: 50,
      backgroundColor: 'rgba(246,241,233,0.80)',
      backdropFilter: 'blur(26px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(26px) saturate(1.4)',
      border: '1px solid rgba(255,255,255,0.55)',
      boxShadow: '0 14px 44px rgba(30,61,43,0.18)',
      borderRadius: '26px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 10px',
      height: '58px',
      maxWidth: '620px',
      margin: '0 auto',
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.href
        return (
          <a key={tab.href} href={tab.href} title={tab.label} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            textDecoration: 'none',
            backgroundColor: active ? '#1E3D2B' : 'transparent',
            color: active ? '#F2E9DD' : '#4C7F5B',
            transition: 'all 0.22s cubic-bezier(0.2,0.7,0.2,1)',
            flexShrink: 0,
          }}>
            {tab.icon}
          </a>
        )
      })}
    </nav>
  )
}
