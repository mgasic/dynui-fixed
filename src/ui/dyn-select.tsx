import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { DynSelectProps, DynSelectOptionProps, SelectOption } from '../types/components/dyn-select.types';
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
    searchable = false,
    searchValue,
    defaultSearchValue = '',
    onSearchChange,
    searchPlaceholder = 'Filter options',
    searchAriaLabel,
    filterOptions,
    'data-testid': testId,
    ...props
  }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
    };

    // Omit size to avoid HTML attribute conflict
    const { size: _, ...selectProps } = props as any;

    const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue);
    const isSearchControlled = searchValue !== undefined;
    const currentSearchValue = isSearchControlled ? searchValue : internalSearchValue;

    useEffect(() => {
      if (!isSearchControlled) {
        setInternalSearchValue(defaultSearchValue);
      }
    }, [defaultSearchValue, isSearchControlled]);

    const defaultFilter = (option: SelectOption, search: string) =>
      option.label.toLowerCase().includes(search.toLowerCase());

    const filteredOptions = useMemo(() => {
      if (!searchable || !currentSearchValue) {
        return options;
      }

      const filterFn = filterOptions ?? defaultFilter;
      return options.filter((option) => filterFn(option, currentSearchValue));
    }, [filterOptions, options, currentSearchValue, searchable]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      if (!isSearchControlled) {
        setInternalSearchValue(nextValue);
      }

      onSearchChange?.(nextValue);
    };

    const searchInputAriaLabel = searchAriaLabel ?? searchPlaceholder ?? 'Filter options';

    return (
      <>
        {searchable && (
          <input
            type="search"
            role="searchbox"
            value={currentSearchValue}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            aria-label={searchInputAriaLabel}
            aria-controls={typeof selectProps.id === 'string' ? selectProps.id : undefined}
            className="dyn-select__search-input"
            data-testid={testId ? `${testId}-search` : undefined}
          />
        )}
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
            className,
            searchable && 'dyn-select--searchable'
          )}
          onChange={handleChange}
          data-testid={testId}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {filteredOptions.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
      </>
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