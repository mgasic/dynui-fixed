import type { ElementType, ReactNode } from 'react'
import type { ControlProps, Size, Variant } from '../common.types'

export interface DynInputProps extends ControlProps<string> {
  as?: ElementType
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'number'
  size?: Size
  variant?: Variant
  placeholder?: string
  readonly?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  'data-state'?: string
}
