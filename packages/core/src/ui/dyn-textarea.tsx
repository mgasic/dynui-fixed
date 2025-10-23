import type { DynTextAreaProps } from '../types/components/dyn-textarea.types'
import { classNames } from '../utils'

export function DynTextArea({
  id,
  value,
  defaultValue,
  disabled,
  required,
  placeholder,
  readonly,
  rows = 4,
  cols,
  size = 'md',
  variant = 'outline',
  resize = 'vertical',
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId
}: DynTextAreaProps) {
  const cls = classNames(
    'dyn-textarea',
    `dyn-textarea--${size}`,
    `dyn-textarea--${variant}`,
    `dyn-textarea--resize-${resize}`,
    disabled && 'dyn-textarea--disabled',
    readonly && 'dyn-textarea--readonly'
  )

  return (
    <textarea
      id={id}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      readOnly={readonly}
      rows={rows}
      cols={cols}
      className={cls}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-testid={dataTestId}
    />
  )
}