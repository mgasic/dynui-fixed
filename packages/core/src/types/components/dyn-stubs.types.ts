import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  ChangeEvent,
  FocusEvent,
  MouseEvent
} from 'react'

export interface DynCheckboxProps {
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  indeterminate?: boolean
  label?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  onChange?: (checked: boolean) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

export interface DynRadioProps {
  value: string
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynRadioGroupProps {
  value?: string
  defaultValue?: string
  name?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  multiSelect?: boolean
  children?: ReactNode
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
  [key: string]: unknown
}

export type DynStepperProps = Record<string, unknown>

export interface DynMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  orientation?: 'horizontal' | 'vertical'
  onAction?: (key: string) => void
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

export interface DynMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  action?: string
  onAction?: (key: string) => void
  children?: ReactNode
  disabled?: boolean
  className?: string
  'data-testid'?: string
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export interface DynBreadcrumbProps {
  children?: ReactNode
  separator?: ReactNode
  size?: 'sm' | 'md' | 'lg' | string
  'aria-label'?: string
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynBreadcrumbItemProps {
  as?: keyof JSX.IntrinsicElements
  children?: ReactNode
  href?: string
  current?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynListViewItem {
  id: string
  label: ReactNode
  disabled?: boolean
}

export interface DynListViewProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items?: DynListViewItem[]
  selectedItem?: string
  onSelectionChange?: (selected: string[]) => void
  multiSelect?: boolean
  children?: ReactNode
  className?: string
  'aria-multiselectable'?: boolean
  'data-testid'?: string
}

export interface DynAvatarProps {
  children?: ReactNode
  variant?: 'solid' | 'outline' | 'soft' | string
  size?: 'sm' | 'md' | 'lg' | string
  color?: string
  src?: string
  alt?: string
  'aria-label'?: string
  'data-testid'?: string
  className?: string
  [key: string]: unknown
}

export interface DynBadgeProps {
  children?: ReactNode
  variant?: 'solid' | 'outline' | 'soft' | string
  size?: 'sm' | 'md' | 'lg' | string
  color?: string
  'aria-label'?: string
  'data-testid'?: string
  className?: string
  [key: string]: unknown
}

export interface DynTableColumn {
  key: string
  label: ReactNode
  sortable?: boolean
}

export interface DynTableProps {
  columns: DynTableColumn[]
  data: Array<Record<string, ReactNode>>
  sortable?: boolean
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void
  className?: string
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynTableSort {
  column: string
  direction: 'asc' | 'desc'
}

export type DynIconProps = Record<string, unknown>

export interface TreeNode {
  id: string
  label: ReactNode
  children?: TreeNode[]
}

export interface DynTreeViewProps {
  data?: TreeNode[]
  selectedNode?: string
  expandedNodes?: string[]
  onNodeSelect?: (id: string) => void
  onNodeExpand?: (id: string) => void
  multiSelect?: boolean
  className?: string
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynTreeNodeProps {
  node: TreeNode
  level?: number
  expanded?: boolean
  selected?: boolean
  hasChildren?: boolean
  onToggle?: () => void
  onSelect?: () => void
  className?: string
  [key: string]: unknown
}

export interface DynBoxProps {
  as?: keyof JSX.IntrinsicElements
  p?: number | string
  m?: number | string
  gap?: number | string
  children?: ReactNode
  className?: string
  style?: Record<string, unknown>
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynContainerProps {
  as?: keyof JSX.IntrinsicElements
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | string
  centered?: boolean
  fluid?: boolean
  children?: ReactNode
  className?: string
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynGridProps {
  columns?: number | string
  rows?: number | string
  gap?: number | string
  children?: ReactNode
  className?: string
  style?: Record<string, unknown>
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynGridItemProps {
  colSpan?: number | string
  rowSpan?: number | string
  children?: ReactNode
  className?: string
  style?: Record<string, unknown>
  'data-testid'?: string
  [key: string]: unknown
}

export interface DynFieldContainerProps {
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode
  children?: ReactNode
  className?: string
  [key: string]: unknown
}

export interface DynDividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted' | string
  size?: 'sm' | 'md' | 'lg' | string
  label?: ReactNode
  'aria-label'?: string
  'data-testid'?: string
  className?: string
  [key: string]: unknown
}

export interface DynModalProps {
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg' | string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
  className?: string
  [key: string]: unknown
}

export type DynDatepickerProps = Record<string, unknown>
export type DynDropdownProps = Record<string, unknown>
export type DynPageProps = Record<string, unknown>
export type DynSliderProps = Record<string, unknown>
export type DynToastProps = Record<string, unknown>
export type DynToggleProps = Record<string, unknown>
export type DynToolbarProps = Record<string, unknown>
export type DynTooltipProps = Record<string, unknown>
