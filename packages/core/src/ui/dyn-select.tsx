import type { DynSelectProps, DynSelectOptionProps } from '../types/components/dyn-select.types'
import { classNames } from '../utils'

export function DynSelect({
  id,
  value,
  defaultValue,
  disabled,
  required,
  size = 'md',
  variant = 'outline',
  placeholder,
  children,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId
}: DynSelectProps) {
  const cls = classNames(
    'dyn-select',
    `dyn-select--${size}`,
    `dyn-select--${variant}`,
    disabled && 'dyn-select--disabled'
  )

  return (
    <select
      id={id}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      className={cls}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-testid={dataTestId}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  )
}

export function DynSelectOption({
  value,
  disabled,
  children
}: DynSelectOptionProps) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  )
}