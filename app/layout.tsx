import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Ballet } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
})

const ballet = Ballet({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-ballet'
})

export const metadata: Metadata = {
  title: 'SHEHAN & SAVISHKAA Homecoming',
  description: 'Join us as we celebrate the homecoming of SHEHAN and SAVISHKAA on December 5, 2026 at Cinnamon Lakeside Colombo.',
  generator: 'v0.app',
  icons: {
    icon: '/mono.png',
    apple: '/mono.png',
  },
  openGraph: {
    title: 'SHEHAN & SAVISHKAA Homecoming',
    description: 'Saturday, 05 December 2026 · 6:30 PM · King\'s Court, Cinnamon Lakeside Colombo',
    images: ['/pre/2.jpeg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#a51d2d',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} ${ballet.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
