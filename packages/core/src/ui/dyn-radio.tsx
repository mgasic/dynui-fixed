import React, { forwardRef, useMemo } from 'react';
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
          size ? `dyn-radio--${size}` : undefined,
          disabled ? 'dyn-radio--disabled' : undefined,
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
    const orientationValue = orientation ?? 'vertical';
    const { containerRef } = useArrowNavigation({
      orientation: orientationValue,
      selector: 'input[type="radio"]:not(:disabled)'
    });

    const handleChange = (selectedValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(selectedValue, event);
    };

    const groupName = useMemo(
      () => name ?? `radio-group-${Math.random().toString(36).slice(2, 11)}`,
      [name]
    );

    return (
      <div
        {...props}
        ref={ref || (containerRef as React.RefObject<HTMLDivElement>)}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-testid={testId}
        className={classNames(
          'dyn-radio-group',
          `dyn-radio-group--${orientationValue}`,
          disabled ? 'dyn-radio-group--disabled' : undefined,
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<DynRadioProps>(child) && child.type === DynRadio) {
            const childProps: Partial<DynRadioProps> = {
              ...child.props,
              name: groupName,
              disabled: Boolean(disabled || child.props.disabled),
              onChange: handleChange
            };

            if (value !== undefined) {
              childProps.checked = child.props.value === value;
            }

            if (defaultValue !== undefined) {
              childProps.defaultChecked = child.props.value === defaultValue;
            }
            const radioKey = child.key ?? child.props.value ?? index;
            return React.cloneElement(child, {
              ...childProps,
              key: radioKey
            } as Partial<DynRadioProps> & { key: React.Key });
          }
          return child;
        })}
      </div>
    );
  }
);

DynRadioGroup.displayName = 'DynRadioGroup';