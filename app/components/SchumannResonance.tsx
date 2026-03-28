'use client'

import { useEffect, useState } from 'react'

export default function SchumannResonance() {
  const [resonance, setResonance] = useState({
    frequency: 7.83,
    amplitude: 'Normal',
    status: 'Stable'
  })

  useEffect(() => {
    // Simulate Schumann resonance data
    // In production, this would fetch from a real API
    const generateResonanceData = () => {
      const baseFreq = 7.83
      const variation = (Math.random() - 0.5) * 0.5
      const freq = +(baseFreq + variation).toFixed(2)

      let amplitude = 'Normal'
      let status = 'Stable'

      if (freq > 8.2) {
        amplitude = 'Elevated'
        status = 'Active'
      } else if (freq > 8.0) {
        amplitude = 'Moderate'
        status = 'Slightly Active'
      }

      setResonance({ frequency: freq, amplitude, status })
    }

    generateResonanceData()
    const interval = setInterval(generateResonanceData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (resonance.amplitude === 'Elevated') return 'text-orange-400'
    if (resonance.amplitude === 'Moderate') return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-2xl border border-purple-500/20">
      <h3 className="text-lg font-semibold mb-4 text-purple-200">Schumann Resonance</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Frequency</span>
          <span className="text-2xl font-bold text-white">{resonance.frequency} Hz</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Amplitude</span>
          <span className={`font-semibold ${getStatusColor()}`}>{resonance.amplitude}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Status</span>
          <span className={`font-semibold ${getStatusColor()}`}>{resonance.status}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-purple-500/20">
        <div className="w-full bg-black/30 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((resonance.frequency / 10) * 100, 100)}%` }}
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Earth's electromagnetic heartbeat affects collective consciousness
      </div>
    </div>
  )
}
