import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import BitacoraClient from './BitacoraClient'
import { color, font } from '@/lib/ui'

export const metadata: Metadata = {
  title: 'Bitácora de jardín — Floria',
}

export default function BitacoraPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: color.bg, color: color.ink, fontFamily: font.sans, paddingBottom: '110px' }}>
      <Nav />
      <BitacoraClient />
      <BottomNav />
    </main>
  )
}
