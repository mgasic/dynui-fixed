import React, { forwardRef } from 'react';
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
    const spacingStyles = getSpacingStyles({ 
      gap: gap !== undefined ? gap : undefined 
    });

    const combinedStyle = {
      ...spacingStyles,
      gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined,
      gridTemplateRows: rows && rows > 0 ? `repeat(${rows}, 1fr)` : undefined,
      ...style
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-grid',
          columns && `dyn-grid--columns-${columns}`,
          rows && rows > 0 && `dyn-grid--rows-${rows}`, // Prevent 0 from being string
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
          colSpan && colSpan > 0 && `dyn-grid-item--col-span-${colSpan}`,
          rowSpan && rowSpan > 0 && `dyn-grid-item--row-span-${rowSpan}`, // Prevent 0 from being string
          className
        )}
        style={{
          gridColumn: colSpan ? `span ${colSpan}` : undefined,
          gridRow: rowSpan ? `span ${rowSpan}` : undefined
        }}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynGridItem.displayName = 'DynGridItem';