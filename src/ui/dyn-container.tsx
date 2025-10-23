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
    // Fix exactOptionalPropertyTypes by explicit conversion
    const spacingStyles = getSpacingStyles({ 
      p: p !== undefined ? (typeof p === 'string' ? p : `${p}px`) : undefined, 
      m: m !== undefined ? (typeof m === 'string' ? m : `${m}px`) : undefined
    });

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