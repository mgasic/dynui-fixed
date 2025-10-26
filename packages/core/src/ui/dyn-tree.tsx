import { forwardRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { DynTreeViewProps, DynTreeNodeProps, TreeNode } from '../types/components/dyn-tree.types';
import { classNames } from '../utils';

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
    const initialExpanded = Array.isArray(expandedNodes) ? expandedNodes : [];
    const [internalExpanded, setInternalExpanded] = useState<string[]>(initialExpanded);
    const [internalSelected, setInternalSelected] = useState<string[]>([]);

    const handleToggle = (nodeId: string) => {
      const newExpanded = internalExpanded.includes(nodeId)
        ? internalExpanded.filter(id => id !== nodeId)
        : [...internalExpanded, nodeId];
      setInternalExpanded(newExpanded);
      onNodeExpand?.(nodeId);
    };

    const handleSelect = (nodeId: string) => {
      if (multiSelect) {
        const newSelected = internalSelected.includes(nodeId)
          ? internalSelected.filter(id => id !== nodeId)
          : [...internalSelected, nodeId];
        setInternalSelected(newSelected);
      }
      onNodeSelect?.(nodeId);
    };

    const renderNode = (node: TreeNode, level = 0): ReactNode => {
      const isExpanded = internalExpanded.includes(node.id);
      const isSelected = multiSelect
        ? internalSelected.includes(node.id)
        : selectedNode === node.id;
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;

      const toggleProps = hasChildren
        ? { onToggle: () => handleToggle(node.id) }
        : {}

      return (
        <div key={node.id}>
          <DynTreeNode
            node={node}
            level={level}
            expanded={isExpanded}
            selected={isSelected}
            hasChildren={hasChildren}
            onSelect={() => handleSelect(node.id)}
            {...toggleProps}
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
        className={classNames('dyn-tree-view', className)}
        data-testid={testId}
      >
        {data?.map(node => renderNode(node))}
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

    return (
      <div
        {...props}
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
        aria-level={level + 1}
        tabIndex={0}
        className={classNames(
          'dyn-tree-node',
          selected ? 'dyn-tree-node--selected' : undefined,
          hasChildren ? 'dyn-tree-node--expandable' : undefined,
          className
        )}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => {
          onSelect?.();
        }}
      >
        {hasChildren && (
          <button
            className="dyn-tree-node__toggle"
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
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