'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    router.push('/')
  }

  const navLinks = isLoggedIn
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/numerology', label: 'Numerology' },
        { href: '/astrology', label: 'Astrology' },
        { href: '/chat', label: 'Guidance' },
        { href: '/profile', label: 'Profile' },
      ]
    : [
        { href: '/#features', label: 'Features' },
        { href: '/#pricing', label: 'Pricing' },
      ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/20 bg-black/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={isLoggedIn ? '/dashboard' : '/'}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Mystica
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-5 rounded-full transition-all"
                >
                  Get Started
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-purple-500/20 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => { handleSignOut(); setMobileOpen(false) }}
              className="block text-sm font-medium text-gray-400 hover:text-white"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-300 hover:text-white">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="block text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-5 rounded-full text-center">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
