import useDiffViewer from './useDiffViewer'

export default function DiffViewer() {
  const { original, setOriginal, modified, setModified, diff, stats } = useDiffViewer()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Diff Viewer</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Compare two texts and see the differences highlighted.
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex gap-3">
          <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">
            +{stats.added} added
          </span>
          <span className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 dark:bg-red-900/40 dark:text-red-400">
            -{stats.removed} removed
          </span>
        </div>
      )}

      {/* Input panels */}
      <div className="grid min-h-0 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Original
          </span>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text..."
            spellCheck={false}
            className="resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
            style={{ minHeight: '150px' }}
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Modified
          </span>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text..."
            spellCheck={false}
            className="resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
            style={{ minHeight: '150px' }}
          />
        </div>
      </div>

      {/* Diff output */}
      <div className="flex flex-col">
        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
          Diff Result
        </span>
        <div
          className="flex-1 overflow-auto rounded-lg border border-surface-200 bg-white font-mono text-sm dark:border-surface-700 dark:bg-surface-900"
          style={{ minHeight: '200px' }}
        >
          {diff ? (
            diff.map((part, i) => {
              const lines = part.value.split('\n')
              // Remove trailing empty string from split
              if (lines[lines.length - 1] === '') lines.pop()

              return lines.map((line, li) => (
                <div
                  key={`${i}-${li}`}
                  className={`whitespace-pre-wrap px-3 py-0.5 ${
                    part.added
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : part.removed
                        ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        : 'text-surface-700 dark:text-surface-300'
                  }`}
                >
                  <span className="mr-3 inline-block w-4 select-none text-right text-surface-400">
                    {part.added ? '+' : part.removed ? '-' : ' '}
                  </span>
                  {line}
                </div>
              ))
            })
          ) : (
            <p className="px-3 py-12 text-center text-surface-400">
              Enter text in both panels to see the diff.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
