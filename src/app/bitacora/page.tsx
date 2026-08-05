import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import BottomNav from '@/components/BottomNav'
import BitacoraClient from './BitacoraClient'

export const metadata: Metadata = {
  title: 'Bitácora de jardín — Floria',
}

export default function BitacoraPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F2E9DD', color: '#1E3D2B', fontFamily: 'Montserrat, system-ui, sans-serif', paddingBottom: '90px' }}>
      <Nav />
      <BitacoraClient />
      <BottomNav />
    </main>
  )
}
