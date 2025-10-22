import React, { forwardRef, useRef, useState } from 'react';
import type { DynTableProps, DynTableSort } from '../types/components/dyn-table.types';
import { useArrowNavigation } from '../hooks/useArrowNavigation';
import { classNames } from '../utils/classNames';

export const DynTable = forwardRef<HTMLTableElement, DynTableProps>(
  ({
    columns,
    data,
    sortable = false,
    onSort,
    className,
    'data-testid': testId,
    ...props
  }, ref) => {
    const [sortState, setSortState] = useState<DynTableSort | null>(null);
    
    // Handle sorting - safe implementation without regex literals
    const handleSort = (columnKey: string) => {
      if (!sortable || !onSort) return;
      
      const newDirection = 
        sortState?.column === columnKey && sortState.direction === 'asc'
          ? 'desc'
          : 'asc';
      
      const newSortState = { column: columnKey, direction: newDirection };
      setSortState(newSortState);
      onSort(newSortState);
    };

    // Map aria-sort values to WAI-ARIA tokens
    const getAriaSort = (columnKey: string): 'none' | 'ascending' | 'descending' => {
      if (sortState?.column !== columnKey) return 'none';
      return sortState.direction === 'asc' ? 'ascending' : 'descending';
    };

    // Arrow navigation for table rows
    const { containerRef } = useArrowNavigation({
      orientation: 'vertical',
      selector: 'tbody tr[tabindex="0"]',
      typeahead: false
    });

    return (
      <div ref={containerRef} className={classNames('dyn-table-container', className)}>
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
                  {column.header}
                  {sortable && column.sortable && sortState?.column === column.key && (
                    <span className="dyn-table__sort-indicator">
                      {sortState.direction === 'asc' ? '↑' : '↓'}
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