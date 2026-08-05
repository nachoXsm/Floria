import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import { getFeaturedPlants } from '@/lib/queries/plants'
import { createClient } from '@/lib/supabase/server'
import { color, font, shadow, radius } from '@/lib/ui'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
}

const TAG_COLORS = ['#DCE8D6', '#E8C4B9', '#E7EFE6', '#EFE3D2']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export default async function HomePage() {
  // Plantas reales de la base (con foto real); si falla, queda vacío
  let plants: { name: string; scientific: string; tag: string; color: string; img: string; slug: string }[] = []
  try {
    const featuredRaw = await getFeaturedPlants(8)
    const withImg = featuredRaw.filter(p => p.cover_image)
    plants = withImg.slice(0, 7).map((p, i) => ({
      name: p.common_name ?? '',
      scientific: p.scientific_name ?? '',
      tag: p.indoor ? 'Interior' : p.outdoor ? 'Exterior' : 'Planta',
      color: TAG_COLORS[i % TAG_COLORS.length],
      img: p.cover_image ?? '',
      slug: p.slug ?? '',
    }))
  } catch {
    plants = []
  }

  // Nombre del usuario (opcional, no rompe si no hay sesión)
  let firstName = ''
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: prof } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
      firstName = (prof?.full_name ?? '').trim().split(' ')[0]
    }
  } catch {}

  const mesActual = MESES[new Date().getMonth()]

  const cards = [
    {
      href: '/identify', label: 'Reconocer planta', desc: 'Sacá una foto',
      icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="M9 9.5l.6-.9a1 1 0 0 1 .8-.5h3.2a1 1 0 0 1 .8.5l.6.9"/></svg>),
    },
    {
      href: '/explore', label: 'Explorar especies', desc: '1000+ plantas',
      icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21V8"/><path d="M12 11C12 7 9 4 4 4c0 5 3 7 8 7z"/><path d="M12 13c0-3.3 2.5-6 6.5-6 0 4-2.5 6-6.5 6z"/></svg>),
    },
    {
      href: '/bitacora', label: 'Floración del mes', desc: `Qué florece en ${mesActual}`,
      icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2.6"/><circle cx="12" cy="5.5" r="2.4"/><circle cx="12" cy="18.5" r="2.4"/><circle cx="5.8" cy="8.7" r="2.4"/><circle cx="18.2" cy="8.7" r="2.4"/><circle cx="5.8" cy="15.3" r="2.4"/><circle cx="18.2" cy="15.3" r="2.4"/></svg>),
    },
    {
      href: '/diseno', label: 'Diseñar cantero', desc: 'Combiná con IA',
      icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13h12l-1 7a1.5 1.5 0 0 1-1.5 1.3H8.5A1.5 1.5 0 0 1 7 20l-1-7z"/><path d="M5 13h14"/><path d="M12 13V8M12 8c0-2 1.5-3.5 3.5-3.5C15.5 6.5 14 8 12 8zM12 8c0-2-1.5-3.5-3.5-3.5C8.5 6.5 10 8 12 8z"/></svg>),
    },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: color.bg, color: color.ink, fontFamily: font.sans }}>
      <Nav />

      <style>{`
        @keyframes floriaUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .fUp { animation: floriaUp 0.7s cubic-bezier(0.2,0.7,0.2,1) both; }
        .fUp2 { animation: floriaUp 0.7s cubic-bezier(0.2,0.7,0.2,1) 0.1s both; }
        .fUp3 { animation: floriaUp 0.7s cubic-bezier(0.2,0.7,0.2,1) 0.2s both; }
        .fUp4 { animation: floriaUp 0.7s cubic-bezier(0.2,0.7,0.2,1) 0.3s both; }
        .press { transition: transform 0.18s cubic-bezier(0.2,0.7,0.2,1); }
        .press:active { transform: scale(0.975); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .home-h1 { font-size: 44px; }
        @media (min-width: 640px) { .home-h1 { font-size: 58px; } }
      `}</style>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '104px 22px 40px' }}>

        {/* SALUDO EDITORIAL */}
        <p className="fUp" style={{ fontSize: '15px', color: color.green, fontWeight: 600, margin: '0 0 10px', letterSpacing: '0.2px' }}>
          {firstName ? `Hola, ${firstName}` : '¡Hola!'} <span>🌿</span>
        </p>
        <h1 className="home-h1 fUp2" style={{ fontFamily: font.serif, fontWeight: 500, color: color.ink, margin: '0 0 26px', lineHeight: 0.94, letterSpacing: '-0.8px' }}>
          ¿Qué querés<br />hacer hoy?
        </h1>

        {/* BUSCADOR — pill glass */}
        <a href="/explore" className="fUp2" style={{
          display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none',
          backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)', borderRadius: `${radius.pill}px`,
          padding: '16px 20px', border: `1px solid ${color.line}`, marginBottom: '26px',
          boxShadow: shadow.soft,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color.inkFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style={{ color: color.inkFaint, fontSize: '15px' }}>Buscar plantas, estilos, cuidados…</span>
        </a>

        {/* CARDS 2×2 — contenido inmediato */}
        <div className="fUp3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
          {cards.map(c => (
            <a key={c.href} href={c.href} className="press" style={{
              display: 'flex', flexDirection: 'column', gap: '16px', textDecoration: 'none',
              backgroundColor: color.paper, borderRadius: `${radius.lg}px`, padding: '22px 20px',
              border: `1px solid ${color.line}`, boxShadow: shadow.card, minHeight: '132px',
              justifyContent: 'space-between',
            }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: color.mist, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color.ink }}>
                {c.icon}
              </div>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '16px', fontWeight: 600, color: color.ink, letterSpacing: '-0.2px', lineHeight: 1.15 }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: '12.5px', color: color.inkSoft }}>{c.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* BITÁCORA — card destacada */}
        <a href="/bitacora" className="press fUp3" style={{
          display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
          background: `linear-gradient(150deg, ${color.ink} 0%, #14301F 100%)`,
          borderRadius: `${radius.lg}px`, padding: '20px 22px', marginBottom: '44px',
          position: 'relative', overflow: 'hidden', boxShadow: shadow.card,
        }}>
          <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,196,185,0.22), transparent 70%)' }} />
          <div style={{ width: '52px', height: '52px', borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F2E9DD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8.5 3.5v17"/><path d="M13.6 9.2c-1.4 0-2.5 1.1-2.5 2.5 1.4 0 2.5-1.1 2.5-2.5z"/><path d="M14 9.2c1.4 0 2.5 1.1 2.5 2.5-1.4 0-2.5-1.1-2.5-2.5z"/><path d="M13.8 8.6v6"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <p style={{ margin: '0 0 3px', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: color.blush }}>Nuevo</p>
            <p style={{ margin: 0, fontSize: '19px', fontWeight: 500, color: '#F2E9DD', fontFamily: font.serif, letterSpacing: '-0.2px' }}>Bitácora de jardín</p>
            <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: 'rgba(242,233,221,0.7)' }}>Planificá tus tareas mes a mes</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.sage} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, position: 'relative' }}><path d="M9 18l6-6-6-6"/></svg>
        </a>

        {/* INSPIRATE — recomendadas editorial */}
        {plants.length > 0 && (
          <section style={{ marginBottom: '44px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blushDeep }}>Inspirate</p>
                <h2 style={{ fontFamily: font.serif, fontSize: '32px', fontWeight: 500, color: color.ink, margin: 0, letterSpacing: '-0.4px', lineHeight: 1 }}>Recomendadas para vos</h2>
              </div>
              <a href="/explore" style={{ fontSize: '13px', color: color.green, fontWeight: 600, textDecoration: 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Ver todo</a>
            </div>
            <div className="no-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '6px', margin: '0 -22px', paddingLeft: '22px', paddingRight: '22px' }}>
              {plants.map(p => (
                <a key={p.slug} href={`/plant/${p.slug}`} className="press" style={{
                  minWidth: '190px', maxWidth: '190px', borderRadius: `${radius.md}px`, overflow: 'hidden',
                  textDecoration: 'none', backgroundColor: color.paper, boxShadow: shadow.card, border: `1px solid ${color.line}`,
                }}>
                  <div style={{ height: '215px', overflow: 'hidden', backgroundColor: color.mist }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '15px 16px 17px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: '15.5px', fontWeight: 600, color: color.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                    <p style={{ margin: '0 0 12px', fontSize: '12px', color: color.inkSoft, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.scientific}</p>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: p.color, color: color.ink, borderRadius: '999px', padding: '5px 12px', letterSpacing: '0.3px' }}>{p.tag}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* BANNER PRO — lujo silencioso */}
        <a href="/pricing" className="press" style={{
          display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden',
          background: `linear-gradient(155deg, ${color.ink} 0%, #0E2417 100%)`,
          borderRadius: `${radius.xl}px`, padding: '34px 28px', boxShadow: shadow.card,
        }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '210px', height: '210px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,196,185,0.22), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blush }}>Floria Pro</p>
            <h3 style={{ margin: '0 0 18px', fontFamily: font.serif, fontSize: '33px', fontWeight: 500, color: '#F2E9DD', lineHeight: 1.05, letterSpacing: '-0.4px' }}>
              Inspiración inteligente<br />para vivir rodeado de verde
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '26px' }}>
              {['IA ilimitada para tus plantas', 'Renders de canteros con IA', 'Recomendaciones para tu clima'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(242,233,221,0.85)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color.blush} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#F2E9DD', color: color.ink, padding: '14px 26px', borderRadius: '999px', fontSize: '14px', fontWeight: 700 }}>
              Activar Pro — $9.99/mes
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </a>
      </div>

      <footer style={{ padding: '32px 24px 40px', textAlign: 'center' }}>
        <p style={{ color: color.green, fontSize: '22px', fontFamily: font.serif, margin: '0 0 4px', fontWeight: 500 }}>Floria</p>
        <p style={{ color: color.inkFaint, fontSize: '11px', margin: 0, letterSpacing: '0.3px' }}>Tu espacio, tu naturaleza · © {new Date().getFullYear()}</p>
      </footer>

      <BottomNav />
    </main>
  )
}
