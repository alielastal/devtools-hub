import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/shared/LoadingSpinner'
import useAppStore from './store/useAppStore'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))
const JsonFormatter = lazy(() => import('./components/tools/json-formatter/JsonFormatter'))
const EnvGenerator = lazy(() => import('./components/tools/env-generator/EnvGenerator'))
const ErrorExplainer = lazy(() => import('./components/tools/error-explainer/ErrorExplainer'))
const LogAnalyzer = lazy(() => import('./components/tools/log-analyzer/LogAnalyzer'))
const RegexBuilder = lazy(() => import('./components/tools/regex-builder/RegexBuilder'))
const ApiChecker = lazy(() => import('./components/tools/api-checker/ApiChecker'))
const Base64Tool = lazy(() => import('./components/tools/base64/Base64Tool'))
const JwtDebugger = lazy(() => import('./components/tools/jwt-debugger/JwtDebugger'))
const HashGenerator = lazy(() => import('./components/tools/hash-generator/HashGenerator'))
const ColorConverter = lazy(() => import('./components/tools/color-converter/ColorConverter'))
const TimestampConverter = lazy(() => import('./components/tools/timestamp/TimestampConverter'))
const UrlEncoder = lazy(() => import('./components/tools/url-encoder/UrlEncoder'))
const DiffViewer = lazy(() => import('./components/tools/diff-viewer/DiffViewer'))
const MarkdownPreview = lazy(() => import('./components/tools/markdown-preview/MarkdownPreview'))

export default function App() {
  const { theme, sidebarOpen } = useAppStore()

  // Sync theme class on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex min-h-screen flex-col bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-56' : 'ml-0'
          }`}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/env-generator" element={<EnvGenerator />} />
              <Route path="/error-explainer" element={<ErrorExplainer />} />
              <Route path="/log-analyzer" element={<LogAnalyzer />} />
              <Route path="/regex-builder" element={<RegexBuilder />} />
              <Route path="/api-checker" element={<ApiChecker />} />
              <Route path="/base64" element={<Base64Tool />} />
              <Route path="/jwt-debugger" element={<JwtDebugger />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/color-converter" element={<ColorConverter />} />
              <Route path="/timestamp" element={<TimestampConverter />} />
              <Route path="/url-encoder" element={<UrlEncoder />} />
              <Route path="/diff-viewer" element={<DiffViewer />} />
              <Route path="/markdown-preview" element={<MarkdownPreview />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </main>
      </div>
    </div>
  )
}
