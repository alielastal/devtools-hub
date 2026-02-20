import { useState, useCallback, useRef } from 'react'
import { apiStream } from '../../../utils/api'

export default function useLogAnalyzer() {
  const [logs, setLogs] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)
  const accRef = useRef('')

  const parseLevels = useCallback((text) => {
    const lines = text.split('\n')
    let errors = 0, warnings = 0, info = 0, debug = 0

    for (const line of lines) {
      const lower = line.toLowerCase()
      if (/\berror\b|fatal|exception|critical/i.test(lower)) errors++
      else if (/\bwarn(ing)?\b/i.test(lower)) warnings++
      else if (/\binfo\b/i.test(lower)) info++
      else if (/\bdebug\b|trace/i.test(lower)) debug++
    }

    return { errors, warnings, info, debug, total: lines.length }
  }, [])

  const analyze = useCallback(async () => {
    const trimmed = logs.trim()
    if (!trimmed) {
      setError('Paste or upload log content first')
      return
    }

    setStats(parseLevels(trimmed))
    setLoading(true)
    setError('')
    setAnalysis('')
    accRef.current = ''

    try {
      await apiStream('/logs/analyze', { logs: trimmed }, (chunk) => {
        accRef.current += chunk
        setAnalysis(accRef.current)
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [logs, parseLevels])

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)')
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => setLogs(ev.target.result)
    reader.readAsText(file)
  }, [])

  return {
    logs,
    setLogs,
    analysis,
    loading,
    error,
    stats,
    analyze,
    handleFileUpload,
  }
}
