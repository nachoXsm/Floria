import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
  description: 'Inspiración inteligente para vivir rodeado de verde.',
  icons: {
    icon: '/icono-floria.png',
    apple: '/icono-floria.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'Montserrat, system-ui, sans-serif',
        backgroundColor: '#F9FCF8',
        color: '#1E3D2B',
      }}>
        {children}
      </body>
    </html>
  )
}
