import React, { forwardRef } from 'react';
import type { ReactElement } from 'react';
import type { DynMenuProps, DynMenuItemProps } from '../types/components/dyn-menu.types';
import { classNames } from '../utils';

export const DynMenu = forwardRef<HTMLDivElement, DynMenuProps>(
  ({ 
    children, 
    orientation = 'vertical',
    onAction,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const handleAction = (key: string) => {
      onAction?.(key);
    };

    return (
      <div
        {...props}
        ref={ref}
        role="menu"
        className={classNames('dyn-menu', `dyn-menu--${orientation}`, className)}
        data-testid={testId}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DynMenuItem) {
            return React.cloneElement(child as ReactElement<DynMenuItemProps>, {
              onAction: handleAction,
              key: child.key || index
            });
          }
          return child;
        })}
      </div>
    );
  }
);

DynMenu.displayName = 'DynMenu';

export const DynMenuItem = forwardRef<HTMLButtonElement, DynMenuItemProps>(
  ({ 
    children,
    disabled = false,
    action,
    onAction,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const handleClick = () => {
      if (!disabled && action) {
        onAction?.(action);
      }
    };

    return (
      <button
        {...props}
        ref={ref}
        role="menuitem"
        disabled={disabled}
        className={classNames('dyn-menu-item', disabled && 'dyn-menu-item--disabled', className)}
        onClick={handleClick}
        data-testid={testId}
      >
        {children}
      </button>
    );
  }
);

DynMenuItem.displayName = 'DynMenuItem';