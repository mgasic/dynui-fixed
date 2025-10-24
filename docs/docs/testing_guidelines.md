# Testing Guidelines

This document describes how to write and maintain tests for this project.  Comprehensive tests are essential for preventing regressions, guiding development and ensuring that new contributions integrate smoothly.  Our goal is to maintain at least **80 percent** coverage across all packages, as enforced by [Quality Gate B](quality_gates.md).

## 1. Test levels

We employ multiple levels of testing:

* **Unit tests** verify the behaviour of individual functions, classes or components in isolation.  They should be deterministic, run quickly and cover all code paths, including edge cases.
* **Integration tests** verify interactions between multiple units (for example, a service calling a repository, or a React component interacting with child components).  They ensure that units work together correctly.
* **End‑to‑end tests** (optional) cover user flows through the system.  For example, they might render a complete page in a test environment and simulate user actions.  These tests are slower to run and are usually reserved for high‑value workflows.

## 2. Frameworks and tooling

The project uses different languages; choose the appropriate test framework:

* **TypeScript/React** – we use **Vitest** (v2+) or Jest for unit and integration tests.  Vitest offers fast, ESM‑compatible testing with first‑class support for React via the `@testing-library/react` utilities.  Use `describe` and `it/test` blocks to structure tests and assertions.
* **Python** – use **pytest** to write tests for Python modules.  Pytest’s fixtures and parametrisation make it easy to cover a wide range of cases.

All test files should reside under a `tests/` folder within the package they cover (e.g. `packages/core/tests/` or `src/tests/` for Python modules).  Use descriptive names that reflect what is being tested (e.g. `button.test.tsx`, `utils_test.py`).

## 3. Writing good tests

* **Arrange, Act, Assert** – structure tests in three stages: set up the environment (Arrange), execute the code under test (Act), and verify outcomes (Assert).  This improves readability and helps the AI agent understand the intent of each section.
* **Cover all branches** – whenever possible, test both success and failure paths, including edge cases.  Branches missed by tests can hide bugs and degrade coverage.
* **Avoid implementation details** – test behaviour, not internal implementation.  For React components, use `@testing-library/react` to interact with elements as a user would (e.g. clicking buttons, entering text) and assert on the rendered output or state.
* **Use fixtures and mocks** – isolate units by mocking dependencies (e.g. API calls, database access).  In TypeScript, use Vitest’s mocking utilities.  In Python, use `unittest.mock` or pytest’s monkeypatch.
* **Keep tests fast** – slow tests discourage frequent runs.  Avoid unnecessary delays (e.g. using real timers when fake timers suffice) and clean up side effects properly.

## 4. Test coverage

Gate B requires that overall code coverage remains ≥80 percent.  To monitor coverage:

* Run `pnpm test --coverage` for TypeScript packages or `pytest --cov` for Python packages.
* Inspect the coverage report to identify untested lines or branches.  Focus on covering critical logic first; trivial getters or one‑line wrappers may not need explicit tests.
* When adding new files, include corresponding tests.  If the new code is not testable (e.g. purely declarative configuration), document it in the pull request.

## 5. Pre‑commit and continuous integration

Before committing your changes, run the local test suite and linters.  The project may provide a script (e.g. `pnpm test:changed` or pre‑commit hook) that runs tests only for changed files.  Ensure all tests pass and coverage is maintained.  The CI pipeline will re‑run tests on every pull request; your changes should not introduce failures.

## 6. Updating snapshots and fixtures

Some tests (especially for UI components) use snapshots to ensure rendered output does not change unexpectedly.  When legitimately updating a component’s UI, update the snapshot by running the appropriate command (e.g. `pnpm test -u`).  Never edit snapshots manually.  Review the diff to ensure the changes are intentional.

## 7. Avoiding anti‑patterns

* **Do not skip tests** – do not use `it.skip`/`xit` or `pytest.mark.skip` to bypass failing tests.  Fix the underlying issue or update the test accordingly.
* **No global state leakage** – tests should not depend on global state or affect other tests.  Reset mocks and clean up resources after each test.
* **Avoid randomness** – tests should be deterministic.  If randomness is required, seed the random number generator to produce consistent results.

By following these guidelines, you help ensure that every change—whether performed by a human or an AI assistant—improves the reliability and maintainability of the codebase.  Refer to [Quality Gates](quality_gates.md) for CI enforcement details and [SemVer & Changelog](semver_changelog.md) for information on how tests influence versioning.
