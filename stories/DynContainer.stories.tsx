import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynContainer } from '../src/ui/dyn-container'

const meta: Meta<typeof DynContainer> = {
  title: 'Layout/DynContainer',
  component: DynContainer,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Container content'
  }
}
