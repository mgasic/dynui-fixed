import type React from 'react';
import type { SpacingValue } from '../common.types';

export interface DynContainerProps {
  maxWidth?: number | string;
  p?: SpacingValue;
  m?: SpacingValue;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}