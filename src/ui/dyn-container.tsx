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
    const spacingClasses: Array<string | undefined> = [];

    if (typeof p === 'string' && SPACING_CLASS_VALUES.has(p)) {
      spacingClasses.push(`dyn-container--p-${p}`);
    } else if (p !== undefined) {
      spacingArgs.p = p;
    }

    if (typeof m === 'string' && SPACING_CLASS_VALUES.has(m)) {
      spacingClasses.push(`dyn-container--m-${m}`);
    } else if (m !== undefined) {
      spacingArgs.m = m;
    }

    const inlineStyles = Object.keys(spacingArgs).length
      ? getSpacingStyles(spacingArgs)
      : {};

    const shouldInlineMaxWidth =
      !fluid &&
      maxWidth !== undefined &&
      !(typeof maxWidth === 'string' && MAX_WIDTH_CLASS_VALUES.has(maxWidth));

    const maxWidthClass =
      !fluid &&
      typeof maxWidth === 'string' &&
      MAX_WIDTH_CLASS_VALUES.has(maxWidth)
        ? `dyn-container--max-${maxWidth}`
        : undefined;

    if (shouldInlineMaxWidth) {
      inlineStyles.maxWidth =
        typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    }

    const mergedStyle = style
      ? { ...inlineStyles, ...style }
      : Object.keys(inlineStyles).length ? inlineStyles : undefined;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-container',
          size && SIZE_CLASS_VALUES.has(size) ? `dyn-container--${size}` : undefined,
          maxWidthClass,
          fluid && 'dyn-container--fluid',
          ...spacingClasses,
          className
        )}
        style={mergedStyle}
        data-testid={testId}
      >
        {children}
      </div>
    );
  }
);

DynContainer.displayName = 'DynContainer';