'use client'

import { usePathname } from 'next/navigation'
import { House, MagnifyingGlass, Sparkle, Moon, Plant, Notebook, Camera, User, type Icon } from '@phosphor-icons/react'

const tabs: { href: string; label: string; Icon: Icon }[] = [
  { href: '/', label: 'Inicio', Icon: House },
  { href: '/explore', label: 'Explorar', Icon: MagnifyingGlass },
  { href: '/jardinero', label: 'Jardinero IA', Icon: Sparkle },
  { href: '/luna', label: 'Luna', Icon: Moon },
  { href: '/huerta', label: 'Huerta', Icon: Plant },
  { href: '/bitacora', label: 'Bitácora', Icon: Notebook },
  { href: '/identify', label: 'Identificar', Icon: Camera },
  { href: '/perfil', label: 'Perfil', Icon: User },
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
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href
        return (
          <a key={href} href={href} title={label} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '14px',
            textDecoration: 'none',
            backgroundColor: active ? '#1E3D2B' : 'transparent',
            transition: 'all 0.22s cubic-bezier(0.2,0.7,0.2,1)',
            flexShrink: 0,
          }}>
            <Icon size={23} weight={active ? 'fill' : 'regular'} color={active ? '#F2E9DD' : '#4C7F5B'} />
          </a>
        )
      })}
    </nav>
  )
}
