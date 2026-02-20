export default function StackSelector({ title, items, selected, onSelect, multi = false }) {
  const isSelected = (id) => (multi ? selected.includes(id) : selected === id)

  const handleClick = (id) => {
    if (multi) {
      onSelect(id)
    } else {
      onSelect(isSelected(id) ? null : id)
    }
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-300">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
              isSelected(item.id)
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm dark:border-primary-500 dark:bg-primary-900/30 dark:text-primary-300'
                : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-400 dark:hover:border-surface-600'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
