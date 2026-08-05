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
  let plants: { name: string; scientific: string; tag: string; color: string; img: string; slug: string }[] = []
  let heroImg = ''
  try {
    const featuredRaw = await getFeaturedPlants(9)
    const withImg = featuredRaw.filter(p => p.cover_image)
    heroImg = withImg[0]?.cover_image ?? ''
    plants = withImg.slice(1, 8).map((p, i) => ({
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

  // Íconos premium — recreados fieles al brand kit (trazo fino, redondeado, con detalle)
  const Icon = {
    reconocer: (<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V6.2A2.2 2.2 0 0 1 6.2 4H8"/><path d="M16 4h1.8A2.2 2.2 0 0 1 20 6.2V8"/><path d="M20 16v1.8a2.2 2.2 0 0 1-2.2 2.2H16"/><path d="M8 20H6.2A2.2 2.2 0 0 1 4 17.8V16"/><path d="M12 15.5c1.8 0 3-1.5 3-3.2 0-1.8-1.4-3.3-3-3.3"/><path d="M12 9c-1.7 0-3 1.6-3 3.3 0 .9.3 1.7.9 2.3"/><path d="M12 9c1.6-.6 2-2 1.6-3.4C12.2 6 11.6 7.5 12 9z"/></svg>),
    explorar: (<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.5V11"/><path d="M12 13.5C10.7 9.4 7.4 7 3 7c0 4.6 3.3 7.4 9 6.5z"/><path d="M4.5 9C7.2 10.5 9.8 12 12 13.5"/><path d="M12 11.5c1.1-3.3 4-5.2 8-4.6-.5 4-3.2 5.9-8 4.6z"/><path d="M19 8.2C16.6 9.4 14.2 10.6 12 11.5"/></svg>),
    floracion: (<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2.4"/><g><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1"/><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1" transform="rotate(120 12 12)"/><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1" transform="rotate(180 12 12)"/><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1" transform="rotate(240 12 12)"/><ellipse cx="12" cy="6.4" rx="1.9" ry="3.1" transform="rotate(300 12 12)"/></g></svg>),
    disenar: (<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 13.5h11l-1.1 6a1.6 1.6 0 0 1-1.55 1.3H9.15A1.6 1.6 0 0 1 7.6 19.5z"/><path d="M5.5 13.5h13"/><path d="M12 13.5V9"/><path d="M12 9c0-2.1 1.6-3.4 3.6-3.4C15.6 7.7 14 9 12 9z"/><path d="M12 9c0-2.1-1.6-3.4-3.6-3.4C8.4 7.7 10 9 12 9z"/></svg>),
  }

  const cards = [
    { href: '/identify', label: 'Reconocer planta', desc: 'Sacá una foto', icon: Icon.reconocer },
    { href: '/explore', label: 'Explorar especies', desc: '1000+ plantas', icon: Icon.explorar },
    { href: '/bitacora', label: 'Floración del mes', desc: `Qué florece en ${mesActual}`, icon: Icon.floracion },
    { href: '/diseno', label: 'Diseñar cantero', desc: 'Combiná con IA', icon: Icon.disenar },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: color.bg, color: color.ink, fontFamily: font.sans }}>
      <Nav />

      <style>{`
        @keyframes floriaUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floriaScale { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        .fUp { animation: floriaUp 0.8s cubic-bezier(0.2,0.7,0.2,1) both; }
        .fUp2 { animation: floriaUp 0.8s cubic-bezier(0.2,0.7,0.2,1) 0.12s both; }
        .fUp3 { animation: floriaUp 0.8s cubic-bezier(0.2,0.7,0.2,1) 0.24s both; }
        .heroImg { animation: floriaScale 1.4s cubic-bezier(0.2,0.7,0.2,1) both; }
        .press { transition: transform 0.18s cubic-bezier(0.2,0.7,0.2,1); }
        .press:active { transform: scale(0.97); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .home-hero-h1 { font-size: 42px; }
        @media (min-width: 640px) { .home-hero-h1 { font-size: 56px; } }
      `}</style>

      {/* ===== PORTADA — foto full-bleed ===== */}
      <section style={{ position: 'relative', width: '100%', height: '64vh', minHeight: '460px', overflow: 'hidden' }}>
        {heroImg ? (
          <img className="heroImg" src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg, ${color.green}, ${color.ink})` }} />
        )}
        {/* Scrim editorial */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,30,20,0.28) 0%, transparent 26%, transparent 42%, rgba(15,30,20,0.55) 82%, rgba(15,30,20,0.72) 100%)' }} />
        {/* Texto portada */}
        <div className="fUp2" style={{ position: 'absolute', left: 0, right: 0, bottom: '52px', padding: '0 26px', maxWidth: '720px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(232,196,185,0.95)' }}>
            Tu jardín · {mesActual}
          </p>
          <h1 className="home-hero-h1" style={{ fontFamily: font.serif, fontWeight: 500, color: '#FBF7F0', margin: 0, lineHeight: 0.94, letterSpacing: '-0.8px', textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>
            {firstName ? `Hola, ${firstName}.` : 'Bienvenido.'}<br />¿Qué querés hacer hoy?
          </h1>
        </div>
      </section>

      {/* ===== HOJA DE CONTENIDO superpuesta ===== */}
      <div style={{
        position: 'relative', marginTop: '-30px', backgroundColor: color.bg,
        borderRadius: '34px 34px 0 0', paddingTop: '10px', zIndex: 2,
      }}>
        {/* Handle */}
        <div style={{ width: '38px', height: '5px', borderRadius: '999px', backgroundColor: color.line, margin: '10px auto 4px' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '18px 22px 40px' }}>
          {/* Buscador */}
          <a href="/explore" className="fUp" style={{
            display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none',
            backgroundColor: color.paper, borderRadius: `${radius.pill}px`,
            padding: '16px 20px', border: `1px solid ${color.line}`, marginBottom: '26px',
            boxShadow: shadow.soft,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color.inkFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span style={{ color: color.inkFaint, fontSize: '15px' }}>Buscar plantas, estilos, cuidados…</span>
          </a>

          {/* Cards 2×2 */}
          <div className="fUp" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            {cards.map(c => (
              <a key={c.href} href={c.href} className="press" style={{
                display: 'flex', flexDirection: 'column', gap: '18px', textDecoration: 'none',
                backgroundColor: color.paper, borderRadius: `${radius.lg}px`, padding: '22px 20px',
                border: `1px solid ${color.line}`, boxShadow: shadow.card, minHeight: '138px',
                justifyContent: 'space-between',
              }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: color.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color.ink }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ margin: '0 0 3px', fontSize: '16.5px', fontWeight: 600, color: color.ink, letterSpacing: '-0.2px', lineHeight: 1.15 }}>{c.label}</p>
                  <p style={{ margin: 0, fontSize: '12.5px', color: color.inkSoft }}>{c.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Bitácora */}
          <a href="/bitacora" className="press" style={{
            display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
            background: color.ink, borderRadius: `${radius.lg}px`, padding: '20px 22px', marginBottom: '46px',
            boxShadow: shadow.card,
          }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '15px', backgroundColor: 'rgba(242,233,221,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color.blush} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8.5 3.5v17"/><path d="M13.6 9.2c-1.4 0-2.5 1.1-2.5 2.5 1.4 0 2.5-1.1 2.5-2.5z"/><path d="M14 9.2c1.4 0 2.5 1.1 2.5 2.5-1.4 0-2.5-1.1-2.5-2.5z"/><path d="M13.8 8.6v6"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 3px', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: color.blush }}>Nuevo</p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 500, color: '#F2E9DD', fontFamily: font.serif, letterSpacing: '-0.2px' }}>Bitácora de jardín</p>
              <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: 'rgba(242,233,221,0.65)' }}>Planificá tus tareas mes a mes</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color.sage} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
          </a>

          {/* Inspirate */}
          {plants.length > 0 && (
            <section style={{ marginBottom: '46px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blushDeep }}>Inspirate</p>
                  <h2 style={{ fontFamily: font.serif, fontSize: '32px', fontWeight: 500, color: color.ink, margin: 0, letterSpacing: '-0.4px', lineHeight: 1 }}>Recomendadas</h2>
                </div>
                <a href="/explore" style={{ fontSize: '13px', color: color.green, fontWeight: 600, textDecoration: 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Ver todo</a>
              </div>
              <div className="no-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '6px', margin: '0 -22px', paddingLeft: '22px', paddingRight: '22px' }}>
                {plants.map(p => (
                  <a key={p.slug} href={`/plant/${p.slug}`} className="press" style={{
                    minWidth: '192px', maxWidth: '192px', borderRadius: `${radius.md}px`, overflow: 'hidden',
                    textDecoration: 'none', backgroundColor: color.paper, boxShadow: shadow.card, border: `1px solid ${color.line}`,
                  }}>
                    <div style={{ height: '220px', overflow: 'hidden', backgroundColor: color.mist }}>
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

          {/* Banner Pro */}
          <a href="/pricing" className="press" style={{
            display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden',
            backgroundColor: color.ink, borderRadius: `${radius.xl}px`, padding: '34px 28px', boxShadow: shadow.card,
          }}>
            <div style={{ position: 'relative' }}>
              <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blush }}>Floria Pro</p>
              <h3 style={{ margin: '0 0 20px', fontFamily: font.serif, fontSize: '33px', fontWeight: 500, color: '#F2E9DD', lineHeight: 1.05, letterSpacing: '-0.4px' }}>
                Inspiración inteligente<br />para vivir rodeado de verde
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}>
                {['IA ilimitada para tus plantas', 'Renders de canteros con IA', 'Recomendaciones para tu clima'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '14px', color: 'rgba(242,233,221,0.82)' }}>
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

        <footer style={{ padding: '20px 24px 40px', textAlign: 'center' }}>
          <p style={{ color: color.green, fontSize: '22px', fontFamily: font.serif, margin: '0 0 4px', fontWeight: 500 }}>Floria</p>
          <p style={{ color: color.inkFaint, fontSize: '11px', margin: 0, letterSpacing: '0.3px' }}>Tu espacio, tu naturaleza · © {new Date().getFullYear()}</p>
        </footer>
      </div>

      <BottomNav />
    </main>
  )
}
