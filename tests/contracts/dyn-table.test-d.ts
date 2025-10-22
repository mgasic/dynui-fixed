import { expectType } from 'tsd'
import { DynTable } from '../../src/ui/dyn-table'
import type { DynTableProps, TableColumn, TableSortState } from '../../src/types/components/dyn-table.types'

// Test component type
expectType<React.ComponentType<DynTableProps>>(DynTable)

// Test required props
expectType<TableColumn[]>({} as DynTableProps['columns'])
expectType<Record<string, any>[]>({} as DynTableProps['data'])

// Test sorting functionality
expectType<boolean | undefined>({} as DynTableProps['sortable'])
expectType<TableSortState | undefined>({} as DynTableProps['sortState'])
expectType<((key: string, direction: 'asc' | 'desc') => void) | undefined>({} as DynTableProps['onSort'])

// Test column structure
expectType<{ key: string; label: string; sortable?: boolean; width?: string }>(null as any as TableColumn)
