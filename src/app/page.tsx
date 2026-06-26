import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
}

export default function HomePage() {
  const filters = [
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>), label: 'Sol pleno' },
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10a6 6 0 1 0-12 0"/><path d="M3 10h18"/><path d="M12 2v2"/></svg>), label: 'Media sombra' },
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>), label: 'Bajo riego' },
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V13M12 13C12 13 7 11 5 7c3 0 5.5 1.5 7 6zM12 13c0 0 5-2 7-6-3 0-5.5 1.5-7 6z"/><path d="M5 17h14"/></svg>), label: 'Maceta' },
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>), label: 'Interior' },
    { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2C6.5 2 4 7 4 12s2.5 10 8 10"/><path d="M12 22V12M12 12C8 8 4 9 2 12M12 12c4-4 8-3 10 0"/></svg>), label: 'Huerta' },
  ]

  const featured = [
    { name: 'Lavanda', scientific: 'Lavandula angustifolia', tag: 'Bajo mantenimiento', color: '#E8C4B8', img: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&q=80' },
    { name: 'Strelitzia', scientific: 'Strelitzia reginae', tag: 'Sol pleno', color: '#C5D9C2', img: 'https://images.unsplash.com/photo-1594912772571-5d4da9be4ff6?w=400&q=80' },
    { name: 'Helecho', scientific: 'Nephrolepis exaltata', tag: 'Media sombra', color: '#D4E8D0', img: 'https://images.unsplash.com/photo-1597305877032-0668a3702419?w=400&q=80' },
  ]

  const quickActions = [
    { href: '/identify', label: 'Identificar\npor foto', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>) },
    { href: '/explore', label: 'Explorar\nplantas', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>) },
    { href: '/explore?filter=true', label: 'Filtrar por\nnecesidades', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>) },
    { href: '/diseno', label: 'Combinar\nplantas', icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 17.5h7M17.5 14v7"/></svg>) },
  ]

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#F2E9DD',
      color: '#1E3D2B',
      fontFamily: 'Montserrat, system-ui, sans-serif',
    }}>
      <Nav />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fade1 { animation: fadeUp 0.6s ease both; }
        .fade2 { animation: fadeUp 0.6s ease 0.12s both; }
        .fade3 { animation: fadeUp 0.6s ease 0.24s both; }
        .fade4 { animation: fadeUp 0.6s ease 0.36s both; }
        .tap-card:active { transform: scale(0.97); }
        @media (max-width: 767px) {
          .hero-h1 { font-size: 42px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img { height: 260px !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{
        paddingTop: '88px',
        paddingBottom: '0',
        backgroundColor: '#F2E9DD',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 0' }}>
          {/* Saludo */}
          <p className="fade1" style={{ fontSize: '13px', color: '#4C7F5B', fontWeight: 600, margin: '0 0 8px', letterSpacing: '0.5px' }}>
            ¡Hola! 👋
          </p>
          <h1 className="hero-h1 fade2" style={{
            fontSize: '52px',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            color: '#1E3D2B',
            margin: '0 0 6px',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1px',
          }}>
            ¿Qué querés<br />hacer hoy?
          </h1>
          <p className="fade3" style={{ fontSize: '14px', color: '#4C7F5B', margin: '0 0 28px', lineHeight: 1.6 }}>
            Identificá, explorá y diseñá con plantas.
          </p>

          {/* Buscador */}
          <div className="fade3" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px', padding: '13px 18px',
            border: '1px solid rgba(30,61,43,0.1)',
            marginBottom: '28px',
            boxShadow: '0 2px 12px rgba(30,61,43,0.06)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A7C4A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <a href="/explore" style={{ textDecoration: 'none', color: '#A7C4A1', fontSize: '14px', flex: 1 }}>Buscar plantas, estilos, cuidados…</a>
          </div>

          {/* Acciones rápidas */}
          <div className="fade4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '36px' }}>
            {quickActions.map(a => (
              <a key={a.href} href={a.href} className="tap-card" style={{
                display: 'flex', flexDirection: 'column', gap: '10px',
                backgroundColor: a.href === '/jardinero' ? '#1E3D2B' : 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px', padding: '20px',
                textDecoration: 'none',
                border: '1px solid rgba(30,61,43,0.08)',
                boxShadow: '0 2px 12px rgba(30,61,43,0.06)',
                transition: 'transform 0.15s',
              }}>
                <span style={{ color: a.href === '/jardinero' ? '#A7C4A1' : '#1E3D2B' }}>{a.icon}</span>
                <span style={{
                  fontSize: '13px', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.3,
                  color: a.href === '/jardinero' ? '#F2E9DD' : '#1E3D2B',
                }}>{a.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Imagen hero desbordante */}
        <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80"
            alt="Plantas"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(242,233,221,0.5) 0%, transparent 30%, transparent 60%, rgba(242,233,221,0.8) 100%)',
          }}/>
          {/* Chip flotante */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '20px',
            backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
            borderRadius: '14px', padding: '10px 16px',
            boxShadow: '0 4px 20px rgba(30,61,43,0.12)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#E7EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E3D2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#1E3D2B' }}>1000+ plantas</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#4C7F5B' }}>identificadas con IA</p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTROS RÁPIDOS */}
      <section style={{ backgroundColor: '#F2E9DD', padding: '32px 20px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: '#1E3D2B' }}>Explorar</h2>
            <a href="/explore" style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600, textDecoration: 'none' }}>Ver todas</a>
          </div>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {filters.map(f => (
              <a key={f.label} href={`/explore`} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px', padding: '14px 16px',
                textDecoration: 'none', minWidth: '72px',
                border: '1px solid rgba(30,61,43,0.07)',
                boxShadow: '0 2px 8px rgba(30,61,43,0.05)',
              }}>
                <span style={{ color: '#1E3D2B' }}>{f.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4C7F5B', whiteSpace: 'nowrap' }}>{f.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMENDADAS */}
      <section style={{ backgroundColor: '#F2E9DD', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: '#1E3D2B' }}>Recomendadas para vos</h2>
            <a href="/explore" style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600, textDecoration: 'none' }}>Ver todo</a>
          </div>
          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {featured.map(p => (
              <a key={p.name} href="/explore" className="tap-card" style={{
                minWidth: '160px', maxWidth: '160px', borderRadius: '20px',
                overflow: 'hidden', textDecoration: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 18px rgba(30,61,43,0.09)',
                border: '1px solid rgba(30,61,43,0.06)',
                transition: 'transform 0.15s',
              }}>
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 700, color: '#1E3D2B' }}>{p.name}</p>
                  <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#4C7F5B', fontStyle: 'italic' }}>{p.scientific}</p>
                  <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: p.color, color: '#1E3D2B', borderRadius: '999px', padding: '4px 10px' }}>{p.tag}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER PRO */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: '#1E3D2B',
            borderRadius: '24px', padding: '28px 24px',
            display: 'flex', flexDirection: 'column', gap: '16px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position:'absolute', right:'-20px', top:'-20px', width:'150px', height:'150px', borderRadius:'50%', background:'radial-gradient(circle, rgba(167,196,161,0.15), transparent 70%)' }}/>
            <div>
              <p style={{ margin:'0 0 4px', fontSize:'11px', fontWeight:700, color:'#A7C4A1', letterSpacing:'2px', textTransform:'uppercase' }}>Floria Pro</p>
              <h3 style={{ margin:'0 0 8px', fontFamily:'Cormorant Garamond, serif', fontSize:'28px', color:'white', fontWeight:600 }}>
                Inspiración inteligente para vivir rodeado de verde.
              </h3>
              <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:'6px' }}>
                {['Para cada clima y espacio','Recomendaciones personalizadas','Renders de canteros con IA'].map(item => (
                  <li key={item} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#C5D9C2' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A7C4A1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <a href="/pricing" style={{ flex:1, textAlign:'center', backgroundColor:'#F2E9DD', color:'#1E3D2B', padding:'13px', borderRadius:'999px', textDecoration:'none', fontSize:'13px', fontWeight:700 }}>
                Activar Pro — $9.99/mes
              </a>
            </div>
            <p style={{ margin:0, fontSize:'11px', color:'#4C7F5B', textAlign:'center' }}>NATURALEZA · DISEÑO · BIENESTAR</p>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#1E3D2B', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#A7C4A1', fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', margin: '0 0 4px', fontWeight: 600 }}>Floria</p>
        <p style={{ color: '#4C7F5B', fontSize: '11px', margin: 0 }}>Tu espacio, tu naturaleza. © {new Date().getFullYear()}</p>
      </footer>

      <BottomNav />
    </main>
  )
}
