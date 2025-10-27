import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynSelect } from '../src/ui/dyn-select'

const meta: Meta<typeof DynSelect> = {
  title: 'Form/DynSelect',
  component: DynSelect,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' }
    ]
  }
}
