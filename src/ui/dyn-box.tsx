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
    // Fix exactOptionalPropertyTypes by explicit conversion
    const spacingStyles = getSpacingStyles({ 
      p: p !== undefined ? (typeof p === 'string' ? p : `${p}px`) : undefined, 
      m: m !== undefined ? (typeof m === 'string' ? m : `${m}px`) : undefined, 
      gap: gap !== undefined ? (typeof gap === 'string' ? gap : `${gap}px`) : undefined
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