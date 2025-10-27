import type { Meta, StoryObj } from '@storybook/react'
import { DynTextArea } from '../src/ui/dyn-textarea'

const meta: Meta<typeof DynTextArea> = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter description...',
    rows: 4
  }
}
