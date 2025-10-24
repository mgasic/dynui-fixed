# @dynui/design-tokens

Phase 1 introduces the design tokens package as the single source of truth for
colour, spacing and typography primitives.  The current release exposes a small
but representative token set through TypeScript exports so other workspaces can
reference consistent values while the full generator pipeline is being defined.

The `build/` folder contains a minimal CSS variable helper that mirrors the
approach described in the enhanced specification.  Run `pnpm build:css` inside
this workspace to execute the stub generator.  Future tasks will connect the
helper to the publishing workflow so that consumers can import a generated CSS
file alongside the typed tokens.
