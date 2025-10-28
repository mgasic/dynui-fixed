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
  const hasLabel = label !== null && label !== undefined && label !== false
  const cls = classNames(
    'dyn-divider',
    `dyn-divider--${orientation}`,
    `dyn-divider--${variant}`,
    `dyn-divider--${size}`,
    hasLabel ? 'dyn-divider--with-label' : undefined
  )

  return (
    <div
      className={cls}
      role="separator"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {hasLabel && (
        <span className="dyn-divider__label">{label}</span>
      )}
    </div>
  )
}