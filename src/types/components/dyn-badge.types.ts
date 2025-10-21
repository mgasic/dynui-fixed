import type { Size, Variant, Color } from '../common.types'

export interface DynBadgeProps {
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  color?: Color
  'aria-label'?: string
  'data-testid'?: string
}
