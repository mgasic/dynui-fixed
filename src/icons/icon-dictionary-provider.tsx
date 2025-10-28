import { createContext, useState, useMemo, useCallback } from 'react'
import type { ComponentType, ReactNode, SVGProps } from 'react'
import type { IconDictionary, IconDictionaryContextValue, IconName } from './icons.types'

export const IconDictionaryContext = createContext<IconDictionaryContextValue | null>(null)

export interface IconDictionaryProviderProps {
  icons?: IconDictionary
  children: ReactNode
}

export function IconDictionaryProvider({ icons = {}, children }: IconDictionaryProviderProps) {
  const [iconDict, setIconDict] = useState(icons)
  const registerIcon = useCallback((name: IconName, component: ComponentType<SVGProps<SVGSVGElement>>) => {
    setIconDict(prev => ({ ...prev, [name]: component }))
  }, [])
  const value = useMemo(() => ({ icons: iconDict, registerIcon }), [iconDict, registerIcon])
  return <IconDictionaryContext.Provider value={value}>{children}</IconDictionaryContext.Provider>
}
