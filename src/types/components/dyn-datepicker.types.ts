import type { ControlProps, Size, Variant } from '../common.types'

export type DateValue = Date | string | null
export type DateRangeValue = [DateValue, DateValue] | null

export interface DynDatePickerProps extends ControlProps<DateValue> {
  size?: Size
  variant?: Variant
  placeholder?: string
  format?: string
  minDate?: DateValue
  maxDate?: DateValue
  disabledDates?: DateValue[]
  readonly?: boolean
  showTime?: boolean
  'data-state'?: string
}

export interface DynDateRangePickerProps extends ControlProps<DateRangeValue> {
  size?: Size
  variant?: Variant
  placeholder?: [string, string]
  format?: string
  minDate?: DateValue
  maxDate?: DateValue
  disabledDates?: DateValue[]
  readonly?: boolean
  'data-state'?: string
}