'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/BottomNav'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Email o contraseña incorrectos')
      } else {
        window.location.href = '/'
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError('Error al registrarse: ' + error.message)
      } else {
        setSuccess('¡Cuenta creada! Revisá tu email para confirmar.')
      }
    }
    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 10%, #E7EFE6 0, transparent 34%), linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '980px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        <section style={{
          borderRadius: '36px',
          padding: '44px',
          background: 'linear-gradient(145deg, #1E3D2B 0%, #0D1E15 100%)',
          color: '#F9FCF8',
          boxShadow: '0 24px 70px rgba(30, 61, 43, 0.18)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            right: '-70px',
            top: '-70px',
            borderRadius: '999px',
            backgroundColor: 'rgba(167,196,161,0.16)',
          }} />
          <a href="/" style={{
            color: '#F9FCF8',
            textDecoration: 'none',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '34px',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            position: 'relative',
          }}>Floria</a>

          <div style={{ position: 'relative' }}>
            <p style={{
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: '12px',
              color: '#A7C4A1',
              margin: '0 0 18px',
              fontWeight: 600,
            }}>Tu espacio, tu naturaleza</p>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(42px, 6vw, 66px)',
              lineHeight: 0.95,
              margin: '0 0 18px',
              fontWeight: 500,
              letterSpacing: '-1px',
            }}>Inspiración inteligente para vivir rodeado de verde.</h1>
            <p style={{
              color: '#E7EFE6',
              fontSize: '15px',
              lineHeight: 1.8,
              maxWidth: '430px',
              margin: 0,
            }}>Explorá especies, identificá plantas y diseñá espacios con una experiencia visual premium, cálida y botánica.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', position: 'relative' }}>
            {['Reconocé especies', 'Explorá plantas', 'Guardá favoritas'].map(item => (
              <span key={item} style={{
                border: '1px solid rgba(231,239,230,0.22)',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '999px',
                padding: '10px 14px',
                fontSize: '12px',
                color: '#E7EFE6',
              }}>{item}</span>
            ))}
          </div>
        </section>

        <section style={{
          backgroundColor: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(18px)',
          borderRadius: '36px',
          padding: '42px',
          border: '1px solid rgba(231,239,230,0.9)',
          boxShadow: '0 24px 70px rgba(30, 61, 43, 0.12)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 18px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, #1E3D2B, #4C7F5B)',
              color: '#F2E9DD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 16px 34px rgba(30,61,43,0.22)',
            }}>☘</div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '38px',
              color: '#1E3D2B',
              margin: '0 0 8px',
              fontWeight: 600,
            }}>Floria</h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', margin: 0 }}>
              {mode === 'login' ? 'Bienvenido de vuelta' : 'Creá tu cuenta gratis'}
            </p>
          </div>

          <div style={{
            display: 'flex',
            backgroundColor: '#E7EFE6',
            borderRadius: '999px',
            padding: '5px',
            marginBottom: '26px',
          }}>
            <button onClick={() => setMode('login')} style={{
              flex: 1,
              padding: '12px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              backgroundColor: mode === 'login' ? 'white' : 'transparent',
              color: mode === 'login' ? '#1E3D2B' : '#4C7F5B',
              boxShadow: mode === 'login' ? '0 8px 22px rgba(30,61,43,0.10)' : 'none',
            }}>Iniciar sesión</button>
            <button onClick={() => setMode('signup')} style={{
              flex: 1,
              padding: '12px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              backgroundColor: mode === 'signup' ? 'white' : 'transparent',
              color: mode === 'signup' ? '#1E3D2B' : '#4C7F5B',
              boxShadow: mode === 'signup' ? '0 8px 22px rgba(30,61,43,0.10)' : 'none',
            }}>Registrarse</button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#1E3D2B', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                width: '100%',
                padding: '15px 18px',
                borderRadius: '18px',
                border: '1px solid #DDE9DA',
                fontSize: '14px',
                color: '#1E3D2B',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#F9FCF8',
                fontFamily: 'Montserrat, system-ui, sans-serif',
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#1E3D2B', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.3px' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '15px 18px',
                borderRadius: '18px',
                border: '1px solid #DDE9DA',
                fontSize: '14px',
                color: '#1E3D2B',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#F9FCF8',
                fontFamily: 'Montserrat, system-ui, sans-serif',
              }}
            />
          </div>

          {error && (
            <div style={{ backgroundColor: '#FFF4F1', border: '1px solid #E8C4B9', borderRadius: '18px', padding: '13px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#9F3A2F', fontSize: '13px', margin: 0 }}>{error}</p>
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: '#E7EFE6', border: '1px solid #A7C4A1', borderRadius: '18px', padding: '13px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#1E3D2B', fontSize: '13px', margin: 0 }}>{success}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '999px',
              border: 'none',
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              backgroundColor: loading || !email || !password ? '#A7C4A1' : '#1E3D2B',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              boxShadow: loading || !email || !password ? 'none' : '0 14px 30px rgba(30,61,43,0.22)',
            }}
          >
            {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a href="/" style={{ color: '#4C7F5B', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>← Volver al inicio</a>
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  )
}
