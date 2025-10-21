export interface ListViewItem { key: string; value: string; label: string; disabled?: boolean }
export interface DynListViewProps {
  items?: ListViewItem[]
  value?: string | string[]
  defaultValue?: string | string[]
  multiSelect?: boolean
  disabled?: boolean
  onChange?: (value: string | string[]) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
