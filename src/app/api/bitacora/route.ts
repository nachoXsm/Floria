import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET  /api/bitacora        → lista las tareas del usuario
// POST /api/bitacora        → crea una tarea { title, category, month }
// PATCH /api/bitacora       → actualiza { id, done?, notes?, title? }
// DELETE /api/bitacora?id=   → elimina una tarea

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data, error } = await supabase
    .from('garden_journal')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tasks: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const title = (body?.title ?? '').toString().trim()
  if (!title) return NextResponse.json({ error: 'Falta el título' }, { status: 400 })

  const { data, error } = await supabase
    .from('garden_journal')
    .insert({
      user_id: user.id,
      title,
      category: body?.category ?? 'jardin',
      month: body?.month ?? null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ task: data })
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const id = body?.id
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const fields: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (typeof body.done === 'boolean') fields.done = body.done
  if (typeof body.notes === 'string') fields.notes = body.notes
  if (typeof body.title === 'string' && body.title.trim()) fields.title = body.title.trim()

  const { data, error } = await supabase
    .from('garden_journal')
    .update(fields)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ task: data })
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Falta el id' }, { status: 400 })

  const { error } = await supabase
    .from('garden_journal')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
