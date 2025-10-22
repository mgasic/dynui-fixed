import type { Meta, StoryObj } from '@storybook/react'
import { DynMenu, DynMenuItem } from '../src/ui/dyn-menu'

const meta: Meta<typeof DynMenu> = {
  title: 'Navigation/DynMenu/Scenarios',
  component: DynMenu,
}
export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <DynMenu orientation="horizontal">
      <DynMenuItem item={{ type: 'item', value: 'home', label: 'Home' }} />
      <DynMenuItem item={{ type: 'item', value: 'about', label: 'About' }} />
      <DynMenuItem item={{ type: 'item', value: 'contact', label: 'Contact' }} />
    </DynMenu>
  )
}
