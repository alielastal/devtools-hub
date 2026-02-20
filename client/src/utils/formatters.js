export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export function countKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return 0
  let count = 0
  for (const key in obj) {
    count++
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countKeys(obj[key])
    }
  }
  return count
}
