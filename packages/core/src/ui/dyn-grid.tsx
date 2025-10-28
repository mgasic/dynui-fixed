import type { CSSProperties, HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { DynGridProps, DynGridItemProps } from '../types/components/dyn-grid.types'
import { getSpacingStyles, classNames } from '../utils'

function isPositiveNumber(value: number | string | undefined): value is number | string {
  if (value === undefined) return false
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0
  }

  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric > 0
}

function resolveStyle(style: DynGridProps['style']): CSSProperties | undefined {
  if (!style) return undefined
  return style as CSSProperties
}

export const DynGrid = forwardRef<HTMLDivElement, DynGridProps>(
  ({
    columns,
    rows,
    gap,
    children,
    className,
    style,
    'data-testid': testId,
    ...props
  }, ref) => {
    const spacingStyles = getSpacingStyles({
      ...(gap !== undefined ? { gap } : {})
    })

    const gridStyles: CSSProperties = {
      ...spacingStyles,
      ...(columns !== undefined
        ? {
            gridTemplateColumns:
              typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
          }
        : {}),
      ...(rows !== undefined
        ? {
            gridTemplateRows:
              typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows
          }
        : {}),
      ...resolveStyle(style)
    }

    const columnModifier = isPositiveNumber(columns)
      ? `dyn-grid--columns-${columns}`
      : undefined
    const rowModifier = isPositiveNumber(rows)
      ? `dyn-grid--rows-${rows}`
      : undefined

    return (
      <div
        {...props as HTMLAttributes<HTMLDivElement>}
        ref={ref}
        className={classNames(
          'dyn-grid',
          columnModifier,
          rowModifier,
          typeof className === 'string' ? className : undefined
        )}
        style={gridStyles}
        data-testid={testId}
      >
        {children}
      </div>
    )
  }
)

DynGrid.displayName = 'DynGrid'

export const DynGridItem = forwardRef<HTMLDivElement, DynGridItemProps>(
  ({
    colSpan,
    rowSpan,
    children,
    className,
    'data-testid': testId,
    style,
    ...props
  }, ref) => {
    const gridColumn = isPositiveNumber(colSpan)
      ? `span ${colSpan}`
      : undefined
    const gridRow = isPositiveNumber(rowSpan)
      ? `span ${rowSpan}`
      : undefined

    const itemStyle: CSSProperties = {
      ...(gridColumn ? { gridColumn } : {}),
      ...(gridRow ? { gridRow } : {}),
      ...resolveStyle(style as DynGridItemProps['style'])
    }

    return (
      <div
        {...props as HTMLAttributes<HTMLDivElement>}
        ref={ref}
        className={classNames(
          'dyn-grid-item',
          isPositiveNumber(colSpan) ? `dyn-grid-item--col-span-${colSpan}` : undefined,
          isPositiveNumber(rowSpan) ? `dyn-grid-item--row-span-${rowSpan}` : undefined,
          typeof className === 'string' ? className : undefined
        )}
        style={itemStyle}
        data-testid={testId}
      >
        {children}
      </div>
    )
  }
)

DynGridItem.displayName = 'DynGridItem'