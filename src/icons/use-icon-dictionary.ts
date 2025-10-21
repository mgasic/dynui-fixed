import { useContext } from 'react'
import { IconDictionaryContext } from './icon-dictionary-provider'

export function useIconDictionary() {
  const ctx = useContext(IconDictionaryContext)
  if (!ctx) throw new Error('useIconDictionary must be used within IconDictionaryProvider')
  return ctx
}
