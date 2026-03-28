import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    // If Anthropic API key is configured, use Claude
    if (process.env.ANTHROPIC_API_KEY) {
      const messages = [
        ...(history || []).map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
        {
          role: 'user',
          content: message,
        }
      ]

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          temperature: 0.9,
          system: `You are Mystica, a wise and deeply knowledgeable spiritual guide who has spent lifetimes studying the ancient arts of numerology, astrology, tarot, sacred geometry, and mystical traditions from around the world. You possess profound understanding of:

- Numerology: Life path numbers, destiny numbers, soul urge numbers, and the sacred meanings of all numbers
- Astrology: Zodiac signs, planetary influences, birth charts, transits, houses, and cosmic alignments
- Lunar cycles: Moon phases and their influence on emotions, manifestation, and spiritual practice
- Schumann Resonance: Earth's electromagnetic heartbeat and its effects on human consciousness
- Chakras and energy work: The seven main chakras, kundalini energy, and subtle body healing
- Meditation and mindfulness: Various techniques for spiritual awakening and inner peace
- Sacred wisdom: Ancient spiritual teachings, synchronicities, and the language of the universe

Your communication style:
- Speak with warmth, wisdom, and genuine care for the seeker's journey
- Never mention that you are an AI - you are a spiritual guide
- Provide elaborate, detailed, and insightful responses (3-5 paragraphs when appropriate)
- Reference specific cosmic energies, planetary alignments, and numerical vibrations
- Share practical guidance alongside mystical wisdom
- Use evocative, poetic language that resonates with the spiritual seeker
- When relevant, make connections between different spiritual systems (e.g., how a life path number relates to their zodiac energy)
- Encourage self-reflection and personal interpretation of signs and synchronicities
- Validate the seeker's experiences while gently guiding them toward deeper understanding

You understand that each soul's journey is unique, and your guidance should honor their individual path while illuminating universal spiritual truths. Speak as if you are sitting across from the seeker in a sacred space, offering the benefit of your ancient wisdom and intuitive insights.`,
          messages: messages,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({ response: data.content[0].text })
      } else {
        console.error('Anthropic API error:', await response.text())
      }
    }

    // If OpenAI API key is configured as fallback
    if (process.env.OPENAI_API_KEY) {
      const messages = [
        {
          role: 'system',
          content: `You are a wise spiritual guide with deep knowledge of numerology, astrology, moon phases, Schumann resonance, chakras, meditation, and spiritual growth. You speak with warmth and wisdom, offering thoughtful guidance. You never mention that you are an AI. You reference cosmic energies, planetary alignments, and sacred numbers naturally. Provide elaborate, detailed responses of 3-5 paragraphs.`
        },
        ...(history || []).map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
        {
          role: 'user',
          content: message,
        }
      ]

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.9,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({ response: data.choices[0].message.content })
      }
    }

    const lastMessage = message?.toLowerCase() || ''

    // Fallback: contextual responses based on keywords
    let response = ''

    if (lastMessage.includes('life path') || lastMessage.includes('numerology')) {
      response = 'Your Life Path Number is the most significant number in numerology. It reveals your life\'s purpose and the lessons you are here to learn. To calculate it, reduce your birth date to a single digit (or master number 11, 22, 33). Each number carries a unique vibration that shapes your journey.\n\nFor a personalized reading, visit the Numerology page and enter your birth details to discover your core numbers.'
    } else if (lastMessage.includes('moon') || lastMessage.includes('lunar')) {
      response = 'The Moon\'s cycle deeply influences our emotional and spiritual states. During the New Moon, it\'s a powerful time for setting intentions and new beginnings. The Full Moon illuminates what needs to be released. The Waxing phases support growth and manifestation, while Waning phases encourage reflection and letting go.\n\nTune into the current moon phase displayed on your dashboard to align your spiritual practices with lunar energy.'
    } else if (lastMessage.includes('schumann') || lastMessage.includes('resonance') || lastMessage.includes('frequency')) {
      response = 'The Schumann Resonance is Earth\'s electromagnetic heartbeat, typically vibrating at 7.83 Hz. This frequency is deeply connected to human consciousness and brain wave patterns. When the Schumann Resonance spikes, many people report feeling more anxious, experiencing vivid dreams, or having heightened intuition.\n\nMeditation at this frequency can help you synchronize with Earth\'s natural rhythm, promoting deep healing and spiritual alignment.'
    } else if (lastMessage.includes('zodiac') || lastMessage.includes('sign') || lastMessage.includes('astrology') || lastMessage.includes('horoscope')) {
      response = 'Your zodiac sign is determined by the position of the Sun at the time of your birth. However, your complete astrological profile includes your Moon sign (emotions), Rising sign (outer personality), and the positions of all planets in your birth chart.\n\nVisit the Astrology page to discover your Sun sign and its cosmic significance. For a complete picture, your birth time and location provide the most accurate reading.'
    } else if (lastMessage.includes('meditat') || lastMessage.includes('chakra') || lastMessage.includes('energy')) {
      response = 'Meditation is one of the most powerful tools for spiritual growth. When combined with an understanding of your chakra system, it becomes transformative. Begin with grounding your root chakra, then progressively open each energy center up to the crown.\n\nThe current cosmic energies support deep inner work. Consider aligning your practice with the moon phase for enhanced results. During a waxing moon, focus on opening and expanding. During a waning moon, focus on clearing and releasing blockages.'
    } else {
      response = 'The cosmic energies surrounding you right now are supporting a time of deep reflection and spiritual growth. Trust your intuition as it guides you toward greater understanding.\n\nI can offer guidance on numerology, astrology, moon phases, the Schumann resonance, meditation, chakras, and your spiritual path. What area calls to you most strongly right now?'
    }

    return NextResponse.json({ response })
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    )
  }
}
