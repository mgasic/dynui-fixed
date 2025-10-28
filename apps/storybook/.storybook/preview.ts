import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@dynui/core'
import '@dynui/core/styles'
import { createElement } from 'react'

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        ThemeProvider,
        null,
        createElement(
          'div',
          { style: { padding: '1rem' } },
          createElement(Story)
        )
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
