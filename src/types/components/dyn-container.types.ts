import type { CSSProperties, ReactNode } from 'react';
import type { SpacingValue } from '../common.types';

export type DynContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DynContainerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DynContainerProps {
  /**
   * Maximum width of the container. String values matching design tokens
   * will map to `dyn-container--max-{token}` classes. Other string values
   * or numbers will be applied inline.
   */
  maxWidth?: number | string;
  /**
   * Predefined container size helper (maps to `dyn-container--{size}`).
   */
  size?: DynContainerSize;
  /**
   * Whether the container should stretch to the full width.
   */
  fluid?: boolean;
  /**
   * Padding shorthand. Token strings map to BEM modifier classes; other
   * values fall back to inline styles.
   */
  p?: SpacingValue | DynContainerSpacing;
  /**
   * Margin shorthand. Token strings map to BEM modifier classes; other
   * values fall back to inline styles.
   */
  m?: SpacingValue | DynContainerSpacing;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}
