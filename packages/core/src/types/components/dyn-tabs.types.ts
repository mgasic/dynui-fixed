import type { ReactNode } from 'react'

/**
 * Individual tab item interface
 */
export interface TabItem {
  /** Unique key for React rendering */
  key: string
  /** Value used for selection state */
  value: string
  /** Display label for the tab */
  label: string
  /** Whether tab is disabled */
  disabled?: boolean
}

/**
 * Props for DynTabs container component
 * Manages tab selection state and keyboard navigation
 */
export interface DynTabsProps {
  /** Currently selected tab value (controlled) */
  value?: string
  /** Default selected tab value (uncontrolled) */
  defaultValue?: string
  /** Called when selected tab changes */
  onChange?: (value: string) => void
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Activation behavior (auto activates on focus, manual requires Enter/Space) */
  activation?: 'auto' | 'manual'
  /** Tab and panel children */
  children?: ReactNode
  /** Test identifier */
  'data-testid'?: string
  /** Additional CSS class */
  className?: string
  /** Arbitrary props passthrough */
  [key: string]: unknown
}

/**
 * Props for individual DynTab component
 */
export interface DynTabProps {
  /** Tab item configuration */
  item: TabItem
  /** Whether tab is disabled */
  disabled?: boolean
  /** Whether the tab is currently active */
  isActive?: boolean
  /** Called when tab should become active */
  onSelect?: (value: string) => void
  /** Activation behavior override */
  activation?: 'auto' | 'manual'
  /** Additional CSS class */
  className?: string
  /** Tab contents */
  children?: ReactNode
  /** Arbitrary props passthrough */
  [key: string]: unknown
}

/**
 * Props for DynTabPanel component
 */
export interface DynTabPanelProps {
  /** Associated tab item */
  item: TabItem
  /** Panel content */
  children?: ReactNode
  /** Whether the panel is active */
  isActive?: boolean
  /** Additional CSS class */
  className?: string
  /** Arbitrary props passthrough */
  [key: string]: unknown
}

/**
 * Ref methods for DynTabs mini API
 * Provides programmatic control over tab focus and selection
 */
export interface DynTabsRef {
  /** Focus the first tab */
  focusFirst(): void
  /** Focus the last tab */
  focusLast(): void
  /** Focus tab with specific value */
  focus(value: string): void
  /** Get currently focused tab value */
  getFocused(): string | null
  /** Get currently selected tab value */
  getSelected(): string | null
}