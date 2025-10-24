# DynUI Playground

A minimal Vite + React host that consumes `@dynui/core` during Phase 1.  The app
exists to validate packages in a realistic browser environment without the
overhead of Storybook.  Tokens from `@dynui/design-tokens` are imported directly
so contributors can confirm palette and spacing choices while iterating on
components.

```bash
pnpm install
pnpm --filter playground dev
```
