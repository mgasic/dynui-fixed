import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DynBreadcrumb } from '../../src/ui/dyn-breadcrumb'

const mockItems = [
  { key: 'home', value: 'home', label: 'Home', href: '/' },
  { key: 'products', value: 'products', label: 'Products', href: '/products' },
  { key: 'shoes', value: 'shoes', label: 'Shoes' }
]

describe('DynBreadcrumb', () => {
  it('renders breadcrumb navigation', () => {
    render(<DynBreadcrumb items={mockItems} />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()
  })

  it('marks last item as current page', () => {
    render(<DynBreadcrumb items={mockItems} />)
    
    const lastItem = screen.getByText('Shoes').closest('span')
    expect(lastItem).toHaveAttribute('aria-current', 'page')
  })

  it('handles custom separator', () => {
    render(<DynBreadcrumb items={mockItems} separator=">" />)
    
    expect(screen.getAllByText('>')).toHaveLength(2) // Between 3 items
  })

  it('truncates items when maxItems is set', () => {
    const manyItems = [
      { key: '1', value: '1', label: 'Item 1' },
      { key: '2', value: '2', label: 'Item 2' },
      { key: '3', value: '3', label: 'Item 3' },
      { key: '4', value: '4', label: 'Item 4' },
      { key: '5', value: '5', label: 'Item 5' }
    ]
    
    render(<DynBreadcrumb items={manyItems} maxItems={3} />)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('Item 5')).toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument()
  })
})
