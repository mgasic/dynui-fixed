# Visual Regression & Publishing

This document summarises visual regression testing and publishing workflows (FAZA 8) from the enhanced specification.

## Chromatic integration

Visual regression testing is implemented using **Chromatic**.  A GitHub Actions workflow builds Storybook and uploads it to Chromatic for snapshot comparison.  The workflow typically:

1. Checks out the repository with `actions/checkout`.
2. Sets up PNPM and Node.js.
3. Installs dependencies with `pnpm install --frozen-lockfile`.
4. Builds Storybook using `pnpm build:storybook`.
5. Publishes the built storybook to Chromatic using `chromaui/action@v11`.

Chromatic compares the new snapshots against the baseline and fails the job if unintended visual changes are detected.  You can configure `exitZeroOnChanges` and `autoAcceptChanges` to control whether changes block merging or require manual approval.

## Playwright cross‑browser tests

Cross‑browser end‑to‑end tests are implemented using **Playwright**.  Test scripts navigate to Storybook stories and interact with your components in multiple browsers (Chromium, Firefox, WebKit).  For example:

```typescript
import { test, expect } from '@playwright/test'

test.describe('DynButton cross‑browser', () => {
  test('renders correctly in Chrome', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await expect(page.locator('button')).toBeVisible()
  })

  test('handles click events in Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox')
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await page.click('button')
    // add assertions
  })

  test('keyboard navigation in Safari', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit')
    await page.goto('http://localhost:6006/?path=/story/components-dynbutton--default')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    // add assertions
  })
})
```

These tests ensure that your components render correctly and respond to user interaction across different browsers.

## Publishing workflow

Publishing to npm is automated via a GitHub Actions workflow.  The workflow usually runs when a new GitHub release is created and performs these steps:

1. Checks out the repository and sets up PNPM and Node.js.
2. Installs dependencies with `pnpm install --frozen-lockfile`.
3. Runs all quality gates to ensure the codebase is healthy.
4. Builds the packages with `pnpm build`.
5. Publishes packages recursively to npm (`pnpm publish --recursive --access public`), using a token stored in `NODE_AUTH_TOKEN` secret.
6. Attaches built artefacts to the GitHub release.

Semantic Release is configured via `.releaserc.json` to analyse commit messages, generate changelogs, bump versions and publish packages automatically.  Do not manually publish packages; rely on this workflow to ensure consistency and compliance with quality gates.
