import type { ElementType } from 'react'

export interface DynDividerProps {
  as?: ElementType
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  thickness?: 'thin' | 'medium' | 'thick'
  color?: 'neutral' | 'light' | 'dark'
  'aria-orientation'?: 'horizontal' | 'vertical'
  'data-testid'?: string
}