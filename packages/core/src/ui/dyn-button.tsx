import type { DynButtonProps } from '../types/components/dyn-button.types'
import { classNames } from '../utils'

export function DynButton({
  as: As = 'button',
  children,
  variant = 'solid',
  size = 'md',
  color = 'neutral',
  disabled,
  loading,
  onClick,
  onFocus,
  onBlur,
  startIcon,
  endIcon,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId,
  'data-state': dataState
}: DynButtonProps) {
  const cls = classNames(
    'dyn-button',
    `dyn-button--${variant}`,
    `dyn-button--${size}`,
    `dyn-button--${color}`,
    disabled && 'dyn-button--disabled',
    loading && 'dyn-button--loading',
    dataState && `dyn-button--${dataState}`
  )

  return (
    <As
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      data-testid={dataTestId}
    >
      {startIcon && <span className="dyn-button__start-icon">{startIcon}</span>}
      {children}
      {loading && <span className="dyn-button__loader" aria-hidden="true">Loading...</span>}
      {endIcon && <span className="dyn-button__end-icon">{endIcon}</span>}
    </As>
  )
}