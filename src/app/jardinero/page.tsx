'use client'

import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGERENCIAS = [
  '¿Cuándo planto tomates en Buenos Aires?',
  '¿Por qué se amarillean las hojas de mi limonero?',
  '¿Qué plantas van bien a la sombra?',
  '¿Cómo hago compost en casa?',
  '¿Cuál es la mejor época para podar rosales?',
  '¿Qué hago si mi planta tiene pulgones?',
]

function MarkdownText({ text }: { text: string }) {
  // Renderizado mínimo de markdown: negrita, listas, saltos de línea
  const lines = text.split('\n')
  return (
    <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'inherit' }}>
      {lines.map((line, i) => {
        const isBullet = line.match(/^[-*•]\s/)
        const isNumbered = line.match(/^\d+\.\s/)
        const formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.07);padding:1px 5px;border-radius:4px;font-size:12px">$1</code>')

        if (isBullet || isNumbered) {
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}>{isBullet ? '•' : line.match(/^\d+/)?.[0] + '.'}</span>
              <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-*•]\s|\d+\.\s/, '') }} />
            </div>
          )
        }
        if (line === '') return <div key={i} style={{ height: '8px' }} />
        return <div key={i} dangerouslySetInnerHTML={{ __html: formatted }} style={{ marginBottom: '2px' }} />
      })}
    </div>
  )
}

export default function JardineroPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setError('')

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setLoading(true)

    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const res = await fetch('/api/jardinero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: ctrl.signal,
      })

      if (!res.ok) {
        const err = await res.json()
        if (err.error?.includes('not configured')) {
          setError('El Jardinero IA aún no está configurado. Agregá tu GROQ_API_KEY en las variables de entorno de Vercel.')
        } else {
          setError('Error al conectar con el asistente. Intentá de nuevo.')
        }
        setLoading(false)
        return
      }

      // Leer stream SSE
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantMsg = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content ?? ''
            if (delta) {
              assistantMsg += delta
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: assistantMsg }
                return updated
              })
            }
          } catch {}
        }
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        setError('Error de conexión. Revisá tu red e intentá de nuevo.')
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  function stop() {
    abortRef.current?.abort()
    setLoading(false)
  }

  const isEmpty = messages.length === 0

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F2E9DD 0%, #F9FCF8 55%, #E7EFE6 100%)',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      color: '#1E3D2B',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Nav />

      {/* Área de mensajes */}
      <div style={{
        flex: 1,
        maxWidth: '720px',
        width: '100%',
        margin: '0 auto',
        padding: isEmpty ? '88px 20px 160px' : '80px 20px 160px',
        boxSizing: 'border-box',
      }}>

        {/* Estado vacío */}
        {isEmpty && (
          <div style={{ textAlign: 'center', paddingTop: '24px' }}>
            {/* Avatar */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '24px',
              backgroundColor: '#1E3D2B', margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 36px rgba(30,61,43,0.2)',
            }}>
              <span style={{ fontSize: '38px' }}>🌿</span>
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '36px', fontWeight: 600, margin: '0 0 8px', color: '#1E3D2B' }}>
              Jardinero IA
            </h1>
            <p style={{ color: '#4C7F5B', fontSize: '15px', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: '400px' }}>
              Tu asistente experto en plantas, huerta y jardinería. Preguntame lo que quieras.
            </p>

            {/* Sugerencias */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {SUGERENCIAS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  padding: '10px 18px', borderRadius: '999px',
                  border: '1px solid rgba(231,239,230,0.9)',
                  backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)',
                  color: '#1E3D2B', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                  fontFamily: 'Montserrat, system-ui, sans-serif', textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(30,61,43,0.06)',
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Mensajes */}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '16px',
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                backgroundColor: '#1E3D2B', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                marginRight: '10px', marginTop: '2px',
              }}>🌿</div>
            )}
            <div style={{
              maxWidth: '82%',
              padding: msg.role === 'user' ? '12px 18px' : '16px 20px',
              borderRadius: msg.role === 'user' ? '22px 22px 6px 22px' : '6px 22px 22px 22px',
              backgroundColor: msg.role === 'user' ? '#1E3D2B' : 'rgba(255,255,255,0.9)',
              color: msg.role === 'user' ? 'white' : '#1E3D2B',
              backdropFilter: 'blur(12px)',
              border: msg.role === 'assistant' ? '1px solid rgba(231,239,230,0.9)' : 'none',
              boxShadow: '0 2px 12px rgba(30,61,43,0.08)',
            }}>
              {msg.role === 'user' ? (
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{msg.content}</p>
              ) : msg.content ? (
                <MarkdownText text={msg.content} />
              ) : (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 0' }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      backgroundColor: '#A7C4A1',
                      animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div style={{
            backgroundColor: '#FFF4F1', border: '1px solid #E8C4B9', borderRadius: '18px',
            padding: '14px 18px', marginBottom: '16px',
          }}>
            <p style={{ color: '#9F3A2F', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input fijo abajo */}
      <div style={{
        position: 'fixed', bottom: 'calc(64px + env(safe-area-inset-bottom))', left: 0, right: 0,
        padding: '12px 16px',
        backgroundColor: 'rgba(249,252,248,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(231,239,230,0.9)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{
            flex: 1, backgroundColor: 'white', borderRadius: '20px',
            border: '1px solid #DDE9DA', display: 'flex', alignItems: 'flex-end',
            padding: '10px 16px', boxShadow: '0 2px 12px rgba(30,61,43,0.08)',
            gap: '8px',
          }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => { setInput(e.target.value); autoResize() }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
              }}
              placeholder="Preguntale al Jardinero IA..."
              rows={1}
              style={{
                flex: 1, border: 'none', outline: 'none', resize: 'none',
                fontSize: '14px', color: '#1E3D2B', fontFamily: 'Montserrat, system-ui, sans-serif',
                lineHeight: 1.6, backgroundColor: 'transparent', maxHeight: '160px',
              }}
            />
            {messages.length > 0 && (
              <button onClick={() => { setMessages([]); setError('') }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#A7C4A1', fontSize: '16px', padding: '0', flexShrink: 0,
                lineHeight: 1,
              }} title="Nueva conversación">↺</button>
            )}
          </div>
          <button
            onClick={loading ? stop : () => send()}
            disabled={!loading && !input.trim()}
            style={{
              width: '46px', height: '46px', borderRadius: '14px', border: 'none',
              backgroundColor: loading ? '#8B3A2F' : (input.trim() ? '#1E3D2B' : '#A7C4A1'),
              color: 'white', cursor: loading || input.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', flexShrink: 0,
              boxShadow: (loading || input.trim()) ? '0 4px 14px rgba(30,61,43,0.2)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {loading ? '⏹' : '↑'}
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '10px', color: '#A7C4A1', margin: '6px 0 0' }}>
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>

      <BottomNav />

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .nav-desktop-links { display: flex !important; }
        @media (max-width: 640px) { .nav-desktop-links { display: none !important; } }
      `}</style>
    </main>
  )
}
