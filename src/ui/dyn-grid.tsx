import { forwardRef } from 'react';
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
    const spacingArgs: { gap?: number | string } = {};
    if (gap !== undefined) spacingArgs.gap = gap;
    
    const spacingStyles = getSpacingStyles(spacingArgs);

    const combinedStyle = {
      ...spacingStyles,
      gridTemplateColumns: columns ? 
        (typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns) : undefined,
      gridTemplateRows: rows && Number(rows) > 0 ? 
        (typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows) : undefined,
      ...style
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-grid',
          columns && Number(columns) > 0 && `dyn-grid--columns-${columns}`,
          rows && Number(rows) > 0 && `dyn-grid--rows-${rows}`,
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
          colSpan && Number(colSpan) > 0 && `dyn-grid-item--col-span-${colSpan}`,
          rowSpan && Number(rowSpan) > 0 && `dyn-grid-item--row-span-${rowSpan}`,
          className
        )}
        style={{
          gridColumn: colSpan && Number(colSpan) > 0 ? `span ${colSpan}` : undefined,
          gridRow: rowSpan && Number(rowSpan) > 0 ? `span ${rowSpan}` : undefined
        }}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynGridItem.displayName = 'DynGridItem';