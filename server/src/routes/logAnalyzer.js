import { Router } from 'express'
import { aiLimiter } from '../middleware/rateLimiter.js'
import { streamAI } from '../services/ai.js'

const router = Router()

const SYSTEM_PROMPT = `You are a log analysis expert. Analyze the provided log content and respond in **Markdown** with these sections:

## Summary
A brief overview: total lines analyzed, time range (if visible), and overall health assessment.

## Log Level Breakdown
| Level | Count | Percentage |
Table showing the distribution of ERROR, WARN, INFO, DEBUG levels.

## Top Errors
Numbered list of the most frequent errors with:
- The error message
- How many times it appeared
- Which service/file it came from (if visible)

## Patterns Detected
- Any time-based patterns (errors spiking at certain hours, days)
- Recurring sequences of events
- Correlations between different errors

## Recommendations
Prioritized actionable recommendations:
1. **Critical** — things to fix immediately
2. **Important** — things to investigate
3. **Nice to have** — optimization suggestions

Be concise and data-driven. Use actual log lines as evidence when possible.`

router.post('/analyze', aiLimiter, async (req, res, next) => {
  try {
    const { logs } = req.body

    if (!logs || logs.trim().length === 0) {
      return res.status(400).json({ error: 'Log content is required' })
    }

    // Truncate if too long
    const maxLen = 15000
    const trimmed = logs.trim()
    const truncated =
      trimmed.length > maxLen
        ? trimmed.slice(0, maxLen) + `\n\n...(truncated — showing first ${maxLen} chars of ${trimmed.length})`
        : trimmed

    // SSE streaming
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    await streamAI(SYSTEM_PROMPT, truncated, (chunk) => {
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
