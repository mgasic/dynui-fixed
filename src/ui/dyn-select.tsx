import React, { forwardRef, useState } from 'react';
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
    'data-testid': testId,
    ...props 
  }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value, event);
    };

    return (
      <select
        {...props}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={classNames('dyn-select', disabled && 'dyn-select--disabled', className)}
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