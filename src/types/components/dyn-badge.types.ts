import type { ReactNode } from 'react'
import type { Size, Variant, Color } from '../common.types'

export interface DynBadgeProps {
  children?: ReactNode
  variant?: Variant
  size?: Size
  color?: Color
  'aria-label'?: string
  'data-testid'?: string
}
