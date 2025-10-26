import type { Meta, StoryObj } from '@storybook/react'
import { DynContainer } from '../src/ui/dyn-container'

const meta: Meta<typeof DynContainer> = {
  title: 'Layout/DynContainer',
  component: DynContainer,
  parameters: {
    docs: {
      description: {
        component: 'A responsive container component that provides consistent spacing and max-width constraints.'
      }
    }
  },
  argTypes: {
    maxWidth: {
      control: { type: 'text' },
      description: 'Sets a maximum width for the container (number will be treated as pixels).'
    },
    p: {
      control: { type: 'text' },
      description: 'Padding applied to the container. Numbers are treated as pixels.'
    },
    m: {
      control: { type: 'text' },
      description: 'Margin applied to the container. Numbers are treated as pixels.'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const SampleContent = () => (
  <div style={{ background: '#f0f0f0', padding: '2rem', borderRadius: '0.5rem' }}>
    <h2>Container Content</h2>
    <p>This content is wrapped in a DynContainer component that provides responsive width constraints and spacing.</p>
  </div>
)

export const Default: Story = {
  args: {
    children: <SampleContent />
  }
}

export const MaxWidthExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynContainer maxWidth={360}>
        <div style={{ background: '#e3f2fd', padding: '1rem' }}>360px max width</div>
      </DynContainer>
      <DynContainer maxWidth="48rem">
        <div style={{ background: '#f3e5f5', padding: '1rem' }}>48rem max width</div>
      </DynContainer>
      <DynContainer>
        <div style={{ background: '#e8f5e8', padding: '1rem' }}>No max width</div>
      </DynContainer>
    </div>
  )
}

export const WithSpacing: Story = {
  args: {
    p: 32,
    m: '2rem',
    children: (
      <div style={{ background: '#f5f5f5', minHeight: '200px' }}>
        Container with padding and margin applied via inline styles
      </div>
    )
  }
}
