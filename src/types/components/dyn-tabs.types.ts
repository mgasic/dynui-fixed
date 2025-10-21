export interface DynTabItem { key: string; value: string; label: string; disabled?: boolean }
export interface DynTabsProps {
  as?: React.ElementType
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  activation?: 'auto' | 'manual'
  fitted?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
