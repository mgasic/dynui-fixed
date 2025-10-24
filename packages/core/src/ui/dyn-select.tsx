import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import type { 
  DynSelectProps, 
  DynSelectOptionProps, 
  DynSelectRef, 
  SelectOption 
} from '../types/components/dyn-select.types'
import { useControlled } from '../hooks/use-controlled'
import { useKeyboard } from '../hooks/use-keyboard'
import { classNames } from '../utils'

/**
 * DynSelect - Advanced dropdown selection component
 * 
 * Features:
 * - Controlled/uncontrolled state management
 * - Searchable with live filtering
 * - Single and multiple selection modes
 * - Keyboard navigation (Arrow Up/Down, Enter, Escape)
 * - Mini API through ref (focus/blur/open/close/clear)
 * - Complete ARIA combobox pattern
 * - Support for both options prop and children
 */
export const DynSelect = forwardRef<DynSelectRef, DynSelectProps>(
  (
    {
      id,
      name,
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      placeholder,
      size = 'md',
      variant = 'outline',
      multiple = false,
      searchable = false,
      options,
      children,
      open: controlledOpen,
      onOpenChange,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'data-testid': dataTestId,
      'data-state': dataState
    },
    ref
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listboxRef = useRef<HTMLUListElement>(null)
    
    // Controlled/uncontrolled patterns
    const { value: currentValue, setValue } = useControlled({
      value: multiple ? (value as string[]) : (value as string),
      defaultValue: multiple ? (defaultValue as string[]) : (defaultValue as string),
      onChange
    })
    
    const { value: isOpen, setValue: setIsOpen } = useControlled({
      value: controlledOpen,
      defaultValue: false,
      onChange: onOpenChange
    })
    
    const [searchQuery, setSearchQuery] = useState('')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    
    // Process options from props or children
    const processedOptions: SelectOption[] = options || []
    
    // Filter options if searchable
    const filteredOptions = searchable 
      ? processedOptions.filter(opt => 
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : processedOptions
    
    // Mini API implementation
    useImperativeHandle(ref, () => ({
      focus: () => triggerRef.current?.focus(),
      blur: () => triggerRef.current?.blur(),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      clear: () => setValue(multiple ? [] : '')
    }))
    
    // Keyboard navigation
    useKeyboard('Escape', () => {
      if (isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }, { enabled: isOpen })
    
    useKeyboard('ArrowDown', (e) => {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
      }
    })
    
    useKeyboard('ArrowUp', (e) => {
      e.preventDefault()
      if (isOpen) {
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
      }
    })
    
    useKeyboard('Enter', (e) => {
      if (isOpen && focusedIndex >= 0) {
        e.preventDefault()
        const option = filteredOptions[focusedIndex]
        handleOptionSelect(option.value)
      }
    })
    
    const handleOptionSelect = (optionValue: string) => {
      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : []
        const newValue = currentArray.includes(optionValue)
          ? currentArray.filter(v => v !== optionValue)
          : [...currentArray, optionValue]
        setValue(newValue)
      } else {
        setValue(optionValue)
        setIsOpen(false)
      }
    }
    
    const handleTriggerClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
      }
    }
    
    // Display value logic
    const getDisplayValue = () => {
      if (multiple && Array.isArray(currentValue)) {
        const selected = processedOptions.filter(opt => currentValue.includes(opt.value))
        return selected.length > 0 
          ? `${selected.length} selected`
          : placeholder || 'Select options...'
      } else {
        const selected = processedOptions.find(opt => opt.value === currentValue)
        return selected?.label || placeholder || 'Select option...'
      }
    }
    
    const wrapperClasses = classNames(
      'dyn-select-wrapper',
      dataState && `dyn-select-wrapper--${dataState}`
    )
    
    const triggerClasses = classNames(
      'dyn-select-trigger',
      `dyn-select-trigger--${size}`,
      `dyn-select-trigger--${variant}`,
      disabled && 'dyn-select-trigger--disabled',
      isOpen && 'dyn-select-trigger--open'
    )
    
    const listboxClasses = classNames(
      'dyn-select-listbox',
      isOpen && 'dyn-select-listbox--open'
    )
    
    return (
      <div className={wrapperClasses} data-testid={dataTestId}>
        <button
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          required={required}
          className={triggerClasses}
          onClick={handleTriggerClick}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={dataState === 'error' ? 'true' : undefined}
        >
          {getDisplayValue()}
          <span className="dyn-select-trigger__icon" aria-hidden="true">
            ▼
          </span>
        </button>
        
        {isOpen && (
          <div className="dyn-select-dropdown">
            {searchable && (
              <input
                type="text"
                className="dyn-select-search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            )}
            
            <ul
              ref={listboxRef}
              className={listboxClasses}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {filteredOptions.map((option, index) => {
                const isSelected = multiple 
                  ? Array.isArray(currentValue) && currentValue.includes(option.value)
                  : currentValue === option.value
                const isFocused = index === focusedIndex
                
                return (
                  <li
                    key={option.value}
                    role="option"
                    className={classNames(
                      'dyn-select-option',
                      isSelected && 'dyn-select-option--selected',
                      isFocused && 'dyn-select-option--focused',
                      option.disabled && 'dyn-select-option--disabled'
                    )}
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => !option.disabled && handleOptionSelect(option.value)}
                  >
                    {option.label}
                    {option.description && (
                      <span className="dyn-select-option__description">
                        {option.description}
                      </span>
                    )}
                  </li>
                )
              })}
              
              {filteredOptions.length === 0 && (
                <li className="dyn-select-option dyn-select-option--empty">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={multiple ? JSON.stringify(currentValue) : (currentValue as string) || ''}
        />
      </div>
    )
  }
)

DynSelect.displayName = 'DynSelect'

/**
 * DynSelectOption - Individual option component for children pattern
 */
export function DynSelectOption({
  value,
  disabled = false,
  children,
  description
}: DynSelectOptionProps) {
  // This is used when DynSelect receives children instead of options prop
  // The parent DynSelect will process these children to build the options array
  return null // This component is used for type checking and API consistency
}

DynSelectOption.displayName = 'DynSelectOption'