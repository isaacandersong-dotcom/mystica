export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Mystica
          </h1>
          <p className="text-2xl mb-8 text-purple-200">
            Your Personal Spiritual Companion
          </p>
          <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
            Discover the cosmic patterns that shape your life through numerology, astrology,
            and ancient spiritual wisdom. Track celestial rhythms and receive personalized guidance.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-purple-500/50">
              Start Your Journey
            </button>
            <button className="border-2 border-purple-400 hover:bg-purple-400/10 text-purple-200 font-bold py-4 px-10 rounded-full transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Explore Your Cosmic Blueprint
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 rounded-2xl border border-purple-500/20">
              <div className="text-4xl mb-4">🔢</div>
              <h3 className="text-2xl font-bold mb-4">Numerology</h3>
              <p className="text-gray-300">
                Uncover the hidden meanings in your birth date and name. Discover your life path,
                soul urge, and destiny numbers.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl border border-purple-500/20">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-4">Astrology</h3>
              <p className="text-gray-300">
                Explore your birth chart, planetary positions, and cosmic influences that shape
                your personality and path.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-500/20">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-2xl font-bold mb-4">Celestial Tracking</h3>
              <p className="text-gray-300">
                Stay connected with moon phases and Schumann resonance to align with
                Earth's natural rhythms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Path</h2>
          <p className="text-center text-gray-300 mb-16">Select the plan that resonates with your journey</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">Explorer</h3>
              <div className="text-4xl font-bold mb-6">Free</div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Basic numerology readings</li>
                <li>✓ Moon phase tracking</li>
                <li>✓ Limited guidance (5/month)</li>
                <li>✓ Community access</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors">
                Start Free
              </button>
            </div>

            {/* Monthly Tier */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Seeker</h3>
              <div className="text-4xl font-bold mb-6">$12<span className="text-lg text-gray-300">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li>✓ Full numerology & astrology</li>
                <li>✓ Unlimited guidance</li>
                <li>✓ Schumann resonance data</li>
                <li>✓ Personalized insights</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg">
                Subscribe Monthly
              </button>
            </div>

            {/* Yearly Tier */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-2xl border border-purple-700">
              <h3 className="text-2xl font-bold mb-2">Mystic</h3>
              <div className="text-4xl font-bold mb-2">$99<span className="text-lg text-gray-300">/year</span></div>
              <div className="text-sm text-green-400 mb-4">Save $45 annually</div>
              <ul className="space-y-3 mb-8">
                <li>✓ Everything in Seeker</li>
                <li>✓ Advanced birth chart analysis</li>
                <li>✓ Yearly forecast reports</li>
                <li>✓ Exclusive content</li>
                <li>✓ VIP community access</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all">
                Subscribe Yearly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Begin Your Spiritual Journey Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with the wisdom of the cosmos and discover your true path
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all shadow-lg hover:shadow-purple-500/50">
            Create Your Profile
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-900/30 text-center text-gray-400">
        <p>© 2024 Mystica. All rights reserved.</p>
      </footer>
    </main>
  )
}
