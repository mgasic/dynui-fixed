import { generateInitials } from '../../src/utils/generate-initials'

describe('generateInitials', () => {
  it('generates initials from single word', () => {
    expect(generateInitials('John')).toBe('JO')
    expect(generateInitials('Alice')).toBe('AL')
  })

  it('generates initials from multiple words', () => {
    expect(generateInitials('John Doe')).toBe('JD')
    expect(generateInitials('Alice Bob Charlie')).toBe('AB')
    expect(generateInitials('Alice Bob Charlie', 3)).toBe('ABC')
  })

  it('handles empty or invalid inputs', () => {
    expect(generateInitials('')).toBe('')
    expect(generateInitials('   ')).toBe('')
    expect(generateInitials(null as any)).toBe('')
    expect(generateInitials(undefined as any)).toBe('')
  })

  it('respects maxLength parameter', () => {
    expect(generateInitials('John', 1)).toBe('J')
    expect(generateInitials('John Doe Smith', 3)).toBe('JDS')
  })

  it('handles extra whitespace', () => {
    expect(generateInitials('  John   Doe  ')).toBe('JD')
    expect(generateInitials('John\t\nDoe')).toBe('JD')
  })
})
