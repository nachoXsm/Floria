// app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Floria — Tu espacio, tu naturaleza',
    template: '%s | Floria',
  },
  description:
    'Descubrí, identificá y diseñá con plantas. La plataforma inteligente para paisajistas y amantes de la naturaleza.',
  keywords: ['plantas', 'jardín', 'paisajismo', 'identificación de plantas', 'diseño de jardines'],
  openGraph: {
    title: 'Floria — Tu espacio, tu naturaleza',
    description: 'Inspiración inteligente para vivir rodeado de verde.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floria',
    description: 'Inspiración inteligente para vivir rodeado de verde.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="bg-floria-50 text-floria-900 antialiased">
        {children}
      </body>
    </html>
  )
}
