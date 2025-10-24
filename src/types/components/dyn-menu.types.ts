import type { ReactNode } from 'react';

export interface DynMenuProps {
  children?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  onAction?: (key: string) => void;
  className?: string;
  'data-testid'?: string;
}

export interface DynMenuItemProps {
  children?: ReactNode;
  disabled?: boolean;
  action?: string;
  onAction?: (key: string) => void;
  className?: string;
  'data-testid'?: string;
}