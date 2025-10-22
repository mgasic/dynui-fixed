import type { Meta, StoryObj } from '@storybook/react'
import { DynSelect } from '../src/ui/dyn-select'

const meta: Meta<typeof DynSelect> = {
  title: 'Form/DynSelect',
  component: DynSelect,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DynSelect 
      placeholder="Pick one"
      options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
      ]}
    />
  )
}

export const Searchable: Story = {
  render: () => (
    <DynSelect 
      placeholder="Search..."
      searchable
      options={Array.from({ length: 20 }, (_, i) => ({ value: String(i+1), label: `Item ${i+1}` }))}
    />
  )
}
