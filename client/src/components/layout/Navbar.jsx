import { HiMenu, HiMoon, HiSun } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import useAppStore from '../../store/useAppStore'

export default function Navbar() {
  const { theme, toggleTheme, toggleSidebar } = useAppStore()

  return (
    <nav className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-surface-200 bg-white px-4 backdrop-blur dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <HiMenu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-surface-900 dark:text-white">
          <span className="text-xl">&#x2692;&#xFE0F;</span>
          <span>DevTools Hub</span>
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
      </button>
    </nav>
  )
}
