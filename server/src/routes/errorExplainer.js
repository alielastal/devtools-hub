import { Router } from 'express'
import { aiLimiter } from '../middleware/rateLimiter.js'
import { streamAI } from '../services/ai.js'

const router = Router()

const SYSTEM_PROMPT = `You are a senior developer. Explain errors briefly in Markdown:

## What Happened
One sentence only.

## Cause
The single most likely cause (one sentence).

## Fix
One short code example showing the fix. No extra explanation.

STRICT RULES: Be extremely concise. No bullet lists. No checklist. Maximum 15 lines total.`

router.post('/explain', aiLimiter, async (req, res, next) => {
  try {
    const { error: errorText, language } = req.body

    if (!errorText || errorText.trim().length === 0) {
      return res.status(400).json({ error: 'Error message is required' })
    }

    if (errorText.length > 5000) {
      return res.status(400).json({ error: 'Error message too long (max 5000 chars)' })
    }

    const prompt = `Language/Environment: ${language || 'Unknown'}\n\nError:\n${errorText.trim()}`

    // SSE streaming
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    await streamAI(SYSTEM_PROMPT, prompt, (chunk) => {
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
    })

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    if (!res.headersSent) {
      next(err)
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`)
      res.end()
    }
  }
})

export default router
