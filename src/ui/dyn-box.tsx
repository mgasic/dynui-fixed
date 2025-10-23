import { forwardRef } from 'react';
import type { DynBoxProps } from '../types/components/dyn-box.types';
import { getSpacingStyles, classNames } from '../utils';

export const DynBox = forwardRef<HTMLDivElement, DynBoxProps>(
  ({ 
    p, 
    m, 
    gap,
    children,
    className,
    style,
    'data-testid': testId,
    ...props 
  }, ref) => {
    // Filter out undefined values for exactOptionalPropertyTypes
    const spacingArgs: { p?: number | string; m?: number | string; gap?: number | string } = {};
    if (p !== undefined) spacingArgs.p = p;
    if (m !== undefined) spacingArgs.m = m;
    if (gap !== undefined) spacingArgs.gap = gap;
    
    const spacingStyles = getSpacingStyles(spacingArgs);

    const combinedStyle = {
      ...spacingStyles,
      ...style
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('dyn-box', className)}
        style={combinedStyle}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynBox.displayName = 'DynBox';