import { render, screen } from '@testing-library/react'
import { DynContainer } from '../../src/ui/dyn-container'

describe('DynContainer', () => {
  it('renders container with children', () => {
    render(
      <DynContainer data-testid="container">
        <div>Content</div>
      </DynContainer>
    )
    
    expect(screen.getByTestId('container')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies max width style when provided', () => {
    render(
      <DynContainer maxWidth={640} data-testid="container">
        Content
      </DynContainer>
    )

    expect(screen.getByTestId('container')).toHaveStyle({ maxWidth: '640px' })
  })

  it('applies spacing styles for padding and margin', () => {
    render(
      <DynContainer p={24} m="3rem" data-testid="container">
        Content
      </DynContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveStyle({ padding: '24px' })
    expect(container).toHaveStyle({ margin: '3rem' })
  })
})
