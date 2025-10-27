import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynIcon } from '../src/ui/dyn-icon'

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'star'
  }
}
