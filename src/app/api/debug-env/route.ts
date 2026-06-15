import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    has_gemini: !!process.env.GEMINI_API_KEY,
    gemini_length: process.env.GEMINI_API_KEY?.length ?? 0,
    gemini_prefix: process.env.GEMINI_API_KEY?.slice(0, 6) ?? '',
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  })
}
