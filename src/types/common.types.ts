export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'solid' | 'outline';
export type Color = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type SpacingValue = number | string;

export interface ControlProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}