import { useState, useCallback } from 'react'
import { apiPost } from '../../../utils/api'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function useApiChecker() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState([{ key: '', value: '' }])
  const [body, setBody] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('body')

  const addHeader = useCallback(() => {
    setHeaders((prev) => [...prev, { key: '', value: '' }])
  }, [])

  const removeHeader = useCallback((index) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateHeader = useCallback((index, field, value) => {
    setHeaders((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)))
  }, [])

  const check = useCallback(async () => {
    const trimmed = url.trim()
    if (!trimmed) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Build headers object from key-value pairs
      const hdrs = {}
      for (const h of headers) {
        if (h.key.trim()) hdrs[h.key.trim()] = h.value
      }

      const data = { url: trimmed, method, headers: hdrs }
      if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
        data.body = body.trim()
      }

      const res = await apiPost('/check/check', data)
      setResult(res)
      setActiveTab('body')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url, method, headers, body])

  const statusColor = result
    ? result.status < 300
      ? 'green'
      : result.status < 400
        ? 'yellow'
        : 'red'
    : null

  return {
    url,
    setUrl,
    method,
    setMethod,
    methods: METHODS,
    headers,
    addHeader,
    removeHeader,
    updateHeader,
    body,
    setBody,
    result,
    loading,
    error,
    check,
    statusColor,
    activeTab,
    setActiveTab,
  }
}
