import CodeEditor from '../../shared/CodeEditor'
import CopyButton from '../../shared/CopyButton'
import useJsonFormatter from './useJsonFormatter'

const btnBase =
  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors'
const btnPrimary =
  `${btnBase} bg-primary-600 text-white hover:bg-primary-700`
const btnSecondary =
  `${btnBase} border border-surface-200 text-surface-600 hover:bg-surface-100 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-700`

export default function JsonFormatter() {
  const {
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
  } = useJsonFormatter()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">
          JSON / YAML Formatter
        </h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Format, minify, and convert between JSON and YAML.
        </p>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={format} className={btnPrimary}>Format JSON</button>
        <button onClick={minify} className={btnSecondary}>Minify</button>
        <button onClick={toYaml} className={btnSecondary}>To YAML</button>
        <button onClick={toJson} className={btnSecondary}>To JSON</button>
        {stats && <span className="ml-auto text-xs text-surface-400">{stats}</span>}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Editor panels */}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              Input
            </span>
          </div>
          <CodeEditor
              value={input}
              onChange={(val) => setInput(val || '')}
              language="json"
              height="400px"
            />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              Output ({outputLang.toUpperCase()})
            </span>
            {output && <CopyButton text={output} />}
          </div>
          <CodeEditor
              value={output}
              language={outputLang}
              readOnly
              height="400px"
            />
        </div>
      </div>
    </div>
  )
}
