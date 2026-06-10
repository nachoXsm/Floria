import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/components/I18nProvider'

export const metadata: Metadata = {
  title: 'Floria — Tu espacio, tu naturaleza',
  description: 'Inspiración inteligente para vivir rodeado de verde.',
  manifest: '/manifest.json',
  themeColor: '#1E3D2B',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Floria',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json?v=3" />
        <meta name="theme-color" content="#1E3D2B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Floria" />
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'Montserrat, system-ui, sans-serif',
        backgroundColor: '#F9FCF8',
        color: '#1E3D2B',
      }}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
