import React, { forwardRef } from 'react';
import type { DynFieldContainerProps } from '../types/components/dyn-field-container.types';
import { classNames } from '../utils';

export const DynFieldContainer = forwardRef<HTMLDivElement, DynFieldContainerProps>(
  ({ 
    label,
    error,
    helpText,
    required = false,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const fieldId = `field-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${fieldId}-error` : undefined;
    const helpId = helpText ? `${fieldId}-help` : undefined;

    // Fix callable children type issue
    const renderChildren = () => {
      if (typeof children === 'function') {
        return children({
          id: fieldId,
          'aria-describedby': [errorId, helpId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': !!error
        });
      }
      return children;
    };

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'dyn-field-container',
          error && 'dyn-field-container--error',
          className
        )}
        data-testid={testId}
      >
        {label && (
          <label htmlFor={fieldId} className="dyn-field-container__label">
            {label}
            {required && <span className="dyn-field-container__required">*</span>}
          </label>
        )}
        <div className="dyn-field-container__input">
          {renderChildren()}
        </div>
        {error && (
          <div id={errorId} className="dyn-field-container__error">
            {error}
          </div>
        )}
        {helpText && (
          <div id={helpId} className="dyn-field-container__help">
            {helpText}
          </div>
        )}
      </div>
    );
  }
);

DynFieldContainer.displayName = 'DynFieldContainer';