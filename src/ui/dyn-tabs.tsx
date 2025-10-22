import { createContext, useContext, useId, useMemo, useRef, useState } from 'react'
import type { DynTabsProps, DynTabItem } from '../types/components/dyn-tabs.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { classNames } from '../utils'

interface TabsCtx {
  value: string
  setValue: (v: string) => void
  activation: 'auto' | 'manual'
  orientation: 'horizontal' | 'vertical'
  tabsId: string
}
const TabsContext = createContext<TabsCtx | null>(null)

export function DynTabs({
  as: As = 'div',
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  activation = 'auto',
  fitted,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId,
  children
}: React.PropsWithChildren<DynTabsProps>) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const current = value ?? internal
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v)
    onChange?.(v)
  }
  
  const tabsId = useId()
  const ctx = useMemo(() => ({ value: current, setValue, activation, orientation, tabsId }), [current, activation, orientation, tabsId])
  
  const { containerRef } = useArrowNavigation({
    orientation: orientation === 'horizontal' ? 'horizontal' : 'vertical',
    selector: '[role="tab"]:not([aria-disabled="true"])',
    typeahead: true
  })

  return (
    <As 
      ref={containerRef}
      role="tablist" 
      aria-orientation={orientation} 
      aria-label={ariaLabel} 
      aria-labelledby={ariaLabelledby} 
      data-testid={dataTestId}
      className={classNames(
        'dyn-tabs',
        `dyn-tabs--${orientation}`,
        fitted && 'dyn-tabs--fitted'
      )}
    >
      <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
    </As>
  )
}

export function DynTab({ item }: { item: DynTabItem }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('DynTab must be used within DynTabs')
  
  const isSelected = ctx.value === item.value
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelId = `${ctx.tabsId}-panel-${item.value}`
  const tabId = `${ctx.tabsId}-tab-${item.value}`
  
  const handleClick = () => {
    ctx.setValue(item.value)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Manual activation: require Enter/Space to activate
    if (ctx.activation === 'manual' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      ctx.setValue(item.value)
    }
  }
  
  return (
    <button
      ref={btnRef}
      id={tabId}
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      aria-disabled={item.disabled}
      tabIndex={isSelected ? 0 : -1}
      disabled={item.disabled}
      className={classNames(
        'dyn-tab',
        isSelected && 'dyn-tab--selected',
        item.disabled && 'dyn-tab--disabled'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item.label}
    </button>
  )
}

export function DynTabPanel({ item, children }: React.PropsWithChildren<{ item: DynTabItem }>) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('DynTabPanel must be used within DynTabs')
  
  const isSelected = ctx.value === item.value
  const panelId = `${ctx.tabsId}-panel-${item.value}`
  const tabId = `${ctx.tabsId}-tab-${item.value}`
  
  return (
    <div 
      id={panelId} 
      role="tabpanel" 
      aria-labelledby={tabId} 
      hidden={!isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={classNames(
        'dyn-tabpanel',
        !isSelected && 'dyn-tabpanel--hidden'
      )}
    >
      {isSelected && children}
    </div>
  )
}
