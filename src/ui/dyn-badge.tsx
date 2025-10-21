import type { DynBadgeProps } from '../types/components/dyn-badge.types'
import { classNames } from '../utils'

export function DynBadge({
  children,
  variant = 'solid',
  size = 'md',
  color = 'neutral',
  'aria-label': ariaLabel,
  'data-testid': dataTestId
}: DynBadgeProps) {
  const cls = classNames(
    'dyn-badge',
    `dyn-badge--${variant}`,
    `dyn-badge--${size}`,
    `dyn-badge--${color}`
  )

  return (
    <span className={cls} aria-label={ariaLabel} data-testid={dataTestId}>
      {children}
    </span>
  )
}
