import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const smokeOnly = process.env.STORYBOOK_SMOKE === 'true';
const stories = smokeOnly
  ? ['../stories/qa-smoke.stories.tsx']
  : [
      '../stories/**/*.mdx',
      '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
      // 🆕 CO-LOCATED STORIES: Main pattern for monorepo
      '../../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)',
    ];

const config: StorybookConfig = {
  stories,
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    //getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  viteFinal: async (config) => {
    // 🆕 ENHANCED VITE CONFIG for monorepo packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Legacy alias (for backward compatibility)
      'dyn-ui-react': join(__dirname, '../packages/dyn-ui-react/src'),
      // 🆕 NEW ALIASES: Direct package imports
      '@dynui/core': join(__dirname, '../../packages/core/src'),
      '@dynui/design-tokens': join(__dirname, '../../packages/design-tokens/src'),
      '@dynui/icons': join(__dirname, '../../packages/icons/src'),
    };

    return config;
  },

  // 🆕 TYPESCRIPT CONFIG: Enhanced for monorepo
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      propFilter: (prop) => {
        // Include props from node_modules (for proper prop documentation)
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules')
        }
        return true
      },
    },
  },

  // 🆕 DOCS CONFIG: Auto-docs for all components
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
};

export default config;
