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

const SITE_URL = 'https://shehan-savishkaa-homecomingfunction.vercel.app'
const SHARE_TITLE = 'SHEHAN & SAVISHKAA Homecoming'
const SHARE_DESCRIPTION = 'Saturday, 05 December 2026 · 6:30 PM · King\'s Court, Cinnamon Lakeside Colombo'
const SHARE_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 1200,
  alt: 'Shehan & Savishkaa Homecoming Invitation',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SHARE_TITLE,
  description: 'Join us as we celebrate the homecoming of SHEHAN and SAVISHKAA on December 5, 2026 at Cinnamon Lakeside Colombo.',
  generator: 'v0.app',
  icons: {
    icon: '/mono.png',
    apple: '/mono.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SHARE_TITLE,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
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
