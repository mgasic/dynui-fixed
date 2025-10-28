import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DynInput } from './dyn-input'

const meta: Meta<typeof DynInput> = {
  title: 'Components/DynInput',
  component: DynInput,
  parameters: {
    docs: {
      description: {
        component: 'A customizable input component with multiple types, icons, and validation states.'
      }
    }
  },
  argTypes: {
    onChange: {
      description: 'Called with the new string value when the input changes',
      control: false,
      table: {
        type: { summary: '(value: string) => void' }
      }
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'url', 'tel', 'number']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost']
    },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label htmlFor="interactive-input" style={{ fontWeight: 500 }}>
          Interactive Input
        </label>
        <DynInput
          id="interactive-input"
          value={value}
          onChange={setValue}
          placeholder="Type something..."
        />
        <div style={{ fontSize: '0.875rem', color: '#666' }}>
          Current value: "{value}"
        </div>
      </div>
    )
  }
}
