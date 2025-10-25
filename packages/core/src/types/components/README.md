# DynUI Core Types – Stub Pattern

This package uses a temporary stub pattern to keep the TypeScript public API stable while components are being implemented.

## Why stubs?

When some component types are not yet implemented, the DTS build may fail with TS2307 errors. To avoid blocking builds and allow incremental delivery, we provide a central file that declares placeholder types.

## Files

- `packages/core/src/types/components/dyn-stubs.types.ts`
  - Exports placeholder `unknown`-based types for all not-yet-implemented components.
- `packages/core/src/types/components/index.ts`
  - Re-exports `./dyn-stubs.types` first, then re-exports any real `./dyn-*.types` modules when they are available.

## Workflow

1. Add a new component? Add its public type name to `dyn-stubs.types.ts` first.
2. Implement the real type(s) in a dedicated file (e.g. `./dyn-avatar.types.ts`).
3. Update imports/exports to use the real type and remove the corresponding placeholder from `dyn-stubs.types.ts`.

## Notes

- Runtime JS/CJS output is unaffected by these types – this pattern only affects DTS generation.
- This pattern should be removed once all referenced component types have real definitions.
