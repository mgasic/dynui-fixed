# Verification & Validation

This document summarises the verification and validation phase (FAZA 7) recommended in the enhanced specification.

## Metrics verification

Before releasing a new version, verify that the claimed metrics are satisfied.  A typical verification script performs the following checks:

1. **Test coverage ≥ 80 %** – run `pnpm test --coverage` and extract the coverage percentage.  Fail the script if coverage falls below the threshold.
2. **Zero TypeScript errors** – run `pnpm typecheck` and ensure that no errors are reported.  Count occurrences of `error TS` in the output; if any are found, fail the script.
3. **Bundle size < 150 KB** – run `pnpm build`, then measure the size of the compiled `packages/core/dist` folder.  If the size exceeds 150 KB uncompressed, fail the script.  This ensures that the library remains lightweight.
4. **Quality gates pass** – run all quality gate scripts via `pnpm run gate:all`.  This should encompass static analysis, tests, accessibility checks, bundle analysis and visual regression.

A simplified verification script might look like this:

```bash
# Verify coverage
pnpm test --coverage
COVERAGE=$(grep -oP 'All files.*?\K\d+' coverage/coverage-summary.json | head -1)
if [ "$COVERAGE" -lt "80" ]; then
  echo "Coverage below threshold: ${COVERAGE}%"
  exit 1
fi

# Verify TypeScript errors
pnpm typecheck 2>&1 | tee typecheck.log
ERRORS=$(grep -c "error TS" typecheck.log || echo 0)
if [ "$ERRORS" -ne "0" ]; then
  echo "Found ${ERRORS} TypeScript errors"
  exit 1
fi

# Verify bundle size
pnpm build
BUNDLE_SIZE=$(du -sk packages/core/dist | cut -f1)
if [ "$BUNDLE_SIZE" -ge "150" ]; then
  echo "Bundle size too large: ${BUNDLE_SIZE} KB"
  exit 1
fi

# Verify quality gates
pnpm run gate:all
```

## Validation app

In addition to automated verification, build a small validation app to test the library in a realistic environment.  For example, create an app under `apps/validation-app` that uses components like `DynButton`, `DynInput`, `DynSelect` and `DynCheckbox` to build a simple form.  Wrap the app in `ThemeProvider` so it uses the design tokens.  Use this app to manually test:

* Keyboard navigation and focus management across components.
* ARIA attributes and screen reader behaviour.
* Interaction flows (click handlers, form submissions, state updates).

Running a validation app helps catch integration issues that unit tests might miss.
