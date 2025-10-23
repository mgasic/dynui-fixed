import type React from 'react';

export interface DynMenuProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  onAction?: (key: string) => void;
  className?: string;
  'data-testid'?: string;
}

export interface DynMenuItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  action?: string;
  onAction?: (key: string) => void;
  className?: string;
  'data-testid'?: string;
}