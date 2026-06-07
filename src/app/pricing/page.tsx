'use client'

import { useState } from 'react'

const features = [
  {
    category: 'Catálogo',
    items: [
      { name: 'Explorar 200+ plantas', free: true, pro: true },
      { name: 'Fichas completas con cuidados', free: true, pro: true },
      { name: 'Filtros por ubicación, luz y estilo', free: true, pro: true },
    ],
  },
  {
    category: 'Identificación IA',
    items: [
      { name: 'Identificaciones por mes', free: '3', pro: 'Ilimitadas' },
      { name: 'Resultado con nombre científico', free: true, pro: true },
      { name: 'Historial de identificaciones', free: false, pro: true },
    ],
  },
  {
    category: 'Jardines',
    items: [
      { name: 'Jardines guardados', free: '1', pro: 'Ilimitados' },
      { name: 'Agregar plantas al jardín', free: true, pro: true },
      { name: 'Combinaciones automáticas IA', free: false, pro: true },
      { name: 'Exportar jardín (PDF / PNG)', free: false, pro: true },
    ],
  },
  {
    category: 'Búsqueda',
    items: [
      { name: 'Búsquedas por día', free: '10', pro: 'Ilimitadas' },
    ],
  },
]

const faqs = [
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. Podés cancelar tu suscripción cuando quieras desde tu perfil. Seguís teniendo acceso Pro hasta que venza el período ya pagado.',
  },
  {
    q: '¿Qué pasa cuando llego al límite Free?',
    a: 'Podés seguir explorando el catálogo sin restricciones. Solo las identificaciones y la creación de jardines adicionales se pausan hasta el próximo mes o hasta que actives Pro.',
  },
  {
    q: '¿Hay período de prueba para Pro?',
    a: 'Estamos trabajando en eso. Por ahora el plan Free ya te da acceso a las funciones principales sin tarjeta de crédito.',
  },
  {
    q: '¿Cómo se procesa el pago?',
    a: 'Los pagos se procesan de forma segura a través de Stripe. Aceptamos tarjetas de crédito y débito de todos los bancos.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main style={{ backgroundColor: '#F9FCF8', minHeight: '100vh', fontFamily: 'Montserrat, system-ui, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)', maxWidth: '1120px', zIndex: 50,
        backgroundColor: 'rgba(249,252,248,0.92)', backdropFilter: 'blur(18px)',
        border: '1px solid rgba(231,239,230,0.9)',
        boxShadow: '0 16px 40px rgba(30,61,43,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px 0 20px', borderRadius: '999px', height: '60px',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo-floria.png" alt="Floria" style={{ height: '32px', width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { href: '/explore', label: 'Explorar' },
            { href: '/identify', label: 'Identificar' },
          ].map(link => (
            <a key={link.href} href={link.href} style={{
              color: '#1E3D2B', textDecoration: 'none', fontSize: '13px',
              fontWeight: 500, padding: '8px 14px', borderRadius: '999px',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(30,61,43,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >{link.label}</a>
          ))}
          <a href="/auth/login" style={{
            backgroundColor: '#1E3D2B', color: 'white', textDecoration: 'none',
            fontSize: '13px', fontWeight: 600, padding: '9px 20px', borderRadius: '999px',
            marginLeft: '6px',
          }}>Iniciar sesión</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '130px', paddingBottom: '72px', textAlign: 'center', padding: '140px 24px 72px' }}>
        <p style={{ color: '#4C7F5B', fontSize: '12px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 20px' }}>
          Planes
        </p>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(44px, 7vw, 72px)',
          color: '#1E3D2B', fontWeight: 500, margin: '0 0 20px',
          lineHeight: 1.1, letterSpacing: '-1.5px',
        }}>
          Empezá gratis,<br />crecé cuando quieras
        </h1>
        <p style={{ color: '#4C7F5B', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Sin tarjeta de crédito. Sin sorpresas. Activá Pro solo cuando necesites más.
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '0 24px 80px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* Free */}
          <div style={{
            backgroundColor: '#F9FCF8', borderRadius: '28px', padding: '40px 36px',
            border: '1px solid #E7EFE6', boxShadow: '0 18px 42px rgba(30,61,43,0.06)',
          }}>
            <p style={{ color: '#4C7F5B', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px' }}>Free</p>
            <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '54px', color: '#1E3D2B', margin: '0 0 4px', lineHeight: 1 }}>
              $0
            </p>
            <p style={{ color: '#4C7F5B', fontSize: '13px', margin: '0 0 32px' }}>Para siempre</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', color: '#345E43', fontSize: '14px', lineHeight: 2.1 }}>
              <li>✓ Catálogo completo de plantas</li>
              <li>✓ 3 identificaciones por mes</li>
              <li>✓ 1 jardín guardado</li>
              <li>✓ 10 búsquedas por día</li>
            </ul>
            <a href="/auth/login" style={{
              display: 'block', textAlign: 'center',
              backgroundColor: '#E7EFE6', color: '#1E3D2B',
              padding: '15px', borderRadius: '999px',
              textDecoration: 'none', fontSize: '13px', fontWeight: 600,
            }}>Registrarse gratis</a>
          </div>

          {/* Pro */}
          <div style={{
            backgroundColor: '#1E3D2B', borderRadius: '28px', padding: '40px 36px',
            border: '1px solid #2C5A3D', boxShadow: '0 32px 72px rgba(30,61,43,0.22)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '20px', right: '20px',
              backgroundColor: '#4C7F5B', color: 'white',
              fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', padding: '5px 12px', borderRadius: '999px',
            }}>Recomendado</div>
            <p style={{ color: '#A7C4A1', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px' }}>Pro</p>
            <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '54px', color: 'white', margin: '0 0 4px', lineHeight: 1 }}>
              $9.99
            </p>
            <p style={{ color: '#A7C4A1', fontSize: '13px', margin: '0 0 32px' }}>por mes · cancela cuando quieras</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', color: '#E7EFE6', fontSize: '14px', lineHeight: 2.1 }}>
              <li>✓ Todo lo del plan Free</li>
              <li>✓ Identificaciones IA ilimitadas</li>
              <li>✓ Jardines sin límite</li>
              <li>✓ Búsquedas ilimitadas</li>
              <li>✓ Combinaciones automáticas IA</li>
              <li>✓ Exportar jardín (PDF / PNG)</li>
              <li>✓ Historial completo</li>
            </ul>
            <a href="/auth/login" style={{
              display: 'block', textAlign: 'center',
              backgroundColor: '#F9FCF8', color: '#1E3D2B',
              padding: '15px', borderRadius: '999px',
              textDecoration: 'none', fontSize: '13px', fontWeight: 700,
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            }}>Activar Pro</a>
          </div>

        </div>
      </section>

      {/* Feature Comparison */}
      <section style={{ padding: '0 24px 100px', maxWidth: '860px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '38px', color: '#1E3D2B', fontWeight: 500,
          textAlign: 'center', margin: '0 0 56px', letterSpacing: '-0.5px',
        }}>Comparación detallada</h2>

        {features.map((section) => (
          <div key={section.category} style={{ marginBottom: '40px' }}>
            <p style={{
              color: '#4C7F5B', fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              margin: '0 0 12px', paddingLeft: '4px',
            }}>{section.category}</p>
            <div style={{ border: '1px solid #E7EFE6', borderRadius: '16px', overflow: 'hidden' }}>
              {/* Header row */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 120px 120px',
                backgroundColor: '#F2F7F1', padding: '12px 20px',
                borderBottom: '1px solid #E7EFE6',
              }}>
                <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600 }}>Funcionalidad</span>
                <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600, textAlign: 'center' }}>Free</span>
                <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600, textAlign: 'center' }}>Pro</span>
              </div>
              {section.items.map((item, i) => (
                <div key={item.name} style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 120px',
                  padding: '14px 20px', alignItems: 'center',
                  borderBottom: i < section.items.length - 1 ? '1px solid #F2F7F1' : 'none',
                  backgroundColor: 'white',
                }}>
                  <span style={{ fontSize: '14px', color: '#1E3D2B' }}>{item.name}</span>
                  <span style={{ textAlign: 'center', fontSize: '13px', color: item.free === false ? '#C5D9C2' : '#345E43', fontWeight: 500 }}>
                    {item.free === true ? '✓' : item.free === false ? '–' : item.free}
                  </span>
                  <span style={{ textAlign: 'center', fontSize: '13px', color: '#1E3D2B', fontWeight: 600 }}>
                    {item.pro === true ? '✓' : item.pro === false ? '–' : item.pro}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 24px 100px', maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '38px', color: '#1E3D2B', fontWeight: 500,
          textAlign: 'center', margin: '0 0 48px', letterSpacing: '-0.5px',
        }}>Preguntas frecuentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: '1px solid #E7EFE6', borderRadius: '16px',
              overflow: 'hidden', backgroundColor: 'white',
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', padding: '20px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  color: '#1E3D2B', fontSize: '15px', fontWeight: 600,
                  fontFamily: 'Montserrat, system-ui, sans-serif',
                }}
              >
                {faq.q}
                <span style={{
                  fontSize: '20px', color: '#4C7F5B', lineHeight: 1,
                  transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', color: '#4C7F5B', fontSize: '14px', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#1E3D2B', padding: '90px 24px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '48px', color: '#F9FCF8', fontWeight: 500, margin: '0 0 16px',
        }}>Tu jardín ideal, sin límites</h2>
        <p style={{ color: '#C5D9C2', fontSize: '16px', margin: '0 0 40px', maxWidth: '420px', display: 'inline-block', lineHeight: 1.7 }}>
          Empezá hoy y pasá a Pro cuando estés listo.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/auth/login" style={{
            backgroundColor: '#F9FCF8', color: '#1E3D2B',
            padding: '15px 32px', borderRadius: '999px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700,
            boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
          }}>Crear cuenta gratis</a>
          <a href="/explore" style={{
            backgroundColor: 'transparent', color: '#E7EFE6',
            padding: '15px 32px', borderRadius: '999px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 600,
            border: '1px solid rgba(231,239,230,0.4)',
          }}>Explorar catálogo</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0D1E15', padding: '54px 24px', textAlign: 'center' }}>
        <img src="/logo-floria.png" alt="Floria" style={{ width: '160px', height: 'auto', marginBottom: '16px', opacity: 0.8 }} />
        <p style={{ color: '#A7C4A1', fontSize: '13px', margin: '0 0 4px' }}>Tu espacio, tu naturaleza.</p>
        <p style={{ color: '#4C7F5B', fontSize: '11px', margin: 0 }}>© {new Date().getFullYear()} Floria</p>
      </footer>

    </main>
  )
}
