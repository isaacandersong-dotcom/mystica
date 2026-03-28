'use client'

import { useEffect, useState } from 'react'

export default function MoonPhase() {
  const [moonData, setMoonData] = useState({
    phase: 'Loading...',
    illumination: 0,
    emoji: '🌑'
  })

  useEffect(() => {
    // Calculate moon phase based on current date
    const calculateMoonPhase = () => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()

      // Simplified moon phase calculation
      const c = Math.floor((year - 2000) * 12.3685)
      const e = Math.floor((c + month - 3) * 30.6)
      const jd = e + day - 122
      const b = Math.floor(jd / 29.53)
      const age = jd - (b * 29.53)
      const illumination = Math.round((1 - Math.cos(age * 2 * Math.PI / 29.53)) / 2 * 100)

      let phase = ''
      let emoji = '🌑'

      if (age < 1.84566) {
        phase = 'New Moon'
        emoji = '🌑'
      } else if (age < 7.38264) {
        phase = 'Waxing Crescent'
        emoji = '🌒'
      } else if (age < 9.22830) {
        phase = 'First Quarter'
        emoji = '🌓'
      } else if (age < 14.76594) {
        phase = 'Waxing Gibbous'
        emoji = '🌔'
      } else if (age < 16.61160) {
        phase = 'Full Moon'
        emoji = '🌕'
      } else if (age < 22.14924) {
        phase = 'Waning Gibbous'
        emoji = '🌖'
      } else if (age < 23.99490) {
        phase = 'Last Quarter'
        emoji = '🌗'
      } else {
        phase = 'Waning Crescent'
        emoji = '🌘'
      }

      setMoonData({ phase, illumination, emoji })
    }

    calculateMoonPhase()
  }, [])

  return (
    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
      <h3 className="text-lg font-semibold mb-4 text-purple-200">Current Moon Phase</h3>
      <div className="flex items-center gap-4">
        <div className="text-6xl">{moonData.emoji}</div>
        <div>
          <div className="text-2xl font-bold text-white">{moonData.phase}</div>
          <div className="text-sm text-gray-300">{moonData.illumination}% Illuminated</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        The moon's energy influences our emotions and intuition
      </div>
    </div>
  )
}
