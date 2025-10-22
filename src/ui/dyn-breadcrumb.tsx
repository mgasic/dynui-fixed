import type { DynBreadcrumbProps, DynBreadcrumbItemProps, BreadcrumbItem } from '../types/components/dyn-breadcrumb.types'
import { classNames } from '../utils'

export function DynBreadcrumb({
  as: As = 'nav',
  items = [],
  separator = '/',
  maxItems,
  'aria-label': ariaLabel = 'Breadcrumb',
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId,
  children
}: React.PropsWithChildren<DynBreadcrumbProps>) {
  const displayItems = maxItems && items.length > maxItems
    ? [
        ...items.slice(0, 1),
        { key: 'ellipsis', value: 'ellipsis', label: '...' },
        ...items.slice(-maxItems + 2)
      ]
    : items

  return (
    <As
      role="navigation"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      data-testid={dataTestId}
      className="dyn-breadcrumb"
    >
      <ol className="dyn-breadcrumb__list">
        {children || displayItems.map((item, index) => (
          <DynBreadcrumbItem
            key={item.key}
            item={item}
            isLast={index === displayItems.length - 1}
            separator={separator}
          />
        ))}
      </ol>
    </As>
  )
}

export function DynBreadcrumbItem({
  item,
  isLast = false,
  separator,
  onClick
}: DynBreadcrumbItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled || isLast || item.value === 'ellipsis') {
      e.preventDefault()
      return
    }
    onClick?.(item.value)
  }

  const content = item.href ? (
    <a
      href={item.href}
      className={classNames(
        'dyn-breadcrumb__link',
        item.disabled && 'dyn-breadcrumb__link--disabled',
        isLast && 'dyn-breadcrumb__link--current'
      )}
      aria-current={isLast ? 'page' : undefined}
      aria-disabled={item.disabled}
      onClick={handleClick}
    >
      {item.label}
    </a>
  ) : (
    <span
      className={classNames(
        'dyn-breadcrumb__text',
        isLast && 'dyn-breadcrumb__text--current'
      )}
      aria-current={isLast ? 'page' : undefined}
    >
      {item.label}
    </span>
  )

  return (
    <li className="dyn-breadcrumb__item">
      {content}
      {!isLast && (
        <span className="dyn-breadcrumb__separator" aria-hidden="true">
          {separator}
        </span>
      )}
    </li>
  )
}
