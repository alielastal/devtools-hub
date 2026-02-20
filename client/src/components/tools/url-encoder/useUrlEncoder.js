import { useState, useCallback } from 'react'

export default function useUrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')

  const process = useCallback(() => {
    setError('')
    if (!input.trim()) return

    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
      setError(mode === 'encode' ? 'Failed to encode.' : 'Invalid encoded URL string.')
    }
  }, [input, mode])

  const encodeFullUrl = useCallback(() => {
    setError('')
    if (!input.trim()) return
    try {
      setOutput(encodeURI(input))
    } catch {
      setError('Failed to encode URL.')
    }
  }, [input])

  const swap = useCallback(() => {
    setInput(output)
    setOutput('')
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'))
    setError('')
  }, [output])

  return { input, setInput, output, mode, setMode, error, process, encodeFullUrl, swap }
}
