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
  const spacing = {
    ...(p !== undefined ? { p } : {}),
    ...(m !== undefined ? { m } : {}),
    ...(gap !== undefined ? { gap } : {})
  }
  const spacingStyles = getSpacingStyles(spacing)
  const mergedStyle = {
    ...spacingStyles,
    ...(style as Record<string, unknown> | undefined)
  }

  return (
    <As
      className={cls}
      style={mergedStyle as typeof spacingStyles}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </As>
  )
}