import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
  description: 'Inspiración inteligente para vivir rodeado de verde.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap');`}</style>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'Montserrat, system-ui, sans-serif',
          backgroundColor: '#F9FCF8',
          color: '#1E3D2B',
        }}
      >
        {children}
      </body>
    </html>
  )
}
