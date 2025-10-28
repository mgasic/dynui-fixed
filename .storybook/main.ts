import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Legacy stories (for backward compatibility)
    '../stories/**/*.stories.@(ts|tsx)',
    // 🆕 CO-LOCATED STORIES: Primary pattern for component library
    '../packages/*/src/**/*.stories.@(ts|tsx)',
    // Temporarily disable MDX stories until FAZA 1 KORAK 3 (apps/storybook migration)
    // '../stories/**/*.stories.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs', // Explicitly add docs addon for MDX support
    '@storybook/addon-interactions', // For interactive testing
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
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      propFilter: (prop) => {
        // Include props from node_modules for better documentation
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules')
        }
        return true
      },
    },
  },
  core: {
    disableTelemetry: true
  },
  // 🆕 DOCS CONFIG: Auto-generate docs for all stories
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
  // 🆕 VITE CONFIG: Enhanced for monorepo
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Workspace package aliases
      '@dynui/core': new URL('../packages/core/src', import.meta.url).pathname,
      '@dynui/design-tokens': new URL('../packages/design-tokens/src', import.meta.url).pathname,
      '@dynui/icons': new URL('../packages/icons/src', import.meta.url).pathname,
    };
    
    return config;
  },
};

export default config;
