export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface DynTreeViewProps {
  data?: TreeNode[];
  selectedNode?: string;
  expandedNodes?: string[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeExpand?: (nodeId: string) => void;
  multiSelect?: boolean;
  className?: string;
  'data-testid'?: string;
}

export interface DynTreeNodeProps {
  node?: TreeNode;
  level?: number;
  expanded?: boolean;
  selected?: boolean;
  hasChildren?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
  className?: string;
}