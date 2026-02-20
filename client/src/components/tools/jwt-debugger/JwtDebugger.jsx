import CopyButton from '../../shared/CopyButton'
import useJwtDebugger from './useJwtDebugger'

export default function JwtDebugger() {
  const { token, setToken, decoded } = useJwtDebugger()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">JWT Debugger</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Decode and inspect JSON Web Tokens — header, payload, and expiry.
        </p>
      </div>

      {/* Token input */}
      <div className="flex flex-col">
        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
          Token
        </span>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          spellCheck={false}
          className="resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
          style={{ minHeight: '80px' }}
        />
      </div>

      {/* Error */}
      {decoded?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {decoded.error}
        </div>
      )}

      {/* Decoded sections */}
      {decoded && !decoded.error && (
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
          {/* Header */}
          <Section
            title="Header"
            color="text-blue-600 dark:text-blue-400"
            data={decoded.header}
          />

          {/* Payload */}
          <Section
            title="Payload"
            color="text-purple-600 dark:text-purple-400"
            data={decoded.payload}
          />

          {/* Expiry info */}
          <div className="flex flex-col gap-2 rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900 lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
              Token Info
            </span>
            <div className="flex flex-wrap gap-4">
              {decoded.issuedAt && (
                <InfoChip label="Issued At" value={decoded.issuedAt} />
              )}
              {decoded.expiry && (
                <>
                  <InfoChip label="Expires" value={decoded.expiry.date} />
                  <div className="flex items-center gap-2">
                    {decoded.expiry.expired ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-400">
                        EXPIRED
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                        VALID — {decoded.expiry.remaining} remaining
                      </span>
                    )}
                  </div>
                </>
              )}
              {!decoded.expiry && (
                <span className="text-xs text-surface-400">No expiry (exp) claim found</span>
              )}
            </div>

            {/* Signature */}
            <div className="mt-2">
              <span className="text-xs font-medium text-surface-500 dark:text-surface-400">
                Signature:{' '}
              </span>
              <code className="break-all text-xs text-surface-600 dark:text-surface-300">
                {decoded.signature}
              </code>
            </div>
          </div>
        </div>
      )}

      {!decoded && (
        <p className="py-12 text-center text-sm text-surface-400">
          Paste a JWT token above to decode it.
        </p>
      )}
    </div>
  )
}

function Section({ title, color, data }) {
  const json = JSON.stringify(data, null, 2)
  return (
    <div className="flex flex-col rounded-lg border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center justify-between border-b border-surface-200 px-4 py-2 dark:border-surface-700">
        <span className={`text-sm font-bold ${color}`}>{title}</span>
        <CopyButton text={json} />
      </div>
      <pre className="flex-1 overflow-auto p-4 text-xs text-surface-800 dark:text-surface-200">
        {json}
      </pre>
    </div>
  )
}

function InfoChip({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-semibold uppercase text-surface-400">{label}</span>
      <span className="text-sm text-surface-800 dark:text-surface-200">{value}</span>
    </div>
  )
}
