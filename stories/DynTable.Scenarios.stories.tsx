import type { Meta, StoryObj } from '@storybook/react'
import { DynTable } from '../src/ui/dyn-table'

const meta: Meta<typeof DynTable> = {
  title: 'Data/DynTable Scenarios',
  component: DynTable,
}
export default meta

type Story = StoryObj<typeof meta>

export const EmptyState: Story = {
  args: { columns: [], data: [] }
}
