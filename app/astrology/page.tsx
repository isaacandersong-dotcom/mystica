'use client'

import { useState } from 'react'
import { getZodiacSign, getZodiacDescription } from '../lib/astrology'
import type { ZodiacSign } from '../lib/astrology'

export default function AstrologyPage() {
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [sign, setSign] = useState<ZodiacSign | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateOfBirth) return
    setSign(getZodiacSign(dateOfBirth))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Astrology
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto">
          Explore the celestial influences that shape your personality, relationships, and destiny.
        </p>

        <form onSubmit={handleCalculate} className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/20 mb-10">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-purple-200">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Discover My Sign
          </button>
        </form>

        {sign && (
          <div className="space-y-6">
            {/* Main Sign Card */}
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-8xl mb-4">{sign.symbol}</div>
              <h2 className="text-4xl font-bold mb-2">{sign.name}</h2>
              <p className="text-gray-400 mb-4">{sign.dateRange}</p>
              <p className="text-gray-300 text-lg max-w-lg mx-auto">
                {getZodiacDescription(sign.name)}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 rounded-2xl border border-purple-500/20 text-center">
                <h3 className="text-sm font-medium text-purple-200 mb-2">Element</h3>
                <div className="text-2xl font-bold">
                  {sign.element === 'Fire' && '🔥'}
                  {sign.element === 'Water' && '💧'}
                  {sign.element === 'Earth' && '🌍'}
                  {sign.element === 'Air' && '💨'}
                </div>
                <div className="text-lg font-semibold mt-1">{sign.element}</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-2xl border border-purple-500/20 text-center">
                <h3 className="text-sm font-medium text-purple-200 mb-2">Quality</h3>
                <div className="text-lg font-semibold mt-3">{sign.quality}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-6 rounded-2xl border border-purple-500/20 text-center">
                <h3 className="text-sm font-medium text-purple-200 mb-2">Ruling Planet</h3>
                <div className="text-lg font-semibold mt-3">{sign.rulingPlanet}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
