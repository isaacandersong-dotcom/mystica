'use client'

import { useState } from 'react'
import {
  calculateLifePath,
  calculateExpression,
  calculateSoulUrge,
  calculatePersonality,
  getLifePathMeaning,
} from '../lib/numerology'

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [results, setResults] = useState<{
    lifePath: number
    expression: number
    soulUrge: number
    personality: number
  } | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !dateOfBirth) return

    setResults({
      lifePath: calculateLifePath(dateOfBirth),
      expression: calculateExpression(fullName),
      soulUrge: calculateSoulUrge(fullName),
      personality: calculatePersonality(fullName),
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Numerology
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto">
          Discover the sacred numbers that reveal your life purpose, hidden talents, and soul&apos;s desire.
        </p>

        <form onSubmit={handleCalculate} className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/20 mb-10">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Full Name (as given at birth)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="Enter your full birth name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Calculate My Numbers
          </button>
        </form>

        {results && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Your Core Numbers</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Life Path */}
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-2xl border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-200">Life Path Number</h3>
                  <span className="text-4xl font-bold text-white">{results.lifePath}</span>
                </div>
                <p className="text-gray-300 text-sm">{getLifePathMeaning(results.lifePath)}</p>
              </div>

              {/* Expression */}
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-200">Expression Number</h3>
                  <span className="text-4xl font-bold text-white">{results.expression}</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Your Expression Number reveals your natural abilities and the talents you carry throughout life.
                </p>
              </div>

              {/* Soul Urge */}
              <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-200">Soul Urge Number</h3>
                  <span className="text-4xl font-bold text-white">{results.soulUrge}</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Your Soul Urge Number reflects your inner desires, motivations, and what your heart truly craves.
                </p>
              </div>

              {/* Personality */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-2xl border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-200">Personality Number</h3>
                  <span className="text-4xl font-bold text-white">{results.personality}</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Your Personality Number reveals how others perceive you and the energy you project to the world.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
