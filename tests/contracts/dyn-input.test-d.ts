import { expectType } from 'tsd'
import { DynInput } from '../../src/ui/dyn-input'
import type { DynInputProps } from '../../src/types/components/dyn-input.types'

// Test controlled/uncontrolled pattern
expectType<React.ComponentType<DynInputProps>>(DynInput)

// Test value prop types
expectType<string | undefined>({} as DynInputProps['value'])
expectType<string | undefined>({} as DynInputProps['defaultValue'])
expectType<((value: string) => void) | undefined>({} as DynInputProps['onChange'])

// Test required accessibility props
expectType<string | undefined>({} as DynInputProps['aria-label'])
expectType<string | undefined>({} as DynInputProps['data-testid'])
