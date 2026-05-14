import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  try {
    // Parse the event manually without Stripe SDK type constraints
    const event = JSON.parse(body)
    const admin = createAdminClient()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session?.metadata?.user_id
        if (!userId) break

        await admin.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          plan: 'pro',
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancel_at_period_end: false,
        })

        await admin.from('profiles')
          .update({ plan: 'pro' })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const { data: sub } = await admin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (!sub) break

        const newPlan = subscription.status === 'active' ? 'pro' : 'free'

        await admin.from('subscriptions').update({
          status: subscription.status,
          plan: newPlan,
          cancel_at_period_end: subscription.cancel_at_period_end,
        }).eq('stripe_subscription_id', subscription.id)

        await admin.from('profiles')
          .update({ plan: newPlan })
          .eq('id', sub.user_id)

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const { data: sub } = await admin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (!sub) break

        await admin.from('subscriptions').update({
          status: 'canceled',
          plan: 'free',
        }).eq('stripe_subscription_id', subscription.id)

        await admin.from('profiles')
          .update({ plan: 'free' })
          .eq('id', sub.user_id)

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
