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

  // Guardar la imagen es opcional: si falla (bucket inexistente, etc.) seguimos igual
  let publicUrl = ''
  const { data: storageData, error: storageError } = await admin.storage
    .from('identifications')
    .upload(fileName, imageBuffer, { contentType: imageFile.type, upsert: false })

  if (!storageError && storageData) {
    const { data: urlData } = admin.storage.from('identifications').getPublicUrl(storageData.path)
    publicUrl = urlData.publicUrl
  }

  const base64Image = Buffer.from(imageBuffer).toString('base64')

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Identificá la planta en esta foto. Respondé SOLO con un JSON válido, sin markdown, con este formato exacto:
{
  "is_plant": true,
  "suggestions": [
    {
      "name": "Nombre científico completo",
      "probability": 0.95,
      "common_names": ["nombre común en español"],
      "description": "Descripción breve de la planta en español (2-3 oraciones).",
      "watering": { "min": 1, "max": 7 }
    }
  ]
}
Incluí hasta 3 sugerencias ordenadas por probabilidad. Si no es una planta, devolvé is_plant: false y suggestions vacío.`
            },
            {
              inline_data: {
                mime_type: imageFile.type,
                data: base64Image,
              }
            }
          ]
        }],
        generationConfig: { temperature: 0.1 }
      })
    }
  )

  if (!geminiRes.ok) {
    return NextResponse.json({ error: 'Error en la API de identificación' }, { status: 502 })
  }

  const geminiData = await geminiRes.json()
  const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'
  let parsed: { is_plant: boolean; suggestions: {name:string;probability:number;common_names:string[];description:string;watering:{min:number;max:number}}[] }
  try {
    parsed = JSON.parse(rawText.replace(/```json\n?|\n?```/g, '').trim())
  } catch {
    return NextResponse.json({ error: 'Respuesta inválida de la IA' }, { status: 502 })
  }

  const suggestions = (parsed.suggestions ?? []).map(s => ({
    name: s.name,
    probability: s.probability,
    details: {
      common_names: s.common_names ?? [],
      description: { value: s.description ?? '' },
      watering: s.watering ?? null,
    }
  }))
  const topSuggestion = suggestions[0]
  const plantIdData = { result: { is_plant: { binary: parsed.is_plant }, classification: { suggestions } } }

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
