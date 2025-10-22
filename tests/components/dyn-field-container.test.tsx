import { render, screen } from '@testing-library/react'
import { DynFieldContainer } from '../../src/ui/dyn-field-container'
import { DynInput } from '../../src/ui/dyn-input'

describe('DynFieldContainer', () => {
  it('renders with label and input', () => {
    render(
      <DynFieldContainer label="Username" data-testid="field">
        <DynInput placeholder="Enter username" />
      </DynFieldContainer>
    )
    
    expect(screen.getByTestId('field')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('shows required indicator', () => {
    render(
      <DynFieldContainer label="Email" required>
        <DynInput type="email" />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText('*')).toHaveAttribute('aria-label', 'required')
  })

  it('displays description', () => {
    render(
      <DynFieldContainer 
        label="Password" 
        description="Must be at least 8 characters"
      >
        <DynInput type="password" />
      </DynFieldContainer>
    )
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(
      <DynFieldContainer 
        label="Email" 
        error="Please enter a valid email address"
      >
        <DynInput type="email" />
      </DynFieldContainer>
    )
    
    const errorElement = screen.getByText('Please enter a valid email address')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveAttribute('role', 'alert')
    expect(errorElement).toHaveAttribute('aria-live', 'polite')
  })

  it('supports render prop pattern', () => {
    render(
      <DynFieldContainer label="Custom Field">
        {(props) => (
          <input 
            {...props}
            placeholder="Custom input"
            data-testid="custom-input"
          />
        )}
      </DynFieldContainer>
    )
    
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('aria-labelledby')
  })
})
