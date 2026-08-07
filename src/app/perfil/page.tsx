'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/I18nProvider'
import type { Lang } from '@/lib/i18n'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

type Garden = { id: string; name: string; plant_count: number; created_at: string }

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: 'es', flag: '🇦🇷', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
]

const HELP_KEYS: Array<['help_q1' | 'help_q2' | 'help_q3' | 'help_q4' | 'help_q5', 'help_a1' | 'help_a2' | 'help_a3' | 'help_a4' | 'help_a5']> = [
  ['help_q1', 'help_a1'],
  ['help_q2', 'help_a2'],
  ['help_q3', 'help_a3'],
  ['help_q4', 'help_a4'],
  ['help_q5', 'help_a5'],
]

export default function PerfilPage() {
  const { t, lang, changeLang } = useI18n()
  const supabase = createClient()

  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [gardens, setGardens] = useState<Garden[]>([])
  const [gardensLoading, setGardensLoading] = useState(true)
  const [newGardenName, setNewGardenName] = useState('')
  const [showNewGarden, setShowNewGarden] = useState(false)
  const [creatingGarden, setCreatingGarden] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactType, setContactType] = useState('suggestion')
  const [contactMsg, setContactMsg] = useState('')
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [activeSection, setActiveSection] = useState<'gardens' | 'lang' | 'help' | 'contact'>('gardens')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { window.location.href = '/auth/login?redirect=/perfil'; return }
      setUser({ email: user.email!, id: user.id })
      // Check if pro
      supabase.from('profiles').select('is_pro').eq('id', user.id).single()
        .then(({ data }) => setIsPro(data?.is_pro ?? false))
    })
  }, [])

  useEffect(() => {
    if (!user) return
    fetch('/api/gardens')
      .then(r => r.json())
      .then(data => { setGardens(Array.isArray(data) ? data : []); setGardensLoading(false) })
      .catch(() => setGardensLoading(false))
  }, [user])

  async function createGarden() {
    if (!newGardenName.trim()) return
    setCreatingGarden(true)
    const res = await fetch('/api/gardens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGardenName }),
    })
    const garden = await res.json()
    if (garden.id) {
      setGardens(g => [garden, ...g])
      setNewGardenName('')
      setShowNewGarden(false)
    }
    setCreatingGarden(false)
  }

  async function deleteGarden(id: string) {
    await fetch('/api/gardens', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setGardens(g => g.filter(x => x.id !== id))
  }

  async function sendContact() {
    if (!contactMsg.trim()) return
    setContactStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user?.email, type: contactType, message: contactMsg }),
    })
    setContactStatus(res.ok ? 'ok' : 'error')
    if (res.ok) setContactMsg('')
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '??'
  const emailPrefix = user?.email?.split('@')[0] ?? ''
  const displayName = emailPrefix ? emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) : '...'

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
      paddingBottom: '100px',
    }}>
      <Nav />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '88px 20px 0' }}>

        {/* ── Cabecera de usuario ── */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(18px)',
          borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)',
          padding: '24px 22px 18px', boxShadow: '0 12px 36px rgba(30,61,43,0.09)',
          marginBottom: '16px',
        }}>
          {/* halo decorativo */}
          <div style={{
            position: 'absolute', top: '-50px', right: '-40px', width: '150px', height: '150px',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(76,127,91,0.16), transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '18px',
              background: 'linear-gradient(135deg, #1E3D2B 0%, #4C7F5B 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 6px 18px rgba(30,61,43,0.26)',
            }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: 'white', fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.5px' }}>
                {initials}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '18px', color: '#1E3D2B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                {displayName}
              </div>
              <div style={{ fontSize: '12.5px', color: '#7A8B7E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '3px' }}>
                {user?.email ?? '...'}
              </div>
            </div>
          </div>

          {/* fila plan + logout */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
            marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(221,233,218,0.8)',
            position: 'relative',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: 700, padding: '7px 15px', borderRadius: '999px',
              backgroundColor: isPro ? '#1E3D2B' : '#EDF4EB',
              color: isPro ? '#F9FCF8' : '#4C7F5B',
              border: isPro ? 'none' : '1px solid #D3E4CF',
              whiteSpace: 'nowrap', letterSpacing: '0.3px',
            }}>
              <span aria-hidden style={{ fontSize: '13px' }}>{isPro ? '★' : '✦'}</span>
              {isPro ? t('profile_plan_pro') : t('profile_plan_free')}
            </span>
            <button onClick={logout} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '9px 18px', borderRadius: '999px', border: '1px solid #DDE9DA',
              backgroundColor: 'rgba(255,255,255,0.9)', color: '#4C7F5B', cursor: 'pointer',
              fontSize: '12.5px', fontWeight: 600, fontFamily: 'Montserrat, system-ui, sans-serif',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              <span aria-hidden style={{ fontSize: '13px' }}>⏻</span>
              {t('profile_logout')}
            </button>
          </div>
        </div>

        {/* ── Tabs de sección ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px',
          padding: '6px', marginBottom: '18px',
          backgroundColor: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)',
          borderRadius: '18px', border: '1px solid rgba(231,239,230,0.9)',
          boxShadow: '0 4px 18px rgba(30,61,43,0.05)',
        }}>
          {([
            { key: 'gardens' as const, icon: '🌿', label: 'Jardines' },
            { key: 'lang'    as const, icon: '🌐', label: 'Idioma' },
            { key: 'help'    as const, icon: '❓', label: 'Ayuda' },
            { key: 'contact' as const, icon: '✉️', label: 'Contacto' },
          ]).map(tab => {
            const active = activeSection === tab.key
            return (
              <button key={tab.key} onClick={() => setActiveSection(tab.key)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                padding: '9px 4px', borderRadius: '13px', border: 'none',
                backgroundColor: active ? '#1E3D2B' : 'transparent',
                color: active ? 'white' : '#4C7F5B',
                cursor: 'pointer', fontFamily: 'Montserrat, system-ui, sans-serif',
                fontSize: '11.5px', fontWeight: 600,
                boxShadow: active ? '0 5px 14px rgba(30,61,43,0.22)' : 'none',
                transition: 'background-color 0.15s, color 0.15s',
              }}>
                <span aria-hidden style={{ fontSize: '15px', lineHeight: 1, opacity: active ? 1 : 0.85 }}>{tab.icon}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── JARDINES ── */}
        {activeSection === 'gardens' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)', borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)', padding: '24px', boxShadow: '0 4px 20px rgba(30,61,43,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '22px', fontWeight: 600, margin: 0, whiteSpace: 'nowrap' }}>
                🌿 {t('gardens_title')}
              </h2>
              {!showNewGarden && (
                <button onClick={() => setShowNewGarden(true)} style={{
                  padding: '9px 18px', borderRadius: '999px', border: 'none',
                  backgroundColor: '#1E3D2B', color: 'white', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat, system-ui, sans-serif',
                  whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 5px 14px rgba(30,61,43,0.2)',
                }}>+ {t('gardens_new')}</button>
              )}
            </div>

            {showNewGarden && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                  autoFocus
                  value={newGardenName}
                  onChange={e => setNewGardenName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createGarden()}
                  placeholder={t('gardens_new_placeholder')}
                  style={{
                    flex: 1, padding: '12px 16px', borderRadius: '16px',
                    border: '1px solid #DDE9DA', fontSize: '14px', color: '#1E3D2B',
                    outline: 'none', fontFamily: 'Montserrat, system-ui, sans-serif',
                    backgroundColor: '#F9FCF8',
                  }}
                />
                <button onClick={createGarden} disabled={creatingGarden || !newGardenName.trim()} style={{
                  padding: '12px 20px', borderRadius: '16px', border: 'none',
                  backgroundColor: newGardenName.trim() ? '#1E3D2B' : '#A7C4A1',
                  color: 'white', cursor: newGardenName.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat, system-ui, sans-serif',
                }}>{t('gardens_create')}</button>
                <button onClick={() => { setShowNewGarden(false); setNewGardenName('') }} style={{
                  padding: '12px 16px', borderRadius: '16px', border: '1px solid #DDE9DA',
                  backgroundColor: 'white', color: '#4C7F5B', cursor: 'pointer',
                  fontSize: '13px', fontFamily: 'Montserrat, system-ui, sans-serif',
                }}>{t('gardens_cancel')}</button>
              </div>
            )}

            {gardensLoading ? (
              <div style={{ textAlign: 'center', padding: '32px', color: '#4C7F5B', fontSize: '14px' }}>...</div>
            ) : gardens.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🪴</div>
                <p style={{ color: '#4C7F5B', fontSize: '14px', margin: 0 }}>{t('gardens_empty')}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {gardens.map(g => (
                  <div key={g.id} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    backgroundColor: '#F9FCF8', borderRadius: '18px',
                    padding: '16px 18px', border: '1px solid #E7EFE6',
                  }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#E7EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>🌱</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#1E3D2B' }}>{g.name}</div>
                      <div style={{ fontSize: '12px', color: '#4C7F5B', marginTop: '2px' }}>
                        {g.plant_count ?? 0} {t('gardens_plants')}
                      </div>
                    </div>
                    <button onClick={() => deleteGarden(g.id)} style={{
                      width: '34px', height: '34px', borderRadius: '10px', border: '1px solid #E8C4B9',
                      backgroundColor: '#FFF4F1', cursor: 'pointer', fontSize: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>🗑</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── IDIOMA ── */}
        {activeSection === 'lang' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)', borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)', padding: '24px', boxShadow: '0 4px 20px rgba(30,61,43,0.06)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '0 0 20px' }}>
              🌐 {t('lang_title')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LANG_OPTIONS.map(opt => (
                <button key={opt.code} onClick={() => changeLang(opt.code)} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '18px 20px', borderRadius: '20px', cursor: 'pointer',
                  border: lang === opt.code ? '2px solid #1E3D2B' : '1px solid #DDE9DA',
                  backgroundColor: lang === opt.code ? '#E7EFE6' : 'white',
                  fontFamily: 'Montserrat, system-ui, sans-serif', textAlign: 'left',
                }}>
                  <span style={{ fontSize: '28px' }}>{opt.flag}</span>
                  <span style={{ fontSize: '16px', fontWeight: lang === opt.code ? 700 : 500, color: '#1E3D2B' }}>{opt.label}</span>
                  {lang === opt.code && (
                    <span style={{ marginLeft: 'auto', fontSize: '18px' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#4C7F5B', lineHeight: 1.6, marginTop: '16px', padding: '12px 14px', backgroundColor: '#F0F7EE', borderRadius: '12px' }}>
              {lang === 'es' ? 'El idioma se detecta automáticamente según tu navegador. Podés cambiarlo en cualquier momento.' :
               lang === 'en' ? 'Language is automatically detected from your browser. You can change it at any time.' :
               'O idioma é detectado automaticamente pelo seu navegador. Você pode alterá-lo a qualquer momento.'}
            </p>
          </div>
        )}

        {/* ── AYUDA ── */}
        {activeSection === 'help' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)', borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)', padding: '24px', boxShadow: '0 4px 20px rgba(30,61,43,0.06)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '0 0 20px' }}>
              ❓ {t('help_title')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {HELP_KEYS.map(([qKey, aKey], i) => (
                <div key={i} style={{ borderRadius: '18px', border: '1px solid #E7EFE6', overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '12px',
                    backgroundColor: openFaq === i ? '#F0F7EE' : 'white',
                    border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, system-ui, sans-serif',
                    textAlign: 'left',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1E3D2B', lineHeight: 1.4 }}>{t(qKey)}</span>
                    <span style={{ fontSize: '16px', color: '#4C7F5B', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '4px 18px 16px', backgroundColor: '#F0F7EE' }}>
                      <p style={{ fontSize: '13px', color: '#3D6650', lineHeight: 1.7, margin: 0 }}>{t(aKey)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACTO ── */}
        {activeSection === 'contact' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(18px)', borderRadius: '28px', border: '1px solid rgba(231,239,230,0.9)', padding: '24px', boxShadow: '0 4px 20px rgba(30,61,43,0.06)' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '0 0 6px' }}>
              ✉️ {t('contact_title')}
            </h2>
            <p style={{ color: '#4C7F5B', fontSize: '14px', margin: '0 0 20px' }}>{t('contact_subtitle')}</p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#1E3D2B', display: 'block', marginBottom: '8px', letterSpacing: '0.3px' }}>{t('contact_type')}</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['suggestion', 'bug', 'question', 'other'] as const).map(type => (
                  <button key={type} onClick={() => setContactType(type)} style={{
                    padding: '8px 16px', borderRadius: '999px',
                    border: `1px solid ${contactType === type ? '#1E3D2B' : '#DDE9DA'}`,
                    backgroundColor: contactType === type ? '#1E3D2B' : 'white',
                    color: contactType === type ? 'white' : '#4C7F5B',
                    cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                    fontFamily: 'Montserrat, system-ui, sans-serif',
                  }}>
                    {t(`contact_type_${type}` as 'contact_type_suggestion')}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#1E3D2B', display: 'block', marginBottom: '8px', letterSpacing: '0.3px' }}>{t('contact_message')}</label>
              <textarea
                value={contactMsg}
                onChange={e => setContactMsg(e.target.value)}
                placeholder={t('contact_placeholder')}
                rows={5}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '18px',
                  border: '1px solid #DDE9DA', fontSize: '14px', color: '#1E3D2B',
                  outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                  fontFamily: 'Montserrat, system-ui, sans-serif', backgroundColor: '#F9FCF8', lineHeight: 1.6,
                }}
              />
            </div>

            {contactStatus === 'ok' && (
              <div style={{ backgroundColor: '#E7EFE6', border: '1px solid #A7C4A1', borderRadius: '16px', padding: '12px 16px', marginBottom: '16px' }}>
                <p style={{ color: '#1E3D2B', fontSize: '13px', margin: 0, fontWeight: 600 }}>✓ {t('contact_success')}</p>
              </div>
            )}
            {contactStatus === 'error' && (
              <div style={{ backgroundColor: '#FFF4F1', border: '1px solid #E8C4B9', borderRadius: '16px', padding: '12px 16px', marginBottom: '16px' }}>
                <p style={{ color: '#9F3A2F', fontSize: '13px', margin: 0 }}>{t('contact_error')}</p>
              </div>
            )}

            <button onClick={sendContact} disabled={contactStatus === 'sending' || !contactMsg.trim()} style={{
              width: '100%', padding: '15px', borderRadius: '999px', border: 'none',
              backgroundColor: contactMsg.trim() ? '#1E3D2B' : '#A7C4A1',
              color: 'white', fontSize: '15px', fontWeight: 600,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              cursor: contactMsg.trim() ? 'pointer' : 'not-allowed',
              boxShadow: contactMsg.trim() ? '0 8px 24px rgba(30,61,43,0.18)' : 'none',
            }}>
              {contactStatus === 'sending' ? t('contact_sending') : t('contact_send')}
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </main>
  )
}
