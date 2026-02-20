import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  Errors: '#ef4444',
  Warnings: '#f59e0b',
  Info: '#3b82f6',
  Debug: '#8b5cf6',
}

export default function LogChart({ stats }) {
  if (!stats) return null

  const data = [
    { name: 'Errors', value: stats.errors },
    { name: 'Warnings', value: stats.warnings },
    { name: 'Info', value: stats.info },
    { name: 'Debug', value: stats.debug },
  ]

  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-800/50">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-400">
        Log Level Distribution ({stats.total} lines)
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
