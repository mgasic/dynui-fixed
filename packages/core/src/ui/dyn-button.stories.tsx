import type { Meta, StoryObj } from '@storybook/react'
import { DynButton } from './dyn-button'

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with multiple variants, sizes, and states.'
      }
    },
    a11y: {
      // Run accessibility tests
      config: {
        rules: [
          {
            // Ensure button has accessible name
            id: 'button-name',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color scheme of the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button interactions'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outline',
    color: 'secondary'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton variant="solid">Solid</DynButton>
      <DynButton variant="outline">Outline</DynButton>
      <DynButton variant="ghost">Ghost</DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton size="sm">Small</DynButton>
      <DynButton size="md">Medium</DynButton>
      <DynButton size="lg">Large</DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes for comparison.'
      }
    }
  }
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton startIcon="→">Start Icon</DynButton>
      <DynButton endIcon="←">End Icon</DynButton>
      <DynButton startIcon="→" endIcon="←">Both Icons</DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icon positioning options.'
      }
    }
  }
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton>Normal</DynButton>
      <DynButton disabled>Disabled</DynButton>
      <DynButton loading>Loading</DynButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states including normal, disabled, and loading.'
      }
    }
  }
}

export const Keyboard: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Use Tab to focus, Enter or Space to activate
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DynButton>First Button</DynButton>
        <DynButton variant="outline">Second Button</DynButton>
        <DynButton variant="ghost">Third Button</DynButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation and accessibility features.'
      }
    }
  }
}
