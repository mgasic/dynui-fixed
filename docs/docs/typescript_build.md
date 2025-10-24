# TypeScript & Build System

This document summarises the unified TypeScript configuration and build system (FAZA 2) used in this project.

## Unified TypeScript configuration

The root `tsconfig.json` defines common compiler options that all packages extend.  Key options include:

* **Target and libraries:** target ES2020 with DOM support (`lib: [ES2020, DOM, DOM.Iterable]`).
* **Strict type checking:** enable `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` for maximal safety.
* **Module resolution:** use `module: ESNext` with `moduleResolution: bundler`, enabling modern ESM builds and package exports.
* **Interop and import options:** set `allowSyntheticDefaultImports`, `esModuleInterop`, `forceConsistentCasingInFileNames` and `isolatedModules`.
* **Output settings:** generate declaration files (`declaration`, `declarationMap`), source maps (`sourceMap`) and remove comments (`removeComments`).
* **JSX transform:** use the React automatic runtime (`jsx: react-jsx`).

Packages extend the root config and specify their own output directories and path mappings.  For example, the `@dynui/core` package extends `../../tsconfig.json`, outputs to `dist`, and defines paths to the design tokens and icons packages.

Using project references ensures that TypeScript builds packages in the correct order and enables incremental builds.  Run `pnpm typecheck` to perform a full type check across the workspace.

## Turbo build system

The project uses **Turborepo** to orchestrate builds and tasks across packages.  The `turbo.json` file defines pipelines for build, test, lint and typecheck:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "package.json", "tsconfig*.json"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "tests/**/*.ts", "tests/**/*.tsx"]
    },
    "lint": {
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "*.json"]
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx", "tsconfig*.json"]
    }
  }
}
```

Turborepo runs tasks in parallel when possible and caches outputs, speeding up local development and CI.  Use `pnpm build`, `pnpm test`, `pnpm lint` and `pnpm typecheck` to run tasks across all packages.  To run tasks for a single package, navigate to the package directory and run the corresponding script.
