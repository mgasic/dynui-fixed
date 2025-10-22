import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(ts|tsx)',
    // Temporarily disable MDX stories until FAZA 1 KORAK 3 (apps/storybook migration)
    // '../stories/**/*.stories.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs' // Explicitly add docs addon for MDX support
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '../vite.config.ts'
      }
    }
  },
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript'
  },
  core: {
    disableTelemetry: true
  }
};

export default config;