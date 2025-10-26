import type { ReactNode } from 'react';

export interface DynBreadcrumbItemConfig {
  /**
   * Unique identifier for the breadcrumb item. Falls back to the array index when omitted.
   */
  key?: string;
  /**
   * Optional value that consumers can use for analytics or selection handling.
   */
  value?: string;
  /**
   * Visible label for the breadcrumb item.
   */
  label: ReactNode;
  /**
   * Destination URL for the breadcrumb item. When omitted, the item renders as plain text.
   */
  href?: string;
  /**
   * Override for the separator rendered after this breadcrumb item.
   */
  separator?: ReactNode;
}

export interface DynBreadcrumbTruncationConfig {
  /**
   * Number of breadcrumb items to display before the ellipsis when truncation occurs.
   * @default 1
   */
  itemsBefore?: number;
  /**
   * Number of breadcrumb items to display after the ellipsis when truncation occurs.
   * @default 1
   */
  itemsAfter?: number;
  /**
   * Custom label displayed inside the truncation ellipsis element.
   * @default '...'
   */
  ellipsisLabel?: ReactNode;
}

export interface DynBreadcrumbProps {
  /**
   * Array-based API for defining breadcrumb items. When provided, child nodes are ignored.
   */
  items?: DynBreadcrumbItemConfig[];
  /**
   * Global separator rendered between breadcrumb items. Individual items can override this.
   */
  separator?: ReactNode;
  /**
   * Maximum number of breadcrumb entries to display before collapsing the middle items with an ellipsis.
   */
  maxItems?: number;
  /**
   * Configuration options that control how breadcrumb truncation behaves.
   */
  truncation?: DynBreadcrumbTruncationConfig;
  children?: ReactNode;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export interface DynBreadcrumbItemProps {
  children?: ReactNode;
  href?: string;
  isLast?: boolean;
  className?: string;
  'data-testid'?: string;
}