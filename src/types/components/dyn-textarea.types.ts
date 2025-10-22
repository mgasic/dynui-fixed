import type { ControlProps, Size, Variant } from '../common.types'

export interface DynTextAreaProps extends ControlProps<string> {
  as?: React.ElementType
  size?: Size
  variant?: Variant
  placeholder?: string
  readonly?: boolean
  rows?: number
  cols?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'auto'
  maxLength?: number
  'data-state'?: string
}