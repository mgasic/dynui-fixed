/**
 * Utility function for conditional className concatenation
 * Filters out falsy values and joins valid classes with spaces
 */
export function classNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Advanced className utility with object support
 */
export function cn(
  ...inputs: Array<string | { [key: string]: boolean } | false | null | undefined>
): string {
  const classes: string[] = []
  
  inputs.forEach(input => {
    if (!input) return
    
    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  })
  
  return classes.join(' ')
}