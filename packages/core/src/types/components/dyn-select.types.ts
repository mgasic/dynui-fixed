import type { ControlProps, Size, Variant } from '../common.types'
import type { ReactNode } from 'react'

/**
 * Individual option item for DynSelect
 */
export interface SelectOption {
  /** Unique value for this option */
  value: string
  /** Display label */
  label: string
  /** Whether option is disabled */
  disabled?: boolean
  /** Optional description text */
  description?: string
}

/**
 * Props for DynSelect component
 * Dropdown selection with search capability and keyboard navigation
 */
export interface DynSelectProps extends ControlProps<string | string[]> {
  /** HTML id attribute */
  id?: string
  /** HTML name attribute for forms */
  name?: string
  /** Placeholder text when no value selected */
  placeholder?: string
  /** Visual size variant */
  size?: Size
  /** Visual style variant */
  variant?: Variant
  /** Whether multiple selections are allowed */
  multiple?: boolean
  /** Whether search/filter is enabled */
  searchable?: boolean
  /** Options array for controlled mode */
  options?: SelectOption[]
  /** Child option elements for uncontrolled mode */
  children?: ReactNode
  /** State for styling */
  'data-state'?: string
  /** Whether dropdown is open (controlled) */
  open?: boolean
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void
}

/**
 * Props for individual DynSelectOption component
 */
export interface DynSelectOptionProps {
  /** Option value */
  value: string
  /** Whether option is disabled */
  disabled?: boolean
  /** Option content/label */
  children?: ReactNode
  /** Optional description */
  description?: string
}

/**
 * Ref methods for DynSelect mini API
 */
export interface DynSelectRef {
  /** Focus the select trigger */
  focus(): void
  /** Remove focus from select */
  blur(): void
  /** Open the dropdown */
  open(): void
  /** Close the dropdown */
  close(): void
  /** Clear current selection */
  clear(): void
}