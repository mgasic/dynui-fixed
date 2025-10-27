import type { Meta, StoryObj } from '@storybook/react'
import { DynMenu } from '../src/ui/dyn-menu'

const meta: Meta<typeof DynMenu> = {
  title: 'Navigation/DynMenu Scenarios',
  component: DynMenu,
}
export default meta

type Story = StoryObj<typeof meta>

export const WithGroupsAndDividers: Story = {
  args: {
    items: [
      { type: 'group', label: 'Group 1' },
      { type: 'item', value: 'copy', label: 'Copy' },
      { type: 'divider' },
      { type: 'group', label: 'Group 2' },
      { type: 'item', value: 'paste', label: 'Paste' }
    ]
  }
}
