import { useState, useMemo, useCallback } from 'react'
import { patterns } from './regexPatterns'

export default function useRegexBuilder() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false })
  const [regexError, setRegexError] = useState('')

  const flagString = useMemo(
    () => Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join(''),
    [flags],
  )

  const toggleFlag = useCallback((flag) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))
  }, [])

  const applyPreset = useCallback((preset) => {
    setPattern(preset.pattern)
    const newFlags = { g: false, i: false, m: false, s: false }
    for (const ch of preset.flags) newFlags[ch] = true
    setFlags(newFlags)
  }, [])

  const matches = useMemo(() => {
    if (!pattern || !testString) {
      setRegexError('')
      return []
    }

    try {
      const re = new RegExp(pattern, flagString)
      setRegexError('')

      const results = []
      let match

      if (flags.g) {
        while ((match = re.exec(testString)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1),
          })
          if (match[0].length === 0) re.lastIndex++
        }
      } else {
        match = re.exec(testString)
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1),
          })
        }
      }

      return results
    } catch (err) {
      setRegexError(err.message)
      return []
    }
  }, [pattern, testString, flagString, flags.g])

  const highlightedHtml = useMemo(() => {
    if (!matches.length || !testString) return null

    const parts = []
    let lastIndex = 0

    for (const m of matches) {
      if (m.index > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, m.index), highlight: false })
      }
      parts.push({ text: testString.slice(m.index, m.end), highlight: true })
      lastIndex = m.end
    }

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), highlight: false })
    }

    return parts
  }, [matches, testString])

  return {
    pattern,
    setPattern,
    testString,
    setTestString,
    flags,
    toggleFlag,
    flagString,
    matches,
    regexError,
    highlightedHtml,
    applyPreset,
    presets: patterns,
  }
}
