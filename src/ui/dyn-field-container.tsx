import { useId } from 'react'
import type { DynFieldContainerProps } from '../types/components/dyn-field-container.types'
import { classNames } from '../utils'

export function DynFieldContainer({
  as: As = 'div',
  children,
  label,
  description,
  error,
  required = false,
  disabled = false,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestId
}: DynFieldContainerProps) {
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()

  const cls = classNames(
    'dyn-field-container',
    required && 'dyn-field-container--required',
    disabled && 'dyn-field-container--disabled',
    error && 'dyn-field-container--error'
  )

  const describedBy = [
    ariaDescribedby,
    description && descriptionId,
    error && errorId
  ].filter(Boolean).join(' ') || undefined

  return (
    <As className={cls} data-testid={dataTestId}>
      {label && (
        <label 
          id={labelId}
          className="dyn-field-container__label"
          aria-labelledby={ariaLabelledby}
        >
          {label}
          {required && (
            <span className="dyn-field-container__required" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      <div className="dyn-field-container__control">
        {typeof children === 'function' 
          ? children({
              'aria-labelledby': label ? labelId : ariaLabelledby,
              'aria-describedby': describedBy,
              'aria-invalid': !!error,
              disabled
            })
          : children
        }
      </div>
      
      {description && (
        <div 
          id={descriptionId}
          className="dyn-field-container__description"
        >
          {description}
        </div>
      )}
      
      {error && (
        <div 
          id={errorId}
          className="dyn-field-container__error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </As>
  )
}
