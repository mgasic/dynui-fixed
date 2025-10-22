import type { DynGridProps, DynGridItemProps } from '../types/components/dyn-grid.types'
import { classNames, getSpacingStyles } from '../utils'

export function DynGrid({
  as: As = 'div',
  children,
  cols = 12,
  rows,
  gap,
  gapX,
  gapY,
  'data-testid': dataTestId
}: DynGridProps) {
  const cls = classNames(
    'dyn-grid',
    `dyn-grid--cols-${cols}`,
    rows && `dyn-grid--rows-${rows}`,
    gap && `dyn-grid--gap-${gap}`,
    gapX && `dyn-grid--gap-x-${gapX}`,
    gapY && `dyn-grid--gap-y-${gapY}`
  )

  const styles = getSpacingStyles({ gap })

  return (
    <As 
      className={cls} 
      style={{
        ...styles,
        '--grid-cols': cols,
        '--grid-rows': rows
      }} 
      data-testid={dataTestId}
    >
      {children}
    </As>
  )
}

export function DynGridItem({
  as: As = 'div',
  children,
  colSpan = 1,
  rowSpan = 1,
  colStart,
  rowStart,
  'data-testid': dataTestId
}: DynGridItemProps) {
  const cls = classNames(
    'dyn-grid-item',
    colSpan && `dyn-grid-item--col-span-${colSpan}`,
    rowSpan && `dyn-grid-item--row-span-${rowSpan}`,
    colStart && `dyn-grid-item--col-start-${colStart}`,
    rowStart && `dyn-grid-item--row-start-${rowStart}`
  )

  return (
    <As 
      className={cls}
      style={{
        '--col-span': typeof colSpan === 'number' ? colSpan : undefined,
        '--row-span': rowSpan,
        '--col-start': colStart,
        '--row-start': rowStart
      }}
      data-testid={dataTestId}
    >
      {children}
    </As>
  )
}
