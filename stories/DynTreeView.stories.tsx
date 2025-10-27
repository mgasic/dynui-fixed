import type { Meta, StoryObj } from '@storybook/react'
import { DynTreeView } from '../src/ui/dyn-tree'

const meta: Meta<typeof DynTreeView> = {
  title: 'Data/DynTreeView',
  component: DynTreeView,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [
      { key: 'root', value: 'root', label: 'Root', children: [
        { key: 'child1', value: 'child1', label: 'Child 1' },
        { key: 'child2', value: 'child2', label: 'Child 2' }
      ]}
    ]
  }
}
