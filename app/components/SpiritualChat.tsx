'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function SpiritualChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome. I am here to guide you on your spiritual journey. Ask me anything about numerology, astrology, or the cosmic energies surrounding you.'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    // In production, this would call an actual AI API
    setTimeout(() => {
      const responses = [
        "The cosmic energies suggest a time of transformation for you. Trust in the journey.",
        "Your numerology indicates a strong connection to the number of completion and wisdom.",
        "The current planetary alignment favors introspection and spiritual growth.",
        "The universe is guiding you toward your highest purpose. Stay open to the signs.",
        "This question touches on deep spiritual truths. Meditate on your inner knowing.",
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl border border-purple-500/20 flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="p-6 border-b border-purple-500/20">
        <h3 className="text-xl font-bold text-white">Spiritual Guidance</h3>
        <p className="text-sm text-gray-400">Ask questions about your path</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-black/30 text-gray-100 border border-purple-500/20'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black/30 border border-purple-500/20 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-purple-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-lg transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
