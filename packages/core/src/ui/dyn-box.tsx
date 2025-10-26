import type { ElementType } from 'react'
import type { DynBoxProps } from '../types/components/dyn-box.types'
import { classNames, getSpacingStyles } from '../utils'

export function DynBox<T extends ElementType = 'div'>({
  as,
  children,
  p,
  m,
  gap,
  className,
  style,
  'data-testid': dataTestId,
  ...props
}: DynBoxProps<T>) {
  const As = (as ?? 'div') as ElementType
  const cls = classNames('dyn-box', className)
  const spacingStyles = getSpacingStyles({
    ...(p !== undefined ? { p } : {}),
    ...(m !== undefined ? { m } : {}),
    ...(gap !== undefined ? { gap } : {})
  })

  const combinedStyle = {
    ...spacingStyles,
    ...(style ?? {})
  }

  return (
    <As
      className={cls}
      style={combinedStyle}
      data-testid={dataTestId}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </As>
  )
}