import type { DynDividerProps } from '../types/components/dyn-divider.types'
import { classNames } from '../utils'

export function DynDivider({
  as: As = 'hr',
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  color = 'neutral',
  'aria-orientation': ariaOrientation,
  'data-testid': dataTestId
}: DynDividerProps) {
  const cls = classNames(
    'dyn-divider',
    `dyn-divider--${orientation}`,
    `dyn-divider--${variant}`,
    `dyn-divider--${thickness}`,
    `dyn-divider--${color}`
  )

  return (
    <As
      role="separator"
      aria-orientation={ariaOrientation || orientation}
      className={cls}
      data-testid={dataTestId}
    />
  )
}
