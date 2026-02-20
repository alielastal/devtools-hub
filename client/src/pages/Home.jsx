import { Link } from 'react-router-dom'
import {
  HiCode, HiServer, HiExclamationCircle, HiDocumentText, HiPuzzle, HiGlobeAlt,
  HiLockClosed, HiKey, HiFingerPrint, HiColorSwatch, HiClock, HiLink,
  HiSwitchHorizontal, HiEye, HiArrowRight,
} from 'react-icons/hi'

const tools = [
  {
    path: '/json-formatter',
    name: 'JSON / YAML Formatter',
    desc: 'Format, minify, and convert between JSON & YAML instantly.',
    icon: HiCode,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  },
  {
    path: '/env-generator',
    name: 'Env Generator',
    desc: 'Generate Docker Compose, .env, and .dockerignore files for your stack.',
    icon: HiServer,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  },
  {
    path: '/error-explainer',
    name: 'Error Explainer',
    desc: 'Paste any error message and get a clear explanation with solutions.',
    icon: HiExclamationCircle,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    badge: 'AI',
  },
  {
    path: '/log-analyzer',
    name: 'Log Analyzer',
    desc: 'Upload logs and get instant analysis, patterns, and recommendations.',
    icon: HiDocumentText,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    badge: 'AI',
  },
  {
    path: '/regex-builder',
    name: 'Regex Builder',
    desc: 'Build and test regular expressions with real-time matching and highlighting.',
    icon: HiPuzzle,
    color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
  },
  {
    path: '/api-checker',
    name: 'API Health Checker',
    desc: 'Check API endpoints — status code, response time, headers, and body.',
    icon: HiGlobeAlt,
    color: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30',
  },
  {
    path: '/base64',
    name: 'Base64 Encoder / Decoder',
    desc: 'Encode text to Base64 or decode Base64 back to text.',
    icon: HiLockClosed,
    color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    path: '/jwt-debugger',
    name: 'JWT Debugger',
    desc: 'Decode and inspect JWT tokens — header, payload, and expiry.',
    icon: HiKey,
    color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
  },
  {
    path: '/hash-generator',
    name: 'Hash Generator',
    desc: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text.',
    icon: HiFingerPrint,
    color: 'text-teal-500 bg-teal-100 dark:bg-teal-900/30',
  },
  {
    path: '/color-converter',
    name: 'Color Converter',
    desc: 'Convert between HEX, RGB, and HSL with live color preview.',
    icon: HiColorSwatch,
    color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30',
  },
  {
    path: '/timestamp',
    name: 'Timestamp Converter',
    desc: 'Convert between Unix timestamps and human-readable dates.',
    icon: HiClock,
    color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    path: '/url-encoder',
    name: 'URL Encoder / Decoder',
    desc: 'Encode or decode URL components and full URLs.',
    icon: HiLink,
    color: 'text-sky-500 bg-sky-100 dark:bg-sky-900/30',
  },
  {
    path: '/diff-viewer',
    name: 'Diff Viewer',
    desc: 'Compare two texts and see the differences highlighted.',
    icon: HiSwitchHorizontal,
    color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30',
  },
  {
    path: '/markdown-preview',
    name: 'Markdown Preview',
    desc: 'Write Markdown and see the live preview side by side.',
    icon: HiEye,
    color: 'text-violet-500 bg-violet-100 dark:bg-violet-900/30',
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white">
          Developer Tools, <span className="text-primary-500">All in One Place</span>
        </h1>
        <p className="text-lg text-surface-500 dark:text-surface-400">
          Free, fast, and privacy-friendly tools for everyday development tasks.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group relative flex flex-col gap-3 rounded-xl border border-surface-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-lg dark:border-surface-700 dark:bg-surface-800 dark:hover:border-primary-700"
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${tool.color}`}>
                <tool.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-surface-900 dark:text-white">{tool.name}</h3>
              {tool.badge && (
                <span className="rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                  {tool.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-surface-500 dark:text-surface-400">{tool.desc}</p>
            <HiArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-300 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
          </Link>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 text-center">
        <p className="text-sm text-surface-400">
          More tools coming soon — have a suggestion? Let us know!
        </p>
      </div>
    </div>
  )
}
