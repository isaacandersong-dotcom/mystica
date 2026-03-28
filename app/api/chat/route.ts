import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

    // If an OpenAI API key is configured, use it
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a wise spiritual guide with deep knowledge of numerology, astrology, moon phases, Schumann resonance, chakras, meditation, and spiritual growth. You speak with warmth and wisdom, offering thoughtful guidance. You never mention that you are an AI. You reference cosmic energies, planetary alignments, and sacred numbers naturally. Keep responses concise but meaningful, typically 2-4 paragraphs.`
            },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          max_tokens: 500,
          temperature: 0.8,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({ reply: data.choices[0].message.content })
      }
    }

    // Fallback: contextual responses based on keywords
    let reply = ''

    if (lastMessage.includes('life path') || lastMessage.includes('numerology')) {
      reply = 'Your Life Path Number is the most significant number in numerology. It reveals your life\'s purpose and the lessons you are here to learn. To calculate it, reduce your birth date to a single digit (or master number 11, 22, 33). Each number carries a unique vibration that shapes your journey.\n\nFor a personalized reading, visit the Numerology page and enter your birth details to discover your core numbers.'
    } else if (lastMessage.includes('moon') || lastMessage.includes('lunar')) {
      reply = 'The Moon\'s cycle deeply influences our emotional and spiritual states. During the New Moon, it\'s a powerful time for setting intentions and new beginnings. The Full Moon illuminates what needs to be released. The Waxing phases support growth and manifestation, while Waning phases encourage reflection and letting go.\n\nTune into the current moon phase displayed on your dashboard to align your spiritual practices with lunar energy.'
    } else if (lastMessage.includes('schumann') || lastMessage.includes('resonance') || lastMessage.includes('frequency')) {
      reply = 'The Schumann Resonance is Earth\'s electromagnetic heartbeat, typically vibrating at 7.83 Hz. This frequency is deeply connected to human consciousness and brain wave patterns. When the Schumann Resonance spikes, many people report feeling more anxious, experiencing vivid dreams, or having heightened intuition.\n\nMeditation at this frequency can help you synchronize with Earth\'s natural rhythm, promoting deep healing and spiritual alignment.'
    } else if (lastMessage.includes('zodiac') || lastMessage.includes('sign') || lastMessage.includes('astrology') || lastMessage.includes('horoscope')) {
      reply = 'Your zodiac sign is determined by the position of the Sun at the time of your birth. However, your complete astrological profile includes your Moon sign (emotions), Rising sign (outer personality), and the positions of all planets in your birth chart.\n\nVisit the Astrology page to discover your Sun sign and its cosmic significance. For a complete picture, your birth time and location provide the most accurate reading.'
    } else if (lastMessage.includes('meditat') || lastMessage.includes('chakra') || lastMessage.includes('energy')) {
      reply = 'Meditation is one of the most powerful tools for spiritual growth. When combined with an understanding of your chakra system, it becomes transformative. Begin with grounding your root chakra, then progressively open each energy center up to the crown.\n\nThe current cosmic energies support deep inner work. Consider aligning your practice with the moon phase for enhanced results. During a waxing moon, focus on opening and expanding. During a waning moon, focus on clearing and releasing blockages.'
    } else {
      reply = 'The cosmic energies surrounding you right now are supporting a time of deep reflection and spiritual growth. Trust your intuition as it guides you toward greater understanding.\n\nI can offer guidance on numerology, astrology, moon phases, the Schumann resonance, meditation, chakras, and your spiritual path. What area calls to you most strongly right now?'
    }

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your request' },
      { status: 500 }
    )
  }
}
