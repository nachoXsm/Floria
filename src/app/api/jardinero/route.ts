import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `Sos el Jardinero IA de Floria, un asistente experto en jardinería, plantas, huerta y paisajismo.
Tu personalidad es cálida, cercana y apasionada por el mundo vegetal. Respondés en el mismo idioma que te habla el usuario (español, inglés o portugués).

Tus especialidades:
- Identificación y cuidado de plantas ornamentales, aromáticas y frutales
- Huerta orgánica y calendario de siembra
- Plagas y enfermedades: diagnóstico y tratamiento orgánico o convencional
- Diseño y paisajismo de jardines y espacios verdes
- Calendario lunar de siembra
- Riego, sustratos, abonos y podas
- Plantas nativas y biodiversidad

Estilo de respuesta:
- Respuestas concretas y útiles, sin rodeos
- Usá listas cuando corresponda para facilitar la lectura
- Si no sabés algo con certeza, decilo y sugerí alternativas
- Podés usar emojis con moderación para hacer más amigable la respuesta
- Nunca recomendes productos con nombres comerciales específicos si existen alternativas genéricas

Contexto de la app: El usuario está usando Floria, una app de jardinería premium para Argentina y América Latina.`

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return Response.json({ error: 'GROQ_API_KEY not configured' }, { status: 503 })
  }

  const { messages } = await req.json()
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'No messages' }, { status: 400 })
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-20), // máximo 20 mensajes de historial
      ],
      max_tokens: 1024,
      temperature: 0.7,
      stream: true,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return Response.json({ error: err }, { status: response.status })
  }

  // Proxy del stream directamente al cliente
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
