import rateLimit from 'express-rate-limit'

export const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Please try again later.' },
})

export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    error: 'AI request limit reached (5/hour).',
    hint: 'Sign up for free to get 20 requests/hour.',
  },
})
