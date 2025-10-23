import { forwardRef } from 'react';
import type { DynSelectProps, DynSelectOptionProps } from '../types/components/dyn-select.types';
import { classNames } from '../utils';

export const DynSelect = forwardRef<HTMLSelectElement, DynSelectProps>(
  ({ 
    value,
    defaultValue,
    placeholder,
    disabled = false,
    options = [],
    children,
    className,
    onChange,
    size,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
    };

    // Omit size to avoid HTML attribute conflict
    const { size: _, ...selectProps } = props as any;

    return (
      <select
        {...selectProps}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={classNames(
          'dyn-select', 
          size && `dyn-select--${size}`,
          disabled && 'dyn-select--disabled', 
          className
        )}
        onChange={handleChange}
        data-testid={testId}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
        {children}
      </select>
    );
  }
);

DynSelect.displayName = 'DynSelect';

export const DynSelectOption = forwardRef<HTMLOptionElement, DynSelectOptionProps>(
  ({ children, value, disabled = false, ...props }, ref) => (
    <option {...props} ref={ref} value={value} disabled={disabled}>
      {children}
    </option>
  )
);

DynSelectOption.displayName = 'DynSelectOption';