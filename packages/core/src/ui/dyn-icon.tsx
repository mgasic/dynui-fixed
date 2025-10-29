import React, { createContext, useContext } from 'react'
import { cn } from '../utils/classNames'
import type { Size, Color } from '../types/common.types'

// Icon dictionary context
interface IconDictionaryContextValue {
  icons: Record<string, React.ComponentType<{ className?: string }>>
}

const IconDictionaryContext = createContext<IconDictionaryContextValue | null>(null)

// Icon dictionary provider
interface IconDictionaryProviderProps {
  icons: Record<string, React.ComponentType<{ className?: string }>>
  children: React.ReactNode
}

export function IconDictionaryProvider({ icons, children }: IconDictionaryProviderProps) {
  return (
    <IconDictionaryContext.Provider value={{ icons }}>
      {children}
    </IconDictionaryContext.Provider>
  )
}

// Icon size mapping
const ICON_SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
} as const

// DynIcon component props
interface DynIconProps {
  /** Icon name from the dictionary */
  name: string
  /** Size variant or custom number */
  size?: Size | number
  /** Color variant or custom color */
  color?: Color | string
  /** Custom className */
  className?: string
  /** ARIA label for accessibility */
  'aria-label'?: string
  /** Whether the icon is decorative */
  'aria-hidden'?: boolean
  /** Test identifier */
  'data-testid'?: string
  /** Additional props passed to the icon component */
  [key: string]: any
}

export function DynIcon({
  name,
  size = 'md',
  color,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  'data-testid': dataTestId,
  ...rest
}: DynIconProps) {
  const context = useContext(IconDictionaryContext)
  
  if (!context) {
    throw new Error('DynIcon must be used within an IconDictionaryProvider')
  }

  const { icons } = context
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in dictionary. Available icons: ${Object.keys(icons).join(', ')}`)
    return null
  }

  // Determine size value
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size]
  
  // Build icon classes
  const iconClassName = cn(
    'dyn-icon',
    typeof size === 'string' && `dyn-icon--${size}`,
    color && typeof color === 'string' && color in ['neutral', 'info', 'success', 'warning', 'danger'] && `dyn-icon--${color}`,
    className
  )

  // Icon styles for custom size and color
  const iconStyle: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    ...(color && !['neutral', 'info', 'success', 'warning', 'danger'].includes(color) && {
      color: color
    }),
  }

  return (
    <IconComponent
      className={iconClassName}
      style={iconStyle}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      data-testid={dataTestId}
      {...rest}
    />
  )
}

// Hook to access icon dictionary
export function useIconDictionary() {
  const context = useContext(IconDictionaryContext)
  if (!context) {
    throw new Error('useIconDictionary must be used within an IconDictionaryProvider')
  }
  return context
}

// Common icon components (can be used directly or in dictionary)
export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
)

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"
    />
  </svg>
)

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
      clipRule="evenodd"
    />
  </svg>
)

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z"
      clipRule="evenodd"
    />
  </svg>
)

// Default icon dictionary
export const defaultIcons = {
  check: CheckIcon,
  close: CloseIcon,
  search: SearchIcon,
  'chevron-down': ChevronDownIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
}

// Export types
export type { DynIconProps, IconDictionaryProviderProps }