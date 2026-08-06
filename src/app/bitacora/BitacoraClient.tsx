'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { BITACORA, MONTHS, REGIONS, TASK_CATEGORIES } from '@/lib/bitacora'
import { color, font, shadow, radius } from '@/lib/ui'
import {
  Plant, Carrot, Leaf, Scissors, Bug, Toolbox, Flower, Sparkle,
  Plus, Check, CaretDown, CaretRight, Trash, type Icon,
} from '@phosphor-icons/react'

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

const catColor = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.color ?? color.green
const catLabel = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.label ?? 'Jardín'

type SectionKey = 'jardin' | 'huerta' | 'almacigos' | 'poda' | 'plagas' | 'mantenimiento'
const SECTIONS: { key: SectionKey; label: string; color: string; catForTask: string; Icon: Icon }[] = [
  { key: 'jardin', label: 'En el jardín', color: '#4C7F5B', catForTask: 'jardin', Icon: Plant },
  { key: 'huerta', label: 'En la huerta', color: '#C4773B', catForTask: 'huerta', Icon: Carrot },
  { key: 'almacigos', label: 'Almácigos', color: '#6B5B95', catForTask: 'almacigo', Icon: Leaf },
  { key: 'poda', label: 'Poda', color: '#2E5B3E', catForTask: 'jardin', Icon: Scissors },
  { key: 'plagas', label: 'Plagas y enfermedades', color: '#8B3A2F', catForTask: 'mantenimiento', Icon: Bug },
  { key: 'mantenimiento', label: 'Mantenimiento', color: '#2563EB', catForTask: 'mantenimiento', Icon: Toolbox },
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

  const yearStats = useMemo(() => {
    const done = tasks.filter(t => t.done).length
    const monthsWithActivity = new Set(tasks.map(t => t.month).filter(Boolean)).size
    return { done, monthsWithActivity }
  }, [tasks])

  const alreadyAdded = (title: string) => tasks.some(t => t.title === title && (t.month === month || t.month == null))

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '92px 20px 40px' }}>
      <style>{`
        .bit-press { transition: transform 0.18s cubic-bezier(0.2,0.7,0.2,1); }
        .bit-press:active { transform: scale(0.97); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ===== PORTADA REVISTA ===== */}
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: `${radius.xl}px`,
        background: `radial-gradient(130% 100% at 80% 10%, #2E5B3E 0%, ${color.ink} 55%, #12281B 100%)`,
        padding: '30px 26px 28px', marginBottom: '22px', boxShadow: shadow.card,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.14 }}>
          <g fill="none" stroke="#F2E9DD" strokeWidth="1.2" strokeLinecap="round">
            <path d="M250 40c-34 8-58 38-66 80M250 40c8 34-4 68-38 90M250 40c-26 26-42 55-46 90" />
          </g>
        </svg>
        <div style={{ position: 'relative' }}>
          <p style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: color.blush }}>
            Bitácora de jardín
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '16px' }}>
            <h1 style={{ margin: 0, fontFamily: font.serif, fontSize: '58px', fontWeight: 500, color: '#F2E9DD', lineHeight: 0.85, letterSpacing: '-1px' }}>
              {MONTHS[month - 1]}
            </h1>
            <span style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 700, color: color.ink, backgroundColor: color.blush, padding: '4px 12px', borderRadius: '999px' }}>
              {tips.estacion}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '15px', color: 'rgba(242,233,221,0.88)', lineHeight: 1.6, fontFamily: font.serif, fontStyle: 'italic' }}>
            {tips.destacado}
          </p>
          {authed && tasks.length > 0 && (
            <div style={{ display: 'flex', gap: '20px', marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(242,233,221,0.15)' }}>
              <Stat value={yearStats.done} label="hechas este año" />
              <Stat value={`${yearStats.monthsWithActivity}/12`} label="meses activos" />
              <Stat value={pending.length} label="pendientes" />
            </div>
          )}
        </div>
      </div>

      {/* Selector de mes */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '10px' }}>
        {MONTHS.map((m, i) => {
          const mn = i + 1
          const active = mn === month
          return (
            <button key={m} onClick={() => setMonth(mn)} style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: '999px', cursor: 'pointer',
              border: active ? `1.5px solid ${color.ink}` : `1.5px solid ${color.line}`,
              backgroundColor: active ? color.ink : color.paper,
              color: active ? '#F2E9DD' : color.ink, fontSize: '13px', fontWeight: 600,
            }}>{m}{mn === CURRENT_MONTH ? ' ·' : ''}</button>
          )
        })}
      </div>

      {/* Selector de región */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '26px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', color: color.inkSoft, fontWeight: 600 }}>Tu zona:</span>
        {REGIONS.map(r => (
          <button key={r.key} onClick={() => setRegion(r.key)} style={{
            padding: '5px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '11.5px', fontWeight: 600,
            border: region === r.key ? `1.5px solid ${color.blushDeep}` : `1.5px solid ${color.line}`,
            backgroundColor: region === r.key ? 'rgba(192,138,123,0.12)' : color.paper,
            color: region === r.key ? color.blushDeep : color.inkSoft,
          }}>{r.region}</button>
        ))}
      </div>

      {/* Nota regional */}
      {regionNote && regionNote.notas.length > 0 && (
        <div style={{ backgroundColor: 'rgba(192,138,123,0.08)', border: '1px solid rgba(192,138,123,0.2)', borderRadius: `${radius.md}px`, padding: '16px 18px', marginBottom: '26px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, color: color.blushDeep, textTransform: 'uppercase', letterSpacing: '1px' }}>Ajuste para {regionData?.region}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {regionNote.notas.map((n, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: color.inkSoft, lineHeight: 1.55 }}><span style={{ color: color.blushDeep }}>·</span>{n}</li>
            ))}
          </ul>
        </div>
      )}

      {/* FLORACIÓN DEL MES */}
      <SecHeader title="Floración del mes" />
      <div className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px', margin: '0 -20px 32px', paddingLeft: '20px', paddingRight: '20px' }}>
        {tips.flores_destacadas.map((f, i) => (
          <div key={i} style={{ minWidth: '220px', maxWidth: '220px', backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '18px', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: '#FBEEF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Flower size={22} weight="light" color={color.blushDeep} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: color.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.nombre}</p>
                <p style={{ margin: 0, fontSize: '11px', color: color.inkSoft, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.cientifico}</p>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: color.inkSoft, lineHeight: 1.5 }}>{f.nota}</p>
          </div>
        ))}
      </div>

      {/* CONSEJOS POR SECCIÓN */}
      <SecHeader title="Qué hacer este mes" subtitle="Tocá el + en cualquier consejo para sumarlo a tus tareas." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '34px' }}>
        {SECTIONS.map(sec => {
          const items = tips[sec.key]
          if (!items?.length) return null
          const open = openSection === sec.key
          return (
            <div key={sec.key} style={{ backgroundColor: color.paper, borderRadius: `${radius.md}px`, border: `1px solid ${color.line}`, overflow: 'hidden', boxShadow: shadow.soft }}>
              <button onClick={() => setOpenSection(open ? '' : sec.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '13px', padding: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '11px', backgroundColor: `${sec.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <sec.Icon size={20} weight="light" color={sec.color} />
                </div>
                <span style={{ flex: 1, fontSize: '15px', fontWeight: 700, color: color.ink }}>{sec.label}</span>
                <span style={{ fontSize: '11px', color: color.inkFaint, fontWeight: 600 }}>{items.length}</span>
                <CaretDown size={17} weight="bold" color={color.inkFaint} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open && (
                <ul style={{ margin: 0, padding: '0 16px 14px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {items.map((it, i) => {
                    const added = alreadyAdded(it)
                    return (
                      <li key={i} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', fontSize: '13.5px', color: color.inkSoft, lineHeight: 1.55 }}>
                        <span style={{ color: sec.color, flexShrink: 0, fontWeight: 700, marginTop: '1px' }}>·</span>
                        <span style={{ flex: 1 }}>{it}</span>
                        <button onClick={() => !added && addTaskDirect(it, sec.catForTask)} title={added ? 'Ya agregada' : 'Agregar'} style={{
                          flexShrink: 0, width: '26px', height: '26px', borderRadius: '9px', cursor: added ? 'default' : 'pointer',
                          border: 'none', backgroundColor: added ? color.mist : `${sec.color}15`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {added ? <Check size={15} weight="bold" color={color.green} /> : <Plus size={15} weight="bold" color={sec.color} />}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {/* TAREAS SUGERIDAS */}
      <SecHeader title="Sumá una tarea rápido" />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '34px' }}>
        {tips.suggested_tasks.map((s, i) => {
          const added = alreadyAdded(s.title)
          return (
            <button key={i} onClick={() => !added && addTaskDirect(s.title, s.category)} disabled={added} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 14px', borderRadius: '999px',
              cursor: added ? 'default' : 'pointer', fontSize: '12.5px', fontWeight: 600,
              border: `1.5px solid ${added ? color.line : catColor(s.category) + '40'}`,
              backgroundColor: added ? color.mist : color.paper, color: added ? color.green : color.ink,
            }}>
              {added ? <Check size={15} weight="bold" color={color.green} /> : <Plus size={15} weight="bold" color={catColor(s.category)} />}
              {s.title}
            </button>
          )
        })}
      </div>

      {/* Toast */}
      {justAdded && (
        <div style={{ position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)', backgroundColor: color.ink, color: '#F2E9DD', padding: '11px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, zIndex: 60, boxShadow: shadow.lifted, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} weight="bold" color={color.blush} /> Agregada a tus tareas
        </div>
      )}

      {/* PLANIFICADOR */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ fontFamily: font.serif, fontSize: '30px', fontWeight: 500, color: color.ink, margin: 0, letterSpacing: '-0.4px' }}>Mis tareas</h2>
        {authed && monthTasks.length > 0 && <span style={{ fontSize: '12px', color: color.inkSoft, fontWeight: 600 }}>{doneCount}/{monthTasks.length}</span>}
      </div>

      {!authed ? (
        <div style={{ backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '26px', textAlign: 'center', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
          <p style={{ margin: '0 0 14px', fontSize: '14px', color: color.inkSoft }}>Iniciá sesión para guardar y planificar tus tareas.</p>
          <a href="/auth/login" style={{ display: 'inline-block', backgroundColor: color.ink, color: '#F2E9DD', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>Iniciar sesión</a>
        </div>
      ) : (
        <>
          <div style={{ backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '14px', marginBottom: '16px', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Nueva tarea propia…" style={{ width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: '12px', border: `1px solid ${color.line}`, backgroundColor: color.bg, fontSize: '14px', color: color.ink, outline: 'none', marginBottom: '10px' }} />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {TASK_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setNewCat(c.id)} style={{ padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, border: newCat === c.id ? `1.5px solid ${c.color}` : `1.5px solid ${color.line}`, backgroundColor: newCat === c.id ? `${c.color}18` : color.bg, color: newCat === c.id ? c.color : color.inkSoft }}>{c.label}</button>
              ))}
              <button onClick={addTask} disabled={adding || !newTitle.trim()} style={{ marginLeft: 'auto', padding: '9px 20px', borderRadius: '999px', border: 'none', cursor: newTitle.trim() ? 'pointer' : 'not-allowed', backgroundColor: newTitle.trim() ? color.ink : 'rgba(30,61,43,0.3)', color: '#F2E9DD', fontSize: '13px', fontWeight: 700 }}>Agregar</button>
            </div>
          </div>

          {loading ? (
            <p style={{ fontSize: '13px', color: color.inkSoft, textAlign: 'center' }}>Cargando…</p>
          ) : monthTasks.length === 0 ? (
            <p style={{ fontSize: '13px', color: color.inkFaint, textAlign: 'center', padding: '20px' }}>Todavía no tenés tareas este mes. Sumá desde los consejos de arriba 🌱</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[...pending, ...monthTasks.filter(t => t.done)].map(t => (
                <div key={t.id} style={{ backgroundColor: color.paper, borderRadius: `${radius.md}px`, padding: '15px', border: `1px solid ${color.line}`, boxShadow: shadow.soft }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <button onClick={() => toggle(t)} style={{ width: '24px', height: '24px', borderRadius: '8px', flexShrink: 0, marginTop: '1px', cursor: 'pointer', border: `2px solid ${t.done ? color.green : 'rgba(30,61,43,0.22)'}`, backgroundColor: t.done ? color.green : color.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      {t.done && <Check size={14} weight="bold" color="#F2E9DD" />}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: `${catColor(t.category)}18`, color: catColor(t.category) }}>{catLabel(t.category)}</span>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: color.ink, textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>{t.title}</p>
                      </div>
                      {editingNotes === t.id ? (
                        <textarea autoFocus defaultValue={t.notes ?? ''} onBlur={e => saveNotes(t.id, e.target.value)} placeholder="¿Cómo funcionó? ¿Qué planeás para el futuro?" style={{ width: '100%', boxSizing: 'border-box', marginTop: '8px', padding: '9px 11px', borderRadius: '10px', border: `1px solid ${color.line}`, fontSize: '13px', color: color.inkSoft, outline: 'none', resize: 'vertical', minHeight: '56px', fontFamily: 'inherit', backgroundColor: color.bg }} />
                      ) : t.notes ? (
                        <p onClick={() => setEditingNotes(t.id)} style={{ margin: '7px 0 0', fontSize: '12.5px', color: color.inkSoft, cursor: 'pointer', lineHeight: 1.5, backgroundColor: color.cream, padding: '9px 11px', borderRadius: '10px' }}>{t.notes}</p>
                      ) : (
                        <button onClick={() => setEditingNotes(t.id)} style={{ marginTop: '7px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '12px', color: color.inkFaint, fontWeight: 600 }}>+ Anotar resultado</button>
                      )}
                    </div>
                    <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0 }}>
                      <Trash size={17} weight="light" color={color.inkFaint} />
                    </button>
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

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontFamily: font.serif, fontSize: '26px', fontWeight: 500, color: '#F2E9DD', lineHeight: 1 }}>{value}</p>
      <p style={{ margin: '2px 0 0', fontSize: '10.5px', color: 'rgba(242,233,221,0.6)', fontWeight: 600 }}>{label}</p>
    </div>
  )
}

function SecHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: subtitle ? '14px' : '16px' }}>
      <h2 style={{ fontFamily: font.serif, fontSize: '30px', fontWeight: 500, color: color.ink, margin: 0, letterSpacing: '-0.4px', lineHeight: 1.02 }}>{title}</h2>
      {subtitle && <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: color.inkFaint }}>{subtitle}</p>}
    </div>
  )
}
