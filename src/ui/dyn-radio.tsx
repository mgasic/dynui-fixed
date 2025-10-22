import React, { forwardRef } from 'react';
import type { DynRadioGroupProps, DynRadioProps } from '../types/components/dyn-radio.types';
import { useArrowNavigation } from '../hooks/use-arrow-navigation';
import { classNames } from '../utils';

export const DynRadio = forwardRef<HTMLInputElement, DynRadioProps>(
  ({
    value,
    name,
    checked,
    defaultChecked,
    disabled = false,
    children,
    className,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': testId,
    size,
    ...props
  }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(event.target.value, event);
    };

    // Omit size to avoid HTML input size conflict
    const { size: _, ...inputProps } = props as any;

    return (
      <label 
        className={classNames(
          'dyn-radio',
          size && `dyn-radio--${size}`,
          disabled && 'dyn-radio--disabled',
          className
        )}
      >
        <input
          {...inputProps}
          ref={ref}
          type="radio"
          value={value}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          data-testid={testId}
          className="dyn-radio__input"
        />
        <span className="dyn-radio__indicator" />
        {children && (
          <span className="dyn-radio__label">
            {children}
          </span>
        )}
      </label>
    );
  }
);

DynRadio.displayName = 'DynRadio';

export const DynRadioGroup = forwardRef<HTMLDivElement, DynRadioGroupProps>(
  ({
    value,
    defaultValue,
    name,
    disabled = false,
    orientation = 'vertical',
    children,
    className,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'data-testid': testId,
    ...props
  }, ref) => {
    const { containerRef } = useArrowNavigation({
      orientation,
      selector: 'input[type="radio"]:not(:disabled)',
      typeahead: false
    });

    const handleChange = (selectedValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(selectedValue, event);
    };

    return (
      <div
        {...props}
        ref={ref || containerRef}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-testid={testId}
        className={classNames(
          'dyn-radio-group',
          `dyn-radio-group--${orientation}`,
          disabled && 'dyn-radio-group--disabled',
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<DynRadioProps>(child) && child.type === DynRadio) {
            return React.cloneElement(child, {
              name: name || `radio-group-${Math.random().toString(36).substr(2, 9)}`,
              checked: value !== undefined ? child.props.value === value : undefined,
              defaultChecked: defaultValue !== undefined && child.props.value === defaultValue,
              disabled: disabled || child.props.disabled,
              onChange: handleChange,
              key: child.props.value || index
            } as Partial<DynRadioProps>);
          }
          return child;
        })}
      </div>
    );
  }
);

DynRadioGroup.displayName = 'DynRadioGroup';