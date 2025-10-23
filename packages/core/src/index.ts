// DynUI Core Library - Complete Component Export
// Migration from src/ to packages/core/src/ (FAZA 1 - KORAK 2)

// Components
export * from './components'

// Hooks  
export * from './hooks'

// Types
export type * from './types/components'
export type * from './types/common.types'

// Utils (without SpacingValue to avoid ambiguity)
export { classNames, getSpacingStyles } from './utils'
export type { StyleProps } from './utils/style-props'

// Theme
export * from './theme'

// Version info
export const DYNUI_VERSION = '1.0.0'