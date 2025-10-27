import type { Meta, StoryObj } from '@storybook/react-vite'
import { DynTabs, DynTab, DynTabPanel } from '@dynui/core'

const meta: Meta<typeof DynTabs> = {
  title: 'Navigation/DynTabs',
  component: DynTabs,
  parameters: {
    docs: {
      description: {
        component:
          'WAI-ARIA compliant Tabs with activation modes (auto/manual), orientation, and keyboard navigation.'
      }
    }
  },
  argTypes: {
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
    activation: { control: { type: 'select' }, options: ['auto', 'manual'] }
  }
}

export default meta

type Story = StoryObj<typeof DynTabs>

export const Default: Story = {
  render: () => (
    <DynTabs defaultValue="tab1" aria-label="Main navigation">
      <DynTab item={{ key: 't1', value: 'tab1', label: 'First' }} />
      <DynTab item={{ key: 't2', value: 'tab2', label: 'Second' }} />
      <DynTabPanel item={{ key: 't1', value: 'tab1', label: 'First' }}>
        Tab 1 content
      </DynTabPanel>
      <DynTabPanel item={{ key: 't2', value: 'tab2', label: 'Second' }}>
        Tab 2 content
      </DynTabPanel>
    </DynTabs>
  )
}

export const VerticalManual: Story = {
  render: () => (
    <DynTabs defaultValue="tab1" orientation="vertical" activation="manual" aria-label="Vertical tabs">
      <DynTab item={{ key: 't1', value: 'tab1', label: 'Overview' }} />
      <DynTab item={{ key: 't2', value: 'tab2', label: 'Settings' }} />
      <DynTab item={{ key: 't3', value: 'tab3', label: 'Logs' }} />
      
      <DynTabPanel item={{ key: 't1', value: 'tab1', label: 'Overview' }}>
        Overview content
      </DynTabPanel>
      <DynTabPanel item={{ key: 't2', value: 'tab2', label: 'Settings' }}>
        Settings content
      </DynTabPanel>
      <DynTabPanel item={{ key: 't3', value: 'tab3', label: 'Logs' }}>
        Logs content
      </DynTabPanel>
    </DynTabs>
  )
}

export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState('tab1')
    return (
      <div>
        <DynTabs value={value} onChange={setValue} aria-label="Controlled tabs">
          <DynTab item={{ key: 't1', value: 'tab1', label: 'First' }} />
          <DynTab item={{ key: 't2', value: 'tab2', label: 'Second' }} />
          <DynTabPanel item={{ key: 't1', value: 'tab1', label: 'First' }}>
            Controlled tab 1
          </DynTabPanel>
          <DynTabPanel item={{ key: 't2', value: 'tab2', label: 'Second' }}>
            Controlled tab 2
          </DynTabPanel>
        </DynTabs>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setValue('tab2')}>Go to Second</button>
        </div>
      </div>
    )
  }
}
