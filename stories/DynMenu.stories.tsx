import type { Meta, StoryObj } from '@storybook/react'
import { DynMenu, DynMenuItem } from '../src/ui/dyn-menu'

const meta: Meta<typeof DynMenu> = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DynMenu orientation="vertical">
      <DynMenuItem item={{ type: 'item', value: 'new', label: 'New' }} />
      <DynMenuItem item={{ type: 'item', value: 'open', label: 'Open' }} />
      <DynMenuItem item={{ type: 'divider' }} />
      <DynMenuItem item={{ type: 'item', value: 'save', label: 'Save' }} />
    </DynMenu>
  )
}
