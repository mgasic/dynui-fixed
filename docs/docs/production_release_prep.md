# Production Release Preparation

This document summarises the tasks involved in preparing the library for a production release (FAZA 6).  Although the actual publishing is automated and controlled by maintainers, certain files and scripts must be configured correctly so that when a release is triggered the resulting package is complete, documented and ready for use.

## NPM package configuration

Each package intended for publication to npm needs a properly configured `package.json`.  Here is an example for the core component library:

```json
{
  "name": "@dynui/core",
  "version": "1.0.0",
  "description": "DynUI Component Library – Production Ready",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist", "README.md"],
  "sideEffects": ["**/*.css"],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/mgasic/dynui-fixed.git",
    "directory": "packages/core"
  },
  "keywords": ["react", "component-library", "typescript", "accessibility", "design-system"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

The important fields to review before publishing are:

* **`main`, `module` and `types`** – point to the CommonJS, ES module and TypeScript declaration entry points in the `dist` folder.  Ensure that these files exist after running `pnpm build`.
* **`exports`** – explicitly map the root import (`@dynui/core`) and any subpaths (e.g. `@dynui/core/styles`) to their compiled files.  This enables tree‑shaking and controlled API exposure.
* **`files`** – list the directories and files that should be included in the published package.  Usually this is just the compiled output (`dist`) and any important markdown files.
* **`sideEffects`** – declare which files have side effects (e.g. CSS) so bundlers can safely remove unused code.
* **`publishConfig`** – set `access: public` and the npm registry URL.  Do not publish private packages unless intentionally scoped.
* **`peerDependencies`** – declare required peer packages such as `react` and `react-dom`, but do not include them in `dependencies`.  Users must install peer dependencies themselves.

Do not manually bump the version number; semantic‑release will update it based on commit messages when a release is created.

## Documentation generation

For a professional release, generate API documentation automatically from the source code.  A simple approach is to traverse component files, extract their prop types using the TypeScript AST, and output a markdown file.  For example:

```ts
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import { parse } from '@typescript-eslint/typescript-estree'

interface Prop {
  name: string
  type: string
  required: boolean
  description: string
}

function extractProps(ast: any): Prop[] {
  // Walk the AST and collect props from component definitions
  // This is a simplified example; use a proper parser for production use.
  return []
}

export async function generateApiReference() {
  const files = await glob('packages/core/src/ui/*.tsx')
  const docs = [] as { name: string; props: Prop[] }[]
  for (const file of files) {
    const source = readFileSync(file, 'utf-8')
    const ast = parse(source, { jsx: true })
    const componentName = file.split('/').pop()?.replace(/\.tsx$/, '')
    const props = extractProps(ast)
    docs.push({ name: componentName ?? '', props })
  }
  const markdown = docs
    .map(({ name, props }) => {
      const table = props
        .map(prop => `| \`${prop.name}\` | ${prop.type} | ${prop.required ? 'Yes' : 'No'} | ${prop.description} |`)
        .join('\n')
      return `## ${name}\n\n| Prop | Type | Required | Description |\n|-----|------|----------|-------------|\n${table}\n`
    })
    .join('\n\n')
  writeFileSync('docs/api-reference.md', markdown)
}
```

Run this script (or a more robust variant) during your release preparation to ensure that the API reference reflects the current code.  Combine this with the documentation enhancement guidelines to include examples and accessibility notes.

## Final checks before release

Before maintainers trigger a release, ensure that:

1. **The build succeeds** – run `pnpm build` in the root of the repository and verify that output files exist in `dist/` directories.
2. **Documentation is updated** – re‑generate API docs, screenshots and examples, and commit them to the repository.  Check links in `AGENTS.md` and other docs to ensure they point to the correct paths.
3. **Quality gates pass** – run `pnpm run gate:all` and confirm that static analysis, tests, accessibility checks, bundle analysis and visual regression tests all succeed.
4. **Changelog and versions** – confirm that commit messages follow Conventional Commits, so that semantic‑release can infer the correct version bump and generate an appropriate changelog entry.

Once these steps are complete and the pull request has been reviewed, maintainers can create a GitHub release.  The publishing workflow will build the packages, run quality checks again and publish the compiled artefacts to npm.  Do not run `npm publish` manually; rely on the automated workflow to maintain consistency and security.