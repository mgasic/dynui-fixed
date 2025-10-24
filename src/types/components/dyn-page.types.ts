import type { ElementType, ReactNode } from 'react'
import type { SpacingValue } from './dyn-box.types'

export interface DynPageProps {
  as?: ElementType
  children?: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
  breadcrumbs?: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  p?: SpacingValue
  m?: SpacingValue
  fullHeight?: boolean
  'data-testid'?: string
}