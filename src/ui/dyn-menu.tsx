import { createContext, useContext, useMemo, useRef } from 'react'
import type { DynMenuProps, MenuItem } from '../types/components/dyn-menu.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { useKeyboard } from '../hooks/use-keyboard'
import { classNames } from '../utils'

interface MenuCtx { 
  onAction?: (v: string) => void
  orientation: 'horizontal' | 'vertical'
  closeMenu?: () => void
}
const MenuContext = createContext<MenuCtx | null>(null)

export function DynMenu({ 
  as: As = 'div', 
  items = [], 
  onAction, 
  orientation = 'vertical', 
  children, 
  'aria-label': ariaLabel, 
  'aria-labelledby': ariaLabelledby, 
  'data-testid': dataTestId 
}: React.PropsWithChildren<DynMenuProps>) {
  const closeMenuRef = useRef<() => void>()
  
  const ctx = useMemo(() => ({ 
    onAction, 
    orientation,
    closeMenu: () => closeMenuRef.current?.()
  }), [onAction, orientation])
  
  const { containerRef } = useArrowNavigation({
    orientation: orientation === 'horizontal' ? 'horizontal' : 'vertical',
    selector: '[role="menuitem"]:not([aria-disabled="true"])',
    typeahead: true
  })
  
  // Handle Escape key to close menu
  useKeyboard('Escape', () => {
    ctx.closeMenu?.()
  })
  
  return (
    <As 
      ref={containerRef}
      role="menu" 
      aria-orientation={orientation} 
      aria-label={ariaLabel} 
      aria-labelledby={ariaLabelledby} 
      data-testid={dataTestId}
      className={classNames(
        'dyn-menu',
        `dyn-menu--${orientation}`
      )}
    >
      <MenuContext.Provider value={ctx}>
        {children ?? items.map((it, idx) => <DynMenuItem key={idx} item={it} />)}
      </MenuContext.Provider>
    </As>
  )
}

export function DynMenuItem({ item }: { item: MenuItem }) {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('DynMenuItem must be used within DynMenu')
  
  if (item.type === 'divider') {
    return <div role="separator" className="dyn-menu-separator" />
  }
  
  const handleClick = () => {
    if (!item.disabled) {
      ctx.onAction?.(item.value)
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
  
  return (
    <div 
      role="menuitem" 
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : 0}
      className={classNames(
        'dyn-menu-item',
        item.disabled && 'dyn-menu-item--disabled'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item.label}
    </div>
  )
}
