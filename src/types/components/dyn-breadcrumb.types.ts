export interface BreadcrumbItem {
  key: string
  value: string
  label: string
  href?: string
  disabled?: boolean
}

export interface DynBreadcrumbProps {
  as?: React.ElementType
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}

export interface DynBreadcrumbItemProps {
  item: BreadcrumbItem
  isLast?: boolean
  separator?: React.ReactNode
  onClick?: (value: string) => void
}