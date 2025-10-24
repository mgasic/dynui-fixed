# @dynui/build-config

Exports shared configuration helpers (e.g. default `tsup` options) that
packages can extend. This keeps build tooling consistent as new packages
are introduced.

## Available exports

- `@dynui/build-config` – runtime helpers for programmatic usage.
- `@dynui/build-config/tsconfig.base` – baseline `tsconfig` with compiler
  defaults suitable for libraries and tooling packages.
- `@dynui/build-config/tsup.library.config` – reusable `tsup`
  configuration that emits both ESM and CJS builds.

See `src/index.ts` for the currently supported helpers and extend the
module with additional exports (Rollup, Vite, etc.) as needed.
