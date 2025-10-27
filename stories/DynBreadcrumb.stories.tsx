import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynBreadcrumb } from '../src/ui/dyn-breadcrumb'

const meta: Meta<typeof DynBreadcrumb> = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
  parameters: {
    docs: {
      description: {
        component: 'A breadcrumb navigation component that shows the current page location within a navigational hierarchy.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { key: 'home', value: 'home', label: 'Home', href: '/' },
  { key: 'products', value: 'products', label: 'Products', href: '/products' },
  { key: 'electronics', value: 'electronics', label: 'Electronics', href: '/products/electronics' },
  { key: 'phones', value: 'phones', label: 'Phones' }
]

export const Default: Story = {
  args: {
    items: sampleItems
  }
}

export const CustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: '>'
  }
}

export const WithMaxItems: Story = {
  args: {
    items: [
      { key: 'home', value: 'home', label: 'Home' },
      { key: 'category1', value: 'category1', label: 'Category 1' },
      { key: 'category2', value: 'category2', label: 'Category 2' },
      { key: 'subcategory', value: 'subcategory', label: 'Subcategory' },
      { key: 'product', value: 'product', label: 'Product' }
    ],
    maxItems: 3
  }
}

export const SimpleText: Story = {
  args: {
    items: [
      { key: 'docs', value: 'docs', label: 'Documentation' },
      { key: 'guides', value: 'guides', label: 'Guides' },
      { key: 'setup', value: 'setup', label: 'Getting Started' }
    ]
  }
}