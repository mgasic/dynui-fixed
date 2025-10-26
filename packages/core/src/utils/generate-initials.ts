/**
 * Generates initials from a full name
 * @param name - The full name string
 * @returns Initials (first letter of first two words, uppercased)
 */
export function generateInitials(name: string): string {
  if (!name?.trim()) return '??'
  
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) {
    return '??'
  }

  if (words.length === 1) {
    return words[0]!.charAt(0).toUpperCase()
  }

  const [firstWord, secondWord] = words
  return (firstWord!.charAt(0) + secondWord!.charAt(0)).toUpperCase()
}