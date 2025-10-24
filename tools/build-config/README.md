# @dynui/build-config

Exports shared configuration helpers (e.g. default `tsup` options) that
packages can extend. This keeps build tooling consistent as new packages
are introduced.

See `src/index.ts` for the currently supported helpers and extend the
module with additional exports (Rollup, Vite, etc.) as needed.
