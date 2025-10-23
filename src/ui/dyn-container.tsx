import { forwardRef } from 'react';
import type { DynContainerProps } from '../types/components/dyn-container.types';
import { getSpacingStyles, classNames } from '../utils';

export const DynContainer = forwardRef<HTMLDivElement, DynContainerProps>(
  ({ 
    maxWidth,
    p, 
    m,
    children,
    className,
    style,
    'data-testid': testId,
    ...props 
  }, ref) => {
    // Filter out undefined values for exactOptionalPropertyTypes
    const spacingArgs: { p?: number | string; m?: number | string } = {};
    if (p !== undefined) spacingArgs.p = p;
    if (m !== undefined) spacingArgs.m = m;
    
    const spacingStyles = getSpacingStyles(spacingArgs);

    const combinedStyle = {
      ...spacingStyles,
      maxWidth: maxWidth !== undefined ? 
        (typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`) : undefined,
      ...style
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('dyn-container', className)}
        style={combinedStyle}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynContainer.displayName = 'DynContainer';