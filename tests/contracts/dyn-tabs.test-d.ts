import { expectType } from 'tsd'
import { DynTabs, DynTab, DynTabPanel } from '../../src/ui/dyn-tabs'
import type { DynTabsProps, DynTabItem } from '../../src/types/components/dyn-tabs.types'

// Test compound component pattern
expectType<React.ComponentType<React.PropsWithChildren<DynTabsProps>>>(DynTabs)
expectType<React.ComponentType<{ item: DynTabItem }>>(DynTab)
expectType<React.ComponentType<React.PropsWithChildren<{ item: DynTabItem }>>>(DynTabPanel)

// Test controlled/uncontrolled
expectType<string | undefined>({} as DynTabsProps['value'])
expectType<string | undefined>({} as DynTabsProps['defaultValue'])
expectType<((value: string) => void) | undefined>({} as DynTabsProps['onChange'])

// Test WAI-ARIA props
expectType<'horizontal' | 'vertical' | undefined>({} as DynTabsProps['orientation'])
expectType<'auto' | 'manual' | undefined>({} as DynTabsProps['activation'])
