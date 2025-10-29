import type { Meta, StoryObj } from '@storybook/react'
import { DynTextArea } from '@dynui/core'

const meta: Meta<typeof DynTextArea> = {
  title: 'Form/DynTextArea Advanced',
  component: DynTextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Advanced textarea with auto-resize, character counting, and enhanced accessibility features.'
      }
    }
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'ghost'] },
    resize: { control: { type: 'select' }, options: ['none', 'vertical', 'horizontal', 'both'] },
    autoResize: { control: 'boolean' },
    maxLength: { control: { type: 'number', min: 0 } }
  }
}

export default meta

type Story = StoryObj<typeof DynTextArea>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...'
  }
}

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Type something...',
    maxLength: 200,
    showCharacterCount: true
  }
}

export const AutoResize: Story = {
  args: {
    placeholder: 'This textarea will grow as you type...',
    autoResize: true,
    minRows: 2,
    maxRows: 8
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynTextArea size="sm" placeholder="Small textarea" />
      <DynTextArea size="md" placeholder="Medium textarea" />
      <DynTextArea size="lg" placeholder="Large textarea" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynTextArea placeholder="Normal state" />
      <DynTextArea placeholder="Disabled state" disabled />
      <DynTextArea placeholder="Readonly state" readonly value="This is readonly text" />
      <DynTextArea placeholder="Error state" data-state="error" />
      <DynTextArea placeholder="Success state" data-state="success" />
    </div>
  )
}
