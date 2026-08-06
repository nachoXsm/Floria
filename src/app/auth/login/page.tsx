'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/BottomNav'
import { color, font, shadow, radius } from '@/lib/ui'
import { ArrowLeft } from '@phosphor-icons/react'

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
    <main style={{ minHeight: '100vh', backgroundColor: color.bg, fontFamily: font.sans, color: color.ink }}>
      {/* HERO botánico */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: `radial-gradient(130% 100% at 78% 12%, #2E5B3E 0%, ${color.ink} 55%, #12281B 100%)` }}>
        <svg width="100%" height="100%" viewBox="0 0 390 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
          <g fill="none" stroke="#F2E9DD" strokeWidth="1.2" strokeLinecap="round">
            <path d="M300 60c-38 10-66 44-76 90M300 60c10 38-4 76-42 100M300 60c-30 30-48 62-52 100" />
          </g>
        </svg>
        <a href="/" style={{ position: 'absolute', top: '26px', left: '22px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(242,233,221,0.9)', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
          <ArrowLeft size={16} weight="bold" color="rgba(242,233,221,0.9)" /> Volver
        </a>
        <div style={{ position: 'absolute', left: '24px', right: '24px', bottom: '46px', maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blush }}>Tu espacio, tu naturaleza</p>
          <h1 style={{ fontFamily: font.serif, fontSize: '52px', fontWeight: 500, color: '#FBF7F0', margin: 0, lineHeight: 0.9, letterSpacing: '-1px' }}>Floria</h1>
        </div>
      </div>

      {/* HOJA — formulario */}
      <div style={{ position: 'relative', marginTop: '-26px', backgroundColor: color.bg, borderRadius: '30px 30px 0 0', padding: '30px 22px 120px', minHeight: '400px' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: font.serif, fontSize: '32px', fontWeight: 500, color: color.ink, margin: '0 0 4px', letterSpacing: '-0.4px' }}>
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Creá tu cuenta'}
          </h2>
          <p style={{ color: color.inkSoft, fontSize: '14px', margin: '0 0 26px' }}>
            {mode === 'login' ? 'Ingresá para cuidar y diseñar con plantas.' : 'Gratis para empezar. Sin tarjeta.'}
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', backgroundColor: color.mist, borderRadius: '999px', padding: '5px', marginBottom: '24px' }}>
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: '12px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 700, fontFamily: font.sans,
                backgroundColor: mode === m ? color.paper : 'transparent',
                color: mode === m ? color.ink : color.inkSoft,
                boxShadow: mode === m ? shadow.soft : 'none', transition: 'all 0.2s',
              }}>{m === 'login' ? 'Iniciar sesión' : 'Registrarse'}</button>
            ))}
          </div>

          {/* Email */}
          <label style={{ display: 'block', fontSize: '12px', color: color.ink, fontWeight: 700, marginBottom: '8px' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={inputStyle} />

          {/* Password */}
          <label style={{ display: 'block', fontSize: '12px', color: color.ink, fontWeight: 700, margin: '16px 0 8px' }}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />

          {error && (
            <div style={{ backgroundColor: '#FCEEEC', border: '1px solid #F3D6D0', borderRadius: `${radius.sm}px`, padding: '13px 16px', marginTop: '18px' }}>
              <p style={{ color: '#8B3A2F', fontSize: '13px', margin: 0 }}>{error}</p>
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: color.mist, border: `1px solid ${color.sage}`, borderRadius: `${radius.sm}px`, padding: '13px 16px', marginTop: '18px' }}>
              <p style={{ color: color.ink, fontSize: '13px', margin: 0 }}>{success}</p>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading || !email || !password} className="idPress" style={{
            width: '100%', marginTop: '24px', padding: '17px', borderRadius: '999px', border: 'none',
            cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
            backgroundColor: loading || !email || !password ? color.sage : color.ink,
            color: '#F2E9DD', fontSize: '15px', fontWeight: 700, fontFamily: font.sans,
            boxShadow: loading || !email || !password ? 'none' : shadow.card,
          }}>
            {loading ? 'Cargando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: color.inkFaint, lineHeight: 1.6 }}>
            {mode === 'login' ? '¿No tenés cuenta? ' : '¿Ya tenés cuenta? '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: color.green, fontWeight: 700, fontSize: '12px', fontFamily: font.sans }}>
              {mode === 'login' ? 'Registrate' : 'Iniciá sesión'}
            </button>
          </p>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '16px 18px', borderRadius: '16px',
  border: `1px solid ${color.line}`, fontSize: '15px', color: color.ink,
  outline: 'none', boxSizing: 'border-box', backgroundColor: color.paper,
  fontFamily: font.sans, boxShadow: shadow.soft,
}
