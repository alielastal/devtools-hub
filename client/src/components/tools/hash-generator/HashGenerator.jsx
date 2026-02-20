import CopyButton from '../../shared/CopyButton'
import useHashGenerator from './useHashGenerator'

export default function HashGenerator() {
  const { input, setInput, hashes, loading, generate } = useHashGenerator()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Hash Generator</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text.
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col">
        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
          Input Text
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          spellCheck={false}
          className="resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
          style={{ minHeight: '100px' }}
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !input.trim()}
        className="w-fit rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Hashes'}
      </button>

      {/* Results */}
      {hashes && (
        <div className="flex flex-col gap-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div
              key={algo}
              className="rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{algo}</span>
                <CopyButton text={hash} />
              </div>
              <code className="block break-all text-xs text-surface-700 dark:text-surface-300">
                {hash}
              </code>
            </div>
          ))}
        </div>
      )}

      {!hashes && (
        <p className="py-12 text-center text-sm text-surface-400">
          Enter text and click "Generate Hashes" to see results.
        </p>
      )}
    </div>
  )
}
