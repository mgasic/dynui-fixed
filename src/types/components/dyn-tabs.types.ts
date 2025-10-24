import type { ReactNode } from 'react';

export interface DynTabsProps {
  value?: string;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  'data-testid'?: string;
}

export interface DynTabProps {
  value: string;
  children?: ReactNode;
  isActive?: boolean;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface DynTabPanelProps {
  value: string;
  children?: ReactNode;
  isActive?: boolean;
  className?: string;
}