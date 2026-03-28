import MoonPhase from '../components/MoonPhase'
import SchumannResonance from '../components/SchumannResonance'
import SpiritualChat from '../components/SpiritualChat'

export default function DashboardPage() {
  // Mock user data - in production this would come from database
  const userData = {
    name: 'Seeker',
    lifePathNumber: 7,
    sunSign: 'Pisces',
    moonSign: 'Cancer'
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Mystica
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {userData.name}</span>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold">
              {userData.name[0]}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Spiritual Dashboard</h2>
          <p className="text-gray-300">Connect with the cosmic energies and receive personalized guidance</p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Numerology Card */}
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Your Numerology</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Life Path Number</span>
                <span className="text-3xl font-bold text-white">{userData.lifePathNumber}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                The seeker of truth and wisdom. You are introspective, analytical, and spiritually inclined.
              </p>
              <button className="w-full mt-4 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors">
                View Full Report
              </button>
            </div>
          </div>

          {/* Astrology Card */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Your Astrology</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sun Sign</span>
                <span className="text-xl font-bold text-white">♓ {userData.sunSign}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Moon Sign</span>
                <span className="text-xl font-bold text-white">♋ {userData.moonSign}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Your empathetic nature and intuitive abilities guide your spiritual journey.
              </p>
              <button className="w-full mt-4 bg-indigo-600/30 hover:bg-indigo-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors">
                View Birth Chart
              </button>
            </div>
          </div>

          {/* Daily Insight Card */}
          <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-2xl border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 text-purple-200">Today's Insight</h3>
            <div className="space-y-3">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-white font-medium">
                "Trust in the divine timing of the universe"
              </p>
              <p className="text-sm text-gray-400">
                Today is a day for reflection and inner work. The cosmic energies support deep spiritual insights.
              </p>
              <button className="w-full mt-4 bg-pink-600/30 hover:bg-pink-600/50 text-purple-200 font-semibold py-2 rounded-lg transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Celestial Tracking */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <MoonPhase />
          <SchumannResonance />
        </div>

        {/* Chat Interface */}
        <div className="mb-8">
          <SpiritualChat />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <button className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Numerology Report</div>
            <div className="text-sm text-gray-400">Detailed analysis</div>
          </button>
          <button className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-left">
            <div className="text-2xl mb-2">🌟</div>
            <div className="font-semibold">Birth Chart</div>
            <div className="text-sm text-gray-400">Full analysis</div>
          </button>
          <button className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-left">
            <div className="text-2xl mb-2">🔮</div>
            <div className="font-semibold">Daily Guidance</div>
            <div className="text-sm text-gray-400">Personalized</div>
          </button>
          <button className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Settings</div>
            <div className="text-sm text-gray-400">Profile & more</div>
          </button>
        </div>
      </div>
    </main>
  )
}
