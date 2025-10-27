import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynTextArea } from '@dynui/core'

const meta: Meta<typeof DynTextArea> = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input with controlled/uncontrolled support, resize options, and full accessibility.'
      }
    }
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'ghost', 'link'] },
    resize: { control: { type: 'select' }, options: ['none', 'vertical', 'horizontal', 'both'] }
  }
}

export default meta

type Story = StoryObj<typeof DynTextArea>

export const Default: Story = {
  args: {
    placeholder: 'Enter description...',
    rows: 4
  }
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynTextArea placeholder="Solid" variant="solid" />
      <DynTextArea placeholder="Outline" variant="outline" />
      <DynTextArea placeholder="Ghost" variant="ghost" />
      <DynTextArea placeholder="Link" variant="link" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynTextArea placeholder="Small" size="sm" />
      <DynTextArea placeholder="Medium" size="md" />
      <DynTextArea placeholder="Large" size="lg" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynTextArea placeholder="Disabled" disabled />
      <DynTextArea placeholder="Readonly" readonly />
      <DynTextArea placeholder="Error state" data-state="error" />
    </div>
  )
}