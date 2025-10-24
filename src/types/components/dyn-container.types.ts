import type { CSSProperties, ReactNode } from 'react';
import type { SpacingValue } from '../common.types';

export interface DynContainerProps {
  maxWidth?: number | string;
  p?: SpacingValue;
  m?: SpacingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}