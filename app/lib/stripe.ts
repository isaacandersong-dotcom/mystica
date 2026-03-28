import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const PLANS = {
  free: {
    name: 'Explorer',
    price: 0,
    features: [
      'Basic numerology readings',
      'Moon phase tracking',
      'Limited guidance (5/month)',
      'Community access',
    ],
  },
  monthly: {
    name: 'Seeker',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    price: 12,
    features: [
      'Full numerology & astrology',
      'Unlimited guidance',
      'Schumann resonance data',
      'Personalized insights',
      'Priority support',
    ],
  },
  yearly: {
    name: 'Mystic',
    priceId: process.env.STRIPE_YEARLY_PRICE_ID!,
    price: 99,
    features: [
      'Everything in Seeker',
      'Advanced birth chart analysis',
      'Yearly forecast reports',
      'Exclusive content',
      'VIP community access',
    ],
  },
}
