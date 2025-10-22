export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
export type DropdownTrigger = 'click' | 'hover' | 'focus' | 'manual'

export interface DynDropdownProps {
  children: React.ReactElement
  content: React.ReactNode
  placement?: DropdownPlacement
  trigger?: DropdownTrigger
  disabled?: boolean
  closeOnSelect?: boolean
  'aria-label'?: string
  'data-testid'?: string
}