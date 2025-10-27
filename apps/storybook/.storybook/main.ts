import path from 'node:path'

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    path.join(
      path.resolve(__dirname, '..', '..', '..', 'packages'),
      '*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
    ),
    path.join(
      path.resolve(__dirname, '..', '..', '..', 'stories'),
      '**/*.stories.@(js|jsx|ts|tsx|mdx)'
    ),
    path.join(
      path.resolve(__dirname, '..', 'stories'),
      '**/*.stories.@(js|jsx|ts|tsx|mdx)'
    )
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript'
  },
  docs: {
    autodocs: 'tag'
  }
}

export default config
