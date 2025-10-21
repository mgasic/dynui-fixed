export type MenuDivider = { type: 'divider' }
export type MenuAction = { type: 'item'; value: string; label: string; disabled?: boolean }
export type MenuItem = MenuDivider | MenuAction
export interface DynMenuProps {
  as?: React.ElementType
  items?: MenuItem[]
  orientation?: 'horizontal' | 'vertical'
  onAction?: (value: string) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
