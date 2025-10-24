import type { ReactNode } from 'react'
import type { ControlProps, Size } from '../common.types'

export interface DynToggleProps extends ControlProps<boolean> {
  size?: Size
  children?: ReactNode
  icons?: {
    checked?: ReactNode
    unchecked?: ReactNode
  }
}