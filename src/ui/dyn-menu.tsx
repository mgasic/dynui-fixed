import { createContext, useContext, useMemo } from 'react'
import type { DynMenuProps, MenuItem } from '../types/components/dyn-menu.types'

interface MenuCtx { onAction?: (v: string) => void; orientation: 'horizontal' | 'vertical' }
const MenuContext = createContext<MenuCtx | null>(null)

export function DynMenu({ as: As = 'div', items = [], onAction, orientation = 'vertical', children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'data-testid': dataTestId }: React.PropsWithChildren<DynMenuProps>) {
  const ctx = useMemo(() => ({ onAction, orientation }), [onAction, orientation])
  return (
    <As role="menu" aria-orientation={orientation} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} data-testid={dataTestId}>
      <MenuContext.Provider value={ctx}>
        {children ?? items.map((it, idx) => <DynMenuItem key={idx} item={it} />)}
      </MenuContext.Provider>
    </As>
  )
}

export function DynMenuItem({ item }: { item: MenuItem }) {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('DynMenuItem must be used within DynMenu')
  if (item.type === 'divider') return <div role="separator" />
  return (
    <div role="menuitem" aria-disabled={item.disabled} onClick={() => !item.disabled && ctx.onAction?.(item.value)}>
      {item.label}
    </div>
  )
}
