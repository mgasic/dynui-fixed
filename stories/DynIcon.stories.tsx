import type { Meta, StoryObj } from '@storybook/react'
import { DynIcon } from '../src/ui/dyn-icon'
import { IconDictionaryProvider } from '../src/icons/icon-dictionary-provider'

const meta: Meta<typeof DynIcon> = {
  title: 'Data/DynIcon',
  component: DynIcon,
}
export default meta

type Story = StoryObj<typeof meta>

const DummyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
)

export const Default: Story = {
  render: () => (
    <IconDictionaryProvider icons={{ dot: DummyIcon }}>
      <DynIcon name="dot" />
    </IconDictionaryProvider>
  )
}
