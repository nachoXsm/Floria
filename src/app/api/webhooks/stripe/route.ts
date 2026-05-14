import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

const FREE_LIMIT = 3

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, identifications_this_month, identifications_reset_at')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
  }

  const admin = createAdminClient()
  const now = new Date()
  const resetAt = new Date(profile.identifications_reset_at)

  if (now > resetAt) {
    await admin.from('profiles').update({
      identifications_this_month: 0,
      identifications_reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()
    }).eq('id', user.id)
    profile.identifications_this_month = 0
  }

  if (profile.plan === 'free' && profile.identifications_this_month >= FREE_LIMIT) {
    return NextResponse.json({
      error: 'Límite mensual alcanzado',
      code: 'FREE_LIMIT_REACHED',
      limit: FREE_LIMIT,
      upgrade_url: '/pricing'
    }, { status: 429 })
  }

  const formData = await request.formData()
  const imageFile = formData.get('image') as File | null

  if (!imageFile) {
    return NextResponse.json({ error: 'No se recibió imagen' }, { status: 400 })
  }

  const fileName = `${user.id}/${Date.now()}-${imageFile.name}`
  const imageBuffer = await imageFile.arrayBuffer()

  const { data: storageData, error: storageError } = await admin.storage
    .from('identifications')
    .upload(fileName, imageBuffer, { contentType: imageFile.type, upsert: false })

  if (storageError) {
    return NextResponse.json({ error: 'Error subiendo imagen' }, { status: 500 })
  }

  const { data: urlData } = admin.storage.from('identifications').getPublicUrl(storageData.path)
  const publicUrl = urlData.publicUrl

  const base64Image = Buffer.from(imageBuffer).toString('base64')

  const plantIdResponse = await fetch('https://plant.id/api/v3/identification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': process.env.PLANT_ID_API_KEY ?? '',
    },
    body: JSON.stringify({
      images: [`data:${imageFile.type};base64,${base64Image}`],
      details: ['common_names', 'taxonomy', 'url', 'description', 'watering'],
      similar_images: true,
    }),
  })

  if (!plantIdResponse.ok) {
    return NextResponse.json({ error: 'Error en la API de identificación' }, { status: 502 })
  }

  const plantIdData = await plantIdResponse.json()
  const suggestions = plantIdData.result?.classification?.suggestions ?? []
  const topSuggestion = suggestions[0]

  let matchedPlantId: string | null = null
  let confidence: number | null = null

  if (topSuggestion) {
    confidence = topSuggestion.probability
    const { data: existingPlant } = await supabase
      .from('plants')
      .select('id')
      .ilike('scientific_name', `%${topSuggestion.name}%`)
      .single()
    if (existingPlant) matchedPlantId = existingPlant.id
  }

  const { data: identification } = await admin.from('identifications').insert({
    user_id: user.id,
    image_url: publicUrl,
    api_response: plantIdData,
    matched_plant_id: matchedPlantId,
    confidence,
    suggestions: suggestions.slice(0, 5),
  }).select().single()

  await admin.from('profiles')
    .update({ identifications_this_month: profile.identifications_this_month + 1 })
    .eq('id', user.id)

  return NextResponse.json({
    id: identification?.id,
    image_url: publicUrl,
    suggestions: suggestions.slice(0, 5),
    matched_plant_id: matchedPlantId,
    confidence,
    is_plant: plantIdData.result?.is_plant?.binary ?? false,
  })
}
