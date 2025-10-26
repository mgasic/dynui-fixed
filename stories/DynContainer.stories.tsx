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
      description: 'Maximum width of the container. Accepts numbers (pixels) or CSS length values.'
    },
    p: {
      control: { type: 'text' },
      description: 'Padding applied to the container. Accepts numbers (pixels) or CSS length values.'
    },
    m: {
      control: { type: 'text' },
      description: 'Margin applied to the container. Accepts numbers (pixels) or CSS length values.'
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

export const WithPadding: Story = {
  args: {
    p: '2rem',
    children: (
      <div style={{ background: '#f5f5f5', minHeight: '200px' }}>
        Container with large padding
      </div>
    )
  }
}

export const WithMargin: Story = {
  args: {
    m: '1.5rem',
    children: (
      <div style={{ background: '#e1f5fe', padding: '1rem' }}>
        Container with outer margin applied via props
      </div>
    )
  }
}

export const ConstrainedWidth: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <DynContainer maxWidth={480} style={{ background: '#fff3e0', padding: '1.5rem' }}>
        Container constrained to 480px with numeric maxWidth
      </DynContainer>
      <DynContainer maxWidth="60ch" style={{ background: '#f3e5f5', padding: '1.5rem' }}>
        Container constrained to 60ch with CSS maxWidth value
      </DynContainer>
    </div>
  )
}
