/**
 * Astrology calculation utilities
 */

export interface ZodiacSign {
  name: string
  symbol: string
  element: string
  quality: string
  rulingPlanet: string
  dateRange: string
}

/**
 * Get zodiac sign from birth date
 */
export function getZodiacSign(dateOfBirth: string): ZodiacSign {
  const date = new Date(dateOfBirth)
  const month = date.getMonth() + 1
  const day = date.getDate()

  const signs: { [key: string]: ZodiacSign } = {
    aries: {
      name: 'Aries',
      symbol: '♈',
      element: 'Fire',
      quality: 'Cardinal',
      rulingPlanet: 'Mars',
      dateRange: 'March 21 - April 19'
    },
    taurus: {
      name: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      quality: 'Fixed',
      rulingPlanet: 'Venus',
      dateRange: 'April 20 - May 20'
    },
    gemini: {
      name: 'Gemini',
      symbol: '♊',
      element: 'Air',
      quality: 'Mutable',
      rulingPlanet: 'Mercury',
      dateRange: 'May 21 - June 20'
    },
    cancer: {
      name: 'Cancer',
      symbol: '♋',
      element: 'Water',
      quality: 'Cardinal',
      rulingPlanet: 'Moon',
      dateRange: 'June 21 - July 22'
    },
    leo: {
      name: 'Leo',
      symbol: '♌',
      element: 'Fire',
      quality: 'Fixed',
      rulingPlanet: 'Sun',
      dateRange: 'July 23 - August 22'
    },
    virgo: {
      name: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      quality: 'Mutable',
      rulingPlanet: 'Mercury',
      dateRange: 'August 23 - September 22'
    },
    libra: {
      name: 'Libra',
      symbol: '♎',
      element: 'Air',
      quality: 'Cardinal',
      rulingPlanet: 'Venus',
      dateRange: 'September 23 - October 22'
    },
    scorpio: {
      name: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      quality: 'Fixed',
      rulingPlanet: 'Pluto',
      dateRange: 'October 23 - November 21'
    },
    sagittarius: {
      name: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      quality: 'Mutable',
      rulingPlanet: 'Jupiter',
      dateRange: 'November 22 - December 21'
    },
    capricorn: {
      name: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      quality: 'Cardinal',
      rulingPlanet: 'Saturn',
      dateRange: 'December 22 - January 19'
    },
    aquarius: {
      name: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      quality: 'Fixed',
      rulingPlanet: 'Uranus',
      dateRange: 'January 20 - February 18'
    },
    pisces: {
      name: 'Pisces',
      symbol: '♓',
      element: 'Water',
      quality: 'Mutable',
      rulingPlanet: 'Neptune',
      dateRange: 'February 19 - March 20'
    }
  }

  // Determine sign based on month and day
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signs.aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signs.taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signs.gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signs.cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs.leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs.virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signs.libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signs.scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signs.sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signs.capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signs.aquarius
  return signs.pisces
}

/**
 * Get description for zodiac sign
 */
export function getZodiacDescription(sign: string): string {
  const descriptions: { [key: string]: string } = {
    Aries: 'Bold, energetic, and pioneering. You lead with courage and enthusiasm.',
    Taurus: 'Grounded, reliable, and sensual. You appreciate beauty and stability.',
    Gemini: 'Curious, adaptable, and communicative. You thrive on mental stimulation.',
    Cancer: 'Nurturing, intuitive, and emotional. You create safe havens for loved ones.',
    Leo: 'Confident, creative, and generous. You shine brightly and inspire others.',
    Virgo: 'Analytical, practical, and helpful. You perfect and organize everything.',
    Libra: 'Harmonious, diplomatic, and artistic. You seek balance and beauty.',
    Scorpio: 'Intense, transformative, and mysterious. You dive deep into life\'s mysteries.',
    Sagittarius: 'Adventurous, philosophical, and optimistic. You seek truth and freedom.',
    Capricorn: 'Ambitious, disciplined, and responsible. You build lasting legacies.',
    Aquarius: 'Innovative, humanitarian, and independent. You envision a better future.',
    Pisces: 'Compassionate, imaginative, and spiritual. You connect with the divine.'
  }

  return descriptions[sign] || 'Unknown sign'
}
