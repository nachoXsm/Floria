'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const TOKEN = 'floria-audit-2026'

type Plant = { id: string; common_name: string; scientific_name: string; cutout_image?: string | null }
type Row = { id: string; name: string; status: 'pendiente' | 'generando' | 'recortando' | 'guardando' | 'ok' | 'error'; url?: string; error?: string }

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(blob)
  })
}

export default function CutoutsAdminPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [limit, setLimit] = useState(15)
  const [running, setRunning] = useState(false)
  const [rows, setRows] = useState<Row[]>([])
  const [regen, setRegen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let q = supabase.from('plants')
      .select('id, common_name, scientific_name, cutout_image')
      .eq('published', true)
    if (!regen) q = q.is('cutout_image', null)   // por defecto solo las que faltan
    q.order('common_name').limit(300).then(({ data, error }) => {
      if (error) setLoadError(error.message)
      else setPlants((data ?? []) as Plant[])
    })
  }, [regen])

  const setRow = (id: string, patch: Partial<Row>) =>
    setRows(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)))

  const run = async () => {
    setRunning(true)
    const batch = plants.slice(0, limit)
    setRows(batch.map(p => ({ id: p.id, name: p.scientific_name, status: 'pendiente' })))
    // Cargamos el quita-fondo desde CDN en runtime (no se empaqueta: evita romper el build).
    // @ts-ignore - módulo ESM cargado por URL en el navegador
    const imgly = await import(/* webpackIgnore: true */ 'https://esm.sh/@imgly/background-removal@1.7.0')
    const removeBackground = imgly.removeBackground as (src: string) => Promise<Blob>

    for (const p of batch) {
      try {
        setRow(p.id, { status: 'generando' })
        const g = await fetch(`/api/admin/cutouts/generate?token=${TOKEN}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plantId: p.id }),
        })
        const gd = await g.json()
        if (!g.ok) throw new Error(gd.error + (gd.detail ? ` · ${gd.detail}` : ''))

        setRow(p.id, { status: 'recortando' })
        const blob = await removeBackground(`data:image/jpeg;base64,${gd.image}`)
        const pngUrl = await blobToDataURL(blob)

        setRow(p.id, { status: 'guardando' })
        const s = await fetch(`/api/admin/cutouts/save?token=${TOKEN}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plantId: p.id, png: pngUrl }),
        })
        const sd = await s.json()
        if (!s.ok) throw new Error(sd.error + (sd.detail ? ` · ${sd.detail}` : ''))

        setRow(p.id, { status: 'ok', url: pngUrl })
      } catch (e) {
        setRow(p.id, { status: 'error', error: String((e as Error).message || e).slice(0, 160) })
      }
    }
    setRunning(false)
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', fontFamily: 'Montserrat, system-ui, sans-serif', color: '#1E3D2B' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 36, margin: '0 0 6px' }}>Recortes de plantas</h1>
      <p style={{ color: '#4C7F5B', fontSize: 14, marginTop: 0 }}>
        Genera los recortes (PNG transparente) para las láminas de cantero. Todo corre en tu navegador: Cloudflare genera la imagen y el fondo se quita acá mismo.
      </p>

      {loadError && (
        <div style={{ padding: 14, background: '#FEF0EE', border: '1px solid #FAD9D4', borderRadius: 12, fontSize: 13, color: '#8B3A2F' }}>
          No pude leer las plantas: {loadError}. ¿Creaste la columna? Corré en Supabase: <code>alter table plants add column if not exists cutout_image text;</code>
        </div>
      )}

      {!loadError && (
        <>
          <p style={{ fontSize: 14 }}>
            {regen ? 'Plantas a (re)generar' : 'Plantas sin recorte'}: <strong>{plants.length}</strong> (primeras 300)
          </p>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, margin: '4px 0 14px', cursor: 'pointer' }}>
            <input type="checkbox" checked={regen} disabled={running} onChange={e => setRegen(e.target.checked)} />
            Regenerar también las que ya tienen recorte (rehacer con el prompt mejorado)
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '0 0 24px' }}>
            <label style={{ fontSize: 13 }}>Cantidad:</label>
            <input type="number" min={1} max={100} value={limit} disabled={running}
              onChange={e => setLimit(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              style={{ width: 80, padding: '8px 10px', borderRadius: 10, border: '1px solid #cddac7' }} />
            <button onClick={run} disabled={running || !plants.length} style={{
              padding: '10px 20px', borderRadius: 999, border: 'none',
              background: running ? '#9bb59f' : '#1E3D2B', color: '#F2E9DD', fontWeight: 700, cursor: running ? 'default' : 'pointer',
            }}>{running ? 'Procesando…' : `Generar ${limit} recortes`}</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14 }}>
            {rows.map(r => (
              <div key={r.id} style={{ border: '1px solid #E1EADD', borderRadius: 14, padding: 10, background: '#fff', textAlign: 'center' }}>
                <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px', borderRadius: 10, overflow: 'hidden' }}>
                  {r.url
                    ? <img src={r.url} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    : <span style={{ fontSize: 12, color: '#4C7F5B' }}>{r.status}</span>}
                </div>
                <p style={{ fontSize: 12, fontStyle: 'italic', margin: '8px 0 2px' }}>{r.name}</p>
                <p style={{ fontSize: 11, margin: 0, color: r.status === 'error' ? '#c0392b' : '#7A9E82' }}>
                  {r.status === 'error' ? r.error : r.status}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
