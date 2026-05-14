'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '420px', border: '1px solid #E7EFE6', boxShadow: '0 4px 24px rgba(30,61,43,0.08)' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '32px', marginBottom: '4px' }}>🌿</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#1E3D2B', margin: '0 0 8px' }}>Floria</h1>
          <p style={{ color: '#4C7F5B', fontSize: '14px', margin: 0 }}>
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Creá tu cuenta gratis'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#F2F7F1', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          <button onClick={() => setMode('login')} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
            backgroundColor: mode === 'login' ? 'white' : 'transparent',
            color: mode === 'login' ? '#1E3D2B' : '#4C7F5B',
            boxShadow: mode === 'login' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
          }}>Iniciar sesión</button>
          <button onClick={() => setMode('signup')} style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
            backgroundColor: mode === 'signup' ? 'white' : 'transparent',
            color: mode === 'signup' ? '#1E3D2B' : '#4C7F5B',
            boxShadow: mode === 'signup' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
          }}>Registrarse</button>
        </div>

        {/* Inputs */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#1E3D2B', fontWeight: 500, marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #C5D9C2',
              fontSize: '15px', color: '#1E3D2B', outline: 'none', boxSizing: 'border-box',
              backgroundColor: '#F9FCF8'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#1E3D2B', fontWeight: 500, marginBottom: '6px' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #C5D9C2',
              fontSize: '15px', color: '#1E3D2B', outline: 'none', boxSizing: 'border-box',
              backgroundColor: '#F9FCF8'
            }}
          />
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px' }}>
            <p style={{ color: '#DC2626', fontSize: '14px', margin: 0 }}>{error}</p>
          </div>
        )}
        {success && (
          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px' }}>
            <p style={{ color: '#16A34A', fontSize: '14px', margin: 0 }}>{success}</p>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{
            width: '100%', padding: '14px', borderRadius: '999px', border: 'none', cursor: 'pointer',
            backgroundColor: loading || !email || !password ? '#A7C4A1' : '#1E3D2B',
            color: 'white', fontSize: '16px', fontWeight: 500,
          }}
        >
          {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        {/* Volver */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ color: '#4C7F5B', fontSize: '14px', textDecoration: 'none' }}>← Volver al inicio</a>
        </div>
      </div>
    </main>
  )
}
