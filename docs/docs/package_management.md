# Package Management & Monorepo

This document summarises the package management and monorepo configuration described in the enhanced specification (FAZA 1).  It covers PNPM workspace setup, `.npmrc` configuration, package.json refactoring, and the recommended monorepo structure.

## PNPM workspace

We use PNPM with a workspace file (`pnpm-workspace.yaml`) to manage dependencies across packages and apps.  The workspace lists all packages and apps, plus the root:

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - '.'

catalog:
  # stable versions for core libraries, TypeScript, build tools, testing, Storybook, code quality
  react: ^18.3.1
  typescript: ^5.6.3
  vite: ^5.4.10
  vitest: ^2.1.5
  storybook: ^8.3.5
  eslint: ^9.15.0
  prettier: ^3.3.3
  # ...additional pinned versions
peerDependencyRules:
  allowedVersions:
    react: '18'
    react-dom: '18'
```

Using a central `catalog` ensures consistent versioning across packages.  Only built dependencies such as `@parcel/watcher` and `esbuild` are allowed to be built during installation.

## `.npmrc` configuration

The `.npmrc` file contains settings that optimise performance, security and CI behaviour:

```ini
# Performance
prefer-frozen-lockfile=true
auto-install-peers=true
strict-peer-dependencies=false

# Security & registry
audit-level=moderate
registry=https://registry.npmjs.org/

# Package management preferences
save-exact=false
save-prefix=^
engine-strict=true

# Workspace preferences
link-workspace-packages=true
prefer-workspace-packages=true

# CI optimisations
frozen-lockfile=true
```

These options ensure reproducible installs, allow workspace packages to link to each other, and make CI installations faster by freezing the lockfile.

## Package.json refactoring

The root `package.json` uses PNPM workspaces and centralised scripts:

```json
{
  "name": "@dynui/fixed-monorepo",
  "version": "1.0.0",
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "pnpm run --recursive --stream build",
    "test": "pnpm run --recursive --parallel test",
    "typecheck": "pnpm run --recursive --parallel typecheck",
    "lint": "pnpm run --recursive --parallel lint"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vitest": "catalog:",
    "storybook": "catalog:",
    "eslint": "catalog:",
    "prettier": "catalog:"
  },
  "packageManager": "pnpm@9.12.0"
}
```

Each package has its own `package.json` and inherits dependencies from the catalogue via the `catalog:` placeholder.

## Monorepo structure

The recommended structure for the monorepo is:

```
/
├── packages/
│   ├── core/            # main component library
│   ├── design-tokens/   # design token library
│   └── icons/           # icon library
├── apps/
│   ├── storybook/       # Storybook documentation app
│   └── playground/      # local development sandbox
├── tools/
│   ├── build-config/    # shared build configuration
│   └── eslint-config/   # shared ESLint configuration
├── pnpm-workspace.yaml
├── .npmrc
├── turbo.json
└── package.json
```

All packages are under `packages/`, apps under `apps/`, and shared tooling under `tools/`.  This structure simplifies dependency management and builds.
