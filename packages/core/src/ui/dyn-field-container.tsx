import React, { useId } from 'react'
import { cn } from '../utils/classNames'
import type { Size } from '../types/common.types'

interface DynFieldContainerProps {
  /** Label text for the field */
  label?: string
  /** Optional description/help text */
  description?: string
  /** Error message(s) to display */
  error?: string | string[]
  /** Warning message */
  warning?: string
  /** Success message */
  success?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Size variant */
  size?: Size
  /** Custom className */
  className?: string
  /** Field content */
  children: React.ReactNode
  /** For accessibility - custom describedBy IDs */
  'aria-describedby'?: string
  /** Test identifier */
  'data-testid'?: string
}

export function DynFieldContainer({
  label,
  description,
  error,
  warning,
  success,
  required = false,
  disabled = false,
  size = 'md',
  className,
  children,
  'aria-describedby': customDescribedBy,
  'data-testid': dataTestId,
}: DynFieldContainerProps) {
  const fieldId = useId()
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()
  const warningId = useId()
  const successId = useId()

  // Determine field state
  const hasError = Boolean(error)
  const hasWarning = Boolean(warning && !hasError)
  const hasSuccess = Boolean(success && !hasError && !hasWarning)

  // Build describedBy string
  const describedByIds = [
    description && descriptionId,
    hasError && errorId,
    hasWarning && warningId,
    hasSuccess && successId,
    customDescribedBy,
  ].filter(Boolean).join(' ')

  // Get field state for styling
  const getFieldState = () => {
    if (hasError) return 'error'
    if (hasWarning) return 'warning'
    if (hasSuccess) return 'success'
    return 'default'
  }

  // Normalize error to array
  const errorMessages = Array.isArray(error) ? error : error ? [error] : []

  // Clone children to add necessary props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps: any = {
        id: fieldId,
        'aria-labelledby': label ? labelId : undefined,
        'aria-describedby': describedByIds || undefined,
        'aria-invalid': hasError || undefined,
        'aria-required': required || undefined,
        disabled: disabled || child.props.disabled,
      }

      return React.cloneElement(child, childProps)
    }
    return child
  })

  return (
    <div
      className={cn(
        'dyn-field-container',
        `dyn-field-container--${size}`,
        `dyn-field-container--${getFieldState()}`,
        disabled && 'dyn-field-container--disabled',
        className
      )}
      data-testid={dataTestId}
    >
      {/* Label */}
      {label && (
        <label
          id={labelId}
          htmlFor={fieldId}
          className={cn(
            'dyn-field-container__label',
            required && 'dyn-field-container__label--required'
          )}
        >
          {label}
          {required && (
            <span 
              className="dyn-field-container__required-indicator"
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* Description */}
      {description && (
        <div
          id={descriptionId}
          className="dyn-field-container__description"
        >
          {description}
        </div>
      )}

      {/* Field content */}
      <div className="dyn-field-container__field">
        {enhancedChildren}
      </div>

      {/* Error messages */}
      {hasError && (
        <div
          id={errorId}
          className="dyn-field-container__error"
          role="alert"
          aria-live="polite"
        >
          {errorMessages.map((errorMsg, index) => (
            <div key={index} className="dyn-field-container__error-message">
              <svg
                className="dyn-field-container__error-icon"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7.25 4.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zM8 11.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Warning message */}
      {hasWarning && (
        <div
          id={warningId}
          className="dyn-field-container__warning"
          role="alert"
          aria-live="polite"
        >
          <svg
            className="dyn-field-container__warning-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              clipRule="evenodd"
            />
          </svg>
          <span>{warning}</span>
        </div>
      )}

      {/* Success message */}
      {hasSuccess && (
        <div
          id={successId}
          className="dyn-field-container__success"
          role="status"
          aria-live="polite"
        >
          <svg
            className="dyn-field-container__success-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}
    </div>
  )
}

// Export types for external use
export type { DynFieldContainerProps }