import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DynInput } from '../../src/ui/dyn-input'
import { DynButton } from '../../src/ui/dyn-button'
import { DynTabs, DynTab, DynTabPanel } from '../../src/ui/dyn-tabs'
import { DynModal } from '../../src/ui/dyn-modal'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('DynInput should have no a11y violations', async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Username</label>
        <DynInput id="test-input" aria-describedby="input-help" />
        <div id="input-help">Enter your username</div>
      </div>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('DynButton should have no a11y violations', async () => {
    const { container } = render(
      <DynButton aria-label="Save document">Save</DynButton>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('DynTabs should have no a11y violations', async () => {
    const items = [
      { key: 'tab1', value: 'tab1', label: 'First Tab' },
      { key: 'tab2', value: 'tab2', label: 'Second Tab' }
    ]
    
    const { container } = render(
      <DynTabs defaultValue="tab1" aria-label="Main navigation">
        {items.map(item => (
          <DynTab key={item.key} item={item} />
        ))}
        {items.map(item => (
          <DynTabPanel key={`panel-${item.key}`} item={item}>
            Content for {item.label}
          </DynTabPanel>
        ))}
      </DynTabs>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('DynModal should have no a11y violations when open', async () => {
    const { container } = render(
      <DynModal open title="Test Modal">
        <p>Modal content</p>
      </DynModal>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
