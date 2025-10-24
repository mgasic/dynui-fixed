import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynTable } from '../../src/ui/dyn-table'

const mockColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'email', label: 'Email', sortable: false }
]

const mockData = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
]

describe('DynTable', () => {
  it('renders table with data', () => {
    render(<DynTable columns={mockColumns} data={mockData} />)
    
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('handles sorting', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    
    render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        onSort={onSort}
      />
    )
    
    await user.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name', 'asc')
  })

  it('shows sort indicators', () => {
    render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        sortState={{ key: 'name', direction: 'asc' }}
      />
    )

    const nameHeader = screen.getByText('Name').closest('th')
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(nameHeader?.querySelector('.dyn-table__sort-indicator')).toHaveTextContent('↑')
  })

  it('calls onSort with toggled direction when controlled', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()

    const { rerender } = render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        onSort={onSort}
        sortState={{ key: 'name', direction: 'asc' }}
      />
    )

    await user.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name', 'desc')

    rerender(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        onSort={onSort}
        sortState={{ key: 'name', direction: 'desc' }}
      />
    )

    await user.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenLastCalledWith('name', 'asc')
  })

  it('reflects externally controlled sorting across columns', () => {
    const { rerender } = render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        sortState={{ key: 'name', direction: 'asc' }}
      />
    )

    const initialNameHeader = screen.getByText('Name').closest('th')
    expect(initialNameHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(initialNameHeader?.querySelector('.dyn-table__sort-indicator')).toHaveTextContent('↑')

    rerender(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        sortState={{ key: 'age', direction: 'desc' }}
      />
    )

    const nameHeader = screen.getByText('Name').closest('th')
    const ageHeader = screen.getByText('Age').closest('th')

    expect(nameHeader).toHaveAttribute('aria-sort', 'none')
    expect(ageHeader).toHaveAttribute('aria-sort', 'descending')
    expect(ageHeader?.querySelector('.dyn-table__sort-indicator')).toHaveTextContent('↓')
  })

  it('disables sorting for non-sortable columns', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn()
    
    render(
      <DynTable
        columns={mockColumns}
        data={mockData}
        sortable
        onSort={onSort}
      />
    )
    
    await user.click(screen.getByText('Email'))
    expect(onSort).not.toHaveBeenCalled()
  })
})
