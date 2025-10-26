import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { DynGridProps, DynGridItemProps } from '../types/components/dyn-grid.types';
import { getSpacingStyles, classNames } from '../utils';

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
    // Filter out undefined values for exactOptionalPropertyTypes
    const spacingStyles = getSpacingStyles(gap !== undefined ? { gap } : {});

    const combinedStyle: CSSProperties = {
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
      ...(style ?? {})
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-grid',
          columns !== undefined && columns !== null && Number(columns) > 0
            ? `dyn-grid--columns-${columns}`
            : undefined,
          rows !== undefined && rows !== null && Number(rows) > 0
            ? `dyn-grid--rows-${rows}`
            : undefined,
          className
        )}
        style={combinedStyle}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynGrid.displayName = 'DynGrid';

export const DynGridItem = forwardRef<HTMLDivElement, DynGridItemProps>(
  ({ 
    colSpan,
    rowSpan,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-grid-item',
          colSpan !== undefined && colSpan !== null && Number(colSpan) > 0
            ? `dyn-grid-item--col-span-${colSpan}`
            : undefined,
          rowSpan !== undefined && rowSpan !== null && Number(rowSpan) > 0
            ? `dyn-grid-item--row-span-${rowSpan}`
            : undefined,
          className
        )}
        style={{
          ...(colSpan !== undefined && colSpan !== null && Number(colSpan) > 0
            ? { gridColumn: `span ${colSpan}` }
            : {}),
          ...(rowSpan !== undefined && rowSpan !== null && Number(rowSpan) > 0
            ? { gridRow: `span ${rowSpan}` }
            : {}),
          ...(props.style as CSSProperties | undefined)
        }}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynGridItem.displayName = 'DynGridItem';