export default function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2 border-surface-300 border-t-primary-500`}
      />
    </div>
  )
}
