import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-extrabold text-surface-300 dark:text-surface-700">404</h1>
      <p className="mt-3 text-lg text-surface-500">Page not found</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700"
      >
        Back to Home
      </Link>
    </div>
  )
}
