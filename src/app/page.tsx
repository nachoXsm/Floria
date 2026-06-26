import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import FloriaLogo from '@/components/FloriaLogo'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
}

export default function HomePage() {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"/>
          <path d="M21 21l-4-4"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      ),
      title: 'Reconocé especies',
      desc: 'Subí una foto y obtené una identificación clara para empezar a cuidar mejor.',
      accent: '#4C7F5B',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C9 2 6 5 6 9c0 2.5 1.5 4.5 3 6l1 1h4l1-1c1.5-1.5 3-3.5 3-6 0-4-3-7-6-7z"/>
          <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
          <path d="M9 12c1-1 3-1 3 1s2 2 3 1"/>
        </svg>
      ),
      title: 'Explorá plantas',
      desc: 'Filtrá por luz, riego, ubicación, floración, maceta y estilo paisajístico.',
      accent: '#C4773B',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="2"/>
          <rect x="14" y="3" width="7" height="7" rx="2"/>
          <rect x="3" y="14" width="7" height="7" rx="2"/>
          <path d="M14 17.5h7M17.5 14v7"/>
        </svg>
      ),
      title: 'Diseñá tu espacio',
      desc: 'Encontrá combinaciones estéticas para jardines, balcones e interiores.',
      accent: '#6B5B95',
    },
  ]

  const sections = [
    {
      href: '/explore',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>),
      label: 'Explorar', color: 'linear-gradient(135deg, #E7EFE6 0%, #D4E8D0 100%)', textColor: '#1E3D2B',
    },
    {
      href: '/identify',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>),
      label: 'Identificar', color: 'linear-gradient(135deg, #EDF7ED 0%, #D8EED8 100%)', textColor: '#1E3D2B',
    },
    {
      href: '/jardinero',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V12l3 3-3 3v1a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-1l-3-3 3-3V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z"/></svg>),
      label: 'Jardinero IA', color: 'linear-gradient(135deg, #1E3D2B 0%, #0D2B1B 100%)', textColor: '#A7C4A1',
    },
    {
      href: '/huerta',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2C6.5 2 4 7 4 12s2.5 10 8 10"/><path d="M12 22V12"/><path d="M12 12C8 8 4 9 2 12"/><path d="M12 12c4-4 8-3 10 0"/></svg>),
      label: 'Mi Huerta', color: 'linear-gradient(135deg, #FDF3E3 0%, #F5E4C8 100%)', textColor: '#7A5C1E',
    },
    {
      href: '/luna',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>),
      label: 'Lunar', color: 'linear-gradient(135deg, #0D1E15 0%, #162B1F 100%)', textColor: '#C5D9C2',
    },
    {
      href: '/plagas',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="13" rx="4" ry="5"/><path d="M12 8V5"/><path d="M8 13H4M20 13h-4"/><path d="M5.5 8.5l2.5 2.5M16 11l2.5-2.5"/><path d="M5.5 17.5l2.5-2M16 15.5l2.5 2"/><circle cx="12" cy="4" r="1.2"/></svg>),
      label: 'Plagas', color: 'linear-gradient(135deg, #FEF0EE 0%, #FAD9D4 100%)', textColor: '#8B3A2F',
    },
    {
      href: '/viveros',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V13"/><path d="M12 13C12 13 7 11 5 7c3 0 5.5 1.5 7 6z"/><path d="M12 13c0 0 5-2 7-6-3 0-5.5 1.5-7 6z"/><path d="M5 17h14"/><path d="M3 22h18"/></svg>),
      label: 'Viveros', color: 'linear-gradient(135deg, #FDF3E3 0%, #F0E2C4 100%)', textColor: '#7A5C1E',
    },
    {
      href: '/diseno',
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M4 20V10l8-7 8 7v10"/><path d="M9 20v-5h6v5"/></svg>),
      label: 'Diseño IA', color: 'linear-gradient(135deg, #EDE9F6 0%, #D8D0F0 100%)', textColor: '#4B3A8C',
    },
  ]

  return (
    <main className="mobile-page-pb" style={{
      minHeight: '100vh',
      backgroundColor: '#F9FCF8',
      color: '#1E3D2B',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      overflow: 'hidden',
    }}>

      <Nav />

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .hero-float { animation: float 5s ease-in-out infinite; }
        .hero-fadein { animation: fadeUp 0.7s ease both; }
        .hero-fadein-2 { animation: fadeUp 0.7s ease 0.15s both; }
        .hero-fadein-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .section-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(30,61,43,0.13) !important; }
        @media (max-width: 767px) {
          .hero-section { padding: 96px 20px 64px !important; min-height: auto !important; }
          .hero-h1 { font-size: 54px !important; letter-spacing: -1px !important; }
          .hero-desc { font-size: 15px !important; }
          .hero-btns a { width: 100%; text-align: center; justify-content: center; }
          .hero-btns { flex-direction: column !important; }
          .hero-card { display: none !important; }
          .features-h2 { font-size: 32px !important; }
          .pricing-h2 { font-size: 36px !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section" style={{
        minHeight: '100vh',
        padding: '132px 24px 84px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #F9FCF8 0%, #EEF7ED 40%, #F5EDE2 100%)',
      }}>
        {/* Elemento decorativo - círculo de luz */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,119,59,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '60px', left: '-60px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,127,91,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Patrón botánico SVG de fondo */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 10 C20 10 10 30 40 40 C70 30 60 10 40 10Z" fill="#1E3D2B"/>
              <path d="M40 10 L40 40" stroke="#1E3D2B" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf)"/>
        </svg>

        <div style={{
          maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '56px', alignItems: 'center',
        }}>
          <div>
            {/* Badge */}
            <div className="hero-fadein" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(196,119,59,0.12)',
              border: '1px solid rgba(196,119,59,0.25)',
              borderRadius: '999px', padding: '6px 14px',
              marginBottom: '24px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C4773B', display: 'block' }}/>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C4773B' }}>
                Naturaleza · Diseño · IA
              </span>
            </div>

            <h1 className="hero-h1 hero-fadein-2" style={{
              fontSize: 'clamp(58px, 9vw, 104px)',
              color: '#1E3D2B',
              lineHeight: 0.9,
              margin: '0 0 28px',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 600,
              letterSpacing: '-2px',
            }}>
              Tu espacio,<br />
              <em style={{ color: '#C4773B', fontStyle: 'italic' }}>tu naturaleza.</em>
            </h1>

            <p className="hero-desc hero-fadein-3" style={{
              fontSize: '17px', color: '#345E43', margin: '0 0 38px',
              maxWidth: '480px', lineHeight: 1.85,
            }}>
              Inspiración inteligente para descubrir, cuidar y diseñar con plantas — desde una experiencia premium y profundamente botánica.
            </p>

            <div className="hero-btns hero-fadein-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/explore" style={{
                backgroundColor: '#1E3D2B', color: 'white',
                padding: '16px 32px', borderRadius: '999px',
                textDecoration: 'none', fontSize: '14px', fontWeight: 700,
                boxShadow: '0 16px 40px rgba(30,61,43,0.28)',
                letterSpacing: '0.3px',
              }}>Explorar plantas</a>
              <a href="/identify" style={{
                border: '1.5px solid rgba(30,61,43,0.2)',
                color: '#1E3D2B', padding: '16px 32px', borderRadius: '999px',
                textDecoration: 'none', fontSize: '14px', fontWeight: 700,
                backgroundColor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.3px',
              }}>Identificar por foto</a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px' }}>
              {[['1000+','Plantas'], ['IA','Identificación'], ['Free','Para empezar']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#1E3D2B' }}>{n}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#4C7F5B', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="hero-card" style={{
            background: 'linear-gradient(160deg, #1E3D2B 0%, #0D1E15 100%)',
            borderRadius: '42px', padding: '28px',
            minHeight: '560px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(30,61,43,0.30)',
          }}>
            <div style={{ position:'absolute', top:'20px', right:'20px', width:'160px', height:'160px', borderRadius:'50%', background:'radial-gradient(circle, rgba(196,119,59,0.18), transparent 70%)' }}/>
            <div style={{ position: 'relative', display: 'grid', gap: '18px' }}>
              <div style={{
                height: '270px', borderRadius: '32px',
                backgroundImage: 'linear-gradient(rgba(30,61,43,0.08), rgba(30,61,43,0.28)), url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                boxShadow: 'inset 0 -40px 70px rgba(13,30,21,0.28)',
              }} />
              <div style={{ backgroundColor: '#F9FCF8', borderRadius: '30px', padding: '24px', boxShadow: '0 18px 45px rgba(0,0,0,0.14)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#C4773B', display:'block' }}/>
                  <p style={{ margin:0, color:'#C4773B', fontSize:'11px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' }}>Recomendación Floria</p>
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'30px', margin:'0 0 8px', color:'#1E3D2B' }}>Monstera deliciosa</h3>
                <p style={{ margin:'0 0 16px', color:'#4C7F5B', fontSize:'13px', lineHeight:1.6 }}>
                  Interior luminoso, riego moderado y textura tropical para espacios modernos.
                </p>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {['Luz indirecta','Riego moderado','Fácil'].map(tag => (
                    <span key={tag} style={{ backgroundColor:'#E7EFE6', color:'#1E3D2B', borderRadius:'999px', padding:'7px 12px', fontSize:'11px', fontWeight:700 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ backgroundColor: '#F9FCF8', padding: '90px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#C4773B', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, margin: '0 0 12px' }}>Para vos</p>
          <h2 className="features-h2" style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(38px, 5vw, 58px)',
            color: '#1E3D2B', margin: '0 0 52px', fontWeight: 600,
          }}>
            Todo lo que necesitás<br />para diseñar con plantas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map((f) => (
              <div key={f.title} className="section-card" style={{
                padding: '36px 28px', borderRadius: '28px',
                border: '1px solid rgba(231,239,230,0.8)',
                backgroundColor: 'white',
                boxShadow: '0 8px 30px rgba(30,61,43,0.06)',
                textAlign: 'left',
                borderLeft: `4px solid ${f.accent}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '16px',
                  backgroundColor: `${f.accent}18`,
                  color: f.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '22px',
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', color: '#1E3D2B', margin: '0 0 10px', fontWeight: 600 }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#4C7F5B', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORÁ FLORIA */}
      <section style={{ backgroundColor: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <p style={{ color: '#C4773B', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, margin: '0 0 10px', textAlign: 'center' }}>Navegá la app</p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(34px, 5vw, 52px)', color: '#1E3D2B',
            margin: '0 0 40px', fontWeight: 600, textAlign: 'center',
          }}>Explorá Floria</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '14px' }}>
            {sections.map(s => (
              <a key={s.href} href={s.href} className="section-card" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '22px 18px', borderRadius: '24px', textDecoration: 'none',
                background: s.color, minHeight: '118px',
                boxShadow: '0 4px 18px rgba(30,61,43,0.08)',
                border: '1px solid rgba(255,255,255,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.textColor,
                }}>{s.icon}</div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: s.textColor, lineHeight: 1.3, marginTop: '14px' }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{
        padding: '90px 24px', textAlign: 'center',
        background: 'linear-gradient(145deg, #1E3D2B 0%, #0D2B1B 60%, #1A2E10 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', top:'-100px', left:'50%', transform:'translateX(-50%)', width:'600px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, rgba(196,119,59,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ display:'inline-block', backgroundColor:'rgba(196,119,59,0.18)', border:'1px solid rgba(196,119,59,0.3)', borderRadius:'999px', padding:'6px 16px', fontSize:'11px', fontWeight:700, color:'#C4773B', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'20px' }}>Planes</span>
          <h2 className="pricing-h2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '52px', color: '#F9FCF8', margin: '0 0 16px', fontWeight: 600 }}>
            Empezá gratis
          </h2>
          <p style={{ color: '#A7C4A1', fontSize: '17px', margin: '0 0 48px', lineHeight: 1.8 }}>
            Explorá el catálogo sin costo. Activá Pro para IA ilimitada, jardines sin límite y exportaciones profesionales.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px', textAlign: 'left' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '30px', padding: '32px', border: '1px solid rgba(231,239,230,0.12)' }}>
              <p style={{ color: '#A7C4A1', fontSize: '12px', margin: '0 0 8px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Free</p>
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '52px', color: 'white', margin: '0 0 24px', fontWeight: 500, lineHeight: 1 }}>$0</p>
              <ul style={{ color: '#C5D9C2', fontSize: '14px', lineHeight: 2.2, paddingLeft: '0', listStyle: 'none', margin: '0 0 26px' }}>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#4C7F5B', fontWeight:700 }}>✓</span> 10 búsquedas por día</li>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#4C7F5B', fontWeight:700 }}>✓</span> 3 identificaciones por mes</li>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#4C7F5B', fontWeight:700 }}>✓</span> 1 jardín guardado</li>
              </ul>
              <a href="/auth/login" style={{ display:'block', textAlign:'center', backgroundColor:'rgba(255,255,255,0.12)', color:'white', padding:'14px', borderRadius:'999px', textDecoration:'none', fontSize:'13px', fontWeight:700, border:'1px solid rgba(255,255,255,0.2)' }}>Registrarse gratis</a>
            </div>
            <div style={{ backgroundColor: '#F9FCF8', borderRadius: '30px', padding: '32px', border: '2px solid #C4773B', boxShadow: '0 30px 70px rgba(0,0,0,0.22), 0 0 0 1px rgba(196,119,59,0.15)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px' }}>
                <p style={{ color:'#C4773B', fontSize:'12px', margin:0, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase' }}>Pro</p>
                <span style={{ backgroundColor:'#C4773B', color:'white', borderRadius:'999px', padding:'3px 10px', fontSize:'10px', fontWeight:700 }}>POPULAR</span>
              </div>
              <p style={{ fontFamily:'Cormorant Garamond, Georgia, serif', fontSize:'52px', color:'#1E3D2B', margin:'0 0 24px', fontWeight:500, lineHeight:1 }}>
                $9.99<span style={{ fontFamily:'Montserrat, system-ui, sans-serif', fontSize:'14px', color:'#4C7F5B' }}>/mes</span>
              </p>
              <ul style={{ color:'#345E43', fontSize:'14px', lineHeight:2.2, paddingLeft:'0', listStyle:'none', margin:'0 0 26px' }}>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#C4773B', fontWeight:700 }}>✓</span> IA ilimitada</li>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#C4773B', fontWeight:700 }}>✓</span> Jardines sin límite</li>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#C4773B', fontWeight:700 }}>✓</span> Renders de canteros</li>
                <li style={{ display:'flex', alignItems:'center', gap:'10px' }}><span style={{ color:'#C4773B', fontWeight:700 }}>✓</span> Combinaciones automáticas</li>
              </ul>
              <a href="/pricing" style={{ display:'block', textAlign:'center', backgroundColor:'#1E3D2B', color:'white', padding:'14px', borderRadius:'999px', textDecoration:'none', fontSize:'13px', fontWeight:700, boxShadow:'0 8px 24px rgba(30,61,43,0.3)' }}>Activar Pro</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#0D1E15', padding: '54px 24px', textAlign: 'center' }}>
        <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
          <FloriaLogo variant="full" size={36} color="#A7C4A1" textColor="#C5D9C2" />
        </div>
        <p style={{ color: '#A7C4A1', fontSize: '13px', margin: '0 0 4px' }}>Tu espacio, tu naturaleza.</p>
        <p style={{ color: '#4C7F5B', fontSize: '11px', margin: 0 }}>© {new Date().getFullYear()} Floria</p>
      </footer>

      <BottomNav />
    </main>
  )
}
