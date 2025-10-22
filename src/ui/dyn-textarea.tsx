import type { DynTextAreaProps } from '../types/components/dyn-textarea.types'
import { classNames } from '../utils'

export function DynTextArea({
  as: As = 'textarea',
  id,
  name,
  value,
  defaultValue,
  disabled,
  required,
  placeholder,
  readonly,
  size = 'md',
  variant = 'outline',
  rows = 4,
  cols,
  resize = 'vertical',
  maxLength,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId,
  'data-state': dataState
}: DynTextAreaProps) {
  const cls = classNames(
    'dyn-textarea',
    `dyn-textarea--${size}`,
    `dyn-textarea--${variant}`,
    `dyn-textarea--resize-${resize}`,
    disabled && 'dyn-textarea--disabled',
    readonly && 'dyn-textarea--readonly',
    dataState && `dyn-textarea--${dataState}`
  )

  return (
    <As
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      readOnly={readonly}
      rows={rows}
      cols={cols}
      maxLength={maxLength}
      className={cls}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      data-testid={dataTestId}
    />
  )
}
