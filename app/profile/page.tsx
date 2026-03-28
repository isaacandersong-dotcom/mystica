'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    gender: '',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile data:', formData)
    // TODO: Save to database
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Create Your Profile
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Tell us about yourself to receive personalized spiritual insights
        </p>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-8 rounded-2xl border border-purple-500/20 backdrop-blur">
          <div className="space-y-6">
            {/* Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-purple-200">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Required for numerology and astrology calculations</p>
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">
                Time of Birth (Optional)
              </label>
              <input
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
              <p className="text-xs text-gray-400 mt-1">For more accurate birth chart calculations</p>
            </div>

            {/* Place of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">
                Place of Birth
              </label>
              <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="City, Country"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">
                Gender (Optional)
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
          >
            Create Profile & Continue
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          By creating a profile, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
