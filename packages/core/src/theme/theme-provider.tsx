import { createContext, ReactNode, useState } from 'react'
import type { Theme, ThemeContextType } from './theme.types'
import { defaultTheme } from './default-theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

/**
 * DynUI Theme Provider - Manages theme context for components
 * Provides theme tokens and theming capabilities throughout the component tree
 */
export function ThemeProvider({ children, initialTheme = defaultTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const value: ThemeContextType = {
    theme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }