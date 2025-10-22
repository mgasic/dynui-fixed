import type { Meta, StoryObj } from '@storybook/react'
import { DynModal } from '../src/ui/dyn-modal'
import { useState } from 'react'

const meta: Meta<typeof DynModal> = {
  title: 'Overlays/DynModal/Scenarios',
  component: DynModal,
}
export default meta

type Story = StoryObj<typeof meta>

export const FocusTrap: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <button onClick={() => setOpen(true)}>Open</button>
        <a href="#">Focusable Link</a>
        <DynModal open={open} title="Focus Trap" onClose={() => setOpen(false)}>
          <button>First</button>
          <a href="#">Second</a>
          <input placeholder="Third" />
        </DynModal>
      </div>
    )
  }
}
