import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mystica - AI Tarot Reading',
  description: 'Experience mystical tarot readings powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
