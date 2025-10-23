import type { DynInputProps } from '../types/components/dyn-input.types'
import { classNames } from '../utils'

export function DynInput({
  as: As = 'input',
  type = 'text',
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
  startIcon,
  endIcon,
  prefix,
  suffix,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId,
  'data-state': dataState
}: DynInputProps) {
  const cls = classNames(
    'dyn-input',
    `dyn-input--${size}`,
    `dyn-input--${variant}`,
    disabled && 'dyn-input--disabled',
    readonly && 'dyn-input--readonly'
  )

  return (
    <div className={classNames('dyn-input-wrapper', dataState && `dyn-input--${dataState}`)} data-testid={dataTestId}>
      {startIcon && <div className="dyn-input__start-icon">{startIcon}</div>}
      {prefix && <div className="dyn-input__prefix">{prefix}</div>}
      <As
        type={type}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        readOnly={readonly}
        className={cls}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
      />
      {suffix && <div className="dyn-input__suffix">{suffix}</div>}
      {endIcon && <div className="dyn-input__end-icon">{endIcon}</div>}
    </div>
  )
}