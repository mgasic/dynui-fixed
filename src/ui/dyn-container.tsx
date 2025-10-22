import React, { forwardRef } from 'react';
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
    // Fix exactOptionalPropertyTypes by explicit undefined handling
    const spacingStyles = getSpacingStyles({ 
      p: p !== undefined ? p : undefined, 
      m: m !== undefined ? m : undefined 
    });

    const combinedStyle = {
      ...spacingStyles,
      maxWidth: maxWidth !== undefined ? maxWidth : undefined,
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