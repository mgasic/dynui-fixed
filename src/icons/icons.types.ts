export type IconName = string

export interface IconDictionary {
  [key: IconName]: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface IconDictionaryContextValue {
  icons: IconDictionary
  registerIcon: (name: IconName, component: React.ComponentType<React.SVGProps<SVGSVGElement>>) => void
}
