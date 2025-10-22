// dyn-table.tsx map aria-sort values to WAI-ARIA tokens
const ariaSort: 'none' | 'ascending' | 'descending' =
  sortState?.direction === 'asc' ? 'ascending' :
  sortState?.direction === 'desc' ? 'descending' :
  'none'
<th aria-sort={ariaSort} />
