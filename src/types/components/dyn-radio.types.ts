import type { Size } from '../common.types';
import type React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Separate interface to avoid ControlProps onChange conflicts
export interface DynRadioGroupProps {
  value?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}

// Separate interface to avoid ControlProps onChange conflicts
export interface DynRadioProps {
  value: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: Size;
  children?: React.ReactNode;
  className?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}