import { useContext } from 'react'
import { ThemeContext } from './theme-provider'
import type { ThemeContextType } from './theme.types'

/**
 * Hook to access current theme context
 * @returns Current theme and setTheme function
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}