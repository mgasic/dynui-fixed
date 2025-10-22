import type { ControlProps, Size } from '../common.types'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface DynRadioGroupProps extends ControlProps<string> {
  options?: RadioOption[]
  orientation?: 'horizontal' | 'vertical'
  size?: Size
}

export interface DynRadioProps extends ControlProps<string> {
  size?: Size
  children?: React.ReactNode
}