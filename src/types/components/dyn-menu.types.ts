import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface DynMenuItemConfig {
  type: 'item' | 'divider';
  value?: string;
  label?: ReactNode;
  disabled?: boolean;
  shortcut?: ReactNode;
}

export interface DynMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: ReactNode;
  items?: DynMenuItemConfig[];
  orientation?: 'horizontal' | 'vertical';
  onAction?: (value: string | undefined) => void;
  className?: string;
  'data-testid'?: string;
}

export interface DynMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  item?: DynMenuItemConfig;
  children?: ReactNode;
  disabled?: boolean;
  action?: string;
  onAction?: (value: string | undefined) => void;
  shortcut?: ReactNode;
  className?: string;
  'data-testid'?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}
