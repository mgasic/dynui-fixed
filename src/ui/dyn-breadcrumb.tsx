import React, { forwardRef } from 'react';
import type {
  DynBreadcrumbProps,
  DynBreadcrumbItemProps,
  DynBreadcrumbItemConfig
} from '../types/components/dyn-breadcrumb.types';
import { classNames } from '../utils';

export const DynBreadcrumb = forwardRef<HTMLElement, DynBreadcrumbProps>(
  (
    (
      {
        items,
        separator = '/',
        maxItems,
        truncation,
        children,
        className,
        'aria-label': ariaLabel = 'Breadcrumb',
        'data-testid': testId,
        ...props
      },
      ref
    ) => {
      const renderItemsFromArray = Array.isArray(items);

      const renderSequenceFromItems = (itemList: DynBreadcrumbItemConfig[]) => {
        const totalItems = itemList.length;

        if (!totalItems) {
          return [];
        }

        const createEntry = (item: DynBreadcrumbItemConfig, index: number) => ({
          kind: 'item' as const,
          item,
          index
        });

        if (typeof maxItems !== 'number' || maxItems <= 0 || totalItems <= maxItems) {
          return itemList.map((item, index) => createEntry(item, index));
        }

        if (maxItems <= 1) {
          return [createEntry(itemList[totalItems - 1], totalItems - 1)];
        }

        const { itemsBefore = 1, itemsAfter = 1, ellipsisLabel = '...' } = truncation || {};
        const availableSlots = Math.max(maxItems - 1, 1);

        let beforeCount = Math.max(
          0,
          Math.min(itemsBefore, availableSlots, totalItems - 1)
        );
        let afterCount = Math.max(
          0,
          Math.min(itemsAfter, availableSlots - beforeCount, totalItems - beforeCount - 1)
        );

        if (afterCount === 0 && totalItems - beforeCount - 1 > 0) {
          afterCount = Math.min(totalItems - beforeCount - 1, availableSlots - beforeCount);
          if (afterCount === 0) {
            afterCount = 1;
            beforeCount = Math.max(0, availableSlots - afterCount);
          }
        }

        if (beforeCount + afterCount >= totalItems) {
          return itemList.map((item, index) => createEntry(item, index));
        }

        const beforeIndexes = Array.from({ length: beforeCount }, (_, idx) => idx);
        const afterIndexes = Array.from({ length: afterCount }, (_, idx) => totalItems - afterCount + idx);

        return [
          ...beforeIndexes.map((idx) => createEntry(itemList[idx], idx)),
          { kind: 'ellipsis' as const, label: ellipsisLabel },
          ...afterIndexes.map((idx) => createEntry(itemList[idx], idx))
        ];
      };

      const renderListFromChildren = () =>
        React.Children.map(children, (child, index) => {
          if (React.isValidElement<DynBreadcrumbItemProps>(child) && child.type === DynBreadcrumbItem) {
            const isLast = index === React.Children.count(children) - 1;
            return React.cloneElement(child, {
              ...child.props,
              isLast,
              key: child.key || index
            });
          }
          return child;
        });

      const renderedSequence = renderItemsFromArray
        ? renderSequenceFromItems(items)
        : [];

      const totalItems = renderItemsFromArray ? items.length : 0;

      const content = renderItemsFromArray
        ? renderedSequence.map((entry, index) => {
            if (entry.kind === 'ellipsis') {
              const isLast = index === renderedSequence.length - 1;
              return (
                <li
                  key={`ellipsis-${index}`}
                  className="dyn-breadcrumb__item dyn-breadcrumb__item--ellipsis"
                >
                  <span className="dyn-breadcrumb__ellipsis" aria-hidden="true">
                    {entry.label}
                  </span>
                  {!isLast && (
                    <span className="dyn-breadcrumb__separator" aria-hidden="true">
                      {separator}
                    </span>
                  )}
                </li>
              );
            }

            const { item, index: itemIndex } = entry;
            const itemKey = item.key ?? item.value ?? `breadcrumb-${index}`;
            const resolvedSeparator =
              index < renderedSequence.length - 1
                ? item.separator ?? separator
                : undefined;

            return (
              <li key={itemKey} className="dyn-breadcrumb__item">
                {item.href ? (
                  <a
                    href={item.href}
                    className="dyn-breadcrumb__link"
                    aria-current={itemIndex === totalItems - 1 ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="dyn-breadcrumb__text"
                    aria-current={itemIndex === totalItems - 1 ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {resolvedSeparator !== undefined && (
                  <span className="dyn-breadcrumb__separator" aria-hidden="true">
                    {resolvedSeparator}
                  </span>
                )}
              </li>
            );
          })
        : renderListFromChildren();

      return (
        <nav
          {...props}
          ref={ref}
          aria-label={ariaLabel}
          className={classNames('dyn-breadcrumb', className)}
          data-testid={testId}
        >
          <ol className="dyn-breadcrumb__list">{content}</ol>
        </nav>
      );
    }
  )
);

DynBreadcrumb.displayName = 'DynBreadcrumb';

export const DynBreadcrumbItem = forwardRef<HTMLLIElement, DynBreadcrumbItemProps>(
  ({ children, href, isLast, className, 'data-testid': testId, ...props }, ref) => (
    <li
      {...props}
      ref={ref}
      className={classNames('dyn-breadcrumb__item', className)}
      data-testid={testId}
    >
      {href ? (
        <a href={href} className="dyn-breadcrumb__link" aria-current={isLast ? 'page' : undefined}>
          {children}
        </a>
      ) : (
        <span className="dyn-breadcrumb__text" aria-current={isLast ? 'page' : undefined}>
          {children}
        </span>
      )}
      {!isLast && <span className="dyn-breadcrumb__separator">/</span>}
    </li>
  )
);

DynBreadcrumbItem.displayName = 'DynBreadcrumbItem';