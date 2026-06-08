'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token_hash = params.get('token_hash')
    const type = params.get('type') as 'email' | 'recovery' | null
    const next = params.get('next') ?? '/'

    if (!token_hash || !type) {
      setStatus('error')
      setMsg('Enlace inválido o expirado.')
      return
    }

    const supabase = createClient()
    supabase.auth.verifyOtp({ token_hash, type }).then(({ error }) => {
      if (error) {
        setStatus('error')
        setMsg('El enlace expiró o ya fue usado. Pedí uno nuevo desde la pantalla de inicio de sesión.')
      } else {
        setStatus('ok')
        setTimeout(() => { window.location.href = next }, 1500)
      }
    })
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 10%, #E7EFE6 0, transparent 34%), linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Montserrat, system-ui, sans-serif', padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '28px', padding: '48px 40px',
        maxWidth: '400px', width: '100%', textAlign: 'center',
        border: '1px solid rgba(231,239,230,0.9)', boxShadow: '0 24px 60px rgba(30,61,43,0.1)',
      }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌱</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', color: '#1E3D2B', margin: '0 0 10px' }}>Verificando...</h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', margin: 0 }}>Confirmando tu cuenta.</p>
          </>
        )}
        {status === 'ok' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', color: '#1E3D2B', margin: '0 0 10px' }}>¡Cuenta confirmada!</h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', margin: 0 }}>Redirigiendo a tu perfil...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🍂</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', color: '#1E3D2B', margin: '0 0 10px' }}>Enlace inválido</h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', margin: '0 0 24px' }}>{msg}</p>
            <a href="/auth/login" style={{
              display: 'inline-block', backgroundColor: '#1E3D2B', color: 'white',
              padding: '13px 28px', borderRadius: '999px', textDecoration: 'none',
              fontSize: '14px', fontWeight: 600,
            }}>Volver al inicio de sesión</a>
          </>
        )}
      </div>
    </main>
  )
}
