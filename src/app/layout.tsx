import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
  description: 'Inspiración inteligente para vivir rodeado de verde.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-floria-50 text-floria-900 antialiased">
        {children}
      </body>
    </html>
  )
}
