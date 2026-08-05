'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { BITACORA, MONTHS, REGIONS, TASK_CATEGORIES } from '@/lib/bitacora'

type Task = {
  id: string
  title: string
  category: string
  month: number | null
  done: boolean
  notes: string | null
  created_at?: string
}

const now = new Date()
const CURRENT_MONTH = now.getMonth() + 1
const CURRENT_YEAR = now.getFullYear()

const catColor = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.color ?? '#4C7F5B'
const catLabel = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.label ?? 'Jardín'

// Íconos por sección de consejos
const SEC_ICON: Record<string, React.ReactNode> = {
  jardin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21V8"/><path d="M12 11C12 7 9 4 4 4c0 5 3 7 8 7z"/><path d="M12 13c0-3.3 2.5-6 6.5-6 0 4-2.5 6-6.5 6z"/></svg>,
  huerta: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10M12 20V9M12 9C12 5 9 3 5 3c0 4 3 6 7 6z"/><path d="M12 11c0-3 2-5 6-5 0 3.5-2.5 5-6 5z"/></svg>,
  almacigos: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16M6 20v-5h12v5M9 15c0-3 1-5 3-6M12 9c1 0 3-1 3-3-2 0-3 1-3 3z"/></svg>,
  poda: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8.5L20 20M8.5 15.5L20 4"/></svg>,
  plagas: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="13" rx="4" ry="5"/><path d="M12 8V5M8 13H4M20 13h-4M6 9l2 2M18 9l-2 2M6 17l2-1.5M18 17l-2-1.5"/></svg>,
  mantenimiento: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z"/></svg>,
}

type SectionKey = 'jardin' | 'huerta' | 'almacigos' | 'poda' | 'plagas' | 'mantenimiento'
const SECTIONS: { key: SectionKey; label: string; color: string; catForTask: string }[] = [
  { key: 'jardin', label: 'En el jardín', color: '#4C7F5B', catForTask: 'jardin' },
  { key: 'huerta', label: 'En la huerta', color: '#C4773B', catForTask: 'huerta' },
  { key: 'almacigos', label: 'Almácigos', color: '#6B5B95', catForTask: 'almacigo' },
  { key: 'poda', label: 'Poda', color: '#2E5B3E', catForTask: 'jardin' },
  { key: 'plagas', label: 'Plagas y enfermedades', color: '#8B3A2F', catForTask: 'mantenimiento' },
  { key: 'mantenimiento', label: 'Mantenimiento', color: '#2563EB', catForTask: 'mantenimiento' },
]

export default function BitacoraClient() {
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [region, setRegion] = useState('pampa')
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newCat, setNewCat] = useState('jardin')
  const [adding, setAdding] = useState(false)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string>('jardin')
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const tips = BITACORA[month]
  const regionData = REGIONS.find(r => r.key === region)
  const regionNote = regionData?.adjustments.find(a => a.estacion === tips.estacion)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bitacora')
      if (res.status === 401) { setAuthed(false); setTasks([]); return }
      const data = await res.json()
      setTasks(data.tasks ?? [])
      setAuthed(true)
    } catch {
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addTaskDirect = async (title: string, category: string, targetMonth: number | null = month) => {
    if (!authed) { window.location.href = '/auth/login'; return }
    setJustAdded(title)
    setTimeout(() => setJustAdded(null), 1400)
    try {
      const res = await fetch('/api/bitacora', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, month: targetMonth }),
      })
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      if (data.task) setTasks(prev => [data.task, ...prev])
    } catch {}
  }

  const addTask = async () => {
    if (!newTitle.trim()) return
    setAdding(true)
    await addTaskDirect(newTitle.trim(), newCat)
    setNewTitle('')
    setAdding(false)
  }

  const toggle = async (t: Task) => {
    setTasks(prev => prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x))
    await fetch('/api/bitacora', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: t.id, done: !t.done }) })
  }
  const saveNotes = async (id: string, notes: string) => {
    setTasks(prev => prev.map(x => x.id === id ? { ...x, notes } : x))
    setEditingNotes(null)
    await fetch('/api/bitacora', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, notes }) })
  }
  const remove = async (id: string) => {
    setTasks(prev => prev.filter(x => x.id !== id))
    await fetch(`/api/bitacora?id=${id}`, { method: 'DELETE' })
  }

  const monthTasks = tasks.filter(t => t.month === month || t.month == null)
  const pending = monthTasks.filter(t => !t.done)
  const doneCount = monthTasks.filter(t => t.done).length

  // Progreso anual (racha + total)
  const yearStats = useMemo(() => {
    const yearTasks = tasks.filter(t => (t.created_at ?? '').startsWith(String(CURRENT_YEAR)))
    const done = tasks.filter(t => t.done).length
    const monthsWithActivity = new Set(tasks.map(t => t.month).filter(Boolean)).size
    return { total: tasks.length, done, monthsWithActivity, yearTasks: yearTasks.length }
  }, [tasks])

  const alreadyAdded = (title: string) => tasks.some(t => t.title === title && (t.month === month || t.month == null))

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 20px 20px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '40px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.05 }}>
        Bitácora de jardín
      </h1>
      <p style={{ fontSize: '14px', color: '#4C7F5B', margin: '0 0 22px', lineHeight: 1.6 }}>
        Planificá tus tareas del jardín y la huerta, registrá lo que hiciste y seguí los consejos de cada mes.
      </p>

      {/* Widget de progreso anual */}
      {authed && tasks.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <StatChip value={yearStats.done} label="tareas hechas" />
          <StatChip value={`${yearStats.monthsWithActivity}/12`} label="meses activos" />
          <StatChip value={pending.length} label="pendientes este mes" />
        </div>
      )}

      {/* Selector de mes */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px', scrollbarWidth: 'none' }}>
        {MONTHS.map((m, i) => {
          const mn = i + 1
          const active = mn === month
          return (
            <button key={m} onClick={() => setMonth(mn)} style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: '999px', cursor: 'pointer',
              border: active ? '1.5px solid #1E3D2B' : '1.5px solid rgba(30,61,43,0.15)',
              backgroundColor: active ? '#1E3D2B' : 'rgba(255,255,255,0.6)',
              color: active ? '#F2E9DD' : '#1E3D2B', fontSize: '13px', fontWeight: 600,
            }}>{m}{mn === CURRENT_MONTH ? ' •' : ''}</button>
          )
        })}
      </div>

      {/* Selector de región */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600 }}>Tu zona:</span>
        {REGIONS.map(r => (
          <button key={r.key} onClick={() => setRegion(r.key)} style={{
            padding: '5px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600,
            border: region === r.key ? '1.5px solid #C4773B' : '1.5px solid rgba(30,61,43,0.12)',
            backgroundColor: region === r.key ? 'rgba(196,119,59,0.12)' : 'rgba(255,255,255,0.5)',
            color: region === r.key ? '#C4773B' : '#4C7F5B',
          }}>{r.region}</button>
        ))}
      </div>

      {/* Destacado del mes */}
      <div style={{ backgroundColor: '#1E3D2B', borderRadius: '20px', padding: '20px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '130px', height: '130px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,196,161,0.16), transparent 70%)' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A7C4A1' }}>{tips.estacion} · {MONTHS[month - 1]}</span>
        <p style={{ margin: '8px 0 0', fontSize: '17px', fontWeight: 600, color: '#F2E9DD', lineHeight: 1.5, fontFamily: 'Cormorant Garamond, serif' }}>{tips.destacado}</p>
      </div>

      {/* Nota regional */}
      {regionNote && regionNote.notas.length > 0 && (
        <div style={{ backgroundColor: 'rgba(196,119,59,0.09)', border: '1px solid rgba(196,119,59,0.2)', borderRadius: '16px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: '#C4773B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ajuste para {regionData?.region}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {regionNote.notas.map((n, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '12.5px', color: '#7A5C1E', lineHeight: 1.5 }}><span style={{ color: '#C4773B' }}>·</span>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {/* FLORACIÓN DEL MES */}
      <h2 style={secTitle}>Floración del mes</h2>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '26px', scrollbarWidth: 'none' }}>
        {tips.flores_destacadas.map((f, i) => (
          <div key={i} style={{ minWidth: '210px', maxWidth: '210px', backgroundColor: 'white', borderRadius: '18px', padding: '16px', border: '1px solid rgba(30,61,43,0.06)', boxShadow: '0 4px 14px rgba(30,61,43,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>🌸</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1E3D2B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.nombre}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#4C7F5B', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.cientifico}</p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#4C7F5B', lineHeight: 1.5 }}>{f.nota}</p>
          </div>
        ))}
      </div>

      {/* CONSEJOS POR SECCIÓN (acordeón) */}
      <h2 style={secTitle}>Consejos y tareas del mes</h2>
      <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#A7C4A1' }}>Tocá el <b style={{ color: '#4C7F5B' }}>+</b> en cualquier consejo para sumarlo a tus tareas.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {SECTIONS.map(sec => {
          const items = tips[sec.key]
          if (!items?.length) return null
          const open = openSection === sec.key
          return (
            <div key={sec.key} style={{ backgroundColor: 'white', borderRadius: '18px', border: '1px solid rgba(30,61,43,0.06)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(30,61,43,0.04)' }}>
              <button onClick={() => setOpenSection(open ? '' : sec.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ color: sec.color, display: 'flex' }}>{SEC_ICON[sec.key]}</span>
                <span style={{ flex: 1, fontSize: '15px', fontWeight: 700, color: '#1E3D2B' }}>{sec.label}</span>
                <span style={{ fontSize: '11px', color: '#A7C4A1', fontWeight: 600 }}>{items.length}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A7C4A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {open && (
                <ul style={{ margin: 0, padding: '0 16px 14px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {items.map((it, i) => {
                    const added = alreadyAdded(it)
                    return (
                      <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13.5px', color: '#345E43', lineHeight: 1.55 }}>
                        <span style={{ color: sec.color, flexShrink: 0, fontWeight: 700, marginTop: '1px' }}>·</span>
                        <span style={{ flex: 1 }}>{it}</span>
                        <button onClick={() => !added && addTaskDirect(it, sec.catForTask)} title={added ? 'Ya agregada' : 'Agregar a mis tareas'} style={{
                          flexShrink: 0, width: '24px', height: '24px', borderRadius: '8px', cursor: added ? 'default' : 'pointer',
                          border: 'none', backgroundColor: added ? '#E7EFE6' : `${sec.color}18`, color: added ? '#4C7F5B' : sec.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700,
                        }}>{added ? '✓' : '+'}</button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {/* TAREAS SUGERIDAS (chips de un toque) */}
      <h2 style={secTitle}>Sumá una tarea rápido</h2>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {tips.suggested_tasks.map((s, i) => {
          const added = alreadyAdded(s.title)
          return (
            <button key={i} onClick={() => !added && addTaskDirect(s.title, s.category)} disabled={added} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 14px', borderRadius: '999px',
              cursor: added ? 'default' : 'pointer', fontSize: '12.5px', fontWeight: 600,
              border: `1.5px solid ${added ? 'rgba(30,61,43,0.1)' : catColor(s.category) + '40'}`,
              backgroundColor: added ? '#E7EFE6' : 'white', color: added ? '#4C7F5B' : '#1E3D2B',
            }}>
              <span style={{ color: catColor(s.category), fontSize: '15px', fontWeight: 700 }}>{added ? '✓' : '+'}</span>
              {s.title}
            </button>
          )
        })}
      </div>

      {/* Toast de confirmación */}
      {justAdded && (
        <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1E3D2B', color: '#F2E9DD', padding: '11px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, zIndex: 60, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          ✓ Agregada a tus tareas
        </div>
      )}

      {/* PLANIFICADOR */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ ...secTitle, margin: 0 }}>Mis tareas de {MONTHS[month - 1]}</h2>
        {authed && monthTasks.length > 0 && <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600 }}>{doneCount}/{monthTasks.length}</span>}
      </div>

      {!authed ? (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#4C7F5B' }}>Iniciá sesión para guardar y planificar tus tareas.</p>
          <a href="/auth/login" style={{ display: 'inline-block', backgroundColor: '#1E3D2B', color: '#F2E9DD', padding: '11px 22px', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>Iniciar sesión</a>
        </div>
      ) : (
        <>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: '18px', padding: '14px', marginBottom: '16px', border: '1px solid rgba(30,61,43,0.08)' }}>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Nueva tarea propia…" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '12px', border: '1px solid rgba(30,61,43,0.12)', backgroundColor: 'white', fontSize: '14px', color: '#1E3D2B', outline: 'none', marginBottom: '10px' }} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {TASK_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setNewCat(c.id)} style={{ padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, border: newCat === c.id ? `1.5px solid ${c.color}` : '1.5px solid rgba(30,61,43,0.12)', backgroundColor: newCat === c.id ? `${c.color}18` : 'white', color: newCat === c.id ? c.color : '#4C7F5B' }}>{c.label}</button>
              ))}
              <button onClick={addTask} disabled={adding || !newTitle.trim()} style={{ marginLeft: 'auto', padding: '8px 18px', borderRadius: '999px', border: 'none', cursor: newTitle.trim() ? 'pointer' : 'not-allowed', backgroundColor: newTitle.trim() ? '#1E3D2B' : 'rgba(30,61,43,0.3)', color: '#F2E9DD', fontSize: '13px', fontWeight: 700 }}>Agregar</button>
            </div>
          </div>

          {loading ? (
            <p style={{ fontSize: '13px', color: '#4C7F5B', textAlign: 'center' }}>Cargando…</p>
          ) : monthTasks.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#A7C4A1', textAlign: 'center', padding: '20px' }}>Todavía no tenés tareas este mes. Sumá desde los consejos de arriba 🌱</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[...pending, ...monthTasks.filter(t => t.done)].map(t => (
                <div key={t.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '14px', border: '1px solid rgba(30,61,43,0.06)', boxShadow: '0 2px 10px rgba(30,61,43,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <button onClick={() => toggle(t)} style={{ width: '22px', height: '22px', borderRadius: '7px', flexShrink: 0, marginTop: '1px', cursor: 'pointer', border: `2px solid ${t.done ? '#4C7F5B' : 'rgba(30,61,43,0.25)'}`, backgroundColor: t.done ? '#4C7F5B' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: `${catColor(t.category)}18`, color: catColor(t.category) }}>{catLabel(t.category)}</span>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1E3D2B', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.55 : 1 }}>{t.title}</p>
                      </div>
                      {editingNotes === t.id ? (
                        <textarea autoFocus defaultValue={t.notes ?? ''} onBlur={e => saveNotes(t.id, e.target.value)} placeholder="¿Cómo funcionó? ¿Qué planeás para el futuro?" style={{ width: '100%', boxSizing: 'border-box', marginTop: '8px', padding: '8px 10px', borderRadius: '10px', border: '1px solid rgba(30,61,43,0.15)', fontSize: '13px', color: '#345E43', outline: 'none', resize: 'vertical', minHeight: '54px', fontFamily: 'inherit' }} />
                      ) : t.notes ? (
                        <p onClick={() => setEditingNotes(t.id)} style={{ margin: '6px 0 0', fontSize: '12px', color: '#4C7F5B', cursor: 'pointer', lineHeight: 1.5, backgroundColor: '#F6F3EC', padding: '8px 10px', borderRadius: '10px' }}>{t.notes}</p>
                      ) : (
                        <button onClick={() => setEditingNotes(t.id)} style={{ marginTop: '6px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '12px', color: '#A7C4A1', fontWeight: 600 }}>+ Anotar resultado</button>
                      )}
                    </div>
                    <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C4A484', fontSize: '16px', padding: '2px', flexShrink: 0 }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const secTitle: React.CSSProperties = { fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, margin: '0 0 14px', color: '#1E3D2B' }

function StatChip({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '12px 10px', textAlign: 'center', border: '1px solid rgba(30,61,43,0.06)', boxShadow: '0 2px 8px rgba(30,61,43,0.05)' }}>
      <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1E3D2B', fontFamily: 'Cormorant Garamond, serif', lineHeight: 1 }}>{value}</p>
      <p style={{ margin: '3px 0 0', fontSize: '10px', color: '#4C7F5B', fontWeight: 600, lineHeight: 1.2 }}>{label}</p>
    </div>
  )
}
