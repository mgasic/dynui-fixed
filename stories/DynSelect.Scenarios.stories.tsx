import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynSelect } from '../src/ui/dyn-select'

const meta: Meta<typeof DynSelect> = {
  title: 'Form/DynSelect/Scenarios',
  component: DynSelect,
}
export default meta

type Story = StoryObj<typeof meta>

export const DisabledOptions: Story = {
  render: () => (
    <DynSelect 
      placeholder="Choose..."
      options={[
        { value: '1', label: 'Enabled' },
        { value: '2', label: 'Disabled', disabled: true },
        { value: '3', label: 'Also Enabled' }
      ]}
    />
  )
}

export const LongListVirtualHint: Story = {
  render: () => (
    <DynSelect 
      placeholder="Many items"
      options={Array.from({ length: 200 }, (_, i) => ({ value: `v${i}`, label: `Item ${i}` }))}
    />
  )
}
