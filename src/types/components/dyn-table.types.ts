export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export interface TableSortState {
  key: string
  direction: 'asc' | 'desc'
}

export interface DynTableProps {
  columns: TableColumn[]
  data: Record<string, any>[]
  sortable?: boolean
  sortState?: TableSortState
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
