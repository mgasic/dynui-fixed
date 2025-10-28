import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynInput } from '../src/ui/dyn-input'

const meta: Meta<typeof DynInput> = {
  title: 'Components/DynInput',
  component: DynInput,
  parameters: {
    docs: {
      description: {
        component: 'A form input component with full controlled/uncontrolled support, accessibility, and customizable styling.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost']
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'url', 'tel', 'number']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
}

export const WithIcons: Story = {
  args: {
    placeholder: 'Search...',
    startIcon: '🔍',
    endIcon: '✉️'
  }
}

export const WithPrefixSuffix: Story = {
  args: {
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD'
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput size="sm" placeholder="Small input" />
      <DynInput size="md" placeholder="Medium input" />
      <DynInput size="lg" placeholder="Large input" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput placeholder="Normal" />
      <DynInput placeholder="Disabled" disabled />
      <DynInput placeholder="Readonly" readonly value="Read-only value" />
      <DynInput placeholder="Error state" data-state="error" aria-invalid />
    </div>
  )
}
