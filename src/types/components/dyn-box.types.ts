import type { CSSProperties, ReactNode } from 'react';
import type { SpacingValue } from '../common.types';

export interface DynBoxProps {
  p?: SpacingValue;
  m?: SpacingValue;
  gap?: SpacingValue;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}