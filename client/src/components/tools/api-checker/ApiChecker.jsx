import { HiPlus, HiX } from 'react-icons/hi'
import CodeEditor from '../../shared/CodeEditor'
import CopyButton from '../../shared/CopyButton'
import LoadingSpinner from '../../shared/LoadingSpinner'
import useApiChecker from './useApiChecker'

const STATUS_STYLES = {
  green: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
}

const METHOD_COLORS = {
  GET: 'text-green-600 dark:text-green-400',
  POST: 'text-blue-600 dark:text-blue-400',
  PUT: 'text-orange-600 dark:text-orange-400',
  PATCH: 'text-purple-600 dark:text-purple-400',
  DELETE: 'text-red-600 dark:text-red-400',
}

export default function ApiChecker() {
  const {
    url,
    setUrl,
    method,
    setMethod,
    methods,
    headers,
    addHeader,
    removeHeader,
    updateHeader,
    body,
    setBody,
    result,
    loading,
    error,
    check,
    statusColor,
    activeTab,
    setActiveTab,
  } = useApiChecker()

  const showBody = ['POST', 'PUT', 'PATCH'].includes(method)

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">API Health Checker</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Check API endpoints — status, response time, headers, and body.
        </p>
      </div>

      {/* URL bar */}
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={`w-24 rounded-lg border border-surface-200 bg-white px-2 py-2 text-sm font-bold dark:border-surface-700 dark:bg-surface-800 ${METHOD_COLORS[method]}`}
        >
          {methods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-800 dark:text-white dark:placeholder-surface-500"
        />

        <button
          onClick={check}
          disabled={loading || !url.trim()}
          className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Send'}
        </button>
      </div>

      {/* Headers editor */}
      <details className="rounded-lg border border-surface-200 dark:border-surface-700">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
          Headers ({headers.filter((h) => h.key.trim()).length})
        </summary>
        <div className="flex flex-col gap-1.5 px-3 pb-3">
          {headers.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={h.key}
                onChange={(e) => updateHeader(i, 'key', e.target.value)}
                placeholder="Key"
                className="w-40 rounded border border-surface-200 bg-white px-2 py-1 text-xs text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
              />
              <input
                type="text"
                value={h.value}
                onChange={(e) => updateHeader(i, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 rounded border border-surface-200 bg-white px-2 py-1 text-xs text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
              />
              <button onClick={() => removeHeader(i)} className="text-surface-400 hover:text-red-500">
                <HiX className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addHeader}
            className="mt-1 inline-flex w-fit items-center gap-1 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <HiPlus className="h-3 w-3" /> Add Header
          </button>
        </div>
      </details>

      {/* Request body (for POST/PUT/PATCH) */}
      {showBody && (
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Request Body
          </span>
          <CodeEditor value={body} onChange={(v) => setBody(v || '')} language="json" height="120px" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {loading && !result && <LoadingSpinner />}

      {result && (
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          {/* Status bar */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-md px-3 py-1 text-sm font-bold ${STATUS_STYLES[statusColor]}`}>
              {result.status} {result.statusText}
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">
              Time: <strong className="text-surface-700 dark:text-surface-200">{result.time}ms</strong>
            </span>
            <span className="text-xs text-surface-500 dark:text-surface-400">
              Size: <strong className="text-surface-700 dark:text-surface-200">{(result.size / 1024).toFixed(1)}KB</strong>
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-surface-200 dark:border-surface-700">
            {['body', 'headers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'
                }`}
              >
                {tab === 'headers' ? `Headers (${Object.keys(result.headers).length})` : 'Body'}
              </button>
            ))}
            <div className="ml-auto">
              <CopyButton text={activeTab === 'body' ? result.body : JSON.stringify(result.headers, null, 2)} />
            </div>
          </div>

          {/* Tab content */}
          <div className="min-h-0 flex-1">
            {activeTab === 'body' ? (
              <CodeEditor
                value={tryFormatJson(result.body)}
                language={detectLanguage(result.headers['content-type'])}
                readOnly
                height="350px"
              />
            ) : (
              <div className="overflow-auto rounded-lg border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900" style={{ maxHeight: '350px' }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800">
                      <th className="px-3 py-2 text-left font-semibold text-surface-600 dark:text-surface-300">Header</th>
                      <th className="px-3 py-2 text-left font-semibold text-surface-600 dark:text-surface-300">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.headers).map(([key, value]) => (
                      <tr key={key} className="border-b border-surface-100 dark:border-surface-800">
                        <td className="px-3 py-1.5 font-mono font-medium text-surface-800 dark:text-surface-200">{key}</td>
                        <td className="px-3 py-1.5 font-mono text-surface-600 dark:text-surface-400">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <p className="py-12 text-center text-sm text-surface-400">
          Enter a URL and click "Send" to check the API.
        </p>
      )}
    </div>
  )
}

function tryFormatJson(str) {
  try {
    return JSON.stringify(JSON.parse(str), null, 2)
  } catch {
    return str
  }
}

function detectLanguage(contentType) {
  if (!contentType) return 'plaintext'
  if (contentType.includes('json')) return 'json'
  if (contentType.includes('xml')) return 'xml'
  if (contentType.includes('html')) return 'html'
  return 'plaintext'
}
