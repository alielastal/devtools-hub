import { HiSwitchHorizontal } from 'react-icons/hi'
import CopyButton from '../../shared/CopyButton'
import useBase64 from './useBase64'

export default function Base64Tool() {
  const { input, setInput, output, mode, setMode, error, process, swap } = useBase64()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Base64 Encoder / Decoder</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Encode text to Base64 or decode Base64 back to text.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300"
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>

        <button
          onClick={process}
          disabled={!input.trim()}
          className="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>

        <button
          onClick={swap}
          disabled={!output}
          className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-sm font-medium text-surface-600 hover:bg-surface-50 disabled:opacity-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
        >
          <HiSwitchHorizontal className="h-4 w-4" /> Swap
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Panels */}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            {mode === 'encode' ? 'Plain Text' : 'Base64 Input'}
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string...'}
            spellCheck={false}
            className="flex-1 resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
            style={{ minHeight: '250px' }}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </span>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            className="flex-1 resize-none rounded-lg border border-surface-200 bg-surface-50 p-3 font-mono text-sm text-surface-900 placeholder-surface-400 dark:border-surface-700 dark:bg-surface-800 dark:text-white dark:placeholder-surface-500"
            style={{ minHeight: '250px' }}
          />
        </div>
      </div>
    </div>
  )
}
