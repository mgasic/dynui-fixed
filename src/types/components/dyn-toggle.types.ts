import type { ControlProps, Size } from '../common.types'

export interface DynToggleProps extends ControlProps<boolean> {
  size?: Size
  children?: React.ReactNode
  icons?: {
    checked?: React.ReactNode
    unchecked?: React.ReactNode
  }
}