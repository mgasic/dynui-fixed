import type { ElementType, ReactNode } from 'react'

export interface ToolbarItem {
  key: string
  value: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  type?: 'button' | 'separator' | 'group'
}

export interface DynToolbarProps {
  as?: ElementType
  items?: ToolbarItem[]
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  onAction?: (value: string) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}

export interface DynToolbarItemProps {
  item: ToolbarItem
  size?: 'sm' | 'md' | 'lg'
  onAction?: (value: string) => void
}