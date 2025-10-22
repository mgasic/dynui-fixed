import React, { forwardRef, useState } from 'react';
import type { DynTabsProps, DynTabProps, DynTabPanelProps } from '../types/components/dyn-tabs.types';
import { useArrowNavigation } from '../hooks/use-arrow-navigation';
import { classNames } from '../utils';

export const DynTabs = forwardRef<HTMLDivElement, DynTabsProps>(
  ({
    value,
    defaultValue,
    orientation = 'horizontal',
    children,
    className,
    onChange,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [activeTab, setActiveTab] = useState(value || defaultValue || '');
    
    const { containerRef } = useArrowNavigation({
      orientation,
      selector: '[role="tab"]:not([aria-disabled="true"])',
      typeahead: false
    });

    const handleTabChange = (tabValue: string) => {
      if (value === undefined) {
        setActiveTab(tabValue);
      }
      onChange?.(tabValue);
    };

    const currentTab = value ?? activeTab;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames('dyn-tabs', `dyn-tabs--${orientation}`, className)}
        data-testid={testId}
      >
        <div
          ref={containerRef}
          role="tablist"
          className="dyn-tabs__list"
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DynTab) {
              return React.cloneElement(child, {
                isActive: child.props.value === currentTab,
                onSelect: handleTabChange
              });
            }
            return null;
          })}
        </div>
        <div className="dyn-tabs__content">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === DynTabPanel) {
              return React.cloneElement(child, {
                isActive: child.props.value === currentTab
              });
            }
            return null;
          })}
        </div>
      </div>
    );
  }
);

DynTabs.displayName = 'DynTabs';

export const DynTab = forwardRef<HTMLButtonElement, DynTabProps>(
  ({ value, children, isActive, onSelect, disabled, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={classNames(
        'dyn-tab',
        isActive && 'dyn-tab--active',
        disabled && 'dyn-tab--disabled',
        className
      )}
      onClick={() => !disabled && onSelect?.(value)}
    >
      {children}
    </button>
  )
);

DynTab.displayName = 'DynTab';

export const DynTabPanel = forwardRef<HTMLDivElement, DynTabPanelProps>(
  ({ value, children, isActive, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      hidden={!isActive}
      className={classNames('dyn-tab-panel', className)}
    >
      {children}
    </div>
  )
);

DynTabPanel.displayName = 'DynTabPanel';