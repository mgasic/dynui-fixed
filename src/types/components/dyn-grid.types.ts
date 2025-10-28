import type { CSSProperties, ReactNode } from 'react';
import type { SpacingValue } from '../common.types';

export interface DynGridProps {
  columns?: number | string;
  rows?: number | string;
  gap?: SpacingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export interface DynGridItemProps {
  colSpan?: number | string;
  rowSpan?: number | string;
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}