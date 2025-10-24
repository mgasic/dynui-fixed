# @dynui/eslint-config

Provides the baseline ESLint configuration for DynUI packages and apps.
Consumers can import the `baseEslintConfig` object or use the
`withOverrides` helper to merge in project-specific tweaks.

## Available presets

- `@dynui/eslint-config` – programmatic helpers for custom ESLint setups.
- `@dynui/eslint-config/react` – drop-in preset for `.eslintrc` files that
  wires the React + TypeScript defaults used across the monorepo.

Extend this module with additional presets (Storybook, Vitest, etc.) as
the workspace grows.
