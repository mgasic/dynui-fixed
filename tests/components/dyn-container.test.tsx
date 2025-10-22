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

  it('applies size classes', () => {
    render(
      <DynContainer size="sm" data-testid="container">
        Content
      </DynContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-container--sm')
  })

  it('handles fluid layout', () => {
    render(
      <DynContainer fluid data-testid="container">
        Content
      </DynContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-container--fluid')
  })

  it('applies spacing', () => {
    render(
      <DynContainer p="lg" m="md" data-testid="container">
        Content
      </DynContainer>
    )
    
    const container = screen.getByTestId('container')
    expect(container).toHaveClass('dyn-container--p-lg')
    expect(container).toHaveClass('dyn-container--m-md')
  })
})
