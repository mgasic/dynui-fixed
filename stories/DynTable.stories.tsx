import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynTable } from '../src/ui/dyn-table'

const meta: Meta<typeof DynTable> = {
  title: 'Data/DynTable',
  component: DynTable,
}
export default meta

type Story = StoryObj<typeof meta>

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'email', label: 'Email' }
]

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
]

export const Default: Story = {
  args: { columns, data }
}

export const Sortable: Story = {
  render: () => (
    <DynTable columns={columns} data={data} sortable />
  )
}
