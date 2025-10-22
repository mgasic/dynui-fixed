import { createContext, useContext } from 'react'

export type MenuCtx = {
  onAction: (v: string) => void
  orientation: 'horizontal' | 'vertical'
  closeMenu: () => void
}

const noop = () => {}

export const MenuContext = createContext<MenuCtx>({
  onAction: noop,
  orientation: 'vertical',
  closeMenu: noop,
})

export const useMenuCtx = () => useContext(MenuContext)
