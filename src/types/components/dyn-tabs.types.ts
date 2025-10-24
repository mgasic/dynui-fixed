import type { ReactNode } from 'react';

export interface TabItem {
  value: string;
  label?: React.ReactNode;
  panel?: React.ReactNode;
  disabled?: boolean;
  tabId?: string;
  panelId?: string;
  className?: string;
  ['aria-controls']?: string;
  ['aria-label']?: string;
  ['aria-labelledby']?: string;
}

export type DynTabItem = TabItem;

export interface DynTabsRef {
  root: HTMLDivElement | null;
  focusTab: (value: string) => void;
  focusFirstTab: () => void;
  focusLastTab: () => void;
  focusNextTab: () => void;
  focusPreviousTab: () => void;
}

export interface DynTabsProps {
  value?: string;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  items?: TabItem[];
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'data-testid'?: string;
}

export interface DynTabProps {
  value: string;
  children?: ReactNode;
  isActive?: boolean;
  onSelect?: (value: string) => void;
  onFocusTab?: (value: string) => void;
  activation?: 'auto' | 'manual';
  disabled?: boolean;
  className?: string;
  tabId?: string;
  panelId?: string;
}

export interface DynTabPanelProps {
  value: string;
  children?: ReactNode;
  isActive?: boolean;
  className?: string;
  panelId?: string;
  tabId?: string;
}
