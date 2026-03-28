import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import GlobalChat from './components/GlobalChat'

export const metadata: Metadata = {
  title: 'Mystica - Numerology, Astrology & Spiritual Guidance',
  description: 'Discover the cosmic patterns that shape your life through numerology, astrology, and ancient spiritual wisdom.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
        <GlobalChat />
      </body>
    </html>
  )
}
