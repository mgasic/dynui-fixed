import type { ReactNode } from 'react'

export interface DynModalProps {
  open?: boolean
  onClose?: () => void
  children?: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
