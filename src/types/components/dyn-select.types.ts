import type { ControlProps, Size, Variant } from '../common.types'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface DynSelectProps extends ControlProps<string> {
  as?: React.ElementType
  options?: SelectOption[]
  size?: Size
  variant?: Variant
  placeholder?: string
  searchable?: boolean
}
