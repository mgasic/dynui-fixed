import type { Size, Variant, Color } from '../common.types'

export interface DynButtonProps {
  as?: React.ElementType
  children?: React.ReactNode
  variant?: Variant
  size?: Size
  color?: Color
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent) => void
  onFocus?: () => void
  onBlur?: () => void
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
  'data-state'?: string
}
