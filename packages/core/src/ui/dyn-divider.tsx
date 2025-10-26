import type { DynDividerProps } from '../types/components/dyn-divider.types'
import { classNames } from '../utils'

export function DynDivider({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  label,
  'aria-label': ariaLabel,
  'data-testid': dataTestId
}: DynDividerProps) {
  const cls = classNames(
    'dyn-divider',
    `dyn-divider--${orientation}`,
    `dyn-divider--${variant}`,
    `dyn-divider--${size}`,
    label ? 'dyn-divider--with-label' : undefined
  )

  return (
    <div
      className={cls}
      role="separator"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {label && (
        <span className="dyn-divider__label">{label}</span>
      )}
    </div>
  )
}