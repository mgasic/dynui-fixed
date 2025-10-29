/**
 * Utility function for merging class names conditionally
 * Similar to clsx/classnames but lightweight
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Alternative export for compatibility
 */
export const classNames = cn

export default cn