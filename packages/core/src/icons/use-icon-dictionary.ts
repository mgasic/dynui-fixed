import { useContext } from 'react'
import { IconDictionaryContext } from './icon-dictionary-provider'
import type { IconRegistryContextType } from './icons.types'

/**
 * Hook to access icon dictionary context
 * @returns Icon registry with available icons and registration methods
 * @throws Error if used outside IconDictionaryProvider
 */
export function useIconDictionary(): IconRegistryContextType {
  const context = useContext(IconDictionaryContext)
  
  if (!context) {
    throw new Error('useIconDictionary must be used within an IconDictionaryProvider')
  }
  
  return context
}