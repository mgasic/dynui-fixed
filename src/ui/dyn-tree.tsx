import { useState, useCallback } from 'react'
import type { DynTreeViewProps, DynTreeNodeProps, TreeNode } from '../types/components/dyn-tree.types'
import { classNames } from '../utils'

export function DynTreeView({
  nodes = [],
  value,
  defaultValue,
  multiSelect = false,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId
}: DynTreeViewProps) {
  const [internal, setInternal] = useState<string | string[] | undefined>(defaultValue)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const current = value ?? internal ?? (multiSelect ? [] : '')

  const setValue = useCallback((next: string | string[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }, [value, onChange])

  const isSelected = useCallback((nodeValue: string) => {
    return Array.isArray(current) ? current.includes(nodeValue) : current === nodeValue
  }, [current])

  const toggle = useCallback((nodeValue: string) => {
    if (disabled) return
    if (multiSelect) {
      const next = Array.isArray(current) 
        ? (isSelected(nodeValue) ? current.filter(v => v !== nodeValue) : [...current, nodeValue])
        : [nodeValue]
      setValue(next)
    } else {
      setValue(nodeValue)
    }
  }, [disabled, multiSelect, current, isSelected, setValue])

  const toggleExpansion = useCallback((nodeValue: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeValue)) {
        next.delete(nodeValue)
      } else {
        next.add(nodeValue)
      }
      return next
    })
  }, [])

  return (
    <div
      role="tree"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-multiselectable={multiSelect || undefined}
      className="dyn-tree"
      data-testid={dataTestId}
    >
      {nodes.map((node) => (
        <DynTreeNode
          key={node.key}
          node={node}
          level={0}
          expanded={expandedNodes.has(node.value)}
          selected={isSelected(node.value)}
          onToggle={() => toggle(node.value)}
          onExpand={() => toggleExpansion(node.value)}
        />
      ))}
    </div>
  )
}

export function DynTreeNode({
  node,
  level = 0,
  expanded = false,
  selected = false,
  onToggle,
  onExpand
}: DynTreeNodeProps & { selected?: boolean; onToggle?: () => void; onExpand?: () => void }) {
  const hasChildren = node.children && node.children.length > 0
  const cls = classNames(
    'dyn-tree-node',
    `dyn-tree-node--level-${level}`,
    selected && 'dyn-tree-node--selected',
    node.disabled && 'dyn-tree-node--disabled',
    hasChildren && 'dyn-tree-node--expandable',
    expanded && 'dyn-tree-node--expanded'
  )

  return (
    <div className={cls}>
      <div
        role="treeitem"
        aria-selected={selected}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-disabled={node.disabled}
        aria-level={level + 1}
        className="dyn-tree-node__content"
        onClick={() => !node.disabled && onToggle?.()}
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        {hasChildren && (
          <button
            className="dyn-tree-node__expander"
            onClick={(e) => {
              e.stopPropagation()
              onExpand?.()
            }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? '−' : '+'}
          </button>
        )}
        <span className="dyn-tree-node__label">{node.label}</span>
      </div>
      {hasChildren && expanded && (
        <div className="dyn-tree-node__children">
          {node.children!.map((child) => (
            <DynTreeNode
              key={child.key}
              node={child}
              level={level + 1}
              expanded={false} // TODO: Implement nested expansion state
              onToggle={onToggle}
              onExpand={onExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
}
