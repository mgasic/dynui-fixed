import { generateInitials } from '../../src/utils/generate-initials'

describe('generateInitials', () => {
  it('generates initials from a single word with default length', () => {
    expect(generateInitials('John')).toBe('JO')
    expect(generateInitials('alice')).toBe('AL')
  })

  it('generates initials from multiple words', () => {
    expect(generateInitials('John Doe')).toBe('JD')
    expect(generateInitials('Alice Bob Charlie')).toBe('AB')
    expect(generateInitials('Alice Bob Charlie', 3)).toBe('ABC')
  })

  it('respects the maxLength parameter', () => {
    expect(generateInitials('John', 1)).toBe('J')
    expect(generateInitials('John Doe Smith', 3)).toBe('JDS')
  })

  it('normalises whitespace before generating initials', () => {
    expect(generateInitials('  John   Doe  ')).toBe('JD')
    expect(generateInitials('John\t\nDoe')).toBe('JD')
  })

  it('handles empty, null or undefined values gracefully', () => {
    expect(generateInitials('')).toBe('')
    expect(generateInitials('   ')).toBe('')
    expect(generateInitials(null as any)).toBe('')
    expect(generateInitials(undefined as any)).toBe('')
  })
})
