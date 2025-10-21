import type { ControlProps, Size } from '../common.types'

export interface DynCheckboxProps extends ControlProps<boolean> {
  size?: Size
  indeterminate?: boolean
  children?: React.ReactNode
}
