import Editor from '@monaco-editor/react'
import useAppStore from '../../store/useAppStore'

export default function CodeEditor({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  height = '400px',
}) {
  const theme = useAppStore((s) => s.theme)

  return (
    <div className="overflow-hidden rounded-lg border border-surface-200 dark:border-surface-700">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: { top: 12 },
          renderLineHighlight: 'none',
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
