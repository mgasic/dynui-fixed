import type { Meta, StoryObj } from '@storybook/react'
import { DynTable } from '../src/ui/dyn-table'

const meta: Meta<typeof DynTable> = {
  title: 'Data/DynTable/Scenarios',
  component: DynTable,
}
export default meta

type Story = StoryObj<typeof meta>

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true }
]

export const EmptyState: Story = {
  args: { columns, data: [] }
}

export const StickyHeader: Story = {
  render: () => (
    <div style={{ maxHeight: 200, overflow: 'auto' }}>
      <DynTable 
        columns={columns}
        data={Array.from({ length: 30 }, (_, i) => ({ name: `Row ${i+1}`, age: 20 + (i % 10) }))}
      />
    </div>
  )
}
