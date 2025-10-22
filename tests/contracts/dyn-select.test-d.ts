import { expectType } from 'tsd'
import { DynSelect } from '../../src/ui/dyn-select'
import type { DynSelectProps, SelectOption } from '../../src/types/components/dyn-select.types'

// Test component type
expectType<React.ComponentType<DynSelectProps>>(DynSelect)

// Test controlled pattern
expectType<string | undefined>({} as DynSelectProps['value'])
expectType<string | undefined>({} as DynSelectProps['defaultValue'])
expectType<((value: string) => void) | undefined>({} as DynSelectProps['onChange'])

// Test options array
expectType<SelectOption[] | undefined>({} as DynSelectProps['options'])
expectType<{ value: string; label: string; disabled?: boolean }>(null as any as SelectOption)

// Test accessibility and search
expectType<boolean | undefined>({} as DynSelectProps['searchable'])
expectType<string | undefined>({} as DynSelectProps['aria-label'])
