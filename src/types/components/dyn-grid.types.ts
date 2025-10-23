import type React from 'react';
import type { SpacingValue } from '../common.types';

export interface DynGridProps {
  columns?: number | string;
  rows?: number | string;
  gap?: SpacingValue;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export interface DynGridItemProps {
  colSpan?: number | string;
  rowSpan?: number | string;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}