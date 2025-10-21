import type { DynTableProps, TableSortState } from '../types/components/dyn-table.types'
import { classNames } from '../utils'

export function DynTable({
  columns,
  data,
  sortable = false,
  sortState,
  onSort,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'data-testid': dataTestId
}: DynTableProps) {
  const handleSort = (key: string) => {
    if (!sortable || !onSort) return
    const direction = sortState?.key === key && sortState.direction === 'asc' ? 'desc' : 'asc'
    onSort(key, direction)
  }

  return (
    <table
      className="dyn-table"
      role="table"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      data-testid={dataTestId}
    >
      <thead>
        <tr role="row">
          {columns.map((col) => {
            const isSorted = sortState?.key === col.key
            const canSort = sortable && col.sortable !== false
            return (
              <th
                key={col.key}
                role="columnheader"
                aria-sort={isSorted ? sortState.direction : 'none'}
                className={classNames(
                  'dyn-table__header',
                  canSort && 'dyn-table__header--sortable',
                  isSorted && `dyn-table__header--sorted-${sortState.direction}`
                )}
                style={{ width: col.width }}
                onClick={canSort ? () => handleSort(col.key) : undefined}
              >
                {col.label}
                {canSort && (
                  <span className="dyn-table__sort-indicator" aria-hidden="true">
                    {isSorted ? (sortState.direction === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                )}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} role="row">
            {columns.map((col) => (
              <td key={col.key} role="gridcell" className="dyn-table__cell">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
