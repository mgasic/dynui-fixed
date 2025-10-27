import type { Meta, StoryObj } from '@storybook/react'
import { DynBreadcrumb } from '../src/ui/dyn-breadcrumb'

const meta: Meta<typeof DynBreadcrumb> = {
  title: 'Navigation/DynBreadcrumb',
  component: DynBreadcrumb,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' }
    ]
  }
}
