import React, { forwardRef } from 'react';
import type { DynBreadcrumbProps, DynBreadcrumbItemProps } from '../types/components/dyn-breadcrumb.types';
import { classNames } from '../utils';

export const DynBreadcrumb = forwardRef<HTMLNavElement, DynBreadcrumbProps>(
  ({ children, className, 'data-testid': testId, ...props }, ref) => (
    <nav
      {...props}
      ref={ref}
      aria-label="Breadcrumb"
      className={classNames('dyn-breadcrumb', className)}
      data-testid={testId}
    >
      <ol className="dyn-breadcrumb__list">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DynBreadcrumbItem) {
            const isLast = index === React.Children.count(children) - 1;
            return React.cloneElement(child, {
              isLast,
              key: child.key || index
            });
          }
          return child;
        })}
      </ol>
    </nav>
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