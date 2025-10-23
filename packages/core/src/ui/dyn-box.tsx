import type { DynBoxProps } from '../types/components/dyn-box.types'
import { classNames, getSpacingStyles } from '../utils'

export function DynBox({
  as: As = 'div',
  children,
  p,
  m,
  gap,
  className,
  'data-testid': dataTestId,
  ...props
}: DynBoxProps) {
  const cls = classNames('dyn-box', className)
  const styles = getSpacingStyles({ p, m, gap })

  return (
    <As
      className={cls}
      style={styles}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </As>
  )
}