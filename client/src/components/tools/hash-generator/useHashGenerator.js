import { useState, useCallback } from 'react'

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

async function computeHash(algorithm, text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function useHashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = useCallback(async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const results = {}
      for (const algo of ALGORITHMS) {
        results[algo] = await computeHash(algo, input)
      }
      setHashes(results)
    } finally {
      setLoading(false)
    }
  }, [input])

  return { input, setInput, hashes, loading, generate, algorithms: ALGORITHMS }
}
