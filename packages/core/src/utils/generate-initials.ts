/**
 * Generates initials from a full name
 * @param name - The full name string
 * @returns Initials (first letter of first two words, uppercased)
 */
export function generateInitials(name: string): string {
  if (!name?.trim()) return '??'
  
  const words = name.trim().split(/\s+/)
  const [firstWord, secondWord] = words

  const firstInitial = firstWord?.charAt(0)?.toUpperCase() ?? ''
  if (!secondWord) {
    return firstInitial || '??'
  }

  const secondInitial = secondWord.charAt(0).toUpperCase()
  const initials = `${firstInitial}${secondInitial}`.trim()
  return initials || '??'
}