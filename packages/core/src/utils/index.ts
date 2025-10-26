// DynUI Utilities - Complete Export
// Migration from src/utils/ to packages/core/src/utils/

import type { CSSProperties } from 'react'

export * from './class-names'
export * from './generate-initials'
export * from './style-props'

// Back-compat helpers used by components
export function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type SpacingShorthand = {
  p?: number | string | undefined
  m?: number | string | undefined
  gap?: number | string | undefined
}

export function getSpacingStyles({ p, m, gap }: SpacingShorthand): CSSProperties {
  const styles: CSSProperties = {}
  if (p !== undefined) styles.padding = typeof p === 'number' ? `${p}px` : p
  if (m !== undefined) styles.margin = typeof m === 'number' ? `${m}px` : m
  if (gap !== undefined) styles.gap = typeof gap === 'number' ? `${gap}px` : gap
  return styles
}