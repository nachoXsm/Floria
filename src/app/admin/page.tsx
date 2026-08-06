'use client'

import { useState } from 'react'

const TOKEN = 'floria-audit-2026'

type Result = Record<string, unknown>

interface Operation {
  id: string
  label: string
  description: string
  color: string
  endpoint: string
  params?: Record<string, string>
}

const OPERATIONS: Operation[] = [
  {
    id: 'import',
    label: '📥 Importar plantas (data.json → Supabase)',
    description: 'Actualiza plantas existentes y agrega nuevas desde el archivo data.json (510 plantas).',
    color: '#1E3D2B',
    endpoint: '/api/admin/import-plants',
  },
  {
    id: 'audit',
    label: '🔍 Auditar fotos faltantes',
    description: 'Lista todas las plantas publicadas sin foto.',
    color: '#4C7F5B',
    endpoint: '/api/admin/audit-images',
    params: { mode: 'audit' },
  },
  {
    id: 'fix25',
    label: '🖼️ Buscar fotos faltantes (lote de 25)',
    description: 'Busca y asigna fotos en iNaturalist para hasta 25 plantas sin imagen.',
    color: '#2563EB',
    endpoint: '/api/admin/audit-images',
    params: { mode: 'fix', batch: '25' },
  },
  {
    id: 'dedupe',
    label: '♻️ Deduplicar fotos repetidas (lote de 20)',
    description: 'Detecta plantas que comparten la misma foto y asigna fotos distintas a cada una.',
    color: '#7C3AED',
    endpoint: '/api/admin/audit-images',
    params: { mode: 'dedupe', batch: '20' },
  },
  {
    id: 'validate',
    label: '✅ Validar fotos (lote de 10)',
    description: 'Verifica con iNaturalist CV que cada foto corresponde a la planta correcta.',
    color: '#B45309',
    endpoint: '/api/admin/audit-images',
    params: { mode: 'validate', batch: '10' },
  },
]

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [results, setResults] = useState<Record<string, Result | null>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [fixOneName, setFixOneName] = useState('')
  const [overrideName, setOverrideName] = useState('')
  const [overrideUrl, setOverrideUrl] = useState('')
  const [autoFixLog, setAutoFixLog] = useState<string[]>([])
  const [autoFixRunning, setAutoFixRunning] = useState(false)
  const [transLog, setTransLog] = useState<string[]>([])
  const [transRunning, setTransRunning] = useState(false)

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', border: '1px solid #E7EFE6', width: '320px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '28px', color: '#1E3D2B', margin: '0 0 24px' }}>Admin Floria</h1>
          <input
            type="password"
            placeholder="Token de acceso"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && password === TOKEN) setAuthed(true) }}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E7EFE6', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }}
          />
          <button
            onClick={() => { if (password === TOKEN) setAuthed(true) }}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#1E3D2B', color: 'white', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            Entrar
          </button>
          {password && password !== TOKEN && <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '8px' }}>Token incorrecto</p>}
        </div>
      </main>
    )
  }

  async function run(op: Operation) {
    setLoading(l => ({ ...l, [op.id]: true }))
    setResults(r => ({ ...r, [op.id]: null }))
    const params = new URLSearchParams({ token: TOKEN, ...(op.params ?? {}) })
    try {
      const res = await fetch(`${op.endpoint}?${params}`)
      const json = await res.json()
      setResults(r => ({ ...r, [op.id]: json }))
    } catch (e: unknown) {
      setResults(r => ({ ...r, [op.id]: { error: String(e) } }))
    }
    setLoading(l => ({ ...l, [op.id]: false }))
  }

  async function runFixOne() {
    if (!fixOneName.trim()) return
    setLoading(l => ({ ...l, fixone: true }))
    const params = new URLSearchParams({ token: TOKEN, mode: 'fixone', name: fixOneName.trim() })
    const res = await fetch(`/api/admin/audit-images?${params}`)
    const json = await res.json()
    setResults(r => ({ ...r, fixone: json }))
    setLoading(l => ({ ...l, fixone: false }))
  }

  async function runAutoFix() {
    setAutoFixRunning(true)
    setAutoFixLog([])
    let round = 1
    let totalFixed = 0

    while (true) {
      const params = new URLSearchParams({ token: TOKEN, mode: 'fix', batch: '30' })
      let json: Result
      try {
        const res = await fetch(`/api/admin/audit-images?${params}`)
        json = await res.json()
      } catch (e) {
        setAutoFixLog(l => [...l, `❌ Error en ronda ${round}: ${String(e)}`])
        break
      }
      const processed = (json.processed as number) ?? 0
      const fixed = Array.isArray(json.results)
        ? (json.results as {status:string}[]).filter(r => r.status === 'fixed').length
        : 0
      const notFound = processed - fixed
      totalFixed += fixed
      setAutoFixLog(l => [...l, `Ronda ${round}: ${fixed} fotos asignadas, ${notFound} no encontradas (total acumulado: ${totalFixed})`])
      round++
      if (processed === 0) {
        setAutoFixLog(l => [...l, `✅ Listo. ${totalFixed} fotos asignadas en total.`])
        break
      }
      // Pausa entre rondas para no saturar la API
      await new Promise(r => setTimeout(r, 2000))
    }
    setAutoFixRunning(false)
  }

  async function runImportTranslations() {
    setTransRunning(true)
    setTransLog(['Cargando traducciones EN/PT de las 982 plantas...'])
    let offset: number | null = 0
    let totalUpdated = 0
    while (offset !== null) {
      const params = new URLSearchParams({ token: TOKEN, offset: String(offset), limit: '300' })
      let json: Result
      try {
        const res = await fetch(`/api/admin/import-translations?${params}`)
        json = await res.json()
      } catch (e) {
        setTransLog(l => [...l, `❌ Error de red: ${String(e)}`])
        break
      }
      if (json.error) {
        setTransLog(l => [...l, `❌ ${json.error}`])
        break
      }
      const updated = (json.updated as number) ?? 0
      totalUpdated += updated
      const fails = (json.failures as string[]) ?? []
      setTransLog(l => [...l, `Lote desde ${offset}: ${updated} plantas actualizadas${fails.length ? ` · ${fails.length} con error` : ''}`])
      offset = (json.next_offset as number | null)
      await new Promise(r => setTimeout(r, 500))
    }
    setTransLog(l => [...l, `✅ Listo. ${totalUpdated} plantas con traducción EN + PT cargada.`])
    setTransRunning(false)
  }

  async function runOverride() {
    if (!overrideName.trim() || !overrideUrl.trim()) return
    setLoading(l => ({ ...l, override: true }))
    const params = new URLSearchParams({ token: TOKEN, mode: 'override', name: overrideName.trim(), url: overrideUrl.trim() })
    const res = await fetch(`/api/admin/audit-images?${params}`)
    const json = await res.json()
    setResults(r => ({ ...r, override: json }))
    setLoading(l => ({ ...l, override: false }))
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F9FCF8', fontFamily: 'Montserrat, system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '36px', color: '#1E3D2B', margin: 0 }}>Panel Admin</h1>
          <button onClick={() => setAuthed(false)} style={{ padding: '6px 16px', borderRadius: '999px', border: '1px solid #E7EFE6', backgroundColor: 'white', color: '#6B7280', fontSize: '12px', cursor: 'pointer' }}>Salir</button>
        </div>

        {/* CARGAR TRADUCCIONES EN/PT */}
        <div style={{ backgroundColor: '#4C7F5B', borderRadius: '16px', padding: '20px', marginBottom: '24px', color: 'white' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>🌐 Cargar traducciones EN / PT (982 plantas)</h2>
          <p style={{ fontSize: '12px', opacity: 0.85, margin: '0 0 14px' }}>
            Carga los nombres y descripciones en inglés y portugués a la base, en 4 lotes automáticos.
            Requiere haber corrido antes la migración <code>006</code> en Supabase (agrega las columnas de idioma).
          </p>
          <button
            onClick={transRunning ? undefined : runImportTranslations}
            disabled={transRunning}
            style={{
              padding: '12px 28px', borderRadius: '10px', border: 'none',
              backgroundColor: transRunning ? '#3B6347' : '#F9FCF8',
              color: '#1E3D2B', fontSize: '14px', fontWeight: 700,
              cursor: transRunning ? 'default' : 'pointer',
            }}
          >
            {transRunning ? '⏳ Cargando...' : 'Cargar traducciones'}
          </button>
          {transLog.length > 0 && (
            <div style={{ marginTop: '14px', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px', maxHeight: '200px', overflowY: 'auto' }}>
              {transLog.map((line, i) => (
                <p key={i} style={{ margin: '2px 0', fontSize: '12px', fontFamily: 'monospace', opacity: 0.9 }}>{line}</p>
              ))}
            </div>
          )}
        </div>

        {/* AUTO-FIX: busca fotos en loop hasta terminar */}
        <div style={{ backgroundColor: '#1E3D2B', borderRadius: '16px', padding: '20px', marginBottom: '24px', color: 'white' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>🚀 Buscar todas las fotos faltantes (automático)</h2>
          <p style={{ fontSize: '12px', opacity: 0.75, margin: '0 0 14px' }}>
            Corre lotes de 30 en loop hasta que todas las plantas tengan foto. Puede tardar varios minutos.
          </p>
          <button
            onClick={autoFixRunning ? undefined : runAutoFix}
            disabled={autoFixRunning}
            style={{
              padding: '12px 28px', borderRadius: '10px', border: 'none',
              backgroundColor: autoFixRunning ? '#4C7F5B' : '#A3C99A',
              color: '#1E3D2B', fontSize: '14px', fontWeight: 700,
              cursor: autoFixRunning ? 'default' : 'pointer',
            }}
          >
            {autoFixRunning ? '⏳ Procesando...' : 'Iniciar'}
          </button>
          {autoFixLog.length > 0 && (
            <div style={{ marginTop: '14px', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px', maxHeight: '200px', overflowY: 'auto' }}>
              {autoFixLog.map((line, i) => (
                <p key={i} style={{ margin: '2px 0', fontSize: '12px', fontFamily: 'monospace', opacity: 0.9 }}>{line}</p>
              ))}
            </div>
          )}
        </div>

        {/* Operaciones individuales */}
        {OPERATIONS.map(op => (
          <div key={op.id} style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E7EFE6', padding: '20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1E3D2B', margin: '0 0 4px' }}>{op.label}</h2>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{op.description}</p>
              </div>
              <button
                onClick={() => run(op)}
                disabled={loading[op.id]}
                style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none', whiteSpace: 'nowrap',
                  backgroundColor: loading[op.id] ? '#E7EFE6' : op.color,
                  color: loading[op.id] ? '#6B7280' : 'white',
                  fontSize: '13px', fontWeight: 600, cursor: loading[op.id] ? 'default' : 'pointer',
                }}
              >
                {loading[op.id] ? 'Ejecutando...' : 'Ejecutar'}
              </button>
            </div>
            {results[op.id] !== undefined && (
              <pre style={{
                marginTop: '16px', padding: '14px', borderRadius: '10px',
                backgroundColor: '#F9FCF8', border: '1px solid #E7EFE6',
                fontSize: '11px', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                color: '#1E3D2B', maxHeight: '320px',
              }}>
                {JSON.stringify(results[op.id], null, 2)}
              </pre>
            )}
          </div>
        ))}

        {/* Fix una planta por nombre */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E7EFE6', padding: '20px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1E3D2B', margin: '0 0 4px' }}>🔧 Re-buscar foto de una planta</h2>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 12px' }}>Ingresá el nombre común exacto (ej: &ldquo;Banana / Bananero&rdquo;).</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={fixOneName}
              onChange={e => setFixOneName(e.target.value)}
              placeholder="Nombre común de la planta"
              style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #E7EFE6', fontSize: '13px', outline: 'none' }}
            />
            <button
              onClick={runFixOne}
              disabled={loading.fixone || !fixOneName.trim()}
              style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: loading.fixone ? '#E7EFE6' : '#1E3D2B', color: loading.fixone ? '#6B7280' : 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              {loading.fixone ? '...' : 'Buscar'}
            </button>
          </div>
          {results.fixone && (
            <pre style={{ marginTop: '12px', padding: '14px', borderRadius: '10px', backgroundColor: '#F9FCF8', border: '1px solid #E7EFE6', fontSize: '11px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#1E3D2B' }}>
              {JSON.stringify(results.fixone, null, 2)}
            </pre>
          )}
        </div>

        {/* Override manual */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E7EFE6', padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1E3D2B', margin: '0 0 4px' }}>🖼️ Asignar foto manualmente</h2>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 12px' }}>Pegá el nombre común y la URL de la foto que querés usar.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              value={overrideName}
              onChange={e => setOverrideName(e.target.value)}
              placeholder="Nombre común"
              style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #E7EFE6', fontSize: '13px', outline: 'none' }}
            />
            <input
              value={overrideUrl}
              onChange={e => setOverrideUrl(e.target.value)}
              placeholder="URL de la imagen"
              style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #E7EFE6', fontSize: '13px', outline: 'none' }}
            />
            <button
              onClick={runOverride}
              disabled={loading.override || !overrideName.trim() || !overrideUrl.trim()}
              style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: loading.override ? '#E7EFE6' : '#DC2626', color: loading.override ? '#6B7280' : 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
            >
              {loading.override ? '...' : 'Asignar foto'}
            </button>
          </div>
          {results.override && (
            <pre style={{ marginTop: '12px', padding: '14px', borderRadius: '10px', backgroundColor: '#F9FCF8', border: '1px solid #E7EFE6', fontSize: '11px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#1E3D2B' }}>
              {JSON.stringify(results.override, null, 2)}
            </pre>
          )}
        </div>

      </div>
    </main>
  )
}
