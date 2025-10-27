import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynButton } from '../src/ui/dyn-button'
import { DynInput } from '../src/ui/dyn-input'
import { DynSelect } from '../src/ui/dyn-select'
import { DynCheckbox } from '../src/ui/dyn-checkbox'

const meta: Meta = {
  title: 'Examples/KitchenSink',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive example showing multiple DynUI components working together.'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <DynInput placeholder="Enter your name" />
      <DynInput type="email" placeholder="Enter your email" />
      <DynSelect 
        placeholder="Choose country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' }
        ]}
      />
      <DynCheckbox label="I agree to the terms and conditions" />
      <DynButton type="submit" variant="solid" color="primary">
        Submit
      </DynButton>
    </form>
  )
}
