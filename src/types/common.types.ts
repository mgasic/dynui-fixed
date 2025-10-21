export type Size = 'sm' | 'md' | 'lg'
export type Variant = 'solid' | 'outline' | 'ghost'
export type Color = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface ControlProps<T> {
  id?: string
  name?: string
  value?: T
  defaultValue?: T
  disabled?: boolean
  required?: boolean
  onChange?: (value: T) => void
  onFocus?: () => void
  onBlur?: () => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'data-testid'?: string
}
