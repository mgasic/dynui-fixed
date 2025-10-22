import type { ControlProps, Size } from '../common.types'
import type React from 'react'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface DynRadioGroupProps extends ControlProps<string> {
  options?: RadioOption[]
  orientation?: 'horizontal' | 'vertical'
  size?: Size
  className?: string
  name?: string
  disabled?: boolean
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DynRadioProps extends ControlProps<string> {
  size?: Size
  children?: React.ReactNode
  className?: string
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}
