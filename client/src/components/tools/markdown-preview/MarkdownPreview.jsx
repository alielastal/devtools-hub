import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CopyButton from '../../shared/CopyButton'

const SAMPLE = `# Hello World

This is a **Markdown** preview tool. Try editing this text!

## Features
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- Lists, tables, code blocks

## Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Table
| Feature | Status |
|---------|--------|
| Bold    | Done   |
| Tables  | Done   |
| Code    | Done   |

> Blockquotes work too!
`

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(SAMPLE)

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Markdown Preview</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Write Markdown and see the live preview side by side.
        </p>
      </div>

      {/* Panels */}
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
        {/* Editor */}
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400">Editor</span>
            <CopyButton text={markdown} />
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write Markdown here..."
            spellCheck={false}
            className="flex-1 resize-none rounded-lg border border-surface-200 bg-white p-3 font-mono text-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder-surface-500"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-surface-400">Preview</span>
          <div
            className="flex-1 overflow-auto rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900"
            style={{ minHeight: '400px' }}
          >
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
