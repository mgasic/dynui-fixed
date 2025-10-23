import type React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DynBreadcrumbProps {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface DynBreadcrumbItemProps {
  children?: React.ReactNode;
  href?: string;
  isLast?: boolean;
  className?: string;
  'data-testid'?: string;
}