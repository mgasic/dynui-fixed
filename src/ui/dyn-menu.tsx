import { MenuContext } from './menu-context'
// ...rest of imports

// inside component
<MenuContext.Provider value={{
  onAction: onAction ?? (() => {}),
  orientation,
  closeMenu: closeMenu ?? (() => {})
}}>
  {children}
</MenuContext.Provider>
