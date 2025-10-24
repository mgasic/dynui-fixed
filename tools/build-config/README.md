# @dynui/build-config

This workspace centralises build tooling defaults that every DynUI package can
share.  Exported helpers currently include:

- `tsconfig.base` – a thin wrapper around the repository root `tsconfig.json`
  with sensible defaults for library output.
- `tsup.library.config` – a factory that packages can call from their local
  `tsup.config.ts` to ensure consistent bundling options.

As Phase 1 progresses we can add additional helpers (for example Storybook or
Rollup presets) without duplicating configuration across packages.
