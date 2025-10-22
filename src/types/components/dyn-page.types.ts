import type { SpacingValue } from './dyn-box.types'

export interface DynPageProps {
  as?: React.ElementType
  children?: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  p?: SpacingValue
  m?: SpacingValue
  fullHeight?: boolean
  'data-testid'?: string
}