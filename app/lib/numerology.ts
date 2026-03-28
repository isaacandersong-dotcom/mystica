/**
 * Numerology calculation utilities
 */

/**
 * Reduce a number to a single digit (except master numbers 11, 22, 33)
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
  }
  return num
}

/**
 * Calculate Life Path Number from date of birth
 */
export function calculateLifePath(dateOfBirth: string): number {
  const date = new Date(dateOfBirth)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const daySum = reduceToSingleDigit(day)
  const monthSum = reduceToSingleDigit(month)
  const yearSum = reduceToSingleDigit(year)

  return reduceToSingleDigit(daySum + monthSum + yearSum)
}

/**
 * Calculate Expression/Destiny Number from full name
 */
export function calculateExpression(fullName: string): number {
  const letterValues: { [key: string]: number } = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  }

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleanName.split('').reduce((total, letter) => {
    return total + (letterValues[letter] || 0)
  }, 0)

  return reduceToSingleDigit(sum)
}

/**
 * Calculate Soul Urge Number (vowels in name)
 */
export function calculateSoulUrge(fullName: string): number {
  const letterValues: { [key: string]: number } = {
    A: 1, E: 5, I: 9, O: 6, U: 3, Y: 7
  }

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleanName.split('').reduce((total, letter) => {
    return total + (letterValues[letter] || 0)
  }, 0)

  return reduceToSingleDigit(sum)
}

/**
 * Calculate Personality Number (consonants in name)
 */
export function calculatePersonality(fullName: string): number {
  const consonantValues: { [key: string]: number } = {
    B: 2, C: 3, D: 4, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, Q: 8, R: 9,
    S: 1, T: 2, V: 4, W: 5, X: 6, Z: 8
  }

  const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleanName.split('').reduce((total, letter) => {
    return total + (consonantValues[letter] || 0)
  }, 0)

  return reduceToSingleDigit(sum)
}

/**
 * Get interpretation for a life path number
 */
export function getLifePathMeaning(number: number): string {
  const meanings: { [key: number]: string } = {
    1: 'The Leader - Independent, ambitious, and pioneering. You are meant to lead and innovate.',
    2: 'The Peacemaker - Diplomatic, intuitive, and cooperative. You bring harmony to relationships.',
    3: 'The Creative - Expressive, optimistic, and artistic. You inspire others with your creativity.',
    4: 'The Builder - Practical, disciplined, and hardworking. You create stable foundations.',
    5: 'The Freedom Seeker - Adventurous, versatile, and dynamic. You thrive on change and exploration.',
    6: 'The Nurturer - Responsible, caring, and protective. You are devoted to family and community.',
    7: 'The Seeker - Analytical, spiritual, and introspective. You seek truth and deeper understanding.',
    8: 'The Powerhouse - Ambitious, authoritative, and goal-oriented. You manifest material success.',
    9: 'The Humanitarian - Compassionate, idealistic, and wise. You serve the greater good.',
    11: 'The Illuminator - Intuitive, visionary, and inspiring. You are a spiritual messenger.',
    22: 'The Master Builder - Powerful, practical visionary. You manifest dreams into reality.',
    33: 'The Master Teacher - Compassionate guide and healer. You uplift humanity through service.'
  }

  return meanings[number] || 'Unknown path'
}

/**
 * Calculate all core numerology numbers
 */
export function calculateCoreNumbers(fullName: string, dateOfBirth: string) {
  return {
    lifePath: calculateLifePath(dateOfBirth),
    expression: calculateExpression(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName)
  }
}
