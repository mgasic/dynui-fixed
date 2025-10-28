import type { ComponentType, SVGProps } from 'react'

export type IconName = string

export interface IconDictionary {
  [key: IconName]: ComponentType<SVGProps<SVGSVGElement>>
}

export interface IconDictionaryContextValue {
  icons: IconDictionary
  registerIcon: (name: IconName, component: ComponentType<SVGProps<SVGSVGElement>>) => void
}
