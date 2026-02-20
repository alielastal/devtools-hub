import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeEditor from '../../shared/CodeEditor'
import CopyButton from '../../shared/CopyButton'
import LoadingSpinner from '../../shared/LoadingSpinner'
import useErrorExplainer from './useErrorExplainer'

export default function ErrorExplainer() {
  const {
    errorText,
    setErrorText,
    language,
    setLanguage,
    explanation,
    loading,
    error,
    explain,
    languages,
  } = useErrorExplainer()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">
          Error Explainer
          <span className="ml-2 rounded bg-primary-100 px-1.5 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
            AI
          </span>
        </h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Paste any error message and get a clear explanation with solutions.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300"
        >
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <button
          onClick={explain}
          disabled={loading}
          className="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Explain Error'}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Panels */}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Error Message
          </span>
          <CodeEditor
              value={errorText}
              onChange={(val) => setErrorText(val || '')}
              language="plaintext"
              height="400px"
            />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              Explanation
            </span>
            {explanation && <CopyButton text={explanation} />}
          </div>
          <div className="min-h-[300px] flex-1 overflow-auto rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
            {loading && !explanation ? (
              <LoadingSpinner />
            ) : explanation ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation}</ReactMarkdown>
                {loading && <span className="inline-block h-4 w-1.5 animate-pulse bg-primary-500" />}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-surface-400">
                Paste an error and click "Explain Error" to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
