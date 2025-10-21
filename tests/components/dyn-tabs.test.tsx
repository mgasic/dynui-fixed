import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynTabs, DynTab, DynTabPanel } from '../../src/ui/dyn-tabs'

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

  it('supports keyboard navigation', async () => {
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
    
    const firstTab = screen.getByText('Tab 1')
    firstTab.focus()
    
    expect(firstTab).toHaveFocus()
    expect(firstTab).toHaveAttribute('tabIndex', '0')
  })
})
