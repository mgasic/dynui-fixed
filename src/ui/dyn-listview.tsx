import { useState, forwardRef, useCallback, useEffect } from 'react';
import type { MutableRefObject } from 'react';
import type { DynListViewProps } from '../types/components/dyn-listview.types';
import { useArrowNavigation } from '../hooks/use-arrow-navigation';
import { classNames } from '../utils';

export const DynListView = forwardRef<HTMLDivElement, DynListViewProps>(
  ({
    items = [],
    value,
    defaultValue,
    onSelectionChange,
    multiSelect = false,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const isControlled = value !== undefined;

    const toSelectionArray = useCallback(
      (input: string | string[] | undefined, allowMultiple: boolean): string[] => {
        if (input === undefined) return [];
        const arrayValue = Array.isArray(input) ? input : input ? [input] : [];
        return allowMultiple ? arrayValue : arrayValue.slice(0, 1);
      },
      []
    );

    const [uncontrolledSelection, setUncontrolledSelection] = useState<string[]>(() =>
      toSelectionArray(defaultValue, multiSelect)
    );

    const selectedValues = isControlled
      ? toSelectionArray(value, multiSelect)
      : uncontrolledSelection;

    useEffect(() => {
      if (isControlled || multiSelect) {
        return;
      }

      setUncontrolledSelection(prev => prev.slice(0, 1));
    }, [isControlled, multiSelect]);

    const { containerRef } = useArrowNavigation({
      orientation: 'vertical',
      selector: '.dyn-list-item:not(.dyn-list-item--disabled)'
    });

    const mergeRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [containerRef, ref]
    );

    const handleItemSelect = (itemId: string) => {
      const currentSelection = selectedValues;
      const nextSelection = multiSelect
        ? currentSelection.includes(itemId)
          ? currentSelection.filter(id => id !== itemId)
          : [...currentSelection, itemId]
        : [itemId];

      if (!isControlled) {
        setUncontrolledSelection(nextSelection);
      }

      onSelectionChange?.(nextSelection);
    };

    return (
      <div
        {...props}
        ref={mergeRefs}
        role="listbox"
        aria-multiselectable={multiSelect}
        className={classNames('dyn-list-view', className)}
        data-testid={testId}
      >
        {items.map((item, index) => {
          const isSelected = selectedValues.includes(item.value);

          return (
            <div
              key={item.key ?? item.value ?? index}
              role="option"
              aria-selected={isSelected}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : 0}
              className={classNames(
                'dyn-list-item',
                isSelected && 'dyn-list-item--selected',
                item.disabled && 'dyn-list-item--disabled'
              )}
              onClick={() => !item.disabled && handleItemSelect(item.value)}
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
