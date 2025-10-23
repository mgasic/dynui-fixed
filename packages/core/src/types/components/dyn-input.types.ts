import type { ReactNode } from 'react'
import type { Size, ControlProps } from '../common.types'

export type InputVariant = 'outline' | 'filled' | 'unstyled'

export interface DynInputProps extends ControlProps<string> {
  as?: 'input' | 'textarea'
  type?: string
  id?: string
  name?: string
  placeholder?: string
  readonly?: boolean
  size?: Size
  variant?: InputVariant
  startIcon?: ReactNode
  endIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  onFocus?: () => void
  onBlur?: () => void
  'aria-invalid'?: boolean
  'data-state'?: string
}