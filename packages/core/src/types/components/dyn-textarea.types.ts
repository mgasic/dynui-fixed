import type { ControlProps, Size, Variant } from '../common.types'

/**
 * Props for DynTextArea component
 * Multi-line text input with resize options and form control support
 */
export interface DynTextAreaProps extends ControlProps<string> {
  /** HTML id attribute */
  id?: string
  /** HTML name attribute for forms */
  name?: string
  /** Placeholder text */
  placeholder?: string
  /** Whether the textarea is readonly */
  readonly?: boolean
  /** Number of visible text lines */
  rows?: number
  /** Number of visible character columns */
  cols?: number
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /** Visual size variant */
  size?: Size
  /** Visual style variant */
  variant?: Variant
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  /** State for styling (error, success, etc.) */
  'data-state'?: string
}