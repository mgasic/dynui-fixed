import { forwardRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { DynTreeViewProps, DynTreeNodeProps, TreeNode } from '../types/components/dyn-tree.types'
import { classNames } from '../utils'

export const DynTreeView = forwardRef<HTMLDivElement, DynTreeViewProps>(
  ({
    data = [],
    selectedNode,
    expandedNodes = [],
    onNodeSelect,
    onNodeExpand,
    multiSelect = false,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [internalExpanded, setInternalExpanded] = useState<string[]>(
      Array.isArray(expandedNodes) ? expandedNodes : []
    )
    const [internalSelected, setInternalSelected] = useState<string[]>([])

    const handleToggle = (nodeId: string) => {
      const newExpanded = internalExpanded.includes(nodeId)
        ? internalExpanded.filter(id => id !== nodeId)
        : [...internalExpanded, nodeId]
      setInternalExpanded(newExpanded)
      if (typeof onNodeExpand === 'function') {
        onNodeExpand(nodeId)
      }
    };

    const handleSelect = (nodeId: string) => {
      if (multiSelect) {
        const newSelected = internalSelected.includes(nodeId)
          ? internalSelected.filter(id => id !== nodeId)
          : [...internalSelected, nodeId];
        setInternalSelected(newSelected)
      }
      if (typeof onNodeSelect === 'function') {
        onNodeSelect(nodeId)
      }
    };

    const renderNode = (node: TreeNode, level = 0): ReactNode => {
      const isExpanded = internalExpanded.includes(node.id)
      const isSelected = multiSelect
        ? internalSelected.includes(node.id)
        : selectedNode === node.id
      const hasChildren = Array.isArray(node.children) && node.children.length > 0

      return (
        <div key={node.id}>
          <DynTreeNode
            node={node}
            level={level}
            expanded={isExpanded}
            selected={isSelected}
            hasChildren={hasChildren}
            onSelect={() => handleSelect(node.id)}
            {...(hasChildren ? { onToggle: () => handleToggle(node.id) } : {})}
          />
          {isExpanded && hasChildren && (
            <div className="dyn-tree-view__children">
              {node.children?.map((childNode) => renderNode(childNode, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        {...props}
        ref={ref}
        role="tree"
        className={classNames(
          'dyn-tree-view',
          typeof className === 'string' ? className : undefined
        )}
        data-testid={testId}
      >
        {(Array.isArray(data) ? data : []).map(node => renderNode(node))}
      </div>
    );
  }
);

DynTreeView.displayName = 'DynTreeView';

export const DynTreeNode = forwardRef<HTMLDivElement, DynTreeNodeProps>(
  ({
    node,
    level = 0,
    expanded,
    selected,
    hasChildren,
    onToggle,
    onSelect,
    className,
    ...props
  }, ref) => {
    if (!node) return null;

    const resolvedLevel = typeof level === 'number' ? level : 0
    const isExpandable = Boolean(hasChildren)

    return (
      <div
        {...props}
        ref={ref}
        role="treeitem"
        aria-expanded={isExpandable ? expanded : undefined}
        aria-selected={selected}
        aria-level={resolvedLevel + 1}
        tabIndex={0}
        className={classNames(
          'dyn-tree-node',
          selected ? 'dyn-tree-node--selected' : undefined,
          isExpandable ? 'dyn-tree-node--expandable' : undefined,
          typeof className === 'string' ? className : undefined
        )}
        style={{ paddingLeft: `${resolvedLevel * 20}px` }}
        onClick={onSelect}
      >
        {isExpandable && (
          <button
            className="dyn-tree-node__toggle"
            onClick={(e) => {
              e.stopPropagation()
              if (typeof onToggle === 'function') {
                onToggle()
              }
            }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? '▼' : '▶'}
          </button>
        )}
        <span className="dyn-tree-node__label">{node.label}</span>
      </div>
    );
  }
);

DynTreeNode.displayName = 'DynTreeNode';