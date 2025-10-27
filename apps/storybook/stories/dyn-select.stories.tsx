import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { DynSelect } from '@dynui/core'
import type { DynSelectRef } from '@dynui/core'
import { useRef } from 'react'

const meta: Meta<typeof DynSelect> = {
  title: 'Form/DynSelect',
  component: DynSelect,
  parameters: {
    docs: {
      description: {
        component:
          'Advanced dropdown selection with searchable, multiple selection, keyboard navigation, and mini API support.'
      }
    }
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['solid', 'outline', 'ghost', 'link'] },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
}

export default meta

type Story = StoryObj<typeof DynSelect>

const sampleOptions = [
  { value: 'react', label: 'React', description: 'JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop apps' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity' }
]

export const Default: Story = {
  args: {
    placeholder: 'Choose a framework',
    options: sampleOptions
  }
}

export const Searchable: Story = {
  args: {
    placeholder: 'Search frameworks...',
    options: sampleOptions,
    searchable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    
    // Open dropdown
    await userEvent.click(trigger)
    
    // Verify search input appears
    const searchInput = canvas.getByPlaceholderText('Search...')
    expect(searchInput).toBeInTheDocument()
    
    // Test search functionality
    await userEvent.type(searchInput, 'react')
    
    // Should filter options
    expect(canvas.getByText('React')).toBeInTheDocument()
  }
}

export const Multiple: Story = {
  args: {
    placeholder: 'Select multiple frameworks',
    options: sampleOptions,
    multiple: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    
    // Open dropdown
    await userEvent.click(trigger)
    
    // Select multiple options
    await userEvent.click(canvas.getByText('React'))
    await userEvent.click(canvas.getByText('Vue.js'))
    
    // Verify multiple selection display
    expect(trigger).toHaveTextContent('2 selected')
  }
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynSelect 
        placeholder="Small" 
        size="sm" 
        options={sampleOptions.slice(0, 3)} 
      />
      <DynSelect 
        placeholder="Medium" 
        size="md" 
        options={sampleOptions.slice(0, 3)} 
      />
      <DynSelect 
        placeholder="Large" 
        size="lg" 
        options={sampleOptions.slice(0, 3)} 
      />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <DynSelect 
        placeholder="Disabled" 
        options={sampleOptions.slice(0, 3)}
        disabled 
      />
      <DynSelect 
        placeholder="Error state" 
        options={sampleOptions.slice(0, 3)}
        data-state="error" 
      />
      <DynSelect 
        placeholder="Success state" 
        options={sampleOptions.slice(0, 3)}
        data-state="success" 
      />
    </div>
  )
}

export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState('react')
    
    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        <DynSelect
          value={value}
          onChange={setValue}
          options={sampleOptions}
          placeholder="Controlled select"
        />
        <p>Selected value: {value || 'None'}</p>
        <button onClick={() => setValue('vue')}>Set to Vue.js</button>
        <button onClick={() => setValue('')}>Clear selection</button>
      </div>
    )
  }
}

export const MiniAPI: Story = {
  render: function MiniAPIExample() {
    const selectRef = useRef<DynSelectRef>(null)
    
    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        <DynSelect
          ref={selectRef}
          options={sampleOptions}
          placeholder="Select with API control"
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => selectRef.current?.focus()}>Focus</button>
          <button onClick={() => selectRef.current?.open()}>Open</button>
          <button onClick={() => selectRef.current?.close()}>Close</button>
          <button onClick={() => selectRef.current?.clear()}>Clear</button>
        </div>
      </div>
    )
  }
}

export const Accessibility: Story = {
  args: {
    'aria-label': 'Choose your preferred framework',
    options: sampleOptions,
    searchable: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    
    // Verify ARIA attributes
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    
    // Test keyboard navigation
    await userEvent.tab()
    expect(trigger).toHaveFocus()
    
    // Open with Enter or Space
    await userEvent.keyboard('{ArrowDown}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    
    // Navigate options with arrows
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')
    
    // Should close and select option
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  }
}
