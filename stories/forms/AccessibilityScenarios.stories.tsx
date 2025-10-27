import type { Meta, StoryObj } from '@storybook/react'
import { DynInput } from '../../src/ui/dyn-input'
import { DynButton } from '../../src/ui/dyn-button'
import { DynSelect } from '../../src/ui/dyn-select'

const meta: Meta = {
  title: 'Examples/Accessibility Scenarios',
  parameters: {
    docs: {
      description: {
        component: 'Examples demonstrating proper accessibility patterns with DynUI components.'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const FormWithLabels: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <div>
        <label htmlFor="name-input">Full Name</label>
        <DynInput id="name-input" placeholder="Enter your full name" required />
      </div>
      <div>
        <label htmlFor="email-input">Email Address</label>
        <DynInput id="email-input" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label htmlFor="country-select">Country</label>
        <DynSelect 
          id="country-select"
          placeholder="Select your country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]}
          required
        />
      </div>
      <DynButton type="submit" variant="solid" color="primary">
        Submit Form
      </DynButton>
    </form>
  )
}
