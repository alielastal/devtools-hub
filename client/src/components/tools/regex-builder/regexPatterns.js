export const patterns = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL', pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+', flags: 'g' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Phone', pattern: '[+]?[(]?\\d{1,4}[)]?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}', flags: 'g' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', flags: 'g' },
  { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'g' },
  { name: 'HTML Tag', pattern: '<\\/?[a-zA-Z][\\w-]*(?:\\s[^>]*)?\\/?>',  flags: 'g' },
  { name: 'Numbers', pattern: '-?\\d+(?:\\.\\d+)?', flags: 'g' },
]
