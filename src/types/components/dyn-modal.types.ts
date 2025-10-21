export interface DynModalProps {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}
