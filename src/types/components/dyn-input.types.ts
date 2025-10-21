import type { ControlProps, Size, Variant } from '../common.types'

export interface DynInputProps extends ControlProps<string> {
  as?: React.ElementType
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'number'
  size?: Size
  variant?: Variant
  placeholder?: string
  readonly?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  'data-state'?: string
}
