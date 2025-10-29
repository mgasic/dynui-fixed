# @dynui/design-tokens

Phase 3 formalises the design tokens workspace as the canonical source of
spacing, colour, typography, radius and shadow primitives. Packages within the
monorepo (and eventual external consumers) import these tokens to ensure a
consistent visual language.

- **Typed exports** – Each token group lives in its own module so TypeScript can
  infer literal values and downstream packages can compose the groups they need.
- **CSS variables build** – `pnpm build:css` now uses the same token definitions
  to emit a `dist/tokens.css` file with normalised custom properties prefixed by
  `--dyn-`.
- **Testing** – A lightweight Vitest suite verifies the presence of key tokens
  and the structure of the generated CSS output.

Run the following commands while developing:

```bash
pnpm install
pnpm build # emits library bundles via tsup
pnpm build:css # writes dist/tokens.css from the shared token map
pnpm test # validates token integrity and CSS variable generation
```
