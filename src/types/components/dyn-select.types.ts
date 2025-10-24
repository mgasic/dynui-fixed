import type React from 'react';
import type { Size } from '../common.types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DynSelectProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: SelectOption[];
  children?: React.ReactNode;
  className?: string;
  size?: Size;
  onChange?: (value: string) => void;
  searchable?: boolean;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  filterOptions?: (option: SelectOption, search: string) => boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

export interface DynSelectOptionProps {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
}