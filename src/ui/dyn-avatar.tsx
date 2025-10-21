import type { DynAvatarProps } from '../types/components/dyn-avatar.types'
import { classNames, generateInitials } from '../utils'

export function DynAvatar({
  children,
  variant = 'solid',
  size = 'md',
  color = 'neutral',
  src,
  alt,
  'aria-label': ariaLabel,
  'data-testid': dataTestId
}: DynAvatarProps) {
  const cls = classNames(
    'dyn-avatar',
    `dyn-avatar--${variant}`,
    `dyn-avatar--${size}`,
    `dyn-avatar--${color}`
  )

  const content = src ? (
    <img src={src} alt={alt || ''} className="dyn-avatar__image" />
  ) : children ? (
    typeof children === 'string' ? generateInitials(children) : children
  ) : null

  return (
    <div
      className={cls}
      role="img"
      aria-label={ariaLabel || alt}
      data-testid={dataTestId}
    >
      {content}
    </div>
  )
}
