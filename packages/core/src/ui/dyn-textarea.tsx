import { forwardRef } from 'react'
import type { DynTextAreaProps } from '../types/components/dyn-textarea.types'
import { useControlled } from '../hooks/use-controlled'
import type { UseControlledOptions } from '../hooks/use-controlled'
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
    const controlledOptions: UseControlledOptions<string> = {
      ...(typeof value === 'string' ? { value } : {}),
      defaultValue: typeof defaultValue === 'string' ? defaultValue : '',
      ...(onChange ? { onChange: (newValue) => onChange(newValue) } : {})
    }

    const { value: currentValue, setValue } = useControlled(controlledOptions)

    const textareaClasses = classNames(
      'dyn-textarea',
      `dyn-textarea--${size}`,
      `dyn-textarea--${variant}`,
      `dyn-textarea--resize-${resize}`,
      disabled ? 'dyn-textarea--disabled' : undefined,
      readonly ? 'dyn-textarea--readonly' : undefined,
      required ? 'dyn-textarea--required' : undefined
    )

    const wrapperClasses = classNames(
      'dyn-textarea-wrapper',
      dataState ? `dyn-textarea-wrapper--${dataState}` : undefined
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
          aria-required={required ? 'true' : undefined}
        />
      </div>
    )
  }
)

DynTextArea.displayName = 'DynTextArea'
