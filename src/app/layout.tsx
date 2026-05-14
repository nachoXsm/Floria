import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
  description: 'Inspiración inteligente para vivir rodeado de verde.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#F9FCF8', color: '#1E3D2B' }}>
        {children}
      </body>
    </html>
  )
}
