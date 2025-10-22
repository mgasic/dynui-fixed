import type { DynContainerProps } from '../types/components/dyn-container.types'
import { classNames, getSpacingStyles } from '../utils'

export function DynContainer({
  as: As = 'div',
  children,
  size = 'lg',
  maxWidth,
  centered = true,
  p,
  m,
  fluid = false,
  'data-testid': dataTestId
}: DynContainerProps) {
  const cls = classNames(
    'dyn-container',
    `dyn-container--${size}`,
    maxWidth && `dyn-container--max-${maxWidth}`,
    centered && 'dyn-container--centered',
    fluid && 'dyn-container--fluid',
    p && `dyn-container--p-${p}`,
    m && `dyn-container--m-${m}`
  )

  const styles = getSpacingStyles({ p, m })

  return (
    <As className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </As>
  )
}
