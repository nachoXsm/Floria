import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import FloriaLogo from '@/components/FloriaLogo'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
}

export default function HomePage() {
  const features = [
    { icon: '◎', title: 'Reconocé especies', desc: 'Subí una foto y obtené una identificación clara para empezar a cuidar mejor.' },
    { icon: '⌕', title: 'Explorá plantas', desc: 'Filtrá por luz, riego, ubicación, floración, maceta y estilo paisajístico.' },
    { icon: '✧', title: 'Diseñá tu espacio', desc: 'Encontrá combinaciones estéticas para jardines, balcones e interiores.' },
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
        @media (max-width: 767px) {
          .hero-section { padding: 96px 20px 60px !important; min-height: auto !important; }
          .hero-h1 { font-size: 52px !important; letter-spacing: -1px !important; }
          .hero-desc { font-size: 15px !important; }
          .hero-btns a { width: 100%; text-align: center; justify-content: center; }
          .hero-btns { flex-direction: column !important; }
          .hero-card { display: none !important; }
          .features-h2 { font-size: 32px !important; }
          .pricing-h2 { font-size: 36px !important; }
        }
      `}</style>

      <section className="hero-section" style={{
        minHeight: '100vh',
        padding: '132px 24px 84px',
        background: 'radial-gradient(circle at 12% 14%, #E7EFE6 0, transparent 30%), radial-gradient(circle at 86% 22%, #F2E9DD 0, transparent 30%), linear-gradient(135deg, #F9FCF8 0%, #F2E9DD 100%)',
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '56px',
          alignItems: 'center',
        }}>
          <div>
            <p style={{
              color: '#4C7F5B',
              fontSize: '12px',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              margin: '0 0 18px',
              fontWeight: 600,
            }}>Naturaleza · Diseño · Bienestar</p>
            <h1 className="hero-h1" style={{
              fontSize: 'clamp(58px, 9vw, 104px)',
              color: '#1E3D2B',
              lineHeight: 0.9,
              margin: '0 0 26px',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 500,
              letterSpacing: '-2px',
            }}>
              Tu espacio,<br />
              <em style={{ color: '#4C7F5B', fontStyle: 'italic' }}>tu naturaleza.</em>
            </h1>
            <p className="hero-desc" style={{
              fontSize: '18px',
              color: '#345E43',
              margin: '0 0 38px',
              maxWidth: '520px',
              lineHeight: 1.8,
            }}>
              Inspiración inteligente para descubrir, cuidar y diseñar con plantas desde una experiencia premium, simple y profundamente botánica.
            </p>
            <div className="hero-btns" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="/explore" style={{
                backgroundColor: '#1E3D2B',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 16px 34px rgba(30,61,43,0.24)',
              }}>Explorar plantas</a>
              <a href="/identify" style={{
                border: '1px solid #A7C4A1',
                color: '#1E3D2B',
                padding: '15px 30px',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: 'rgba(255,255,255,0.6)',
              }}>Identificar por foto</a>
            </div>
          </div>

          <div className="hero-card" style={{
            background: 'linear-gradient(160deg, #1E3D2B 0%, #0D1E15 100%)',
            borderRadius: '42px',
            padding: '28px',
            minHeight: '560px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(30,61,43,0.25)',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 75% 18%, rgba(167,196,161,0.24), transparent 28%)',
            }} />
            <div style={{ position: 'relative', display: 'grid', gap: '18px' }}>
              <div style={{
                height: '270px',
                borderRadius: '32px',
                backgroundImage: 'linear-gradient(rgba(30,61,43,0.08), rgba(30,61,43,0.25)), url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 -40px 70px rgba(13,30,21,0.28)',
              }} />
              <div style={{
                backgroundColor: '#F9FCF8',
                borderRadius: '30px',
                padding: '24px',
                boxShadow: '0 18px 45px rgba(0,0,0,0.14)',
              }}>
                <p style={{ margin: '0 0 5px', color: '#4C7F5B', fontSize: '12px', fontWeight: 600 }}>Recomendación Floria</p>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '32px',
                  margin: '0 0 8px',
                  color: '#1E3D2B',
                }}>Monstera deliciosa</h3>
                <p style={{ margin: '0 0 18px', color: '#4C7F5B', fontSize: '13px', lineHeight: 1.6 }}>
                  Interior luminoso, riego moderado y textura tropical para espacios modernos.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Luz indirecta', 'Riego moderado', 'Fácil'].map(tag => (
                    <span key={tag} style={{
                      backgroundColor: '#E7EFE6',
                      color: '#1E3D2B',
                      borderRadius: '999px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'white', padding: '90px 24px' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#4C7F5B', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, margin: '0 0 14px' }}>Floria</p>
          <h2 className="features-h2" style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(38px, 5vw, 58px)',
            color: '#1E3D2B',
            margin: '0 0 48px',
            fontWeight: 500,
          }}>
            Todo lo que necesitás para diseñar con plantas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px' }}>
            {features.map((f) => (
              <div key={f.title} style={{
                padding: '34px 26px',
                borderRadius: '28px',
                border: '1px solid #E7EFE6',
                backgroundColor: '#F9FCF8',
                boxShadow: '0 18px 42px rgba(30,61,43,0.06)',
                textAlign: 'left',
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '18px',
                  backgroundColor: '#E7EFE6',
                  color: '#1E3D2B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '22px',
                }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', color: '#1E3D2B', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#4C7F5B', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#1E3D2B', padding: '90px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 className="pricing-h2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '52px', color: '#F9FCF8', margin: '0 0 16px', fontWeight: 500 }}>
            Empezá gratis
          </h2>
          <p style={{ color: '#C5D9C2', fontSize: '17px', margin: '0 0 42px', lineHeight: 1.7 }}>
            Explorá el catálogo sin costo. Activá Pro para IA ilimitada, jardines sin límite y exportaciones profesionales.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px', textAlign: 'left' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '30px', padding: '30px', border: '1px solid rgba(231,239,230,0.16)' }}>
              <p style={{ color: '#A7C4A1', fontSize: '13px', margin: '0 0 8px', fontWeight: 600 }}>Free</p>
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '46px', color: 'white', margin: '0 0 22px' }}>$0</p>
              <ul style={{ color: '#E7EFE6', fontSize: '14px', lineHeight: 2.1, paddingLeft: '0', listStyle: 'none', margin: '0 0 24px' }}>
                <li>✓ 10 búsquedas por día</li>
                <li>✓ 3 identificaciones por mes</li>
                <li>✓ 1 jardín guardado</li>
              </ul>
              <a href="/auth/login" style={{
                display: 'block', textAlign: 'center', backgroundColor: '#E7EFE6',
                color: '#1E3D2B', padding: '13px', borderRadius: '999px',
                textDecoration: 'none', fontSize: '13px', fontWeight: 600,
              }}>Registrarse gratis</a>
            </div>
            <div style={{ backgroundColor: '#F9FCF8', borderRadius: '30px', padding: '30px', border: '1px solid #A7C4A1', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
              <p style={{ color: '#4C7F5B', fontSize: '13px', margin: '0 0 8px', fontWeight: 600 }}>Pro</p>
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '46px', color: '#1E3D2B', margin: '0 0 22px' }}>
                $9.99<span style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontSize: '15px', color: '#4C7F5B' }}>/mes</span>
              </p>
              <ul style={{ color: '#345E43', fontSize: '14px', lineHeight: 2.1, paddingLeft: '0', listStyle: 'none', margin: '0 0 24px' }}>
                <li>✓ IA ilimitada</li>
                <li>✓ Jardines sin límite</li>
                <li>✓ Exportar PDF / PNG</li>
                <li>✓ Combinaciones automáticas</li>
              </ul>
              <a href="/pricing" style={{
                display: 'block', textAlign: 'center', backgroundColor: '#1E3D2B',
                color: 'white', padding: '13px', borderRadius: '999px',
                textDecoration: 'none', fontSize: '13px', fontWeight: 600,
              }}>Activar Pro</a>
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
