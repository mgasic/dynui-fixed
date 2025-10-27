import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynInput } from '../../src/ui/dyn-input'
import { DynFieldContainer } from '../../src/ui/dyn-field-container'

const meta: Meta<typeof DynInput> = {
  title: 'Forms/Accessibility Scenarios',
  component: DynInput,
}
export default meta

type Story = StoryObj<typeof meta>

export const DescribedByAndError: Story = {
  render: () => (
    <DynFieldContainer label="Email" description="We will never share your email." error="Invalid email format" required>
      <DynInput type="email" aria-invalid aria-describedby="email-error" />
    </DynFieldContainer>
  )
}

export const RequiredIndicator: Story = {
  render: () => (
    <DynFieldContainer label="Username" required>
      <DynInput />
    </DynFieldContainer>
  )
}