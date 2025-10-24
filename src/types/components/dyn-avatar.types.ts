import type { ReactNode } from 'react'
import type { Size, Variant, Color } from '../common.types'

export interface DynAvatarProps {
  children?: ReactNode
  variant?: Variant
  size?: Size
  color?: Color
  src?: string
  alt?: string
  'aria-label'?: string
  'data-testid'?: string
}
