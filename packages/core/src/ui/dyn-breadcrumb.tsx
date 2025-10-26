import type { ElementType, MouseEvent as ReactMouseEvent, MouseEventHandler } from 'react'
import type { DynBreadcrumbProps, DynBreadcrumbItemProps } from '../types/components/dyn-breadcrumb.types'
import { classNames } from '../utils'

export function DynBreadcrumb({
  children,
  separator = '/',
  size = 'md',
  'aria-label': ariaLabel = 'Breadcrumb',
  'data-testid': dataTestId
}: DynBreadcrumbProps) {
  const cls = classNames(
    'dyn-breadcrumb',
    `dyn-breadcrumb--${size}`
  )

  return (
    <nav
      className={cls}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      <ol className="dyn-breadcrumb__list">
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <li key={index} className="dyn-breadcrumb__item">
                {child}
                {index < children.length - 1 && (
                  <span className="dyn-breadcrumb__separator" aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            ))
          : <li className="dyn-breadcrumb__item">{children}</li>
        }
      </ol>
    </nav>
  )
}

export function DynBreadcrumbItem({
  as: As = 'span',
  children,
  href,
  current = false,
  disabled = false,
  onClick,
  'aria-current': ariaCurrent,
  'data-testid': dataTestId
}: DynBreadcrumbItemProps) {
  const cls = classNames(
    'dyn-breadcrumb-item',
    current ? 'dyn-breadcrumb-item--current' : undefined,
    disabled ? 'dyn-breadcrumb-item--disabled' : undefined
  )

  const Component = (href ? 'a' : As) as ElementType

  const componentProps: Record<string, unknown> = {
    className: cls,
    'aria-current': current ? (ariaCurrent || 'page') : undefined,
    'data-testid': dataTestId,
    children
  }

  if (href) {
    componentProps.href = href
  }

  if (onClick) {
    componentProps.onClick = onClick
  }

  const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <Component
      className={cls}
      href={href}
      onClick={handleClick as MouseEventHandler}
      aria-current={current ? (ariaCurrent || 'page') : undefined}
      data-testid={dataTestId}
    >
      {children}
    </Component>
  )
}