import { NextRequest, NextResponse } from 'next/server'
import { sendConfirmationEmail, sendWelcomeEmail } from '@/lib/email'

// Supabase llama este endpoint como Auth Hook cuando hay un evento de signup
// Configurar en: Supabase → Authentication → Hooks → Send Email
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.SUPABASE_HOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { user, email_data } = body

  // email_data.token_hash y email_data.redirect_to vienen de Supabase
  if (email_data?.email_action_type === 'signup') {
    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=${email_data.token_hash}&type=email&next=/perfil`
    await sendConfirmationEmail(user.email, confirmUrl)
    return NextResponse.json({ ok: true })
  }

  if (email_data?.email_action_type === 'recovery') {
    const { sendPasswordResetEmail } = await import('@/lib/email')
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?token_hash=${email_data.token_hash}&type=recovery&next=/perfil`
    await sendPasswordResetEmail(user.email, resetUrl)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: true })
}
