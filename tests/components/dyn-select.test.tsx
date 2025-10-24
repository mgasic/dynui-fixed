import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { DynSelect } from '../../src/ui/dyn-select'

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
]

describe('DynSelect', () => {
  it('renders a search input when searchable', () => {
    render(
      <DynSelect
        searchable
        options={OPTIONS}
        placeholder="Pick a fruit"
        searchPlaceholder="Search fruits"
        searchAriaLabel="Search fruits"
        data-testid="fruit-select"
      />
    )

    const searchInput = screen.getByRole('searchbox', { name: 'Search fruits' })
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search fruits')
  })

  it('filters options based on search input', async () => {
    const user = userEvent.setup()

    render(
      <DynSelect
        searchable
        options={OPTIONS}
        placeholder="Pick a fruit"
        data-testid="fruit-select"
      />
    )

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'ap')

    const optionLabels = screen.getAllByRole('option').map((option) => option.textContent)

    expect(optionLabels).toContain('Apple')
    expect(optionLabels).not.toContain('Banana')
    expect(optionLabels).not.toContain('Blueberry')
  })

  it('supports controlled search value', async () => {
    const user = userEvent.setup()

    function ControlledSelect() {
      const [search, setSearch] = useState('')

      return (
        <DynSelect
          searchable
          options={OPTIONS}
          searchValue={search}
          onSearchChange={setSearch}
          data-testid="fruit-select"
        />
      )
    }

    render(<ControlledSelect />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'berry')

    expect(searchInput).toHaveValue('berry')
    const optionLabels = screen.getAllByRole('option').map((option) => option.textContent)
    expect(optionLabels).toContain('Blueberry')
    expect(optionLabels).not.toContain('Banana')
  })
})
