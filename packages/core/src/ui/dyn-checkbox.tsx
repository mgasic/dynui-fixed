import type { DynCheckboxProps } from '../types/components/dyn-checkbox.types'
import { classNames } from '../utils'

export function DynCheckbox({
  id,
  checked,
  defaultChecked,
  disabled,
  required,
  indeterminate,
  label,
  size = 'md',
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId
}: DynCheckboxProps) {
  const cls = classNames(
    'dyn-checkbox',
    `dyn-checkbox--${size}`,
    disabled && 'dyn-checkbox--disabled',
    indeterminate && 'dyn-checkbox--indeterminate'
  )

  return (
    <div className="dyn-checkbox-wrapper" data-testid={dataTestId}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        className={cls}
        onChange={(e) => onChange?.(e.target.checked)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      />
      {label && (
        <label htmlFor={id} className="dyn-checkbox__label">
          {label}
        </label>
      )}
    </div>
  )
}