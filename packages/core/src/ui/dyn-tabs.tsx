import React, { forwardRef, useState, useImperativeHandle } from 'react'
import type { DynTabsProps, DynTabProps, DynTabPanelProps, DynTabsRef, TabItem } from '../types/components/dyn-tabs.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { classNames } from '../utils'

/**
 * DynTabs - WAI-ARIA compliant Tabs with activation modes and mini API
 * - Activation: 'auto' (activate on focus) | 'manual' (activate on Enter/Space)
 * - Orientation: 'horizontal' | 'vertical'
 * - Keyboard: Arrow keys, Home/End, typeahead (provided by useArrowNavigation)
 * - Mini API: focusFirst, focusLast, focus(value), getFocused, getSelected
 */
export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      activation = 'auto',
      children,
      className,
      'aria-label': ariaLabel,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = useState<string>(defaultValue ?? '')
    const selected = value ?? internal

    const setSelected = (next: string) => {
      if (value === undefined) setInternal(next)
      onChange?.(next)
    }

    const { getFocusedIndex, focusFirst, focusLast, focusIndex, setContainerRef } = useArrowNavigation({
      orientation,
      selector: '[role="tab"]:not([aria-disabled="true"])',
      typeahead: true,
      loop: true
    })

    // Expose mini API
    useImperativeHandle(ref, () => ({
      focusFirst: () => focusFirst(),
      focusLast: () => focusLast(),
      focus: (v: string) => {
        const items = getTabItems()
        const idx = items.findIndex(i => i.value === v)
        if (idx >= 0) focusIndex(idx)
      },
      getFocused: () => {
        const idx = getFocusedIndex()
        const items = getTabItems()
        return idx >= 0 ? items[idx]?.value ?? null : null
      },
      getSelected: () => selected ?? null
    }))

    const getTabItems = (): TabItem[] => {
      const items: TabItem[] = []
      React.Children.forEach(children, (child) => {
        if (React.isValidElement<DynTabProps>(child) && child.type === DynTab) {
          const { item } = child.props as any
          if (item) items.push(item)
        }
      })
      return items
    }

    const handleTabActivate = (tabValue: string) => setSelected(tabValue)

    return (
      <div
        {...props}
        className={classNames('dyn-tabs', `dyn-tabs--${orientation}`, className)}
        data-testid={testId}
        aria-label={ariaLabel}
      >
        <div
          ref={(node) => {
            setContainerRef(node)
          }}
          role="tablist"
          aria-orientation={orientation}
          className="dyn-tabs__list"
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<DynTabProps>(child) && child.type === DynTab) {
              const item = (child.props as any).item as TabItem
              const isActive = item?.value === selected
              return React.cloneElement(child, {
                isActive,
                onSelect: handleTabActivate,
                activation
              } as Partial<DynTabProps>)
            }
            return null
          })}
        </div>
        <div className="dyn-tabs__content">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<DynTabPanelProps>(child) && child.type === DynTabPanel) {
              const item = (child.props as any).item as TabItem
              const isActive = item?.value === selected
              return React.cloneElement(child, { isActive } as Partial<DynTabPanelProps>)
            }
            return null
          })}
        </div>
      </div>
    )
  }
)

DynTabs.displayName = 'DynTabs'

export const DynTab = forwardRef<HTMLButtonElement, DynTabProps>(
  ({ item, isActive, onSelect, activation = 'auto', disabled, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={classNames(
        'dyn-tab',
        isActive && 'dyn-tab--active',
        disabled && 'dyn-tab--disabled',
        className
      )}
      onClick={() => !disabled && onSelect?.(item.value)}
      onKeyDown={(e) => {
        if (activation === 'manual' && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onSelect?.(item.value)
        } else if (activation === 'auto' && (e.key === 'Enter' || e.key === ' ')) {
          // Already active via focus; prevent scroll
          e.preventDefault()
        }
      }}
    >
      {item?.label ?? props.children}
    </button>
  )
)

DynTab.displayName = 'DynTab'

export const DynTabPanel = forwardRef<HTMLDivElement, DynTabPanelProps>(
  ({ item, isActive, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      hidden={!isActive}
      className={classNames('dyn-tab-panel', className)}
      aria-labelledby={item?.value}
    >
      {props.children}
    </div>
  )
)

DynTabPanel.displayName = 'DynTabPanel'
