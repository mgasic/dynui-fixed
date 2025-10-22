import type { ControlProps, Size } from '../common.types'

export interface DynSliderProps extends ControlProps<number | number[]> {
  min?: number
  max?: number
  step?: number
  size?: Size
  orientation?: 'horizontal' | 'vertical'
  range?: boolean
  marks?: boolean | number[]
  tooltip?: boolean
}