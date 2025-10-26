import { cloneElement, forwardRef, isValidElement, useId } from 'react';
import type { DynFieldContainerProps } from '../types/components/dyn-field-container.types';
import { classNames } from '../utils';

export const DynFieldContainer = forwardRef<HTMLDivElement, DynFieldContainerProps>(
  ({ 
    label,
    error,
    description,
    required = false,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const fallbackInputId = `dyn-field-${generatedId}`;
    const isRenderPropChild = typeof children === 'function';
    const childElement = !isRenderPropChild && isValidElement(children) ? children : undefined;
    const inputId = (childElement?.props as { id?: string })?.id ?? fallbackInputId;
    const labelId = label ? `${inputId}-label` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const descriptionId = description ? `${inputId}-description` : undefined;

    const combineIds = (
      ...values: Array<string | undefined>
    ) => values.filter(Boolean).join(' ') || undefined;

    const ariaDescribedBy = combineIds(errorId, descriptionId);

    const renderChildren = () => {
      if (isRenderPropChild) {
        return (children as (args: {
          id: string;
          inputId: string;
          descriptionId?: string;
          errorId?: string;
          'aria-describedby'?: string;
          'aria-labelledby'?: string;
          'aria-invalid'?: boolean;
        })
        )({
          id: inputId,
          inputId,
          descriptionId,
          errorId,
          'aria-describedby': ariaDescribedBy,
          'aria-labelledby': labelId,
          'aria-invalid': !!error
        });
      }

      if (childElement) {
        const existingDescribedBy = (childElement.props as { 'aria-describedby'?: string })[
          'aria-describedby'
        ];
        const existingLabelledBy = (childElement.props as { 'aria-labelledby'?: string })[
          'aria-labelledby'
        ];

        return cloneElement(childElement, {
          id: (childElement.props as { id?: string }).id ?? inputId,
          'aria-describedby': combineIds(existingDescribedBy, ariaDescribedBy),
          'aria-labelledby': combineIds(existingLabelledBy, labelId),
          'aria-invalid':
            (childElement.props as { 'aria-invalid'?: boolean })['aria-invalid'] ??
            (error ? true : undefined)
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
          <label
            id={labelId}
            htmlFor={inputId}
            className="dyn-field-container__label"
          >
            {label}
            {required && (
              <span
                className="dyn-field-container__required"
                aria-label="required"
              >
                *
              </span>
            )}
          </label>
        )}
        <div className="dyn-field-container__input">
          {renderChildren()}
        </div>
        {error && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className="dyn-field-container__error"
          >
            {error}
          </div>
        )}
        {description && (
          <div id={descriptionId} className="dyn-field-container__help">
            {description}
          </div>
        )}
      </div>
    );
  }
);

DynFieldContainer.displayName = 'DynFieldContainer';