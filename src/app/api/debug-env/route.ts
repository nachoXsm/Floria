import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    has_plantnet: !!process.env.PLANTNET_API_KEY,
    plantnet_length: process.env.PLANTNET_API_KEY?.length ?? 0,
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  })
}
