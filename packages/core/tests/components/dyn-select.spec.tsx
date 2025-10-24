import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DynSelect } from '../../src/ui/dyn-select'
import type { DynSelectRef, SelectOption } from '../../src/types/components/dyn-select.types'
import { useRef } from 'react'

expect.extend(toHaveNoViolations)

const sampleOptions: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' }
]

describe('DynSelect', () => {
  it('renders with default props', () => {
    render(<DynSelect options={sampleOptions} placeholder="Choose option" />)
    
    const trigger = screen.getByRole('button')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Choose option')
  })

  it('supports controlled mode', async () => {
    const user = userEvent.setup()
    let value = 'react'
    const onChange = (v: string) => {
      value = v
    }
    
    const { rerender } = render(
      <DynSelect value={value} onChange={onChange} options={sampleOptions} />
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent('React')

    // Open dropdown and select different option
    await user.click(trigger)
    await user.click(screen.getByText('Vue.js'))

    // Rerender with new value
    rerender(<DynSelect value={value} onChange={onChange} options={sampleOptions} />)
    expect(trigger).toHaveTextContent('Vue.js')
  })

  it('supports searchable functionality', async () => {
    const user = userEvent.setup()
    render(<DynSelect options={sampleOptions} searchable placeholder="Search" />)

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    // Search input should appear
    const searchInput = screen.getByPlaceholderText('Search...')
    expect(searchInput).toBeInTheDocument()

    // Type to filter
    await user.type(searchInput, 'react')

    // Should show filtered results
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.queryByText('Vue.js')).not.toBeInTheDocument()
  })

  it('supports multiple selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    
    render(
      <DynSelect 
        options={sampleOptions} 
        multiple 
        onChange={onChange} 
        placeholder="Select multiple"
      />
    )

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    // Select multiple options
    await user.click(screen.getByText('React'))
    await user.click(screen.getByText('Vue.js'))

    expect(onChange).toHaveBeenCalledWith(['react'])
    expect(onChange).toHaveBeenCalledWith(['react', 'vue'])
    expect(trigger).toHaveTextContent('2 selected')
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    
    render(<DynSelect options={sampleOptions} onChange={onChange} />)

    const trigger = screen.getByRole('button')
    await user.tab()
    expect(trigger).toHaveFocus()

    // Arrow down opens dropdown and focuses first option
    await user.keyboard('{ArrowDown}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    // Arrow down moves focus
    await user.keyboard('{ArrowDown}')
    
    // Enter selects focused option
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('vue')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<DynSelect options={sampleOptions} />)

    const trigger = screen.getByRole('button')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('implements mini API correctly', async () => {
    const user = userEvent.setup()
    
    function TestComponent() {
      const selectRef = useRef<DynSelectRef>(null)
      
      return (
        <div>
          <DynSelect ref={selectRef} options={sampleOptions} />
          <button onClick={() => selectRef.current?.focus()}>Focus</button>
          <button onClick={() => selectRef.current?.open()}>Open</button>
          <button onClick={() => selectRef.current?.close()}>Close</button>
          <button onClick={() => selectRef.current?.clear()}>Clear</button>
        </div>
      )
    }
    
    render(<TestComponent />)
    
    const trigger = screen.getByRole('button', { name: /choose/i })
    
    // Test focus method
    await user.click(screen.getByText('Focus'))
    expect(trigger).toHaveFocus()
    
    // Test open method
    await user.click(screen.getByText('Open'))
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    
    // Test close method
    await user.click(screen.getByText('Close'))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DynSelect 
        options={sampleOptions} 
        aria-label="Choose framework" 
        placeholder="Select option"
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('applies correct ARIA attributes', () => {
    render(
      <DynSelect 
        options={sampleOptions} 
        aria-label="Test select"
        data-state="error"
        multiple
      />
    )
    
    const trigger = screen.getByRole('button')
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-invalid', 'true')
    expect(trigger).toHaveAttribute('aria-label', 'Test select')
  })

  it('shows listbox with correct ARIA when open', async () => {
    const user = userEvent.setup()
    render(<DynSelect options={sampleOptions} multiple />)

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    const listbox = screen.getByRole('listbox')
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
    
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('handles disabled state correctly', () => {
    render(<DynSelect options={sampleOptions} disabled />)
    
    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()
  })
})