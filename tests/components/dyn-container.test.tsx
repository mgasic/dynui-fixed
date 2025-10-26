import { render, screen } from '@testing-library/react'
import { DynContainer } from '../../src/ui/dyn-container'

describe('DynContainer', () => {
  it('renders container with children', () => {
    render(
      <DynContainer data-testid="container">
        <div>Content</div>
      </DynContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('dyn-container')
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('merges custom class names and styles', () => {
    render(
      <DynContainer
        className="custom-class"
        style={{ backgroundColor: 'rebeccapurple' }}
        maxWidth={960}
        data-testid="container"
      >
        Content
      </DynContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('dyn-container', 'custom-class')
    expect(container).toHaveStyle('background-color: rebeccapurple; max-width: 960px;')
  })

  it('applies spacing props as inline styles', () => {
    render(
      <DynContainer p={24} m="1rem" data-testid="container">
        Content
      </DynContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveStyle('padding: 24px; margin: 1rem;')
  })
})
