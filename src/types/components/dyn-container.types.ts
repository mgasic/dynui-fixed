import type { HTMLAttributes } from 'react';

export type DynContainerSize = 'sm' | 'md' | 'lg';

export type DynContainerMaxWidthToken = 'sm' | 'md' | 'lg' | 'xl';

export type DynContainerSpacingToken =
  | 'none'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '3'
  | '4'
  | '6'
  | '8'
  | '12'
  | '16';

export interface DynContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: DynContainerSize;
  fluid?: boolean;
  maxWidth?: number | DynContainerMaxWidthToken | (string & {});
  p?: number | DynContainerSpacingToken | (string & {});
  m?: number | DynContainerSpacingToken | (string & {});
  'data-testid'?: string;
}
