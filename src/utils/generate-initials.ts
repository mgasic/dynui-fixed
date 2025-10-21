export function generateInitials(name: string, maxLength = 2): string {
  if (!name || typeof name !== 'string') return ''
  
  const words = name.trim().split(/\s+/)
  if (words.length === 0) return ''
  
  if (words.length === 1) {
    return words[0].slice(0, maxLength).toUpperCase()
  }
  
  return words
    .slice(0, maxLength)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}
