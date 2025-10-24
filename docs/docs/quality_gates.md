# Quality Gates

To maintain a high level of quality across the codebase, every change must pass a series of automated checks, collectively known as *quality gates*.  These gates run in the continuous integration (CI) pipeline and are designed to catch issues early.  As an AI agent, ensure your contributions satisfy each gate locally before opening a pull request.

## Gate A – Static Analysis

The first gate runs static code analysis.  It checks:

* **TypeScript compilation** – there must be **zero TypeScript errors** in any TypeScript/React packages.  Use `pnpm typecheck` to run the compiler in strict mode.
* **Linting** – all code must comply with our ESLint ruleset (including Prettier formatting).  Use `pnpm lint` and `pnpm format:check` to verify.
* **No suppressed errors** – disabling ESLint rules or TypeScript errors is not allowed unless explicitly justified.  Fix the underlying problem instead of silencing the error.

Gate A will fail if any of these checks produce errors or warnings.  Always run them locally and fix any issues before pushing your changes.

## Gate B – Tests & Coverage

Gate B focuses on correctness and robustness.  It includes:

* **Unit and integration tests** – all existing tests must pass.  If you add new functionality, write tests to cover it.  Use `pnpm test` or the appropriate test runner for your language (e.g. `pytest` for Python code).
* **Coverage threshold** – the overall test coverage across the repository must remain **≥80 percent**.  If adding code reduces coverage below this threshold, you must add new tests to compensate.  For TypeScript packages, run `pnpm test --coverage` to see coverage reports.
* **No skipped or disabled tests** – do not commit code that disables tests.  If a test is failing due to your change, update the test or the implementation as appropriate.

Maintaining high coverage helps prevent regressions and gives confidence that the code behaves as expected.

## Gate C – Accessibility (A11y)

Accessibility checks ensure that UI components are usable by everyone.  Gate C runs automated a11y tests against our Storybook stories using tools like Axe or Storybook Test Runner.  Common issues include missing ARIA attributes, insufficient colour contrast, or interactive elements without proper labelling.

When modifying or creating UI components:

* Use semantic HTML elements and ARIA attributes appropriately.
* Ensure sufficient colour contrast between text and backgrounds (use tokens that meet WCAG AA/AAA guidelines).
* Test keyboard navigation (e.g. focus states, skip links) and screen reader behaviour.
* Run `pnpm test-storybook:accessibility` (or the equivalent script) locally to surface issues before pushing your code.

Gate C fails if any story violates the accessibility rules.  Fix the problems rather than suppressing warnings.

## Gate D – Bundle Size & Performance

This gate ensures that our library remains lightweight and efficient:

* **Bundle size** – the compiled bundle for each public package (e.g. `@dynui/core`) must remain below a defined threshold (for example, 150 KB uncompressed).  The CI pipeline measures the bundle size and fails if it exceeds the limit.
* **Tree shaking** – modules should be tree‑shakeable.  Importing a single component should not pull the entire library.  Avoid side‑effectful imports at the root of packages and design modules with independent entry points.
* **Avoid heavy dependencies** – before adding a new dependency, consider its impact on bundle size.  Prefer lightweight solutions or reuse existing utilities.  If a large dependency is justified, document the reasoning in the pull request.

Run the build locally (`pnpm build`) and use bundle analysis tools to check the size and tree‑shaking characteristics of your changes.

## Gate E – Visual Regression

Gate E checks that visual changes are intentional.  We use a service like Chromatic to capture screenshots of Storybook stories and compare them against the baseline.  If your changes alter the appearance of a component, the gate will fail until a reviewer approves the new snapshot.

To work with visual regression testing:

* Keep UI changes minimal and intentional.  When a visual difference is expected (e.g. redesign or bug fix), note this in the pull request description.
* Do not attempt to bypass the visual regression gate by disabling stories or altering tests.  Instead, update the snapshots in Chromatic through the review process.
* Use Storybook locally to view your changes before pushing.  Ensure they align with the design system and tokens.

## Summary

Quality gates safeguard the stability, accessibility and performance of our library.  By verifying your changes against these gates, you ensure that contributions from both humans and AI maintain a consistent standard.  Always run the relevant scripts locally, address any issues, and seek feedback when uncertain.
