import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useArrowNavigation } from '../../src/hooks/use-arrow-navigation'
import { useEffect } from 'react'

type FocusHelpers = {
  focusFirst: () => void
  focusLast: () => void
  focusAtIndex: (index: number) => void
}

function TestComponent({ onReady }: { onReady: (helpers: FocusHelpers) => void }) {
  const { containerRef, focusFirst, focusLast, focusAtIndex } = useArrowNavigation({
    orientation: 'vertical',
    selector: 'button'
  })

  useEffect(() => {
    onReady({ focusFirst, focusLast, focusAtIndex })
  }, [focusAtIndex, focusFirst, focusLast, onReady])

  return (
    <div ref={containerRef} data-testid="container">
      <button>Item 1</button>
      <button>Item 2</button>
      <button>Item 3</button>
    </div>
  )
}

describe('useArrowNavigation', () => {
  it('handles arrow key navigation with looping behaviour', async () => {
    const user = userEvent.setup()
    let helpers: FocusHelpers | null = null

    render(<TestComponent onReady={(value) => (helpers = value)} />)

    const buttons = screen.getAllByRole('button', { name: /Item/ })

    buttons[0].focus()
    expect(buttons[0]).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(buttons[1]).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(buttons[2]).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(buttons[0]).toHaveFocus()

    await user.keyboard('{ArrowUp}')
    expect(buttons[2]).toHaveFocus()

    await waitFor(() => expect(helpers).not.toBeNull())
    helpers!.focusAtIndex(1)
    expect(buttons[1]).toHaveFocus()
  })

  it('handles Home and End keys and exposes focus helpers', async () => {
    const user = userEvent.setup()
    let helpers: FocusHelpers | null = null

    render(<TestComponent onReady={(value) => (helpers = value)} />)

    const buttons = screen.getAllByRole('button', { name: /Item/ })

    buttons[1].focus()

    await user.keyboard('{Home}')
    expect(buttons[0]).toHaveFocus()

    await user.keyboard('{End}')
    expect(buttons[2]).toHaveFocus()

    await waitFor(() => expect(helpers).not.toBeNull())
    helpers!.focusFirst()
    expect(buttons[0]).toHaveFocus()

    helpers!.focusLast()
    expect(buttons[2]).toHaveFocus()
  })
})
