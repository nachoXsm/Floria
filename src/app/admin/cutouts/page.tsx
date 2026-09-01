'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

const TOKEN = 'floria-audit-2026'

type Plant = { id: string; common_name: string; scientific_name: string; cutout_image?: string | null; plant_type?: string | null }
// Árboles y palmeras no van en canteros: se excluyen del recorte por defecto.
const isTreeLike = (pt?: string | null) => /árbol|arbol|\btree\b|palm/i.test(pt ?? '')
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
// Normaliza a PNG y detecta si la imagen YA viene recortada (fondo transparente).
async function analyzeImage(dataUrl: string): Promise<{ png: string; transparent: boolean }> {
  const img = new Image()
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl })
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight
  const ctx = c.getContext('2d')!; ctx.drawImage(img, 0, 0)
  let transparent = false
  try {
    const w = c.width, h = c.height
    const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]] as const
    transparent = corners.every(([x, y]) => ctx.getImageData(x, y, 1, 1).data[3] < 20)
  } catch { transparent = false }
  return { png: c.toDataURL('image/png'), transparent }
}

export default function CutoutsCuratorPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [regen, setRegen] = useState(false)
  const [excludeTrees, setExcludeTrees] = useState(true)
  const [idx, setIdx] = useState(0)
  const [allPlants, setAllPlants] = useState<Plant[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Plant | null>(null)

  const [cands, setCands] = useState<Candidate[]>([])
  const [loadingCands, setLoadingCands] = useState(false)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [asIs, setAsIs] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Cargar lista de plantas
  useEffect(() => {
    const supabase = createClient()
    let q = supabase.from('plants').select('id, common_name, scientific_name, cutout_image, plant_type').eq('published', true)
    if (!regen) q = q.is('cutout_image', null)
    q.order('common_name').limit(2000).then(({ data, error }) => {
      if (error) { setLoadError(error.message); return }
      let list = (data ?? []) as Plant[]
      if (excludeTrees) list = list.filter(p => !isTreeLike(p.plant_type))
      setPlants(list); setIdx(0)
    })
  }, [regen, excludeTrees])

  // Cargar TODAS las plantas (para el buscador — incluye las ya recortadas)
  useEffect(() => {
    const supabase = createClient()
    supabase.from('plants').select('id, common_name, scientific_name, cutout_image')
      .eq('published', true).order('common_name').limit(2000)
      .then(({ data }) => setAllPlants((data ?? []) as Plant[]))
  }, [])

  // La planta buscada tiene prioridad sobre la de la secuencia.
  const current = selected ?? plants[idx]

  const searchResults = query.trim()
    ? allPlants.filter(p =>
        p.common_name?.toLowerCase().includes(query.toLowerCase()) ||
        p.scientific_name?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : []

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

  // Si estamos en una planta buscada, "siguiente/anterior" vuelve a la secuencia.
  const next = () => { if (selected) { setSelected(null); return } setIdx(i => Math.min(i + 1, plants.length)) }
  const prev = () => { if (selected) { setSelected(null); return } setIdx(i => Math.max(i - 1, 0)) }
  const pickSearch = (p: Plant) => { setSelected(p); setQuery('') }

  async function processDataUrl(dataUrl: string) {
    if (!current) return
    setBusy(true)
    try {
      setStatus('Analizando la foto…')
      const { png: normalized, transparent } = await analyzeImage(dataUrl)
      let png: string
      if (asIs || transparent) {
        // Ya viene recortada (o el usuario pide usarla tal cual): no tocar el fondo.
        png = normalized
        setStatus(transparent ? 'Ya venía recortada — usándola tal cual…' : 'Usando la foto tal cual…')
      } else {
        setStatus('Quitando fondo…')
        const { removeBackground } = await ensureImgly()
        // Modelo isnet (máxima calidad de recorte).
        const blob = await removeBackground(dataUrl, { model: 'isnet', output: { format: 'image/png' as const, quality: 1 } })
        png = await blobToDataURL(blob)
      }
      setPreview(png)
      setStatus('Guardando…')
      const s = await fetch(`/api/admin/cutouts/save?token=${TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantId: current.id, png }),
      })
      const sd = await s.json()
      if (!s.ok) throw new Error(sd.error || 'Error al guardar')
      setStatus('Guardado ✓ — revisá el recorte. Tocá «Siguiente» o elegí otra foto para rehacerlo.')
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
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, margin: '0 0 6px', cursor: 'pointer' }}>
        <input type="checkbox" checked={excludeTrees} onChange={e => setExcludeTrees(e.target.checked)} />
        Excluir árboles y palmeras (no van en canteros)
      </label>

      {/* Buscar una planta puntual para rehacer (sin reiniciar la secuencia) */}
      <div style={{ position: 'relative', margin: '4px 0 8px' }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍 Buscar una planta por nombre para rehacerla…"
          style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 12, border: '1px solid #cddac7', fontSize: 14 }} />
        {searchResults.length > 0 && (
          <div style={{ position: 'absolute', zIndex: 5, left: 0, right: 0, background: '#fff', border: '1px solid #E1EADD', borderRadius: 12, marginTop: 4, boxShadow: '0 10px 30px rgba(30,61,43,0.12)', overflow: 'hidden' }}>
            {searchResults.map(p => (
              <button key={p.id} onClick={() => pickSearch(p)} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, width: '100%', padding: '10px 14px', border: 'none', borderBottom: '1px solid #F2E9DD', background: '#fff', textAlign: 'left', cursor: 'pointer' }}>
                <span><strong style={{ fontSize: 13 }}>{p.common_name}</strong> <span style={{ fontSize: 12, fontStyle: 'italic', color: '#4C7F5B' }}>{p.scientific_name}</span></span>
                {p.cutout_image && <span style={{ fontSize: 11, color: '#7A9E82' }}>✓ tiene recorte</span>}
              </button>
            ))}
          </div>
        )}
      </div>

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
            <div style={{ fontSize: 13, color: '#7A9E82', textAlign: 'right' }}>
              {selected
                ? <span style={{ color: '#C4773B', fontWeight: 700 }}>✎ rehaciendo (fuera de la secuencia)</span>
                : <>{idx + 1} / {plants.length}</>}
            </div>
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

          {/* Búsqueda rápida de una buena foto (planta entera) */}
          <div style={{ marginTop: 18, padding: 12, background: '#F7FBF5', border: '1px solid #E1EADD', borderRadius: 12 }}>
            <p style={{ fontSize: 12, color: '#4C7F5B', margin: '0 0 8px' }}>
              <strong>Truco:</strong> buscá fotos <strong>PNG con fondo transparente</strong> (ya vienen recortadas y salen perfectas). El botón ya filtra por transparentes:
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={`https://www.google.com/search?tbm=isch&tbs=ic:trans&q=${encodeURIComponent(current.scientific_name + ' plant png')}`} target="_blank" rel="noreferrer"
                style={{ padding: '8px 14px', borderRadius: 999, background: '#1E3D2B', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Google Imágenes · PNG transparente ↗</a>
              <a href={`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(current.scientific_name + ' plant png cutout')}`} target="_blank" rel="noreferrer"
                style={{ padding: '8px 14px', borderRadius: 999, background: '#fff', color: '#1E3D2B', border: '1.5px solid #cddac7', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Pinterest ↗</a>
            </div>
            <p style={{ fontSize: 11, color: '#7A9E82', margin: '8px 0 0' }}>→ clic derecho en la foto → &quot;Copiar dirección de la imagen&quot; → pegala abajo. Si ya es transparente, la uso tal cual (recorte perfecto).</p>
            <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginTop: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={asIs} onChange={e => setAsIs(e.target.checked)} />
              Usar la foto tal cual, sin quitar fondo (para PNG ya recortados o fondo blanco que quiero conservar)
            </label>
          </div>

          {/* Fallbacks */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="Pegá el link de una foto…" disabled={busy}
              style={{ flex: 1, minWidth: 220, padding: '10px 12px', borderRadius: 10, border: '1px solid #cddac7' }} />
            <button onClick={() => applyUrl(urlInput)} disabled={busy || !urlInput} style={{ padding: '10px 16px', borderRadius: 999, border: 'none', background: '#4C7F5B', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Usar URL</button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={async e => { const f = e.target.files?.[0]; if (f) processDataUrl(await fileToDataURL(f)) }} />
            <button onClick={() => fileRef.current?.click()} disabled={busy} style={{ padding: '10px 16px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: '#1E3D2B', fontWeight: 700, cursor: 'pointer' }}>Subir foto</button>
          </div>

          {/* Vista previa GRANDE del recorte guardado */}
          {preview && (
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <div style={{ width: '100%', maxWidth: 460, height: 460, margin: '0 auto', background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 26px 26px', borderRadius: 16, overflow: 'hidden', border: '1px solid #E1EADD' }}>
                <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: 12, color: '#7A9E82', marginTop: 6 }}>✓ recorte guardado — así se va a ver en la lámina</div>
            </div>
          )}

          {/* Estado + navegación */}
          <div style={{ marginTop: 18 }}>
            <div style={{ flex: 1 }}>
              {busy && <p style={{ fontSize: 13, color: '#4C7F5B', margin: '0 0 8px' }}>⏳ {status || 'Procesando…'}</p>}
              {!busy && status && <p style={{ fontSize: 13, color: status.startsWith('Error') ? '#c0392b' : '#2f7a4c', margin: '0 0 10px', fontWeight: 600 }}>{status}</p>}
              {preview && !busy && (
                <p style={{ fontSize: 12, color: '#7A9E82', margin: '0 0 10px' }}>
                  ¿No te gusta? Hacé clic en otra foto de arriba para <strong>rehacerlo</strong>.
                </p>
              )}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(() => { const dis = busy || (!selected && idx === 0); return (
                  <button onClick={prev} disabled={dis} style={{ padding: '11px 18px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: dis ? '#aaa' : '#1E3D2B', fontWeight: 600, cursor: dis ? 'default' : 'pointer' }}>← Anterior</button>
                )})()}
                <button onClick={next} disabled={busy} style={{ padding: '11px 22px', borderRadius: 999, border: 'none', background: preview ? '#1E3D2B' : '#9bb59f', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{selected ? 'Volver a la secuencia →' : 'Siguiente planta →'}</button>
                <button onClick={() => loadCandidates(current.id)} disabled={busy || loadingCands} style={{ padding: '11px 18px', borderRadius: 999, border: '1.5px solid #cddac7', background: '#fff', color: '#1E3D2B', fontWeight: 600, cursor: 'pointer' }}>Buscar de nuevo</button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
