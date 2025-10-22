import type { SpacingValue } from './dyn-box.types'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ContainerBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface DynContainerProps {
  as?: React.ElementType
  children?: React.ReactNode
  size?: ContainerSize
  maxWidth?: ContainerBreakpoint
  centered?: boolean
  p?: SpacingValue
  m?: SpacingValue
  fluid?: boolean
  'data-testid'?: string
}