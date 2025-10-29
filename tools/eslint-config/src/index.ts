import type { Linter } from 'eslint';

/**
 * Base ESLint configuration shared across packages. Extend this in
 * individual projects to add environment-specific rules.
 */
export const baseEslintConfig: Linter.Config = {
  root: false,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  ignorePatterns: ['dist', 'build', 'storybook-static'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};

/**
 * Helper to merge overrides into the shared config without mutating it.
 */
export function withOverrides(overrides: Linter.Config): Linter.Config {
  return {
    ...baseEslintConfig,
    ...overrides,
    rules: {
      ...(baseEslintConfig.rules ?? {}),
      ...(overrides.rules ?? {})
    }
  };
}

export default baseEslintConfig;
