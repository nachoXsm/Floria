import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    has_groq: !!process.env.GROQ_API_KEY,
    groq_length: process.env.GROQ_API_KEY?.length ?? 0,
    groq_prefix: process.env.GROQ_API_KEY?.slice(0, 4) ?? '',
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  })
}
