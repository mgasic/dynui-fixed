import type { ElementType, ReactNode } from 'react'
import type { DynBoxProps } from './dyn-box.types'

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
  p?: DynBoxProps['p']
  m?: DynBoxProps['m']
  fullHeight?: boolean
  'data-testid'?: string
}