import type { Meta, StoryObj } from '@storybook/react'
import { DynMenu } from '../src/ui/dyn-menu'

const meta: Meta<typeof DynMenu> = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { type: 'item', value: 'new', label: 'New' },
      { type: 'item', value: 'open', label: 'Open' },
    ]
  }
}
