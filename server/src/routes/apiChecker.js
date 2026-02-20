import { Router } from 'express'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/check', generalLimiter, async (req, res, next) => {
  try {
    const { url, method = 'GET', headers = {}, body } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    // Basic URL validation
    let parsedUrl
    try {
      parsedUrl = new URL(url)
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' })
    }

    // Block private/internal IPs
    const hostname = parsedUrl.hostname
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.')
    ) {
      return res.status(400).json({ error: 'Cannot check internal/private URLs' })
    }

    const fetchOptions = {
      method: method.toUpperCase(),
      headers: { ...headers },
      signal: AbortSignal.timeout(15000),
    }

    if (['POST', 'PUT', 'PATCH'].includes(fetchOptions.method) && body) {
      fetchOptions.body = body
      if (!fetchOptions.headers['Content-Type'] && !fetchOptions.headers['content-type']) {
        fetchOptions.headers['Content-Type'] = 'application/json'
      }
    }

    const start = performance.now()
    const response = await fetch(parsedUrl.href, fetchOptions)
    const time = Math.round(performance.now() - start)

    // Collect response headers
    const responseHeaders = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    // Read body (limit to 50KB)
    let responseBody = ''
    try {
      const text = await response.text()
      responseBody = text.length > 50000 ? text.slice(0, 50000) + '\n... (truncated)' : text
    } catch {
      responseBody = '(Could not read response body)'
    }

    res.json({
      status: response.status,
      statusText: response.statusText,
      time,
      headers: responseHeaders,
      body: responseBody,
      size: responseBody.length,
    })
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      return res.status(408).json({ error: 'Request timed out (15s limit)' })
    }
    if (err.cause?.code === 'ENOTFOUND') {
      return res.status(400).json({ error: `DNS lookup failed: ${req.body.url}` })
    }
    next(err)
  }
})

export default router
