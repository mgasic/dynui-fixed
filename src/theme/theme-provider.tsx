import { createContext, useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Theme, ThemeContextValue } from './theme.types'
import { defaultTheme } from './default-theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  theme?: Theme
  children: ReactNode
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(theme)
  const value = useMemo(() => ({ theme: currentTheme, setTheme: setCurrentTheme }), [currentTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
