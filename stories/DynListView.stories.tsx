import type { Meta, StoryObj } from '@storybook/react'
import { DynListView } from '../src/ui/dyn-listview'

const meta: Meta<typeof DynListView> = {
  title: 'Data/DynListView',
  component: DynListView,
}
export default meta

type Story = StoryObj<typeof meta>

const items = [
  { key: '1', value: '1', label: 'Item 1' },
  { key: '2', value: '2', label: 'Item 2' },
  { key: '3', value: '3', label: 'Item 3' }
]

export const SingleSelect: Story = {
  args: { items, defaultValue: '2' }
}

export const MultiSelect: Story = {
  args: { items, multiSelect: true, defaultValue: ['1', '3'] }
}
