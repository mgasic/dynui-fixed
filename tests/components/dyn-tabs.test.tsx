import React from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynTabs, DynTab, DynTabPanel } from '../../src/ui/dyn-tabs'
import type { DynTabsRef } from '../../src/types/components/dyn-tabs.types'

const mockItems = [
  { key: 'tab1', value: 'tab1', label: 'Tab 1' },
  { key: 'tab2', value: 'tab2', label: 'Tab 2' }
]

describe('DynTabs', () => {
  it('renders tabs with proper ARIA roles', () => {
    render(
      <DynTabs defaultValue="tab1" data-testid="tabs">
        {mockItems.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {mockItems.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )
    
    const tablist = screen.getByRole('tablist')
    expect(tablist).toBeInTheDocument()
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(2)

    const panels = screen.getAllByRole('tabpanel', { hidden: true })
    expect(panels).toHaveLength(2)
  })

  it('handles tab selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <DynTabs value="tab1" onChange={onChange}>
        {mockItems.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {mockItems.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )
    
    await user.click(screen.getByText('Tab 2'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('activates tabs automatically on focus by default', async () => {
    const user = userEvent.setup()

    render(
      <DynTabs defaultValue="tab1">
        {mockItems.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {mockItems.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )
    
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' })
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' })

    firstTab.focus()
    expect(firstTab).toHaveFocus()

    await user.keyboard('{ArrowRight}')

    expect(secondTab).toHaveFocus()
    expect(secondTab).toHaveAttribute('aria-selected', 'true')
    expect(firstTab).toHaveAttribute('aria-selected', 'false')
  })

  it('supports manual activation mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <DynTabs defaultValue="tab1" activation="manual" onChange={onChange}>
        {mockItems.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {mockItems.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' })
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' })

    firstTab.focus()
    await user.keyboard('{ArrowRight}')

    expect(secondTab).toHaveFocus()
    expect(secondTab).toHaveAttribute('aria-selected', 'false')
    expect(onChange).not.toHaveBeenCalled()

    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('tab2')
    expect(secondTab).toHaveAttribute('aria-selected', 'true')
  })

  it('exposes an imperative focus API', () => {
    const ref = React.createRef<DynTabsRef>()

    render(
      <DynTabs ref={ref} defaultValue="tab1">
        {mockItems.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {mockItems.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' })
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' })

    act(() => {
      ref.current?.focusLastTab()
    })
    expect(secondTab).toHaveFocus()

    act(() => {
      ref.current?.focusPreviousTab()
    })
    expect(firstTab).toHaveFocus()

    act(() => {
      ref.current?.focusTab('tab2')
    })
    expect(secondTab).toHaveFocus()
    expect(ref.current?.root).toBeInstanceOf(HTMLDivElement)
  })
})
