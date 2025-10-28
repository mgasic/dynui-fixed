import type { Meta, StoryObj } from '@storybook/react-vite'
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
      options: ['primary', 'secondary', 'success', 'warning', 'error']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    color: 'secondary'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton variant="solid">Solid</DynButton>
      <DynButton variant="outline">Outline</DynButton>
      <DynButton variant="ghost">Ghost</DynButton>
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton size="sm">Small</DynButton>
      <DynButton size="md">Medium</DynButton>
      <DynButton size="lg">Large</DynButton>
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton startIcon="→">Start Icon</DynButton>
      <DynButton endIcon="←">End Icon</DynButton>
      <DynButton startIcon="→" endIcon="←">Both Icons</DynButton>
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton>Normal</DynButton>
      <DynButton disabled>Disabled</DynButton>
      <DynButton loading>Loading</DynButton>
    </div>
  )
}
