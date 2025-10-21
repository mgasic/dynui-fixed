export interface TreeNode {
  key: string
  value: string
  label: string
  disabled?: boolean
  children?: TreeNode[]
}

export interface DynTreeViewProps {
  nodes?: TreeNode[]
  value?: string | string[]
  defaultValue?: string | string[]
  multiSelect?: boolean
  disabled?: boolean
  onChange?: (value: string | string[]) => void
  'aria-label'?: string
  'aria-labelledby'?: string
  'data-testid'?: string
}

export interface DynTreeNodeProps {
  node: TreeNode
  level?: number
  expanded?: boolean
  onToggle?: () => void
}
