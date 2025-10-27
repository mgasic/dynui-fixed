import type { Meta, StoryObj } from '@storybook/react'
import { DynRadioGroup } from '../src/ui/dyn-radio'

const meta: Meta<typeof DynRadioGroup> = {
  title: 'Form/DynRadioGroup',
  component: DynRadioGroup,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' }
    ],
    defaultValue: 'b'
  }
}
