import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynTabs, DynTab, DynTabPanel } from '../src/ui/dyn-tabs'

const meta: Meta<typeof DynTabs> = {
  title: 'Components/DynTabs',
  component: DynTabs,
  parameters: {
    docs: {
      description: {
        component: 'A tabs component with full WAI-ARIA support, keyboard navigation, and flexible layout options.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const sampleTabs = [
  { key: 'overview', value: 'overview', label: 'Overview' },
  { key: 'details', value: 'details', label: 'Details' },
  { key: 'settings', value: 'settings', label: 'Settings' }
]

export const Default: Story = {
  render: () => (
    <DynTabs defaultValue="overview">
      {sampleTabs.map(item => (
        <DynTab key={item.key} item={item} />
      ))}
      {sampleTabs.map(item => (
        <DynTabPanel key={`panel-${item.key}`} item={item}>
          <h3>{item.label} Content</h3>
          <p>This is the content for the {item.label.toLowerCase()} tab.</p>
        </DynTabPanel>
      ))}
    </DynTabs>
  )
}

export const Vertical: Story = {
  render: () => (
    <DynTabs defaultValue="overview" orientation="vertical">
      {sampleTabs.map(item => (
        <DynTab key={item.key} item={item} />
      ))}
      {sampleTabs.map(item => (
        <DynTabPanel key={`panel-${item.key}`} item={item}>
          <h3>{item.label} Content</h3>
          <p>This is the content for the {item.label.toLowerCase()} tab in vertical layout.</p>
        </DynTabPanel>
      ))}
    </DynTabs>
  )
}

export const ManualActivation: Story = {
  render: () => (
    <DynTabs defaultValue="overview" activation="manual">
      {sampleTabs.map(item => (
        <DynTab key={item.key} item={item} />
      ))}
      {sampleTabs.map(item => (
        <DynTabPanel key={`panel-${item.key}`} item={item}>
          <h3>{item.label} Content</h3>
          <p>Manual activation - requires Enter/Space key or click to activate.</p>
        </DynTabPanel>
      ))}
    </DynTabs>
  )
}
