import { useState, useMemo } from 'react'
import { diffLines } from 'diff'

export default function useDiffViewer() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')

  const diff = useMemo(() => {
    if (!original && !modified) return null
    return diffLines(original, modified)
  }, [original, modified])

  const stats = useMemo(() => {
    if (!diff) return null
    let added = 0, removed = 0
    for (const part of diff) {
      const lines = part.value.split('\n').filter((l) => l !== '').length
      if (part.added) added += lines
      else if (part.removed) removed += lines
    }
    return { added, removed }
  }, [diff])

  return { original, setOriginal, modified, setModified, diff, stats }
}
