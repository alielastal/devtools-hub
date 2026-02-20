import CopyButton from '../../shared/CopyButton'
import useTimestamp from './useTimestamp'

export default function TimestampConverter() {
  const { timestamp, setTimestamp, dateString, setDateString, fromTimestamp, fromDate, setNowTimestamp, currentSeconds } = useTimestamp()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Timestamp Converter</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Convert between Unix timestamps and human-readable dates.
        </p>
      </div>

      {/* Current time */}
      <div className="flex items-center gap-3 rounded-lg border border-surface-200 bg-white px-4 py-3 dark:border-surface-700 dark:bg-surface-900">
        <span className="text-xs font-semibold uppercase text-surface-400">Current</span>
        <code className="text-sm font-bold text-primary-600 dark:text-primary-400">{currentSeconds}</code>
        <button
          onClick={setNowTimestamp}
          className="rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 hover:bg-primary-200 dark:bg-primary-900/40 dark:text-primary-300"
        >
          Use Now
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timestamp → Date */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
            Timestamp → Date
          </span>

          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="e.g. 1700000000 or 1700000000000"
            className="rounded-lg border border-surface-200 bg-white px-3 py-2 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
          />

          {fromTimestamp?.error && (
            <p className="text-xs text-red-500">{fromTimestamp.error}</p>
          )}

          {fromTimestamp && !fromTimestamp.error && (
            <div className="flex flex-col gap-2">
              <ResultRow label="Local" value={fromTimestamp.local} />
              <ResultRow label="UTC" value={fromTimestamp.utc} />
              <ResultRow label="ISO 8601" value={fromTimestamp.iso} />
              <ResultRow label="Relative" value={fromTimestamp.relative} />
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
            Date → Timestamp
          </span>

          <input
            type="datetime-local"
            value={dateString}
            onChange={(e) => setDateString(e.target.value)}
            className="rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-900 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white"
          />

          {fromDate?.error && (
            <p className="text-xs text-red-500">{fromDate.error}</p>
          )}

          {fromDate && !fromDate.error && (
            <div className="flex flex-col gap-2">
              <ResultRow label="Seconds" value={fromDate.seconds.toString()} />
              <ResultRow label="Milliseconds" value={fromDate.milliseconds.toString()} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-surface-100 bg-surface-50 px-3 py-2 dark:border-surface-700 dark:bg-surface-800">
      <div>
        <span className="text-[10px] font-semibold uppercase text-surface-400">{label}</span>
        <p className="font-mono text-sm text-surface-800 dark:text-surface-200">{value}</p>
      </div>
      <CopyButton text={value} />
    </div>
  )
}
