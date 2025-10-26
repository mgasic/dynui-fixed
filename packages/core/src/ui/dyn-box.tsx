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
  const spacingStyles = getSpacingStyles({
    ...(p !== undefined ? { p } : {}),
    ...(m !== undefined ? { m } : {}),
    ...(gap !== undefined ? { gap } : {})
  })

  return (
    <As
      className={cls}
      style={spacingStyles}
      data-testid={dataTestId}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </As>
  )
}