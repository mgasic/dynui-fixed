import type { Meta, StoryObj } from '@storybook/react'
import { DynListView } from '../src/ui/dyn-listview'
import { DynTreeView } from '../src/ui/dyn-tree'
import { DynTable } from '../src/ui/dyn-table'
import { DynInput } from '../src/ui/dyn-input'
import { DynButton } from '../src/ui/dyn-button'
import { DynTabs, DynTab, DynTabPanel } from '../src/ui/dyn-tabs'
import { DynMenu } from '../src/ui/dyn-menu'
import { DynModal } from '../src/ui/dyn-modal'

const meta: Meta = {
  title: 'KitchenSink/All Components',
}
export default meta

type Story = StoryObj

export const All: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <section>
        <h3>Navigation</h3>
        <DynTabs defaultValue="tab1">
          <DynTab item={{ key: 'tab1', value: 'tab1', label: 'Tab 1' }} />
          <DynTab item={{ key: 'tab2', value: 'tab2', label: 'Tab 2' }} />
          <DynTabPanel item={{ key: 'tab1', value: 'tab1', label: 'Tab 1' }}>Content 1</DynTabPanel>
          <DynTabPanel item={{ key: 'tab2', value: 'tab2', label: 'Tab 2' }}>Content 2</DynTabPanel>
        </DynTabs>
        <DynMenu
          items={[
            { type: 'item', value: 'new', label: 'New' },
            { type: 'item', value: 'open', label: 'Open' },
          ]}
        />
      </section>

      <section>
        <h3>Form</h3>
        <DynInput placeholder="Your name" />
        <DynButton>Submit</DynButton>
      </section>

      <section>
        <h3>Data</h3>
        <DynListView items={[{ key: '1', value: '1', label: 'One' }, { key: '2', value: '2', label: 'Two' }]} />
        <DynTreeView nodes={[{ key: 'root', value: 'root', label: 'Root' }]} />
        <DynTable columns={[{ key: 'name', label: 'Name' }]} data={[{ name: 'Alice' }]} />
      </section>

      <section>
        <h3>Overlays</h3>
        <DynModal open title="Sample Modal">Body</DynModal>
      </section>
    </div>
  )
}
