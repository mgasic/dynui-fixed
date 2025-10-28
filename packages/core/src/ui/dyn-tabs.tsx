import React, {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'
import type {
  DynTabsProps,
  DynTabProps,
  DynTabPanelProps,
  DynTabsRef,
  TabItem
} from '../types/components/dyn-tabs.types'
import { useArrowNavigation } from '../hooks/use-arrow-navigation'
import { classNames } from '../utils'

const getItemValue = (item?: TabItem): string => item?.value ?? ''

const sanitizeValueForId = (value: string): string => value.replace(/\s+/g, '-')

export const DynTabs = forwardRef<DynTabsRef, DynTabsProps>(
  (
    {
      value,
      defaultValue,
      orientation = 'horizontal',
      activation = 'auto',
      children,
      className,
      onChange,
      'data-testid': testId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const {
      focusFirst,
      focusLast,
      focusIndex,
      getFocusableElements,
      setContainerRef
    } = useArrowNavigation({
      orientation,
      selector: '[role="tab"]:not([aria-disabled="true"])',
      loop: true
    })
    const baseId = useId()

    const firstAvailableValue = useMemo(() => {
      let firstValue = ''

      React.Children.forEach(children, child => {
        if (
          firstValue === '' &&
          React.isValidElement<React.ComponentProps<typeof DynTab>>(child) &&
          child.type === DynTab &&
          child.props.item &&
          !child.props.item.disabled
        ) {
          firstValue = getItemValue(child.props.item)
        }
      })

      return firstValue
    }, [children])

    const [activeTab, setActiveTab] = useState<string>(
      () => value ?? defaultValue ?? firstAvailableValue
    )

    const handleTabChange = useCallback(
      (tabValue: string) => {
        if (value === undefined) {
          setActiveTab(tabValue)
        }
        onChange?.(tabValue)
      },
      [onChange, value]
    )

    const handleTabFocus = useCallback(
      (tabValue: string) => {
        if (activation === 'auto') {
          handleTabChange(tabValue)
        }
      },
      [activation, handleTabChange]
    )

    const currentTab = value ?? activeTab

    const focusableTabs = useCallback(() => {
      return getFocusableElements()
    }, [getFocusableElements])

    const focusAtIndex = useCallback(
      (index: number) => {
        const tabs = focusableTabs()
        const total = tabs.length
        if (total === 0) return
        const normalizedIndex = ((index % total) + total) % total
        focusIndex(normalizedIndex)
      },
      [focusIndex, focusableTabs]
    )

    const focusTabByValue = useCallback(
      (tabValue: string) => {
        const tabs = focusableTabs()
        const targetIndex = tabs.findIndex(tab => tab.dataset.value === tabValue)
        if (targetIndex >= 0) {
          focusAtIndex(targetIndex)
        }
      },
      [focusAtIndex, focusableTabs]
    )

    const focusFirstTab = useCallback(() => {
      focusFirst()
    }, [focusFirst])

    const focusLastTab = useCallback(() => {
      focusLast()
    }, [focusLast])

    const focusNextTab = useCallback(() => {
      const tabs = focusableTabs()
      if (tabs.length === 0) return
      const currentIndex = tabs.findIndex(tab => tab === document.activeElement)
      const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0
      focusAtIndex(nextIndex)
    }, [focusAtIndex, focusableTabs])

    const focusPreviousTab = useCallback(() => {
      const tabs = focusableTabs()
      if (tabs.length === 0) return
      const currentIndex = tabs.findIndex(tab => tab === document.activeElement)
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
      focusAtIndex(previousIndex)
    }, [focusAtIndex, focusableTabs])

    useImperativeHandle(
      ref,
      () => ({
        root: rootRef.current,
        focusTab: focusTabByValue,
        focusFirstTab,
        focusLastTab,
        focusNextTab,
        focusPreviousTab
      }),
      [focusFirstTab, focusLastTab, focusNextTab, focusPreviousTab, focusTabByValue]
    )

    const getItemIdentifiers = useCallback(
      (item: TabItem) => {
        const valueSanitized = sanitizeValueForId(item.value)
        const tabId = item.tabId ?? `${baseId}-tab-${valueSanitized}`
        const panelId = item.panelId ?? `${baseId}-panel-${valueSanitized}`

        return { tabId, panelId }
      },
      [baseId]
    )

    const handleTablistRef = useCallback(
      (node: HTMLDivElement | null) => {
        setContainerRef(node)
      },
      [setContainerRef]
    )

    return (
      <div
        {...props}
        ref={rootRef}
        className={classNames('dyn-tabs', `dyn-tabs--${orientation}`, className)}
        data-testid={testId}
      >
        <div
          ref={handleTablistRef}
          role="tablist"
          className="dyn-tabs__list"
          aria-orientation={orientation}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          {React.Children.map(children, child => {
            if (
              React.isValidElement<React.ComponentProps<typeof DynTab>>(child) &&
              child.type === DynTab
            ) {
              const item = child.props.item
              if (!item) return null
              const { tabId, panelId } = getItemIdentifiers(item)
              const disabledProps =
                item.disabled !== undefined ? { disabled: item.disabled } : {}

              return React.cloneElement(child, {
                ...child.props,
                ...disabledProps,
                tabId,
                panelId,
                isActive: item.value === currentTab,
                activation,
                onSelect: handleTabChange,
                onFocusTab: handleTabFocus
              })
            }
            return null
          })}
        </div>
        <div className="dyn-tabs__content">
          {React.Children.map(children, child => {
            if (
              React.isValidElement<React.ComponentProps<typeof DynTabPanel>>(child) &&
              child.type === DynTabPanel
            ) {
              const item = child.props.item
              if (!item) return null
              const { tabId, panelId } = getItemIdentifiers(item)
              return React.cloneElement(child, {
                ...child.props,
                tabId,
                panelId,
                isActive: item.value === currentTab
              })
            }
            return null
          })}
        </div>
      </div>
    )
  }
)

DynTabs.displayName = 'DynTabs'

export const DynTab = forwardRef<HTMLButtonElement, DynTabProps>(
  (
    {
      item,
      children,
      isActive,
      onSelect,
      onFocusTab,
      activation: _activation,
      disabled = item?.disabled,
      className,
      tabId,
      panelId,
      onClick: userOnClick,
      onKeyDown: userOnKeyDown,
      onFocus: userOnFocus,
      ...props
    },
    ref
  ) => {
    void _activation
    const content = children ?? item?.label

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || !item) return
        onSelect?.(item.value)
        userOnClick?.(event)
      },
      [disabled, item, onSelect, userOnClick]
    )

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled || !item) return

        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault()
          onSelect?.(item.value)
        }
        userOnKeyDown?.(event)
      },
      [disabled, item, onSelect, userOnKeyDown]
    )

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (!disabled && item) {
          onFocusTab?.(item.value)
        }
        userOnFocus?.(event)
      },
      [disabled, item, onFocusTab, userOnFocus]
    )

    if (!item) {
      return null
    }

    return (
      <button
        {...props}
        type="button"
        ref={ref}
        role="tab"
        id={tabId}
        data-value={item.value}
        aria-selected={!!isActive}
        aria-controls={panelId}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        className={classNames(
          'dyn-tab',
          isActive && 'dyn-tab--active',
          disabled && 'dyn-tab--disabled',
          item?.className,
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      >
        {content}
      </button>
    )
  }
)

DynTab.displayName = 'DynTab'

export const DynTabPanel = forwardRef<HTMLDivElement, DynTabPanelProps>(
  ({ item, children, isActive, className, panelId, tabId, ...props }, ref) => {
    if (!item) {
      return null
    }

    const content = children ?? item.panel

    return (
      <div
        {...props}
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        hidden={!isActive}
        className={classNames('dyn-tab-panel', className, item.className)}
      >
        {content}
      </div>
    )
  }
)

DynTabPanel.displayName = 'DynTabPanel'
