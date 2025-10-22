import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useArrowNavigation } from '../../src/hooks/use-arrow-navigation'

function TestComponent() {
  const { containerRef } = useArrowNavigation({
    orientation: 'vertical',
    selector: 'button'
  })

  return (
    <div ref={containerRef} data-testid="container">
      <button>Item 1</button>
      <button>Item 2</button>
      <button>Item 3</button>
    </div>
  )
}

describe('useArrowNavigation', () => {
  it('handles arrow key navigation', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)
    
    const firstButton = screen.getByText('Item 1')
    const secondButton = screen.getByText('Item 2')
    
    firstButton.focus()
    expect(firstButton).toHaveFocus()
    
    await user.keyboard('{ArrowDown}')
    expect(secondButton).toHaveFocus()
  })

  it('handles Home and End keys', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)
    
    const firstButton = screen.getByText('Item 1')
    const lastButton = screen.getByText('Item 3')
    
    // Focus middle item
    screen.getByText('Item 2').focus()
    
    await user.keyboard('{Home}')
    expect(firstButton).toHaveFocus()
    
    await user.keyboard('{End}')
    expect(lastButton).toHaveFocus()
  })
})
