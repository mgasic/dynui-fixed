import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { within, userEvent, expect } from '@storybook/test'
import { DynFieldContainer } from './dyn-field-container'

const meta: Meta<typeof DynFieldContainer> = {
  title: 'Layout/DynFieldContainer',
  component: DynFieldContainer,
  parameters: {
    docs: {
      description: {
        component: 'Universal field wrapper with labels, validation states, and proper accessibility. Automatically enhances child form elements with ARIA attributes.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    required: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof DynFieldContainer>

// Basic usage examples
export const Default: Story = {
  args: {
    label: 'Email Address',
    description: 'Enter your email address for notifications',
    children: <input type="email" placeholder="user@example.com" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
  }
}

export const Required: Story = {
  args: {
    label: 'Password',
    description: 'Password must be at least 8 characters long',
    required: true,
    children: <input type="password" placeholder="Enter password" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
  }
}

export const WithError: Story = {
  args: {
    label: 'Username',
    error: 'This username is already taken',
    children: <input type="text" value="john_doe" style={{ padding: '8px', border: '2px solid #ef4444', borderRadius: '4px' }} />
  }
}

export const WithMultipleErrors: Story = {
  args: {
    label: 'Password',
    error: [
      'Password must be at least 8 characters long',
      'Password must contain at least one number',
      'Password must contain at least one special character'
    ],
    children: <input type="password" value="abc" style={{ padding: '8px', border: '2px solid #ef4444', borderRadius: '4px' }} />
  }
}

export const WithWarning: Story = {
  args: {
    label: 'Email',
    warning: 'This email domain has been associated with spam',
    children: <input type="email" value="user@suspicious-domain.com" style={{ padding: '8px', border: '2px solid #f59e0b', borderRadius: '4px' }} />
  }
}

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    success: 'Username is available!',
    children: <input type="text" value="unique_user_123" style={{ padding: '8px', border: '2px solid #10b981', borderRadius: '4px' }} />
  }
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynFieldContainer label="Small Field" size="sm">
        <input placeholder="Small size" style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
      </DynFieldContainer>
      
      <DynFieldContainer label="Medium Field" size="md">
        <input placeholder="Medium size" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
      </DynFieldContainer>
      
      <DynFieldContainer label="Large Field" size="lg">
        <input placeholder="Large size" style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '18px' }} />
      </DynFieldContainer>
    </div>
  )
}

// Different form elements
export const WithTextarea: Story = {
  args: {
    label: 'Comments',
    description: 'Please share your feedback',
    children: (
      <textarea 
        placeholder="Enter your comments here..."
        rows={4}
        style={{ 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
      />
    )
  }
}

export const WithSelect: Story = {
  args: {
    label: 'Country',
    description: 'Select your country of residence',
    required: true,
    children: (
      <select style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <option value="">Choose a country...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
    )
  }
}

// Interactive validation demo
export const InteractiveValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | undefined>()
    
    const validateEmail = (value: string) => {
      if (!value) {
        setError('Email is required')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError('Please enter a valid email address')
      } else if (value.includes('test@')) {
        setError('Test emails are not allowed')
      } else {
        setError(undefined)
      }
    }
    
    return (
      <DynFieldContainer
        label="Email Address"
        description="Enter your email for account registration"
        error={error}
        required
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            validateEmail(e.target.value)
          }}
          placeholder="user@example.com"
          style={{ 
            padding: '8px', 
            border: `2px solid ${error ? '#ef4444' : '#ccc'}`, 
            borderRadius: '4px' 
          }}
        />
      </DynFieldContainer>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing real-time validation. Try entering different email formats to see validation messages.'
      }
    }
  }
}

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    description: 'This field is currently disabled',
    disabled: true,
    children: (
      <input 
        type="text" 
        value="Cannot edit this"
        style={{ 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          color: '#666',
          cursor: 'not-allowed'
        }}
      />
    )
  }
}

// Complex form example
export const ComplexForm: Story = {
  render: () => (
    <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DynFieldContainer
        label="Full Name"
        description="Enter your first and last name"
        required
      >
        <input 
          type="text" 
          placeholder="John Doe"
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Email Address"
        error="Please enter a valid email address"
        required
      >
        <input 
          type="email" 
          value="invalid-email"
          style={{ padding: '8px', border: '2px solid #ef4444', borderRadius: '4px' }}
        />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Phone Number"
        warning="We'll only use this for account recovery"
      >
        <input 
          type="tel" 
          placeholder="+1 (555) 123-4567"
          style={{ padding: '8px', border: '2px solid #f59e0b', borderRadius: '4px' }}
        />
      </DynFieldContainer>
      
      <DynFieldContainer
        label="Password"
        success="Password strength: Strong"
        required
      >
        <input 
          type="password" 
          placeholder="Enter secure password"
          style={{ padding: '8px', border: '2px solid #10b981', borderRadius: '4px' }}
        />
      </DynFieldContainer>
      
      <button 
        type="submit"
        style={{ 
          padding: '12px 24px', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Create Account
      </button>
    </form>
  )
}

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  args: {
    label: 'Accessible Field Example',
    description: 'This demonstrates proper accessibility features',
    required: true,
    children: (
      <input 
        type="text"
        placeholder="Focus this field and use a screen reader"
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper ARIA attributes, label association, and screen reader support. The field will have aria-labelledby, aria-describedby, and aria-required attributes automatically applied.'
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
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
}

// Play function example
export const WithPlayFunction: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | undefined>()
    
    return (
      <DynFieldContainer
        label="Interactive Field"
        description="Type 'error' to trigger validation"
        error={error}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (e.target.value.toLowerCase() === 'error') {
              setError('This triggers an error state!')
            } else {
              setError(undefined)
            }
          }}
          placeholder="Type 'error' to see validation"
          style={{ 
            padding: '8px', 
            border: `2px solid ${error ? '#ef4444' : '#ccc'}`, 
            borderRadius: '4px' 
          }}
        />
      </DynFieldContainer>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(/Type 'error'/i)
    
    // Type 'error' to trigger validation
    await userEvent.type(input, 'error')
    
    // Verify error message appears
    expect(canvas.getByText('This triggers an error state!')).toBeInTheDocument()
    
    // Clear and verify error disappears
    await userEvent.clear(input)
    await userEvent.type(input, 'valid input')
    
    expect(canvas.queryByText('This triggers an error state!')).not.toBeInTheDocument()
  }
}