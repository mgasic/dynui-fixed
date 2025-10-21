import type { DynCheckboxProps } from '../types/components/dyn-checkbox.types'
import { classNames } from '../utils'

export function DynCheckbox({
  id,
  name,
  value,
  defaultValue,
  disabled,
  required,
  size = 'md',
  indeterminate = false,
  children,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId
}: DynCheckboxProps) {
  const checked = value ?? defaultValue ?? false

  const cls = classNames(
    'dyn-checkbox',
    `dyn-checkbox--${size}`,
    disabled && 'dyn-checkbox--disabled',
    checked && 'dyn-checkbox--checked',
    indeterminate && 'dyn-checkbox--indeterminate'
  )

  return (
    <label className={cls} data-testid={dataTestId}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        required={required}
        className="dyn-checkbox__input"
        onChange={(e) => onChange?.(e.target.checked)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
      />
      <span
        className="dyn-checkbox__box"
        aria-hidden="true"
      >
        {checked && !indeterminate && (
          <span className="dyn-checkbox__check">✓</span>
        )}
        {indeterminate && (
          <span className="dyn-checkbox__indeterminate">−</span>
        )}
      </span>
      {children && (
        <span className="dyn-checkbox__label">{children}</span>
      )}
    </label>
  )
}
