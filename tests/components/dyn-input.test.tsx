import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynInput } from '../../src/ui/dyn-input'

describe('DynInput', () => {
  it('renders with basic props', () => {
    render(<DynInput placeholder="Enter text" data-testid="input" />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles controlled value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DynInput value="test" onChange={onChange} data-testid="input" />)
    
    const input = screen.getByDisplayValue('test')
    await user.type(input, 'ing')
    
    expect(onChange).toHaveBeenCalledWith('testing')
  })

  it('supports accessibility props', () => {
    render(
      <DynInput
        aria-label="Username"
        aria-describedby="username-error"
        aria-invalid
        data-testid="input"
      />
    )
    
    const input = screen.getByTestId('input').querySelector('input')
    expect(input).toHaveAttribute('aria-label', 'Username')
    expect(input).toHaveAttribute('aria-describedby', 'username-error')
    expect(input).toHaveAttribute('aria-invalid')
  })

  it('shows start and end icons', () => {
    render(
      <DynInput
        startIcon={<span data-testid="start-icon">🔍</span>}
        endIcon={<span data-testid="end-icon">✉</span>}
        data-testid="input"
      />
    )
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument()
    expect(screen.getByTestId('end-icon')).toBeInTheDocument()
  })
})
