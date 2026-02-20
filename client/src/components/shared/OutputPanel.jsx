import CopyButton from './CopyButton'

export default function OutputPanel({ title, content, language = 'json', stats }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-surface-200 px-3 py-2 dark:border-surface-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {stats && <span className="text-xs text-surface-400">{stats}</span>}
          {content && <CopyButton text={content} />}
        </div>
      </div>
      <pre className="flex-1 overflow-auto bg-surface-50 p-4 text-sm text-surface-700 dark:bg-surface-950 dark:text-surface-300">
        <code>{content || 'Output will appear here...'}</code>
      </pre>
    </div>
  )
}
