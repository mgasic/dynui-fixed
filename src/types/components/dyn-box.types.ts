import type React from 'react';
import type { SpacingValue } from '../common.types';

export interface DynBoxProps {
  p?: SpacingValue;
  m?: SpacingValue;
  gap?: SpacingValue;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}