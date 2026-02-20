import { useState, useCallback, useMemo } from 'react'

export default function useTimestamp() {
  const [timestamp, setTimestamp] = useState('')
  const [dateString, setDateString] = useState('')
  const [now, setNow] = useState(Date.now())

  const fromTimestamp = useMemo(() => {
    if (!timestamp.trim()) return null
    const num = Number(timestamp)
    if (isNaN(num)) return { error: 'Invalid timestamp' }
    // Auto-detect seconds vs milliseconds
    const ms = num < 1e12 ? num * 1000 : num
    const d = new Date(ms)
    if (isNaN(d.getTime())) return { error: 'Invalid timestamp' }
    return {
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      iso: d.toISOString(),
      relative: getRelative(d),
    }
  }, [timestamp])

  const fromDate = useMemo(() => {
    if (!dateString.trim()) return null
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return { error: 'Invalid date' }
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    }
  }, [dateString])

  const setNowTimestamp = useCallback(() => {
    const n = Date.now()
    setNow(n)
    setTimestamp(Math.floor(n / 1000).toString())
  }, [])

  const currentSeconds = Math.floor(now / 1000)

  return { timestamp, setTimestamp, dateString, setDateString, fromTimestamp, fromDate, setNowTimestamp, currentSeconds }
}

function getRelative(date) {
  const diff = Date.now() - date.getTime()
  const abs = Math.abs(diff)
  const future = diff < 0
  const prefix = future ? 'in ' : ''
  const suffix = future ? '' : ' ago'

  if (abs < 60000) return prefix + Math.floor(abs / 1000) + 's' + suffix
  if (abs < 3600000) return prefix + Math.floor(abs / 60000) + 'm' + suffix
  if (abs < 86400000) return prefix + Math.floor(abs / 3600000) + 'h' + suffix
  return prefix + Math.floor(abs / 86400000) + 'd' + suffix
}
