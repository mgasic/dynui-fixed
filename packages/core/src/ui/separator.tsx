import React from 'react';

/**
 * Props for the Separator component
 */
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Test identifier for the separator
   */
  'data-testid'?: string;
}

/**
 * A semantic separator component that creates visual and logical separation
 * between content sections. Compliant with WAI-ARIA accessibility standards.
 * 
 * @example
 * ```tsx
 * <Separator className="my-separator" />
 * <Separator data-testid="menu-separator" />
 * ```
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, 'data-testid': testId, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={className}
      data-testid={testId}
      aria-hidden="true"
      {...props}
    />
  )
);

Separator.displayName = 'Separator';