import { createContext, useContext, useId, useMemo, useRef, useState } from 'react'
import type { DynTabsProps, DynTabItem } from '../types/components/dyn-tabs.types'

interface TabsCtx {
  value: string
  setValue: (v: string) => void
  activation: 'auto' | 'manual'
  orientation: 'horizontal' | 'vertical'
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
  const ctx = useMemo(() => ({ value: current, setValue, activation, orientation }), [current, activation, orientation])
  const id = useId()
  return (
    <As role="tablist" aria-orientation={orientation} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} data-testid={dataTestId}>
      <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
    </As>
  )
}

export function DynTab({ item }: { item: DynTabItem }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('DynTab must be used within DynTabs')
  const isSelected = ctx.value === item.value
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelId = `panel-${item.value}`
  const tabId = `tab-${item.value}`
  return (
    <button
      ref={btnRef}
      id={tabId}
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => ctx.setValue(item.value)}
    >
      {item.label}
    </button>
  )
}

export function DynTabPanel({ item, children }: React.PropsWithChildren<{ item: DynTabItem }>) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('DynTabPanel must be used within DynTabs')
  const isSelected = ctx.value === item.value
  const panelId = `panel-${item.value}`
  const tabId = `tab-${item.value}`
  return (
    <div id={panelId} role="tabpanel" aria-labelledby={tabId} hidden={!isSelected}>
      {children}
    </div>
  )
}
