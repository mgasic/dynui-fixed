import type { Meta, StoryObj } from '@storybook/react'
import { DynButton } from '../src/ui/dyn-button'

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with multiple variants, sizes, and states.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    color: {
      control: { type: 'select' },
      options: ['neutral', 'info', 'success', 'warning', 'danger']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button'
  }
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton variant="solid">Solid</DynButton>
      <DynButton variant="outline">Outline</DynButton>
      <DynButton variant="ghost">Ghost</DynButton>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton size="sm">Small</DynButton>
      <DynButton size="md">Medium</DynButton>
      <DynButton size="lg">Large</DynButton>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <DynButton color="neutral">Neutral</DynButton>
      <DynButton color="info">Info</DynButton>
      <DynButton color="success">Success</DynButton>
      <DynButton color="warning">Warning</DynButton>
      <DynButton color="danger">Danger</DynButton>
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton startIcon="📋">Save</DynButton>
      <DynButton endIcon="→">Next</DynButton>
      <DynButton startIcon="🚫" color="danger">Delete</DynButton>
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton>Normal</DynButton>
      <DynButton disabled>Disabled</DynButton>
      <DynButton loading>Loading</DynButton>
    </div>
  )
}
