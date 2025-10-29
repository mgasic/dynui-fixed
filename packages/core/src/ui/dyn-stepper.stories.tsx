import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { within, userEvent, expect } from '@storybook/test'
import { DynStepper, DynStep } from './dyn-stepper'

const meta: Meta<typeof DynStepper> = {
  title: 'Navigation/DynStepper',
  component: DynStepper,
  parameters: {
    docs: {
      description: {
        component: 'Step navigation with keyboard support and ARIA compliance. Supports horizontal and vertical orientations with proper focus management.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg']
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 5 }
    }
  }
}

export default meta
type Story = StoryObj<typeof DynStepper>

// Interactive wrapper component
function StepperDemo({ orientation = 'horizontal', size = 'md', totalSteps = 4 }) {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div style={{ padding: '2rem', maxWidth: orientation === 'vertical' ? '300px' : '100%' }}>
      <DynStepper
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepChange={setCurrentStep}
        orientation={orientation}
        size={size}
      >
        <DynStep
          step={1}
          title="Account Setup"
          description="Create your account and verify email"
        >
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', marginTop: '1rem' }}>
            <h3>Step 1: Account Setup</h3>
            <p>Set up your account with basic information.</p>
          </div>
        </DynStep>
        
        <DynStep
          step={2}
          title="Profile Information"
          description="Add your personal and professional details"
        >
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', marginTop: '1rem' }}>
            <h3>Step 2: Profile Information</h3>
            <p>Tell us more about yourself.</p>
          </div>
        </DynStep>
        
        <DynStep
          step={3}
          title="Preferences"
          description="Customize your experience"
        >
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', marginTop: '1rem' }}>
            <h3>Step 3: Preferences</h3>
            <p>Set your preferences and settings.</p>
          </div>
        </DynStep>
        
        <DynStep
          step={4}
          title="Review & Complete"
          description="Review your information and finish setup"
        >
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px', marginTop: '1rem' }}>
            <h3>Step 4: Review & Complete</h3>
            <p>Everything looks good! Complete your setup.</p>
          </div>
        </DynStep>
      </DynStepper>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
          style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Next
        </button>
        <span style={{ alignSelf: 'center', color: '#666' }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  )
}

// Stories
export const Default: Story = {
  render: () => <StepperDemo />
}

export const Vertical: Story = {
  render: () => <StepperDemo orientation="vertical" />
}

export const Small: Story = {
  render: () => <StepperDemo size="sm" />
}

export const Large: Story = {
  render: () => <StepperDemo size="lg" />
}

export const WithoutContent: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2)
    
    return (
      <div style={{ padding: '2rem' }}>
        <DynStepper
          currentStep={currentStep}
          totalSteps={5}
          onStepChange={setCurrentStep}
        >
          <DynStep step={1} title="Start" />
          <DynStep step={2} title="In Progress" />
          <DynStep step={3} title="Review" />
          <DynStep step={4} title="Approve" />
          <DynStep step={5} title="Complete" />
        </DynStepper>
      </div>
    )
  }
}

export const WithDisabledSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2)
    
    return (
      <div style={{ padding: '2rem' }}>
        <DynStepper
          currentStep={currentStep}
          totalSteps={4}
          onStepChange={setCurrentStep}
        >
          <DynStep step={1} title="Completed" description="This step is done" />
          <DynStep step={2} title="Current" description="Currently active step" />
          <DynStep step={3} title="Locked" description="Complete previous steps first" disabled />
          <DynStep step={4} title="Final" description="Last step" disabled />
        </DynStepper>
      </div>
    )
  }
}

// Keyboard navigation demo
export const KeyboardNavigation: Story = {
  render: () => <StepperDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Click on any step and use keyboard navigation: Arrow Left/Right (or Up/Down for vertical), Home/End keys, Enter/Space to activate steps.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Find the first step button
    const step1 = canvas.getByRole('tab', { name: /Account Setup/i })
    
    // Focus and navigate
    step1.focus()
    await userEvent.keyboard('{ArrowRight}')
    
    // Verify step 2 is now focused
    const step2 = canvas.getByRole('tab', { name: /Profile Information/i })
    expect(step2).toHaveFocus()
    
    // Test Home key
    await userEvent.keyboard('{Home}')
    expect(step1).toHaveFocus()
    
    // Test End key
    await userEvent.keyboard('{End}')
    const step4 = canvas.getByRole('tab', { name: /Review & Complete/i })
    expect(step4).toHaveFocus()
  }
}

// Accessibility demo
export const AccessibilityDemo: Story = {
  render: () => <StepperDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper ARIA attributes, role="tablist", aria-current="step", and screen reader support.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'keyboard-navigation', 
            enabled: true
          }
        ]
      }
    }
  }
}

// Responsive demo
export const Responsive: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Desktop (Horizontal)</h3>
      <div style={{ marginBottom: '3rem' }}>
        <StepperDemo orientation="horizontal" />
      </div>
      
      <h3 style={{ marginBottom: '1rem' }}>Mobile (Vertical)</h3>
      <div style={{ maxWidth: '400px' }}>
        <StepperDemo orientation="vertical" />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } }
      }
    }
  }
}