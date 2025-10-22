import React, { forwardRef } from 'react';
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
    // Proper initialization of spacing props
    const spacingStyles = getSpacingStyles({ 
      p: p ?? undefined, 
      m: m ?? undefined, 
      gap: gap ?? undefined 
    });

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