import { useState, useCallback } from 'react'

export default function useBase64() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')

  const process = useCallback(() => {
    setError('')
    if (!input.trim()) return

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'encode' ? 'Failed to encode input.' : 'Invalid Base64 string.')
    }
  }, [input, mode])

  const swap = useCallback(() => {
    setInput(output)
    setOutput('')
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'))
    setError('')
  }, [output])

  return { input, setInput, output, mode, setMode, error, process, swap }
}
