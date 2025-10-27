import type { Meta, StoryObj } from '@storybook/react'
import { DynModal } from '../src/ui/dyn-modal'
import { useState } from 'react'

const meta: Meta<typeof DynModal> = {
  title: 'Overlays/DynModal',
  component: DynModal,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <button onClick={() => setOpen(true)}>Open Modal</button>
        <DynModal open={open} title="Example Modal" onClose={() => setOpen(false)}>
          <p>Modal content goes here.</p>
        </DynModal>
      </div>
    )
  }
}
