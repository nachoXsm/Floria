'use client'
import { useState, useEffect, useCallback } from 'react'
import { BITACORA, MONTHS, TASK_CATEGORIES } from '@/lib/bitacora'

type Task = {
  id: string
  title: string
  category: string
  month: number | null
  done: boolean
  notes: string | null
}

const now = new Date()
const CURRENT_MONTH = now.getMonth() + 1

const catColor = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.color ?? '#4C7F5B'
const catLabel = (id: string) => TASK_CATEGORIES.find(c => c.id === id)?.label ?? 'Jardín'

export default function BitacoraClient() {
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newCat, setNewCat] = useState('jardin')
  const [adding, setAdding] = useState(false)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)

  const tips = BITACORA[month]

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

  const addTask = async () => {
    if (!newTitle.trim()) return
    setAdding(true)
    try {
      const res = await fetch('/api/bitacora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, category: newCat, month }),
      })
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      if (data.task) setTasks(prev => [data.task, ...prev])
      setNewTitle('')
    } finally {
      setAdding(false)
    }
  }

  const toggle = async (t: Task) => {
    setTasks(prev => prev.map(x => x.id === t.id ? { ...x, done: !x.done } : x))
    await fetch('/api/bitacora', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, done: !t.done }),
    })
  }

  const saveNotes = async (id: string, notes: string) => {
    setTasks(prev => prev.map(x => x.id === id ? { ...x, notes } : x))
    setEditingNotes(null)
    await fetch('/api/bitacora', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes }),
    })
  }

  const remove = async (id: string) => {
    setTasks(prev => prev.filter(x => x.id !== id))
    await fetch(`/api/bitacora?id=${id}`, { method: 'DELETE' })
  }

  const monthTasks = tasks.filter(t => t.month === month || t.month == null)
  const pending = monthTasks.filter(t => !t.done)
  const doneCount = monthTasks.filter(t => t.done).length

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 20px 20px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '40px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.05 }}>
        Bitácora de jardín
      </h1>
      <p style={{ fontSize: '14px', color: '#4C7F5B', margin: '0 0 24px', lineHeight: 1.6 }}>
        Planificá tus tareas del jardín y la huerta, registrá lo que hiciste y seguí los consejos de cada mes.
      </p>

      {/* Selector de mes */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '8px', scrollbarWidth: 'none' }}>
        {MONTHS.map((m, i) => {
          const mn = i + 1
          const active = mn === month
          return (
            <button key={m} onClick={() => setMonth(mn)} style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: '999px', cursor: 'pointer',
              border: active ? '1.5px solid #1E3D2B' : '1.5px solid rgba(30,61,43,0.15)',
              backgroundColor: active ? '#1E3D2B' : 'rgba(255,255,255,0.6)',
              color: active ? '#F2E9DD' : '#1E3D2B', fontSize: '13px', fontWeight: 600,
            }}>
              {m}{mn === CURRENT_MONTH ? ' •' : ''}
            </button>
          )
        })}
      </div>

      {/* Destacado del mes */}
      <div style={{ backgroundColor: '#1E3D2B', borderRadius: '20px', padding: '20px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A7C4A1' }}>{tips.estacion} · {MONTHS[month - 1]}</span>
        <p style={{ margin: '8px 0 0', fontSize: '16px', fontWeight: 600, color: '#F2E9DD', lineHeight: 1.5, fontFamily: 'Cormorant Garamond, serif' }}>{tips.destacado}</p>
      </div>

      {/* Consejos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '32px' }}>
        <TipCard title="En el jardín" color="#4C7F5B" items={tips.jardin} />
        <TipCard title="En la huerta" color="#C4773B" items={tips.huerta} />
      </div>

      {/* PLANIFICADOR DE TAREAS */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 600, margin: 0 }}>Mis tareas</h2>
        {authed && monthTasks.length > 0 && (
          <span style={{ fontSize: '12px', color: '#4C7F5B', fontWeight: 600 }}>{doneCount}/{monthTasks.length} hechas</span>
        )}
      </div>

      {!authed ? (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#4C7F5B' }}>Iniciá sesión para guardar y planificar tus tareas.</p>
          <a href="/auth/login" style={{ display: 'inline-block', backgroundColor: '#1E3D2B', color: '#F2E9DD', padding: '11px 22px', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>Iniciar sesión</a>
        </div>
      ) : (
        <>
          {/* Alta de tarea */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: '18px', padding: '14px', marginBottom: '16px', border: '1px solid rgba(30,61,43,0.08)' }}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Nueva tarea… (ej: sembrar albahaca en almácigo)"
              style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '12px', border: '1px solid rgba(30,61,43,0.12)', backgroundColor: 'white', fontSize: '14px', color: '#1E3D2B', outline: 'none', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {TASK_CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setNewCat(c.id)} style={{
                  padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                  border: newCat === c.id ? `1.5px solid ${c.color}` : '1.5px solid rgba(30,61,43,0.12)',
                  backgroundColor: newCat === c.id ? `${c.color}18` : 'white', color: newCat === c.id ? c.color : '#4C7F5B',
                }}>{c.label}</button>
              ))}
              <button onClick={addTask} disabled={adding || !newTitle.trim()} style={{
                marginLeft: 'auto', padding: '8px 18px', borderRadius: '999px', border: 'none',
                cursor: newTitle.trim() ? 'pointer' : 'not-allowed',
                backgroundColor: newTitle.trim() ? '#1E3D2B' : 'rgba(30,61,43,0.3)', color: '#F2E9DD', fontSize: '13px', fontWeight: 700,
              }}>Agregar</button>
            </div>
          </div>

          {/* Lista */}
          {loading ? (
            <p style={{ fontSize: '13px', color: '#4C7F5B', textAlign: 'center' }}>Cargando…</p>
          ) : monthTasks.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#A7C4A1', textAlign: 'center', padding: '20px' }}>
              Todavía no tenés tareas. Agregá una arriba o inspirate en los consejos del mes. 🌱
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[...pending, ...monthTasks.filter(t => t.done)].map(t => (
                <div key={t.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '14px', border: '1px solid rgba(30,61,43,0.06)', boxShadow: '0 2px 10px rgba(30,61,43,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <button onClick={() => toggle(t)} style={{
                      width: '22px', height: '22px', borderRadius: '7px', flexShrink: 0, marginTop: '1px', cursor: 'pointer',
                      border: `2px solid ${t.done ? '#4C7F5B' : 'rgba(30,61,43,0.25)'}`,
                      backgroundColor: t.done ? '#4C7F5B' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {t.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: `${catColor(t.category)}18`, color: catColor(t.category) }}>{catLabel(t.category)}</span>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1E3D2B', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.55 : 1 }}>{t.title}</p>
                      </div>
                      {editingNotes === t.id ? (
                        <textarea
                          autoFocus
                          defaultValue={t.notes ?? ''}
                          onBlur={e => saveNotes(t.id, e.target.value)}
                          placeholder="¿Cómo funcionó? ¿Qué planeás para el futuro?"
                          style={{ width: '100%', boxSizing: 'border-box', marginTop: '8px', padding: '8px 10px', borderRadius: '10px', border: '1px solid rgba(30,61,43,0.15)', fontSize: '13px', color: '#345E43', outline: 'none', resize: 'vertical', minHeight: '54px', fontFamily: 'inherit' }}
                        />
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

function TipCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', borderLeft: `4px solid ${color}`, boxShadow: '0 4px 16px rgba(30,61,43,0.06)' }}>
      <h3 style={{ margin: '0 0 12px', fontSize: '17px', fontWeight: 700, color }}>{title}</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '13.5px', color: '#345E43', lineHeight: 1.5 }}>
            <span style={{ color, flexShrink: 0, fontWeight: 700 }}>·</span>{it}
          </li>
        ))}
      </ul>
    </div>
  )
}
