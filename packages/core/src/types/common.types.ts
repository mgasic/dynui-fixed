/**
 * Common types for DynUI component library
 * These are the canonical types that must be used across all components
 * AI models should use these exact definitions without modification
 */

/**
 * Standard size variants used across all components
 */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Standard visual variants used across all components
 * - solid: filled background with contrast text
 * - outline: border with transparent background
 * - ghost: transparent background with subtle hover
 * - link: text-only appearance for link-like components
 */
export type Variant = 'solid' | 'outline' | 'ghost' | 'link'

/**
 * Standard semantic colors used across all components
 * - neutral: default, non-semantic appearance
 * - info: informational messages and states
 * - success: positive actions and confirmation states
 * - warning: caution and attention-required states
 * - danger: error states and destructive actions
 */
export type Color = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

/**
 * Spacing value type for consistent spacing across layout components
 * Can be a number (converted to rem) or a string with units
 */
export type SpacingValue = number | string

/**
 * Standard controlled/uncontrolled form control interface
 * This MUST be extended by all form components (Input, Select, Checkbox, etc.)
 * 
 * @template T - The value type (string for inputs, boolean for checkboxes, etc.)
 */
export interface ControlProps<T> {
  /** Current value (controlled mode) */
  value?: T
  /** Default value (uncontrolled mode) */
  defaultValue?: T
  /** Called when value changes */
  onChange?: (value: T) => void
  /** Whether the control is disabled */
  disabled?: boolean
  /** Whether the control is required */
  required?: boolean
  /** Accessible label for screen readers */
  'aria-label'?: string
  /** ID of element that labels this control */
  'aria-labelledby'?: string
  /** ID of element that describes this control */
  'aria-describedby'?: string
  /** Test identifier for automated testing */
  'data-testid'?: string
}