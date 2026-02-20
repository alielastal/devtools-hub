import { useState } from 'react'
import { HiClipboardCopy, HiCheck } from 'react-icons/hi'

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 transition-colors hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 ${className}`}
    >
      {copied ? (
        <>
          <HiCheck className="h-3.5 w-3.5 text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <HiClipboardCopy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  )
}
