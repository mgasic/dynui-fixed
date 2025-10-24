import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@dynui/core'
import '@dynui/core/styles'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            options: { noScroll: true }
          }
        ]
      }
    },
    docs: {
      description: {
        component: 'DynUI Component Library - Enterprise React TypeScript Components'
      }
    }
  }
}

export default preview