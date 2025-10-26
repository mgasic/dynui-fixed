import type { Meta, StoryObj } from '@storybook/react'
import { DynContainer } from '../src/ui/dyn-container'

const meta: Meta<typeof DynContainer> = {
  title: 'Layout/DynContainer',
  component: DynContainer,
  parameters: {
    docs: {
      description: {
        component: 'A responsive container component that provides consistent max-width constraints.'
      }
    }
  },
  argTypes: {
    maxWidth: {
      control: { type: 'text' },
      description: 'Sets a maximum width for the container (numbers are treated as pixels).'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional class names appended to the container.'
    },
    style: {
      control: { type: 'object' },
      description: 'Inline styles merged onto the container element.'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const SampleContent = () => (
  <div style={{ background: '#f0f0f0', padding: '2rem', borderRadius: '0.5rem' }}>
    <h2>Container Content</h2>
    <p>This content is wrapped in a DynContainer component that provides responsive width constraints.</p>
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

export const WithCustomStyles: Story = {
  args: {
    style: { padding: '2rem', margin: '2rem auto', background: '#f5f5f5' },
    children: (
      <div style={{ minHeight: '200px' }}>
        Container with inline spacing applied via the style prop.
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
