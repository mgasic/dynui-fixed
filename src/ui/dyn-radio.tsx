import { useId } from 'react'
import type { DynRadioGroupProps, DynRadioProps, RadioOption } from '../types/components/dyn-radio.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { classNames } from '../utils'

export function DynRadioGroup({
  id,
  name,
  value,
  defaultValue,
  disabled,
  required,
  options = [],
  orientation = 'vertical',
  size = 'md',
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId
}: DynRadioGroupProps) {
  const groupId = useId()
  const groupName = name || groupId

  const { containerRef } = useArrowNavigation({
    orientation: orientation === 'horizontal' ? 'horizontal' : 'vertical',
    selector: 'input[type="radio"]:not([disabled])'
  })

  const cls = classNames(
    'dyn-radio-group',
    `dyn-radio-group--${orientation}`,
    `dyn-radio-group--${size}`,
    disabled && 'dyn-radio-group--disabled'
  )

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      className={cls}
      data-testid={dataTestId}
    >
      {options.map((option) => (
        <DynRadio
          key={option.value}
          id={`${groupName}-${option.value}`}
          name={groupName}
          value={option.value}
          defaultValue={defaultValue}
          disabled={disabled || option.disabled}
          required={required}
          size={size}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {option.label}
        </DynRadio>
      ))}
    </div>
  )
}

export function DynRadio({
  id,
  name,
  value: radioValue,
  defaultValue,
  disabled,
  required,
  size = 'md',
  children,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId
}: DynRadioProps) {
  const checked = defaultValue === radioValue

  const cls = classNames(
    'dyn-radio',
    `dyn-radio--${size}`,
    disabled && 'dyn-radio--disabled',
    checked && 'dyn-radio--checked'
  )

  return (
    <label className={cls} data-testid={dataTestId}>
      <input
        type="radio"
        id={id}
        name={name}
        value={radioValue}
        checked={checked}
        disabled={disabled}
        required={required}
        className="dyn-radio__input"
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
      />
      <span className="dyn-radio__indicator" aria-hidden="true" />
      {children && (
        <span className="dyn-radio__label">{children}</span>
      )}
    </label>
  )
}
