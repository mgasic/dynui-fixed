import { useState, useRef, useEffect, useCallback } from 'react'
import type { DynSelectProps, SelectOption } from '../types/components/dyn-select.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { useKeyboard } from '../hooks/use-keyboard'
import { classNames } from '../utils'

export function DynSelect({
  as: As = 'div',
  id,
  name,
  value,
  defaultValue,
  disabled,
  required,
  options = [],
  size = 'md',
  variant = 'outline',
  placeholder,
  searchable = false,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'data-testid': dataTestId
}: DynSelectProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const current = value ?? internal
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)

  const setValue = useCallback((newValue: string) => {
    if (value === undefined) setInternal(newValue)
    onChange?.(newValue)
    setIsOpen(false)
    setSearchTerm('')
    setFocusedIndex(-1)
  }, [value, onChange])

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  const selectedOption = options.find(opt => opt.value === current)

  // Arrow navigation for options
  const { containerRef } = useArrowNavigation({
    enabled: isOpen,
    orientation: 'vertical',
    selector: '[role="option"]:not([aria-disabled="true"])',
    typeahead: !searchable
  })

  // Handle keyboard shortcuts
  useKeyboard('Escape', () => {
    if (isOpen) {
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }, { enabled: isOpen })

  useKeyboard(['Enter', ' '], (e) => {
    if (!isOpen && document.activeElement === triggerRef.current) {
      e.preventDefault()
      setIsOpen(true)
    }
  })

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (triggerRef.current && !triggerRef.current.contains(target) &&
          listboxRef.current && !listboxRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const cls = classNames(
    'dyn-select',
    `dyn-select--${size}`,
    `dyn-select--${variant}`,
    disabled && 'dyn-select--disabled',
    isOpen && 'dyn-select--open'
  )

  return (
    <As className={cls} data-testid={dataTestId}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? 'listbox' : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        disabled={disabled}
        className="dyn-select__trigger"
        onClick={() => setIsOpen(!isOpen)}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className="dyn-select__value">
          {selectedOption?.label || placeholder || 'Select...'}
        </span>
        <span className="dyn-select__icon" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      
      {isOpen && (
        <ul
          ref={(el) => {
            listboxRef.current = el
            ;(containerRef as any).current = el
          }}
          id="listbox"
          role="listbox"
          className="dyn-select__listbox"
          aria-label="Options"
        >
          {searchable && (
            <li className="dyn-select__search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dyn-select__search-input"
              />
            </li>
          )}
          {filteredOptions.map((option, index) => (
            <DynSelectOption
              key={option.value}
              option={option}
              selected={option.value === current}
              focused={index === focusedIndex}
              onSelect={() => setValue(option.value)}
            />
          ))}
          {filteredOptions.length === 0 && (
            <li className="dyn-select__no-options">No options found</li>
          )}
        </ul>
      )}
    </As>
  )
}

export function DynSelectOption({
  option,
  selected = false,
  focused = false,
  onSelect
}: {
  option: SelectOption
  selected?: boolean
  focused?: boolean
  onSelect?: () => void
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!option.disabled) onSelect?.()
    }
  }

  return (
    <li
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      tabIndex={focused ? 0 : -1}
      className={classNames(
        'dyn-select__option',
        selected && 'dyn-select__option--selected',
        focused && 'dyn-select__option--focused',
        option.disabled && 'dyn-select__option--disabled'
      )}
      onClick={() => !option.disabled && onSelect?.()}
      onKeyDown={handleKeyDown}
    >
      {option.label}
      {selected && <span className="dyn-select__check" aria-hidden="true">✓</span>}
    </li>
  )
}
