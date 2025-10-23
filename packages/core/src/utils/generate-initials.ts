/**
 * Generates initials from a full name
 * @param name - The full name string
 * @returns Initials (first letter of first two words, uppercased)
 */
export function generateInitials(name: string): string {
  if (!name?.trim()) return '??'
  
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}