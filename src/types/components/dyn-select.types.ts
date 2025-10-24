import type { ReactNode } from 'react';
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
  children?: ReactNode;
  className?: string;
  size?: Size;
  onChange?: (value: string) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

export interface DynSelectOptionProps {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}