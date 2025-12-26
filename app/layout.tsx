import type { Metadata } from 'next'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Garnica Miguelena | Arquitectura e Interiorismo de Lujo en Marbella',
  description: 'Estudio de arquitectura e interiorismo en Marbella. Diseñamos espacios atemporales con gestión integral de proyectos en la Costa del Sol.',
  keywords: ['arquitectura', 'interiorismo', 'Marbella', 'Costa del Sol', 'diseño interior', 'lujo', 'villas', 'reforma integral'],
  authors: [{ name: 'Garnica Miguelena' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_GB',
    siteName: 'Garnica Miguelena',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${cormorant.variable} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  )
}
