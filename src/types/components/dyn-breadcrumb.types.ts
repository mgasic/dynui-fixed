import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DynBreadcrumbProps {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface DynBreadcrumbItemProps {
  children?: ReactNode;
  href?: string;
  isLast?: boolean;
  className?: string;
  'data-testid'?: string;
}