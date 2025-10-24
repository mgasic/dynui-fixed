import { forwardRef } from 'react'
import type { DynTextAreaProps } from '../types/components/dyn-textarea.types'
import { useControlled } from '../hooks/use-controlled'
import { classNames } from '../utils'

/**
 * DynTextArea - Multi-line text input component
 */
export const DynTextArea = forwardRef<HTMLTextAreaElement, DynTextAreaProps>(
  (
    {
      id,
      name,
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      readonly = false,
      placeholder,
      rows = 3,
      cols,
      resize = 'vertical',
      size = 'md',
      variant = 'outline',
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'data-testid': dataTestId,
      'data-state': dataState
    },
    ref
  ) => {
    const { value: currentValue, setValue } = useControlled({ value, defaultValue, onChange })

    const textareaClasses = classNames(
      'dyn-textarea',
      `dyn-textarea--${size}`,
      `dyn-textarea--${variant}`,
      `dyn-textarea--resize-${resize}`,
      disabled && 'dyn-textarea--disabled',
      readonly && 'dyn-textarea--readonly',
      required && 'dyn-textarea--required'
    )

    const wrapperClasses = classNames(
      'dyn-textarea-wrapper',
      dataState && `dyn-textarea-wrapper--${dataState}`
    )

    return (
      <div className={wrapperClasses} data-testid={dataTestId}>
        <textarea
          ref={ref}
          id={id}
          name={name}
          value={currentValue ?? ''}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          disabled={disabled}
          required={required}
          readOnly={readonly}
          className={textareaClasses}
          onChange={(e) => setValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-invalid={dataState === 'error' ? 'true' : undefined}
        />
      </div>
    )
  }
)

DynTextArea.displayName = 'DynTextArea'
