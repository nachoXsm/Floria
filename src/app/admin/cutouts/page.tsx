'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

const TOKEN = 'floria-audit-2026'

type Plant = { id: string; common_name: string; scientific_name: string; cutout_image?: string | null }
type Candidate = { url: string; thumb: string; source: string; attribution?: string }

// Carga perezosa del quita-fondo desde CDN (no se empaqueta).
let _imgly: { removeBackground: (src: string, cfg?: unknown) => Promise<Blob> } | null = null
async function ensureImgly() {
  if (_imgly) return _imgly
  // @ts-ignore - ESM por URL en el navegador
  _imgly = await import(/* webpackIgnore: true */ 'https://esm.sh/@imgly/background-removal@1.7.0')
  return _imgly!
}
function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(blob) })
}
function fileToDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(file) })
}

export default function CutoutsCuratorPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [regen, setRegen] = useState(false)
  const [idx, setIdx] = useState(0)

  const [cands, setCands] = useState<Candidate[]>([])
  const [loadingCands, setLoadingCands] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Cargar lista de plantas
  useEffect(() => {
    const supabase = createClient()
    let q = supabase.from('plants').select('id, common_name, scientific_name, cutout_image').eq('published', true)
    if (!regen) q = q.is('cutout_image', null)
    q.order('common_name').limit(1000).then(({ data, error }) => {
      if (error) setLoadError(error.message)
      else { setPlants((data ?? []) as Plant[]); setIdx(0) }
    })
  }, [regen])

  const current = plants[idx]

  const loadCandidates = useCallback(async (plantId: string) => {
    setLoadingCands(true); setCands([]); setPreview(null); setStatus('')
    try {
      const r = await fetch(`/api/admin/cutouts/candidates?token=${TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantId }),
      })
      const d = await r.json()
      setCands(d.candidates ?? [])
    } catch { setCands([]) }
    finally { setLoadingCands(false) }
  }, [])

  useEffect(() => { if (current) loadCandidates(current.id) }, [current, loadCandidates])

  const next = () => { setIdx(i => Math.min(i + 1, plants.length)); }

  async function processDataUrl(dataUrl: string) {
    if (!current) return
    setBusy(true)
    try {
      setStatus('Quitando fondo…')
      const { removeBackground } = await ensureImgly()
      const blob = await removeBackground(dataUrl, { model: 'isnet_fp16', output: { format: 'image/png' as const } })
      const png = await blobToDataURL(blob)
      setPreview(png)
      setStatus('Guardando…')
      const s = await fetch(`/api/admin/cutouts/save?token=${TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantId: current.id, png }),
      })
      const sd = await s.json()
      if (!s.ok) throw new Error(sd.error || 'Error al guardar')
      setStatus('Guardado ✓ — pasando a la siguiente')
      setTimeout(next, 900)
    } catch (e) {
      setStatus('Error: ' + String((e as Error).message || e).slice(0, 140))
    } finally { setBusy(false) }
  }

  async function applyUrl(url: string) {
    if (!current || !url) return
    setBusy(true); setStatus('Descargando foto…')
    try {
      const r = await fetch(`/api/admin/cutouts/fetch?token=${TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'No se pudo descargar')
      await processDataUrl(d.dataUrl)
    } catch (e) {
      setStatus('Error: ' + String((e as Error).message || e).slice(0, 140)); setBusy(false)
    }
  }

  if (loadError) return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: 40, fontFamily: 'Montserrat, sans-serif' }}>
      <p style={{ color: '#8B3A2F' }}>No pude leer las plantas: {loadError}. ¿Creaste la columna?
        <code> alter table plants add column if not exists cutout_image text;</code></p>
    </main>
  )

  const done = !current

  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px 80px', fontFamily: 'Montserrat, system-ui, sans-serif', color: '#1E3D2B' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 34, margin: '0 0 4px' }}>Curador de recortes</h1>
      <p style={{ color: '#4C7F5B', fontSize: 14, marginTop: 0 }}>
        Elegí la foto real que mejor representa cada especie. La app le quita el fondo y la guarda como recorte.
      </p>

      <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, margin: '10px 0', cursor: 'pointer' }}>
        <input type="checkbox" checked={regen} onChange={e => setRegen(e.target.checked)} />
        Incluir también las que ya tienen recorte (rehacer)
      </label>

      {done ? (
        <div style={{ padding: 30, textAlign: 'center', background: '#EEF4EA', borderRadius: 16, marginTop: 20 }}>
          <p style={{ fontSize: 16, margin: 0 }}>🎉 ¡No quedan plantas pendientes en esta lista!</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{current.common_name}</div>
              <div style={{ fontSize: 14, fontStyle: 'italic', color: '#4C7F5B' }}>{current.scientific_name}</div>
            </div>
            <div style={{ fontSize: 13, color: '#7A9E82' }}>{idx + 1} / {plants.length}</div>
          </div>

          {/* Candidatas */}
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#C4773B', margin: '18px 0 8px' }}>
            Elegí la mejor foto {loadingCands && '· buscando…'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 10 }}>
            {cands.map((c, i) => (
              <button key={i} disabled={busy} onClick={() => applyUrl(c.url)} title={c.source} style={{
                padding: 0, border: '2px solid #E1EADD', borderRadius: 12, overflow: 'hidden', cursor: busy ? 'default' : 'pointer', background: '#fff',
              }}>
                <div style={{ height: 130, background: '#F2E9DD' }}>
                  <img src={c.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 10, color: '#7A9E82', padding: '4px 0' }}>{c.source}</div>
              </button>
            ))}
            {!loadingCands && cands.length === 0 && (
              <p style={{ fontSize: 13, color: '#8B3A2F', gridColumn: '1/-1' }}>Sin candidatas — usá «pegar URL» o «subir foto» abajo.</p>
            )}
          </div>

          {/* Fallbacks */}
          <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="Pegá el link de una foto…" disabled={busy}
              style={{ flex: 1, minWidth: 220, padding: '10px 12px', borderRadius: 10, border: '1px solid #cddac7' }} />
            <button onClick={() => applyUrl(urlInput)} disabled={busy || !urlInput} style={{ padding: '10px 16px', borderRadius: 999, border: 'none', background: '#4C7F5B', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Usar URL</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={async e => { const f = e.target.files?.[0]; if (f) processDataUrl(await fileToDataURL(f)) }} />
            <button onClick={() => fileRef.current?.click()} disabled={busy} style={{ padding: '10px 16px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: '#1E3D2B', fontWeight: 700, cursor: 'pointer' }}>Subir foto</button>
          </div>

          {/* Estado + preview + navegación */}
          <div style={{ marginTop: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
            {preview && (
              <div style={{ width: 120, height: 120, background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 18px 18px', borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              {status && <p style={{ fontSize: 13, color: status.startsWith('Error') ? '#c0392b' : '#4C7F5B', margin: '0 0 8px' }}>{status}</p>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={next} disabled={busy} style={{ padding: '9px 16px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: '#1E3D2B', fontWeight: 600, cursor: 'pointer' }}>Saltear →</button>
                <button onClick={() => loadCandidates(current.id)} disabled={busy || loadingCands} style={{ padding: '9px 16px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: '#1E3D2B', fontWeight: 600, cursor: 'pointer' }}>Buscar de nuevo</button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
