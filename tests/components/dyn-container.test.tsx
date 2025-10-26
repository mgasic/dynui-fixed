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

  it('applies max width style when provided as a number', () => {
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

  it('merges custom class names and inline styles', () => {
    render(
      <DynContainer
        data-testid="container"
        className="custom-container"
        maxWidth="50%"
        style={{ margin: '2rem' }}
      >
        Content
      </DynContainer>
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('dyn-container')
    expect(container).toHaveClass('custom-container')
    expect(container).toHaveStyle({ maxWidth: '50%' })
    expect(container).toHaveStyle({ margin: '2rem' })
  })
})
