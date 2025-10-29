import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DynStepper, DynStep } from '../../src/ui/dyn-stepper'
import { vi } from 'vitest'

expect.extend(toHaveNoViolations)

const defaultProps = {
  currentStep: 1,
  totalSteps: 3,
  onStepChange: vi.fn(),
}

const TestStepper = ({ currentStep = 1, onStepChange = vi.fn() }) => (
  <DynStepper
    currentStep={currentStep}
    totalSteps={3}
    onStepChange={onStepChange}
  >
    <DynStep step={1} title="Step 1" description="First step" />
    <DynStep step={2} title="Step 2" description="Second step" />
    <DynStep step={3} title="Step 3" description="Final step" />
  </DynStepper>
)

describe('DynStepper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Basic rendering
  it('renders stepper with steps', () => {
    render(<TestStepper />)
    
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Step 1/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Step 2/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Step 3/i })).toBeInTheDocument()
  })

  it('marks current step as active', () => {
    render(<TestStepper currentStep={2} />)
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    expect(step2).toHaveAttribute('aria-current', 'step')
    expect(step2).toHaveAttribute('aria-selected', 'true')
  })

  it('shows completed steps correctly', () => {
    render(<TestStepper currentStep={3} />)
    
    const step1 = screen.getByRole('tab', { name: /Step 1/i })
    expect(step1).toHaveClass('dyn-step--completed')
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    expect(step2).toHaveClass('dyn-step--completed')
    
    const step3 = screen.getByRole('tab', { name: /Step 3/i })
    expect(step3).toHaveClass('dyn-step--current')
  })

  // Click interactions
  it('calls onStepChange when step is clicked', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper onStepChange={handleStepChange} />)
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    await userEvent.click(step2)
    
    expect(handleStepChange).toHaveBeenCalledWith(2)
  })

  it('does not call onStepChange when disabled step is clicked', async () => {
    const handleStepChange = vi.fn()
    render(
      <DynStepper
        currentStep={1}
        totalSteps={3}
        onStepChange={handleStepChange}
      >
        <DynStep step={1} title="Step 1" />
        <DynStep step={2} title="Step 2" disabled />
        <DynStep step={3} title="Step 3" />
      </DynStepper>
    )
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    await userEvent.click(step2)
    
    expect(handleStepChange).not.toHaveBeenCalled()
  })

  // Keyboard navigation
  it('handles Arrow Right keyboard navigation', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={1} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowRight' })
    
    expect(handleStepChange).toHaveBeenCalledWith(2)
  })

  it('handles Arrow Left keyboard navigation', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={2} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowLeft' })
    
    expect(handleStepChange).toHaveBeenCalledWith(1)
  })

  it('handles Home key navigation', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={3} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'Home' })
    
    expect(handleStepChange).toHaveBeenCalledWith(1)
  })

  it('handles End key navigation', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={1} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'End' })
    
    expect(handleStepChange).toHaveBeenCalledWith(3)
  })

  it('does not navigate beyond first step', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={1} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowLeft' })
    
    expect(handleStepChange).not.toHaveBeenCalled()
  })

  it('does not navigate beyond last step', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper currentStep={3} onStepChange={handleStepChange} />)
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowRight' })
    
    expect(handleStepChange).not.toHaveBeenCalled()
  })

  // Vertical orientation
  it('handles Arrow Down in vertical orientation', async () => {
    const handleStepChange = vi.fn()
    render(
      <DynStepper
        currentStep={1}
        totalSteps={3}
        onStepChange={handleStepChange}
        orientation="vertical"
      >
        <DynStep step={1} title="Step 1" />
        <DynStep step={2} title="Step 2" />
        <DynStep step={3} title="Step 3" />
      </DynStepper>
    )
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowDown' })
    
    expect(handleStepChange).toHaveBeenCalledWith(2)
  })

  it('handles Arrow Up in vertical orientation', async () => {
    const handleStepChange = vi.fn()
    render(
      <DynStepper
        currentStep={2}
        totalSteps={3}
        onStepChange={handleStepChange}
        orientation="vertical"
      >
        <DynStep step={1} title="Step 1" />
        <DynStep step={2} title="Step 2" />
        <DynStep step={3} title="Step 3" />
      </DynStepper>
    )
    
    const stepper = screen.getByRole('tablist')
    fireEvent.keyDown(stepper, { key: 'ArrowUp' })
    
    expect(handleStepChange).toHaveBeenCalledWith(1)
  })

  // Enter/Space activation
  it('activates step on Enter key', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper onStepChange={handleStepChange} />)
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    fireEvent.keyDown(step2, { key: 'Enter' })
    
    expect(handleStepChange).toHaveBeenCalledWith(2)
  })

  it('activates step on Space key', async () => {
    const handleStepChange = vi.fn()
    render(<TestStepper onStepChange={handleStepChange} />)
    
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    fireEvent.keyDown(step2, { key: ' ' })
    
    expect(handleStepChange).toHaveBeenCalledWith(2)
  })

  // Tab panels
  it('shows tab panel for active step', () => {
    render(
      <DynStepper currentStep={2} totalSteps={3} onStepChange={vi.fn()}>
        <DynStep step={1} title="Step 1">
          <div>Content 1</div>
        </DynStep>
        <DynStep step={2} title="Step 2">
          <div>Content 2</div>
        </DynStep>
        <DynStep step={3} title="Step 3">
          <div>Content 3</div>
        </DynStep>
      </DynStepper>
    )
    
    expect(screen.getByText('Content 2')).toBeVisible()
    expect(screen.getByText('Content 1')).not.toBeVisible()
    expect(screen.getByText('Content 3')).not.toBeVisible()
  })

  // Accessibility
  it('has no accessibility violations', async () => {
    const { container } = render(<TestStepper />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes', () => {
    render(<TestStepper />)
    
    const stepper = screen.getByRole('tablist')
    expect(stepper).toHaveAttribute('aria-label', 'Step navigation')
    expect(stepper).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('sets proper tabIndex for steps', () => {
    render(<TestStepper currentStep={2} />)
    
    const step1 = screen.getByRole('tab', { name: /Step 1/i })
    const step2 = screen.getByRole('tab', { name: /Step 2/i })
    const step3 = screen.getByRole('tab', { name: /Step 3/i })
    
    expect(step1).toHaveAttribute('tabindex', '-1')
    expect(step2).toHaveAttribute('tabindex', '0')
    expect(step3).toHaveAttribute('tabindex', '-1')
  })

  // Error handling
  it('throws error when DynStep is used outside DynStepper', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<DynStep step={1} title="Test" />)
    }).toThrow('DynStep must be used within a DynStepper')
    
    consoleSpy.mockRestore()
  })

  // Custom props
  it('applies custom className', () => {
    render(
      <DynStepper
        {...defaultProps}
        className="custom-stepper"
      >
        <DynStep step={1} title="Step 1" />
      </DynStepper>
    )
    
    expect(screen.getByRole('tablist')).toHaveClass('custom-stepper')
  })

  it('applies custom data-testid', () => {
    render(
      <DynStepper
        {...defaultProps}
        data-testid="test-stepper"
      >
        <DynStep step={1} title="Step 1" />
      </DynStepper>
    )
    
    expect(screen.getByTestId('test-stepper')).toBeInTheDocument()
  })
})