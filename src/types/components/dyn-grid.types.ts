import type { SpacingValue } from './dyn-box.types'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type GridSpan = 'auto' | GridColumns | 'full'

export interface DynGridProps {
  as?: React.ElementType
  children?: React.ReactNode
  cols?: GridColumns
  rows?: number
  gap?: SpacingValue
  gapX?: SpacingValue
  gapY?: SpacingValue
  'data-testid'?: string
}

export interface DynGridItemProps {
  as?: React.ElementType
  children?: React.ReactNode
  colSpan?: GridSpan
  rowSpan?: number
  colStart?: GridColumns
  rowStart?: number
  'data-testid'?: string
}