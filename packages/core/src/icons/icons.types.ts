import type { ReactNode } from 'react'

/**
 * Icon component type - can be any React component that renders an icon
 */
export type IconComponent = React.ComponentType<{ className?: string; size?: number | string }>

/**
 * Icon dictionary mapping icon names to their components
 */
export interface IconDictionary {
  [key: string]: IconComponent
}

/**
 * Icon registry for dynamic icon loading and management
 */
export interface IconRegistryContextType {
  icons: IconDictionary
  registerIcon: (name: string, component: IconComponent) => void
  registerIcons: (icons: IconDictionary) => void
}