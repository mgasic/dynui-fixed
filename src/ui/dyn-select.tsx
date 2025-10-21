import { useState, useRef, useEffect } from 'react'
import type { DynSelectProps, SelectOption } from '../types/components/dyn-select.types'
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
  const current = value ?? internal
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)

  const setValue = (newValue: string) => {
    if (value === undefined) setInternal(newValue)
    onChange?.(newValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  const selectedOption = options.find(opt => opt.value === current)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
          listboxRef.current && !listboxRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          ref={listboxRef}
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
          {filteredOptions.map((option) => (
            <DynSelectOption
              key={option.value}
              option={option}
              selected={option.value === current}
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
  onSelect
}: {
  option: SelectOption
  selected?: boolean
  onSelect?: () => void
}) {
  return (
    <li
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      className={classNames(
        'dyn-select__option',
        selected && 'dyn-select__option--selected',
        option.disabled && 'dyn-select__option--disabled'
      )}
      onClick={() => !option.disabled && onSelect?.()}
    >
      {option.label}
      {selected && <span className="dyn-select__check" aria-hidden="true">✓</span>}
    </li>
  )
}
