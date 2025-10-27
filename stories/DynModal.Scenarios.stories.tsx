import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynModal } from '../src/ui/dyn-modal'

const meta: Meta<typeof DynModal> = {
  title: 'Overlays/DynModal Scenarios',
  component: DynModal,
}
export default meta

type Story = StoryObj<typeof meta>

export const AlwaysOpen: Story = {
  args: {
    open: true,
    title: 'Always Open'
  }
}
