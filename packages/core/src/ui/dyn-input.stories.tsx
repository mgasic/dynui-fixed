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
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true
          },
          {
            id: 'aria-input-field-name',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'url', 'tel', 'number'],
      description: 'Input type'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size'
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost'],
      description: 'Input style variant'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable input'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Mark as required field'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    'aria-label': 'Default input'
  }
}

export const WithLabel: Story = {
  render: () => (
    <div>
      <label htmlFor="email-input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
        Email Address
      </label>
      <DynInput
        id="email-input"
        type="email"
        placeholder="Enter your email"
        required
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with proper label association for accessibility.'
      }
    }
  }
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput
        placeholder="Search..."
        startIcon="🔍"
        aria-label="Search input with start icon"
      />
      <DynInput
        type="password"
        placeholder="Password"
        endIcon="👁"
        aria-label="Password input with end icon"
      />
      <DynInput
        placeholder="Username"
        startIcon="@"
        endIcon="✓"
        aria-label="Username input with both icons"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs with various icon placements.'
      }
    }
  }
}

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput type="text" placeholder="Text input" aria-label="Text input" />
      <DynInput type="email" placeholder="Email input" aria-label="Email input" />
      <DynInput type="password" placeholder="Password input" aria-label="Password input" />
      <DynInput type="url" placeholder="URL input" aria-label="URL input" />
      <DynInput type="tel" placeholder="Phone input" aria-label="Phone input" />
      <DynInput type="number" placeholder="Number input" aria-label="Number input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different HTML input types supported by DynInput.'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput size="sm" placeholder="Small input" aria-label="Small input" />
      <DynInput size="md" placeholder="Medium input" aria-label="Medium input" />
      <DynInput size="lg" placeholder="Large input" aria-label="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available input sizes.'
      }
    }
  }
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput placeholder="Normal input" aria-label="Normal input" />
      <DynInput placeholder="Disabled input" disabled aria-label="Disabled input" />
      <DynInput placeholder="Required input" required aria-label="Required input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states: normal, disabled, and required.'
      }
    }
  }
}

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
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <div style={{ fontSize: '0.875rem', color: '#666' }}>
          Current value: "{value}"
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive input demonstrating controlled component behavior.'
      }
    }
  }
}

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Use Tab to navigate between inputs, try typing and using keyboard shortcuts
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynInput placeholder="First input" aria-label="First input for keyboard test" />
        <DynInput placeholder="Second input" aria-label="Second input for keyboard test" />
        <DynInput placeholder="Third input" aria-label="Third input for keyboard test" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation and focus management.'
      }
    }
  }
}
