import { useState, forwardRef, useCallback, type MutableRefObject } from 'react';
import type { DynListViewProps } from '../types/components/dyn-listview.types';
import { useArrowNavigation } from '../hooks/use-arrow-navigation';
import { classNames } from '../utils';

export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>(
  ({
    items = [],
    selectedItem,
    onSelectionChange,
    multiSelect = false,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const { containerRef } = useArrowNavigation({
      orientation: 'vertical',
      selector: '.dyn-list-item:not(.dyn-list-item--disabled)'
    });

    const assignRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as MutableRefObject<HTMLDivElement | null>).current = node;
        if (!ref) return;
        if (typeof ref === 'function') {
          (ref as (instance: HTMLDivElement | null) => void)(node);
        } else {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [containerRef, ref]
    );

    const handleItemSelect = (itemId: string) => {
      if (multiSelect) {
        const newSelection = selectedItems.includes(itemId)
          ? selectedItems.filter(id => id !== itemId)
          : [...selectedItems, itemId];
        setSelectedItems(newSelection);
        onSelectionChange?.(newSelection);
      } else {
        onSelectionChange?.([itemId]);
      }
    };

    return (
      <div
        {...props}
        ref={assignRefs}
        role="listbox"
        aria-multiselectable={multiSelect}
        className={classNames('dyn-list-view', className)}
        data-testid={testId}
      >
        {items.map((item, index) => {
          const isSelected = multiSelect 
            ? selectedItems.includes(item.id)
            : selectedItem === item.id;
            
          return (
            <div
              key={item.id || index}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              className={classNames(
                'dyn-list-item',
                isSelected && 'dyn-list-item--selected',
                item.disabled && 'dyn-list-item--disabled'
              )}
              onClick={() => !item.disabled && handleItemSelect(item.id)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }
);

DynListView.displayName = 'DynListView';