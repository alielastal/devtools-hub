import { useState, useCallback } from 'react'
import yaml from 'js-yaml'
import { formatBytes, countKeys } from '../../../utils/formatters'

const SAMPLE_JSON = `{
  "name": "DevTools Hub",
  "version": "1.0.0",
  "features": ["JSON Formatter", "YAML Converter", "Minifier"],
  "config": {
    "theme": "dark",
    "language": "en"
  }
}`

export default function useJsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState('')
  const [outputLang, setOutputLang] = useState('json')

  const updateStats = useCallback((text, parsed) => {
    const bytes = new TextEncoder().encode(text).length
    const keys = countKeys(parsed)
    setStats(`${formatBytes(bytes)} | ${keys} keys`)
  }, [])

  const parseInput = useCallback((text) => {
    // Try JSON first
    try {
      return JSON.parse(text)
    } catch {
      // Try YAML
      try {
        const result = yaml.load(text)
        if (typeof result === 'object' && result !== null) return result
      } catch {
        // neither
      }
    }
    return null
  }, [])

  const format = useCallback(() => {
    setError('')
    const trimmed = input.trim()
    if (!trimmed) {
      setError('Input is empty')
      return
    }
    const parsed = parseInput(trimmed)
    if (parsed === null) {
      setError('Invalid JSON or YAML')
      return
    }
    const result = JSON.stringify(parsed, null, 2)
    setOutput(result)
    setOutputLang('json')
    updateStats(result, parsed)
  }, [input, parseInput, updateStats])

  const minify = useCallback(() => {
    setError('')
    const trimmed = input.trim()
    if (!trimmed) {
      setError('Input is empty')
      return
    }
    const parsed = parseInput(trimmed)
    if (parsed === null) {
      setError('Invalid JSON or YAML')
      return
    }
    const result = JSON.stringify(parsed)
    setOutput(result)
    setOutputLang('json')
    updateStats(result, parsed)
  }, [input, parseInput, updateStats])

  const toYaml = useCallback(() => {
    setError('')
    const trimmed = input.trim()
    if (!trimmed) {
      setError('Input is empty')
      return
    }
    const parsed = parseInput(trimmed)
    if (parsed === null) {
      setError('Invalid JSON or YAML')
      return
    }
    const result = yaml.dump(parsed, { indent: 2, lineWidth: 120 })
    setOutput(result)
    setOutputLang('yaml')
    updateStats(result, parsed)
  }, [input, parseInput, updateStats])

  const toJson = useCallback(() => {
    format()
  }, [format])

  return {
    input,
    setInput,
    output,
    error,
    stats,
    outputLang,
    format,
    minify,
    toYaml,
    toJson,
  }
}
