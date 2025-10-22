export interface DynDividerProps {
  as?: React.ElementType
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  thickness?: 'thin' | 'medium' | 'thick'
  color?: 'neutral' | 'light' | 'dark'
  'aria-orientation'?: 'horizontal' | 'vertical'
  'data-testid'?: string
}