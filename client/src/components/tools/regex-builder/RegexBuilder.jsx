import useRegexBuilder from './useRegexBuilder'

const FLAG_LABELS = [
  { key: 'g', label: 'Global' },
  { key: 'i', label: 'Case-insensitive' },
  { key: 'm', label: 'Multiline' },
  { key: 's', label: 'Dotall' },
]

export default function RegexBuilder() {
  const {
    pattern,
    setPattern,
    testString,
    setTestString,
    flags,
    toggleFlag,
    flagString,
    matches,
    regexError,
    highlightedHtml,
    applyPreset,
    presets,
  } = useRegexBuilder()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Regex Builder</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Build and test regular expressions with real-time matching.
        </p>
      </div>

      {/* Pattern input */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg text-surface-400 dark:text-surface-500">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            spellCheck={false}
            className="flex-1 rounded-lg border border-surface-200 bg-white px-3 py-2 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-800 dark:text-white dark:placeholder-surface-500"
          />
          <span className="text-lg text-surface-400 dark:text-surface-500">/{flagString}</span>
        </div>

        {regexError && (
          <p className="text-xs text-red-500">{regexError}</p>
        )}

        {/* Flags */}
        <div className="flex flex-wrap items-center gap-3">
          {FLAG_LABELS.map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={flags[key]}
                onChange={() => toggleFlag(key)}
                className="accent-primary-600"
              />
              <span className="text-surface-600 dark:text-surface-400">
                {key} <span className="hidden sm:inline text-surface-400 dark:text-surface-500">({label})</span>
              </span>
            </label>
          ))}

          {matches.length > 0 && (
            <span className="ml-auto rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="rounded border border-surface-200 bg-white px-2 py-1 text-xs text-surface-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-300"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        {/* Test string */}
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Test String
          </span>
          <div className="relative flex-1">
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test string here..."
              spellCheck={false}
              className="absolute inset-0 w-full resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-transparent caret-surface-900 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:caret-white"
              style={{ minHeight: '200px' }}
            />
            {/* Highlighted overlay */}
            <div
              className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-transparent p-3 font-mono text-sm text-surface-900 dark:text-surface-200"
              style={{ minHeight: '200px' }}
            >
              {highlightedHtml
                ? highlightedHtml.map((part, i) =>
                    part.highlight ? (
                      <mark
                        key={i}
                        className="rounded-sm bg-primary-200 px-px text-primary-900 dark:bg-primary-700/50 dark:text-primary-100"
                      >
                        {part.text}
                      </mark>
                    ) : (
                      <span key={i}>{part.text}</span>
                    ),
                  )
                : <span className="text-surface-400 dark:text-surface-500">{testString ? testString : ''}</span>}
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">
            Matches
          </span>
          <div className="flex-1 overflow-auto rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900" style={{ minHeight: '200px' }}>
            {matches.length === 0 ? (
              <p className="py-12 text-center text-sm text-surface-400">
                {pattern ? 'No matches found.' : 'Enter a pattern to see matches.'}
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-surface-100 bg-surface-50 p-2 dark:border-surface-700 dark:bg-surface-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-[10px] font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                        {i + 1}
                      </span>
                      <code className="text-sm font-semibold text-surface-900 dark:text-white">
                        "{m.text}"
                      </code>
                      <span className="ml-auto text-[11px] text-surface-400">
                        index {m.index}–{m.end - 1}
                      </span>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="mt-1 ml-7 flex flex-col gap-0.5">
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="text-xs text-surface-500 dark:text-surface-400">
                            Group {gi + 1}:{' '}
                            <code className="text-primary-600 dark:text-primary-400">"{g ?? ''}"</code>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
