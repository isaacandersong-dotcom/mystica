export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Mystica
        </h1>
        <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
          AI-Powered Tarot Readings
        </p>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg mb-6">
            Welcome to Mystica, where ancient wisdom meets modern AI technology.
            Get personalized tarot readings and spiritual guidance.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Begin Your Reading
          </button>
        </div>
      </div>
    </main>
  )
}
