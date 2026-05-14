import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
}

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'white', borderBottom: '1px solid #E7EFE6',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '64px'
      }}>
        <span style={{ fontSize: '22px', fontWeight: 600, color: '#1E3D2B' }}>🌿 Floria</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/auth/login" style={{ color: '#4C7F5B', textDecoration: 'none', fontSize: '14px' }}>Iniciar sesión</a>
          <a href="/auth/signup" style={{
            backgroundColor: '#1E3D2B', color: 'white', padding: '8px 20px',
            borderRadius: '999px', textDecoration: 'none', fontSize: '14px'
          }}>Registrarse</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', padding: '140px 24px 80px' }}>
        <p style={{ color: '#4C7F5B', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Naturaleza · Diseño · Bienestar
        </p>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', color: '#1E3D2B', lineHeight: 1.1, marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          Tu espacio,<br />
          <em>tu naturaleza.</em>
        </h1>
        <p style={{ fontSize: '18px', color: '#4C7F5B', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
          Inspiración inteligente para vivir rodeado de verde.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/explore" style={{
            backgroundColor: '#1E3D2B', color: 'white', padding: '14px 32px',
            borderRadius: '999px', textDecoration: 'none', fontSize: '16px'
          }}>Explorar plantas</a>
          <a href="/identify" style={{
            border: '2px solid #1E3D2B', color: '#1E3D2B', padding: '14px 32px',
            borderRadius: '999px', textDecoration: 'none', fontSize: '16px', backgroundColor: 'transparent'
          }}>Identificar por foto</a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ backgroundColor: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#1E3D2B', marginBottom: '48px' }}>
            Todo lo que necesitás para diseñar con plantas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { emoji: '📷', title: 'Reconocé especies', desc: 'Fotografiá cualquier planta y obtené su identificación al instante.' },
              { emoji: '🔍', title: 'Explorá plantas', desc: 'Filtrá por luz, riego, clima y estilo. El catálogo que siempre quisiste.' },
              { emoji: '🌿', title: 'Diseñá tu jardín', desc: 'Creá jardines, combiná especies y llevá tus proyectos verdes adelante.' },
            ].map((f) => (
              <div key={f.title} style={{
                padding: '32px 24px', borderRadius: '16px',
                border: '1px solid #E7EFE6', backgroundColor: '#F9FCF8'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.emoji}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1E3D2B', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#4C7F5B', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ backgroundColor: '#1E3D2B', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: 'white', marginBottom: '16px' }}>
            Empezá gratis
          </h2>
          <p style={{ color: '#A7C4A1', fontSize: '18px', marginBottom: '48px' }}>
            Explorá el catálogo sin costo. Activá Pro para IA ilimitada y jardines sin límite.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#2C5A3D', borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <p style={{ color: '#A7C4A1', fontSize: '13px', marginBottom: '4px' }}>Free</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: 'white', marginBottom: '24px' }}>$0</p>
              <ul style={{ color: '#A7C4A1', fontSize: '14px', lineHeight: 2, paddingLeft: '0', listStyle: 'none', marginBottom: '24px' }}>
                <li>✓ 10 búsquedas por día</li>
                <li>✓ 3 identificaciones por mes</li>
                <li>✓ 1 jardín guardado</li>
              </ul>
              <a href="/auth/signup" style={{
                display: 'block', textAlign: 'center', backgroundColor: '#3A7A52',
                color: 'white', padding: '12px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px'
              }}>Registrarse gratis</a>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', textAlign: 'left', border: '2px solid #A7C4A1' }}>
              <p style={{ color: '#4C7F5B', fontSize: '13px', marginBottom: '4px' }}>Pro</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: '#1E3D2B', marginBottom: '24px' }}>
                $9.99<span style={{ fontSize: '16px', color: '#4C7F5B' }}>/mes</span>
              </p>
              <ul style={{ color: '#3A7A52', fontSize: '14px', lineHeight: 2, paddingLeft: '0', listStyle: 'none', marginBottom: '24px' }}>
                <li>✓ IA ilimitada</li>
                <li>✓ Jardines sin límite</li>
                <li>✓ Exportar PDF / PNG</li>
                <li>✓ Combinaciones automáticas</li>
              </ul>
              <a href="/pricing" style={{
                display: 'block', textAlign: 'center', backgroundColor: '#1E3D2B',
                color: 'white', padding: '12px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px'
              }}>Activar Pro</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0D1E15', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '24px', color: '#C5D9C2', marginBottom: '8px' }}>Floria</p>
        <p style={{ color: '#4C7F5B', fontSize: '14px' }}>Tu espacio, tu naturaleza.</p>
        <p style={{ color: '#2C5A3D', fontSize: '12px', marginTop: '8px' }}>© {new Date().getFullYear()} Floria</p>
      </footer>

    </main>
  )
}
