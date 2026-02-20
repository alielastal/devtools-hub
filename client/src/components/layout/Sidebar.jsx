import { NavLink } from 'react-router-dom'
import {
  HiCode, HiServer, HiExclamationCircle, HiDocumentText, HiPuzzle, HiGlobeAlt,
  HiLockClosed, HiKey, HiFingerPrint, HiColorSwatch, HiClock, HiLink,
  HiSwitchHorizontal, HiEye,
} from 'react-icons/hi'
import useAppStore from '../../store/useAppStore'

const tools = [
  { path: '/json-formatter', name: 'JSON / YAML', icon: HiCode, badge: null },
  { path: '/env-generator', name: 'Env Generator', icon: HiServer, badge: null },
  { path: '/error-explainer', name: 'Error Explainer', icon: HiExclamationCircle, badge: 'AI' },
  { path: '/log-analyzer', name: 'Log Analyzer', icon: HiDocumentText, badge: 'AI' },
  { path: '/regex-builder', name: 'Regex Builder', icon: HiPuzzle, badge: null },
  { path: '/api-checker', name: 'API Checker', icon: HiGlobeAlt, badge: null },
  { path: '/base64', name: 'Base64', icon: HiLockClosed, badge: null },
  { path: '/jwt-debugger', name: 'JWT Debugger', icon: HiKey, badge: null },
  { path: '/hash-generator', name: 'Hash Generator', icon: HiFingerPrint, badge: null },
  { path: '/color-converter', name: 'Color Converter', icon: HiColorSwatch, badge: null },
  { path: '/timestamp', name: 'Timestamp', icon: HiClock, badge: null },
  { path: '/url-encoder', name: 'URL Encoder', icon: HiLink, badge: null },
  { path: '/diff-viewer', name: 'Diff Viewer', icon: HiSwitchHorizontal, badge: null },
  { path: '/markdown-preview', name: 'Markdown', icon: HiEye, badge: null },
]

export default function Sidebar() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen)

  return (
    <aside
      className={`fixed top-14 left-0 z-20 h-[calc(100vh-3.5rem)] border-r border-surface-200 bg-white transition-all duration-300 dark:border-surface-700 dark:bg-surface-900 ${
        sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex h-full flex-col gap-1 overflow-y-auto p-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-surface-400">
          Tools
        </p>
        {tools.map((tool) => (
          <NavLink
            key={tool.path}
            to={tool.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800'
              }`
            }
          >
            <tool.icon className="h-4.5 w-4.5 shrink-0" />
            <span className="truncate">{tool.name}</span>
            {tool.badge && (
              <span className="ml-auto rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                {tool.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
