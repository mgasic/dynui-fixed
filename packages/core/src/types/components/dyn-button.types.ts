import type { ReactNode } from 'react'
import type { Size, ControlProps } from '../common.types'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'neutral'

export interface DynButtonProps extends Omit<ControlProps<void>, 'value' | 'defaultValue' | 'onChange'> {
  as?: 'button' | 'a' | 'div'
  children?: ReactNode
  variant?: ButtonVariant
  size?: Size
  color?: ButtonColor
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: () => void
  onFocus?: () => void
  onBlur?: () => void
  'data-state'?: string
}