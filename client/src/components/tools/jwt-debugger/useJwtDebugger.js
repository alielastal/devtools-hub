import { useState, useMemo } from 'react'

function decodeBase64Url(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(decodeURIComponent(escape(atob(padded))))
}

export default function useJwtDebugger() {
  const [token, setToken] = useState('')

  const decoded = useMemo(() => {
    if (!token.trim()) return null

    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) return { error: 'Invalid JWT: must have 3 parts (header.payload.signature)' }

      const header = decodeBase64Url(parts[0])
      const payload = decodeBase64Url(parts[1])

      let expiry = null
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000)
        expiry = {
          date: expDate.toLocaleString(),
          expired: expDate < new Date(),
          remaining: expDate > new Date()
            ? formatDuration(expDate - new Date())
            : null,
        }
      }

      let issuedAt = null
      if (payload.iat) {
        issuedAt = new Date(payload.iat * 1000).toLocaleString()
      }

      return { header, payload, signature: parts[2], expiry, issuedAt, error: null }
    } catch {
      return { error: 'Failed to decode JWT. Make sure it\'s a valid token.' }
    }
  }, [token])

  return { token, setToken, decoded }
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000)
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const mins = Math.floor((s % 3600) / 60)
  const parts = []
  if (days) parts.push(`${days}d`)
  if (hours) parts.push(`${hours}h`)
  if (mins) parts.push(`${mins}m`)
  return parts.join(' ') || '<1m'
}
