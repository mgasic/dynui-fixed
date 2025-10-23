import type { DynContainerProps } from '../types/components/dyn-container.types'
import { classNames } from '../utils'

export function DynContainer({
  as: As = 'div',
  children,
  maxWidth = 'lg',
  centered = true,
  fluid = false,
  className,
  'data-testid': dataTestId,
  ...props
}: DynContainerProps) {
  const cls = classNames(
    'dyn-container',
    !fluid && `dyn-container--max-${maxWidth}`,
    centered && 'dyn-container--centered',
    fluid && 'dyn-container--fluid',
    className
  )

  return (
    <As
      className={cls}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </As>
  )
}