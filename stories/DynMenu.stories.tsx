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
    <DynMenu
      orientation="vertical"
      items={[
        {
          type: 'item',
          value: 'new',
          label: 'New File',
          shortcut: '⌘N',
        },
        { type: 'item', value: 'open', label: 'Open…', shortcut: '⌘O' },
        { type: 'divider' },
        { type: 'item', value: 'save', label: 'Save', shortcut: '⌘S' },
      ]}
      onAction={(value) => console.log('Action', value)}
    />
  )
}

export const WithCustomItems: Story = {
  render: () => (
    <DynMenu orientation="vertical">
      <DynMenuItem item={{ type: 'item', value: 'profile', label: 'Profile' }} />
      <DynMenuItem item={{ type: 'divider' }} />
      <DynMenuItem value="logout" shortcut="⇧⌘Q">
        Logout
      </DynMenuItem>
    </DynMenu>
  )
}
