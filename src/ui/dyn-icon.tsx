import type { DynIconProps } from '../types/components/dyn-icon.types'
import { useIconDictionary } from '../icons/use-icon-dictionary'
import { classNames } from '../utils'

export function DynIcon({
  name,
  size = 'md',
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  'data-testid': dataTestId
}: DynIconProps) {
  const { icons } = useIconDictionary()
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.warn(`DynIcon: Icon "${name}" not found in icon dictionary`)
    return null
  }

  const sizeValue = typeof size === 'number' ? `${size}px` : undefined

  const cls = classNames(
    'dyn-icon',
    typeof size === 'string' && `dyn-icon--${size}`,
    color && `dyn-icon--${color}`
  )

  return (
    <IconComponent
      className={cls}
      style={{
        width: sizeValue,
        height: sizeValue
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden || !ariaLabel}
      data-testid={dataTestId}
    />
  )
}
