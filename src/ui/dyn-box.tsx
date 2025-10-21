import type { DynBoxProps } from '../types/components/dyn-box.types'
import { classNames, getSpacingStyles } from '../utils'

export function DynBox({
  as: As = 'div',
  children,
  gap,
  p,
  m,
  align,
  justify,
  direction,
  wrap,
  'data-testid': dataTestId
}: DynBoxProps) {
  const cls = classNames(
    'dyn-box',
    gap && `dyn-box--gap-${gap}`,
    p && `dyn-box--p-${p}`,
    m && `dyn-box--m-${m}`,
    align && `dyn-box--align-${align}`,
    justify && `dyn-box--justify-${justify}`,
    direction && `dyn-box--direction-${direction}`,
    wrap && `dyn-box--wrap-${wrap}`
  )

  const styles = getSpacingStyles({ p, m, gap })

  return (
    <As className={cls} style={styles} data-testid={dataTestId}>
      {children}
    </As>
  )
}
