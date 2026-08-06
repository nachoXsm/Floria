'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import FloriaLogo from './FloriaLogo'
import {
  ArrowLeft, List, X, House, MagnifyingGlass, Camera, PottedPlant, Notebook,
  Sparkle, Carrot, Moon, Bug, Storefront, User, Tag, type Icon,
} from '@phosphor-icons/react'

type NavProps = { dark?: boolean }

const MENU: { href: string; label: string; Icon: Icon }[] = [
  { href: '/', label: 'Inicio', Icon: House },
  { href: '/explore', label: 'Explorar plantas', Icon: MagnifyingGlass },
  { href: '/identify', label: 'Identificar', Icon: Camera },
  { href: '/diseno', label: 'Diseñar cantero', Icon: PottedPlant },
  { href: '/bitacora', label: 'Bitácora de jardín', Icon: Notebook },
  { href: '/jardinero', label: 'Jardinero IA', Icon: Sparkle },
  { href: '/huerta', label: 'Mi Huerta', Icon: Carrot },
  { href: '/luna', label: 'Calendario lunar', Icon: Moon },
  { href: '/plagas', label: 'Plagas y enfermedades', Icon: Bug },
  { href: '/viveros', label: 'Viveros', Icon: Storefront },
  { href: '/perfil', label: 'Mi perfil', Icon: User },
  { href: '/pricing', label: 'Planes y precios', Icon: Tag },
]

export default function Nav({ dark }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'
  const iconColor = dark ? '#C5D9C2' : '#1E3D2B'
  const btnBg = dark ? 'rgba(255,255,255,0.12)' : '#E7EFE6'

  const roundBtn: React.CSSProperties = {
    width: '40px', height: '40px', borderRadius: '999px', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: btnBg, border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(30,61,43,0.1)',
    cursor: 'pointer', textDecoration: 'none', padding: 0,
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)', maxWidth: '1120px', zIndex: 50,
        backgroundColor: dark ? 'rgba(30,61,43,0.92)' : 'rgba(249,252,248,0.9)',
        backdropFilter: 'blur(18px) saturate(1.3)', WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
        border: dark ? '1px solid rgba(167,196,161,0.2)' : '1px solid rgba(231,239,230,0.9)',
        boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px', borderRadius: '999px', height: '64px',
      }}>
        {/* Izquierda: volver + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {!isHome && (
            <button onClick={() => router.back()} aria-label="Volver" style={roundBtn}>
              <ArrowLeft size={20} weight="bold" color={iconColor} />
            </button>
          )}
          <a href="/" style={{ display: 'flex', alignItems: 'center', height: '100%', textDecoration: 'none', paddingLeft: isHome ? '6px' : '0' }}>
            <FloriaLogo size={52} light={!!dark} />
          </a>
        </div>

        {/* Derecha: menú + perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={() => setMenuOpen(v => !v)} aria-label="Menú" style={roundBtn}>
            {menuOpen ? <X size={20} weight="bold" color={iconColor} /> : <List size={20} weight="bold" color={iconColor} />}
          </button>
          <a href="/perfil" aria-label="Perfil" style={{
            ...roundBtn,
            backgroundColor: pathname === '/perfil' ? (dark ? '#F9FCF8' : '#1E3D2B') : btnBg,
          }}>
            <User size={19} weight="regular" color={pathname === '/perfil' ? (dark ? '#1E3D2B' : '#fff') : iconColor} />
          </a>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE */}
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 55, backgroundColor: 'rgba(15,30,20,0.28)', backdropFilter: 'blur(2px)' }} />
          <div style={{
            position: 'fixed', top: '88px', left: '50%', transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)', maxWidth: '440px', zIndex: 56,
            backgroundColor: 'rgba(249,246,240,0.96)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.6)', borderRadius: '26px',
            boxShadow: '0 24px 60px rgba(30,61,43,0.22)', padding: '10px',
            maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
          }}>
            {MENU.map(item => {
              const active = pathname === item.href
              return (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none',
                  padding: '13px 14px', borderRadius: '16px',
                  backgroundColor: active ? '#1E3D2B' : 'transparent',
                }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: active ? 'rgba(242,233,221,0.14)' : '#E7EFE6' }}>
                    <item.Icon size={21} weight="light" color={active ? '#F2E9DD' : '#1E3D2B'} />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: active ? '#F2E9DD' : '#1E3D2B' }}>{item.label}</span>
                </a>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
