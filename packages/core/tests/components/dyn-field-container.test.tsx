import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DynFieldContainer } from '../../src/ui/dyn-field-container'
import { vi } from 'vitest'

expect.extend(toHaveNoViolations)

describe('DynFieldContainer', () => {
  // Basic rendering
  it('renders children correctly', () => {
    render(
      <DynFieldContainer>
        <input data-testid="test-input" />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('test-input')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(
      <DynFieldContainer label="Test Label">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  // Required indicator
  it('shows required indicator when required', () => {
    render(
      <DynFieldContainer label="Required Field" required>
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByLabelText('required')).toBeInTheDocument()
  })

  it('does not show required indicator when not required', () => {
    render(
      <DynFieldContainer label="Optional Field">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  // Description
  it('renders description text', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        description="This is a helpful description"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('This is a helpful description')).toBeInTheDocument()
  })

  // Error states
  it('displays single error message', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        error="This field is required"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('displays multiple error messages', () => {
    const errors = ['Error 1', 'Error 2']
    render(
      <DynFieldContainer 
        label="Field" 
        error={errors}
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Error 1')).toBeInTheDocument()
    expect(screen.getByText('Error 2')).toBeInTheDocument()
  })

  // Warning state
  it('displays warning message', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        warning="This is a warning"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('This is a warning')).toBeInTheDocument()
    const warningElement = screen.getByRole('alert')
    expect(warningElement).toHaveAttribute('aria-live', 'polite')
  })

  // Success state
  it('displays success message', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        success="Success message"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Success message')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  // State priority (error > warning > success)
  it('prioritizes error over warning and success', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        error="Error message"
        warning="Warning message"
        success="Success message"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument()
    expect(screen.queryByText('Success message')).not.toBeInTheDocument()
  })

  it('prioritizes warning over success when no error', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        warning="Warning message"
        success="Success message"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Warning message')).toBeInTheDocument()
    expect(screen.queryByText('Success message')).not.toBeInTheDocument()
  })

  // ARIA attributes
  it('enhances children with proper ARIA attributes', () => {
    render(
      <DynFieldContainer 
        label="Test Field" 
        description="Help text"
        error="Error text"
      >
        <input data-testid="test-input" />
      </DynFieldContainer>
    )
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-labelledby')
    expect(input).toHaveAttribute('aria-describedby')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-required when required', () => {
    render(
      <DynFieldContainer label="Required Field" required>
        <input data-testid="test-input" />
      </DynFieldContainer>
    )
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-required', 'true')
  })

  it('sets disabled prop on children when container is disabled', () => {
    render(
      <DynFieldContainer label="Disabled Field" disabled>
        <input data-testid="test-input" />
      </DynFieldContainer>
    )
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('disabled')
  })

  // CSS classes
  it('applies size classes correctly', () => {
    const { rerender } = render(
      <DynFieldContainer label="Field" size="sm" data-testid="container">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-field-container--sm')
    
    rerender(
      <DynFieldContainer label="Field" size="lg" data-testid="container">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-field-container--lg')
  })

  it('applies state classes correctly', () => {
    const { rerender } = render(
      <DynFieldContainer label="Field" error="Error" data-testid="container">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-field-container--error')
    
    rerender(
      <DynFieldContainer label="Field" warning="Warning" data-testid="container">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-field-container--warning')
  })

  it('applies disabled class when disabled', () => {
    render(
      <DynFieldContainer label="Field" disabled data-testid="container">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('dyn-field-container--disabled')
  })

  // Custom props
  it('applies custom className', () => {
    render(
      <DynFieldContainer 
        label="Field" 
        className="custom-field"
        data-testid="container"
      >
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('container')).toHaveClass('custom-field')
  })

  it('applies custom data-testid', () => {
    render(
      <DynFieldContainer label="Field" data-testid="custom-testid">
        <input />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('custom-testid')).toBeInTheDocument()
  })

  // Accessibility
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynFieldContainer 
        label="Accessible Field"
        description="This field is fully accessible"
        required
      >
        <input aria-label="Test input" />
      </DynFieldContainer>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with error state', async () => {
    const { container } = render(
      <DynFieldContainer 
        label="Field with Error"
        error="Error message"
        required
      >
        <input aria-label="Field with error" />
      </DynFieldContainer>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // Multiple children handling
  it('enhances multiple children correctly', () => {
    render(
      <DynFieldContainer label="Multi-field">
        <input data-testid="input1" />
        <input data-testid="input2" />
        <div data-testid="non-input">Not an input</div>
      </DynFieldContainer>
    )
    
    // Both inputs should get ARIA attributes
    const input1 = screen.getByTestId('input1')
    const input2 = screen.getByTestId('input2')
    const nonInput = screen.getByTestId('non-input')
    
    expect(input1).toHaveAttribute('aria-labelledby')
    expect(input2).toHaveAttribute('aria-labelledby')
    expect(nonInput).not.toHaveAttribute('aria-labelledby')
  })

  // Error message icons
  it('displays error icons with error messages', () => {
    render(
      <DynFieldContainer error="Error with icon">
        <input />
      </DynFieldContainer>
    )
    
    const errorContainer = screen.getByRole('alert')
    const icon = errorContainer.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('displays warning icons with warning messages', () => {
    render(
      <DynFieldContainer warning="Warning with icon">
        <input />
      </DynFieldContainer>
    )
    
    const warningContainer = screen.getByRole('alert')
    const icon = warningContainer.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('displays success icons with success messages', () => {
    render(
      <DynFieldContainer success="Success with icon">
        <input />
      </DynFieldContainer>
    )
    
    const successContainer = screen.getByRole('status')
    const icon = successContainer.querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})