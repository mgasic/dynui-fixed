export type SpacingValue = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AlignValue = 'start' | 'center' | 'end' | 'stretch'
export type JustifyValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type DirectionValue = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type WrapValue = 'nowrap' | 'wrap' | 'wrap-reverse'

export interface DynBoxProps {
  as?: React.ElementType
  children?: React.ReactNode
  gap?: SpacingValue
  p?: SpacingValue  // padding
  m?: SpacingValue  // margin
  align?: AlignValue
  justify?: JustifyValue
  direction?: DirectionValue
  wrap?: WrapValue
  'data-testid'?: string
}
