import React, { forwardRef } from 'react';
import type { ReactElement } from 'react';
import type {
  DynMenuProps,
  DynMenuItemProps,
  DynMenuItemConfig
} from '../types/components/dyn-menu.types';
import { classNames } from '../utils';

interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, 'data-testid': testId, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="separator"
      className={className}
      data-testid={testId}
      aria-hidden="true"
    />
  )
);

MenuSeparator.displayName = 'MenuSeparator';

export const DynMenu = forwardRef<HTMLDivElement, DynMenuProps>(
  ({
    children,
    items,
    orientation = 'vertical',
    onAction,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const handleAction = (value: string | undefined) => {
      onAction?.(value);
    };

    const renderItemFromConfig = (item: DynMenuItemConfig, index: number) => (
      <DynMenuItem
        key={`dyn-menu-config-${item.value ?? item.type}-${index}`}
        item={item}
        onAction={handleAction}
      />
    );

    const mappedItems = items?.map((item, index) => renderItemFromConfig(item, index));

    return (
      <div
        {...props}
        ref={ref}
        role="menu"
        className={classNames('dyn-menu', `dyn-menu--${orientation}`, className)}
        {...(testId !== undefined ? { 'data-testid': testId } : {})}
      >
        {mappedItems}
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

export const DynMenuItem = forwardRef<HTMLElement, DynMenuItemProps>(
  ({
    item,
    children,
    disabled: disabledProp = false,
    action,
    onAction,
    shortcut: shortcutProp,
    className,
    'data-testid': testId,
    value: valueProp,
    onClick: userOnClick,
    ...restProps
  }, ref) => {
    if (item?.type === 'divider') {
      const menuSeparatorProps: MenuSeparatorProps = {
        className: classNames('dyn-menu-divider', className)
      };

      if (typeof testId === 'string') {
        menuSeparatorProps['data-testid'] = testId;
      }

      return (
        <MenuSeparator
          ref={ref as React.ForwardedRef<HTMLDivElement>}
          {...menuSeparatorProps}
        />
      );
    }

    const disabled = item?.disabled ?? disabledProp;
    const inferredValue =
      typeof valueProp === 'string' ? valueProp : undefined;
    const value = item?.value ?? inferredValue ?? action;
    const label = item?.label ?? children;
    const shortcut = item?.shortcut ?? shortcutProp;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onAction?.(value);
      }
      userOnClick?.(event);
    };

    return (
      <button
        {...restProps}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        role="menuitem"
        type="button"
        value={valueProp}
        disabled={disabled}
        className={classNames('dyn-menu-item', disabled && 'dyn-menu-item--disabled', className)}
        onClick={handleClick}
        {...(typeof testId === 'string' ? { 'data-testid': testId } : {})}
      >
        {label}
        {shortcut ? <span className="dyn-menu-item__shortcut">{shortcut}</span> : null}
      </button>
    );
  }
);

DynMenuItem.displayName = 'DynMenuItem';