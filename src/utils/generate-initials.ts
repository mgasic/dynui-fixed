// generate-initials.ts guard undefined
export function generateInitials(name?: string | null, maxLength = 2) {
  const sanitizedLength = Number.isFinite(maxLength)
    ? Math.max(0, Math.floor(maxLength))
    : 0

  if (sanitizedLength === 0 || typeof name !== 'string') return ''

  const normalized = name.trim().replace(/\s+/g, ' ')
  if (!normalized) return ''

  const parts = normalized.split(' ').filter(Boolean)
  if (parts.length === 0) return ''

  const upperParts = parts.map((part) => part.toUpperCase())
  const primaryInitials = upperParts.map((part) => part[0] ?? '').join('')

  if (sanitizedLength <= primaryInitials.length) {
    return primaryInitials.slice(0, sanitizedLength)
  }

  const additionalCharacters = upperParts
    .map((part) => part.slice(1))
    .join('')

  const combined = `${primaryInitials}${additionalCharacters}`

  return combined.slice(0, Math.min(combined.length, sanitizedLength))
}
