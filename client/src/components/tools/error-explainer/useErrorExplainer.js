import { useState, useCallback, useRef } from 'react'
import { apiStream } from '../../../utils/api'

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'PHP',
  'C/C++',
  'Ruby',
  'Other',
]

export default function useErrorExplainer() {
  const [errorText, setErrorText] = useState('')
  const [language, setLanguage] = useState('JavaScript')
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const accRef = useRef('')

  const explain = useCallback(async () => {
    const trimmed = errorText.trim()
    if (!trimmed) {
      setError('Paste an error message first')
      return
    }

    setLoading(true)
    setError('')
    setExplanation('')
    accRef.current = ''

    try {
      await apiStream('/errors/explain', { error: trimmed, language }, (chunk) => {
        accRef.current += chunk
        setExplanation(accRef.current)
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [errorText, language])

  return {
    errorText,
    setErrorText,
    language,
    setLanguage,
    explanation,
    loading,
    error,
    explain,
    languages: LANGUAGES,
  }
}
