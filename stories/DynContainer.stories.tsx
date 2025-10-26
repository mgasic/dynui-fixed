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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full']
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full']
    },
    p: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    m: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl']
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

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynContainer size="sm">
        <div style={{ background: '#e3f2fd', padding: '1rem' }}>Small Container</div>
      </DynContainer>
      <DynContainer size="md">
        <div style={{ background: '#f3e5f5', padding: '1rem' }}>Medium Container</div>
      </DynContainer>
      <DynContainer size="lg">
        <div style={{ background: '#e8f5e8', padding: '1rem' }}>Large Container</div>
      </DynContainer>
      <DynContainer size="xl">
        <div style={{ background: '#fff3e0', padding: '1rem' }}>Extra Large Container</div>
      </DynContainer>
    </div>
  )
}

export const WithPadding: Story = {
  args: {
    p: 'lg',
    children: (
      <div style={{ background: '#f5f5f5', minHeight: '200px' }}>
        Container with large padding
      </div>
    )
  }
}

export const Fluid: Story = {
  args: {
    fluid: true,
    children: (
      <div style={{ background: '#e1f5fe', padding: '1rem' }}>
        Fluid container takes full width
      </div>
    )
  }
}
