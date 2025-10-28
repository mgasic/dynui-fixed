import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode
} from 'react'

export interface TabItem {
  value: string
  label?: ReactNode
  panel?: ReactNode
  disabled?: boolean
  tabId?: string
  panelId?: string
  className?: string
  key?: string
  'aria-controls'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export type DynTabItem = TabItem

export interface DynTabsRef {
  root: HTMLDivElement | null
  focusTab: (value: string) => void
  focusFirstTab: () => void
  focusLastTab: () => void
  focusNextTab: () => void
  focusPreviousTab: () => void
}

export interface DynTabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  value?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  activation?: 'auto' | 'manual'
  children?: ReactNode
  className?: string
  onChange?: (value: string) => void
  items?: DynTabItem[]
  'data-testid'?: string
}

export interface DynTabProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | 'children'
    | 'onSelect'
    | 'onFocus'
    | 'onKeyDown'
    | 'disabled'
    | 'type'
  > {
  item?: DynTabItem
  children?: ReactNode
  isActive?: boolean
  onSelect?: (value: string) => void
  onFocusTab?: (value: string) => void
  activation?: 'auto' | 'manual'
  disabled?: boolean
  className?: string
  tabId?: string
  panelId?: string
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onKeyDown?: ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown']
  onFocus?: ButtonHTMLAttributes<HTMLButtonElement>['onFocus']
}

export interface DynTabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  item?: DynTabItem
  children?: ReactNode
  isActive?: boolean
  className?: string
  panelId?: string
  tabId?: string
}
