import type { ElementType, MouseEvent, ReactNode } from 'react'
import type { Size, Variant, Color } from '../common.types'

export interface DynButtonProps {
  as?: ElementType
  children?: ReactNode
  variant?: Variant
  size?: Size
  color?: Color
  disabled?: boolean
  loading?: boolean
  onClick?: (event: MouseEvent) => void
  onFocus?: () => void
  onBlur?: () => void
  startIcon?: ReactNode
  endIcon?: ReactNode
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
  'data-state'?: string
}
