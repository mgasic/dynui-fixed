import type { Meta, StoryObj } from '@storybook/react'
import { DynCheckbox } from '../src/ui/dyn-checkbox'

const meta: Meta<typeof DynCheckbox> = {
  title: 'Form/DynCheckbox',
  component: DynCheckbox,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Accept terms' }
}

export const Indeterminate: Story = {
  args: { children: 'Select all', indeterminate: true }
}
