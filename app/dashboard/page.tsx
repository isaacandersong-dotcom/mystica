'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../lib/supabase'
import { calculateLifePath, getLifePathMeaning } from '../lib/numerology'
import { getZodiacSign, getZodiacDescription } from '../lib/astrology'
import MoonPhase from '../components/MoonPhase'
import SchumannResonance from '../components/SchumannResonance'

interface Profile {
  first_name: string
  last_name: string
  date_of_birth: string
  subscription_status: string
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
      } else {
        router.push('/profile')
        return
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  if (loading || !profile) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Aligning your cosmic energies...</p>
        </div>
      </main>
    )
  }

  const lifePath = profile.date_of_birth ? calculateLifePath(profile.date_of_birth) : null
  const zodiac = profile.date_of_birth ? getZodiacSign(profile.date_of_birth) : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile.first_name}
          </h2>
          <p className="text-gray-300">Here is your cosmic overview for today</p>
        </div>

        {/* Core Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Numerology Card */}
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Your Numerology</h3>
            {lifePath ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Life Path Number</span>
                  <span className="text-3xl font-bold text-white">{lifePath}</span>
                </div>
                <p className="text-sm text-gray-400">{getLifePathMeaning(lifePath)}</p>
                <Link
                  href="/numerology"
                  className="block w-full mt-4 text-center bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors"
                >
                  Full Numerology Report
                </Link>
              </div>
            ) : (
              <p className="text-gray-400">
                <Link href="/profile" className="text-purple-400 hover:underline">
                  Add your birth date
                </Link>{' '}
                to see your numerology
              </p>
            )}
          </div>

          {/* Astrology Card */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Your Astrology</h3>
            {zodiac ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sun Sign</span>
                  <span className="text-xl font-bold text-white">{zodiac.symbol} {zodiac.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Element</span>
                  <span className="text-sm font-semibold text-white">{zodiac.element}</span>
                </div>
                <p className="text-sm text-gray-400">{getZodiacDescription(zodiac.name)}</p>
                <Link
                  href="/astrology"
                  className="block w-full mt-4 text-center bg-indigo-600/30 hover:bg-indigo-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors"
                >
                  Explore Birth Chart
                </Link>
              </div>
            ) : (
              <p className="text-gray-400">
                <Link href="/profile" className="text-purple-400 hover:underline">
                  Add your birth date
                </Link>{' '}
                to see your astrology
              </p>
            )}
          </div>

          {/* Daily Insight Card */}
          <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Today&apos;s Insight</h3>
            <div className="space-y-3">
              <div className="text-4xl mb-3">&#10024;</div>
              <p className="text-white font-medium">
                &ldquo;Trust in the divine timing of the universe&rdquo;
              </p>
              <p className="text-sm text-gray-400">
                Today is a day for reflection and inner work. The cosmic energies support deep spiritual insights.
              </p>
              <Link
                href="/chat"
                className="block w-full mt-4 text-center bg-pink-600/30 hover:bg-pink-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors"
              >
                Get Personalized Guidance
              </Link>
            </div>
          </div>
        </div>

        {/* Celestial Tracking */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <MoonPhase />
          <SchumannResonance />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/numerology" className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">&#128290;</div>
            <div className="font-semibold">Numerology</div>
            <div className="text-sm text-gray-400">Calculate your numbers</div>
          </Link>
          <Link href="/astrology" className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">&#127775;</div>
            <div className="font-semibold">Astrology</div>
            <div className="text-sm text-gray-400">Explore your chart</div>
          </Link>
          <Link href="/chat" className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">&#128302;</div>
            <div className="font-semibold">Guidance</div>
            <div className="text-sm text-gray-400">Ask your questions</div>
          </Link>
          <Link href="/profile" className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-2">&#9881;&#65039;</div>
            <div className="font-semibold">Settings</div>
            <div className="text-sm text-gray-400">Edit profile</div>
          </Link>
        </div>
      </div>
    </main>
  )
}
