import { createContext, ReactNode, useState, useCallback } from 'react'
import type { IconDictionary, IconRegistryContextType, IconComponent } from './icons.types'

const IconDictionaryContext = createContext<IconRegistryContextType | undefined>(undefined)

export interface IconDictionaryProviderProps {
  children: ReactNode
  initialIcons?: IconDictionary
}

/**
 * DynUI Icon Dictionary Provider - Manages icon registration and lookup
 * Enables dynamic icon loading and centralized icon management
 */
export function IconDictionaryProvider({ 
  children, 
  initialIcons = {} 
}: IconDictionaryProviderProps) {
  const [icons, setIcons] = useState<IconDictionary>(initialIcons)

  const registerIcon = useCallback((name: string, component: IconComponent) => {
    setIcons(prev => ({ ...prev, [name]: component }))
  }, [])

  const registerIcons = useCallback((newIcons: IconDictionary) => {
    setIcons(prev => ({ ...prev, ...newIcons }))
  }, [])

  const value: IconRegistryContextType = {
    icons,
    registerIcon,
    registerIcons
  }

  return (
    <IconDictionaryContext.Provider value={value}>
      {children}
    </IconDictionaryContext.Provider>
  )
}

export { IconDictionaryContext }