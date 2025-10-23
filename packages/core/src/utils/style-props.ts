import type { CSSProperties } from 'react'
import type { SpacingValue } from '../types/common.types'

export interface StyleProps {
  p?: SpacingValue
  m?: SpacingValue
  gap?: SpacingValue
}

/**
 * Converts spacing values to CSS properties
 * Handles both number (px) and string values
 */
export function getSpacingStyles({ p, m, gap }: StyleProps): CSSProperties {
  const styles: CSSProperties = {}
  
  if (p !== undefined) {
    styles.padding = typeof p === 'number' ? `${p}px` : p
  }
  if (m !== undefined) {
    styles.margin = typeof m === 'number' ? `${m}px` : m
  }
  if (gap !== undefined) {
    (styles as any).gap = typeof gap === 'number' ? `${gap}px` : gap
  }
  
  return styles
}