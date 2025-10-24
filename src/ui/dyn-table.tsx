import { forwardRef, useState } from 'react';
import type { RefObject } from 'react';
import type { DynTableProps, DynTableSort } from '../types/components/dyn-table.types';
import { useArrowNavigation } from '../hooks/use-arrow-navigation';
import { classNames } from '../utils';

export const DynTable = forwardRef<HTMLTableElement, DynTableProps>(
  ({
    columns,
    data,
    sortable = false,
    sortState: controlledSortState,
    onSort,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [internalSortState, setInternalSortState] = useState<DynTableSort | null>(null);

    const mapToDynSort = (
      sort: DynTableSort | DynTableProps['sortState'] | null
    ): DynTableSort | null => {
      if (!sort) return null;
      if ('column' in sort) {
        return sort;
      }
      return { column: sort.key, direction: sort.direction };
    };

    const isControlled = controlledSortState !== undefined;
    const effectiveSortState = mapToDynSort(
      isControlled ? controlledSortState : internalSortState
    );

    const handleSort = (columnKey: string) => {
      if (!sortable || !onSort) return;

      const isSameColumn = effectiveSortState?.column === columnKey;
      const newDirection = isSameColumn && effectiveSortState?.direction === 'asc'
        ? 'desc'
        : 'asc';

      if (!isControlled) {
        setInternalSortState({ column: columnKey, direction: newDirection });
      }

      onSort(columnKey, newDirection);
    };

    const getAriaSort = (columnKey: string): 'none' | 'ascending' | 'descending' => {
      if (effectiveSortState?.column !== columnKey) return 'none';
      return effectiveSortState.direction === 'asc' ? 'ascending' : 'descending';
    };

    const { containerRef } = useArrowNavigation({
      orientation: 'vertical',
      selector: 'tbody tr[tabindex="0"]'
    });

    return (
      <div ref={containerRef as RefObject<HTMLDivElement>} className={classNames('dyn-table-container', className)}>
        <table
          {...props}
          ref={ref}
          className="dyn-table"
          data-testid={testId}
          role="table"
        >
          <thead>
            <tr role="row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  role="columnheader"
                  aria-sort={getAriaSort(column.key)}
                  className={classNames(
                    'dyn-table__header',
                    sortable && column.sortable && 'dyn-table__header--sortable'
                  )}
                  onClick={sortable && column.sortable ? () => handleSort(column.key) : undefined}
                  tabIndex={sortable && column.sortable ? 0 : -1}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && sortable && column.sortable) {
                      e.preventDefault();
                      handleSort(column.key);
                    }
                  }}
                >
                  {column.label}
                  {sortable && column.sortable && effectiveSortState?.column === column.key && (
                    <span className="dyn-table__sort-indicator">
                      {effectiveSortState.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                role="row"
                tabIndex={0}
                className="dyn-table__row"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    role="cell"
                    className="dyn-table__cell"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

DynTable.displayName = 'DynTable';