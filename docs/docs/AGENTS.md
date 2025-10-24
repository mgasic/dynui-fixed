# Guidelines for AI Agents in this Project

This document provides high‑level guidance for any AI agent (e.g. OpenAI Codex, Copilot) contributing to this repository.  It summarizes the core design principles from the project's enhanced specification and points to more detailed documents for specific topics.  The goal is to ensure that every task, large or small, follows a predictable, high‑quality process.

## 1. Overview

This project uses a modern software stack.  The code base is organised into logical modules and, where appropriate, grouped into packages.  It includes both back‑end services (primarily Python code) and, in certain packages, UI components written in TypeScript/React.  The enhanced specification describes how to structure and test these components, how to manage design tokens, and how to enforce quality through automated checks.

As an AI agent, you should always:

1. **Understand the context of your task** – read the relevant module or package before making changes.  Keep your modifications focused on the target area and avoid unrelated refactoring.
2. **Follow our code standards** – respect the existing formatting, linting, and typing rules.  Automated checks will run on every pull request, so it's important to ensure your code passes them locally before proposing changes.
3. **Write tests and documentation** – any new functionality must be accompanied by unit/integration tests and updated documentation.  Tests should keep overall coverage above the mandated threshold (see the *Testing Guidelines* document).
4. **Limit scope to a single module/package per task** – unless explicitly required, do not change multiple packages in one pull request.  This makes reviews simpler and reduces the risk of breaking unrelated code.
5. **Respect our release process** – do not publish packages or alter version numbers on your own.  Versioning and changelog updates follow a semver‑based workflow described in *Release & Publishing* and *SemVer & Changelog* documents.

For detailed instructions, consult the documents linked below.  Each one explains a specific domain of the project (design tokens, theme management, testing, quality gates, release process) and contains code examples where appropriate.

## 2. Key References

| Topic | Where to Read More |
|------|-------------------|
| **Design Tokens** – foundational style constants (colours, spacing, typography) and how to expose them via CSS variables. | See [Design Tokens](design_tokens.md). |
| **Theme Provider** – implementing and consuming themes in React components via context. | See [Theme Provider](theme_provider.md). |
| **Quality Gates** – automated checks enforced by CI: static analysis, test coverage, accessibility, bundle size, visual regression. | See [Quality Gates](quality_gates.md). |
| **Testing Guidelines** – writing unit/integration tests, coverage thresholds, and pre‑commit checks. | See [Testing Guidelines](testing_guidelines.md). |
| **Release & Publishing** – rules for releasing packages, using semantic‑release, and avoiding manual publishes. | See [Release & Publishing](release_publish.md). |
| **SemVer & Changelog** – semantic versioning rules, commit message conventions, and how to update the changelog. | See [SemVer & Changelog](semver_changelog.md). |

## 3. High‑Level Responsibilities

### 3.1 Staying within scope

Tasks in this project are intentionally scoped narrowly.  You should work in a single module or package at a time.  If your change requires touching multiple areas (e.g. adding a new design token and updating a component that uses it), coordinate separate commits or tasks rather than sweeping changes.  Restricting scope helps maintainers review changes quickly and keeps the code base stable.

### 3.2 Respecting quality and consistency

Our continuous integration (CI) pipeline enforces a series of *quality gates*.  These gates check for static analysis errors, failing tests, low coverage, accessibility regressions, oversized bundles, and visual differences.  Make sure your changes pass these gates locally before opening a pull request.  If you are adding new functionality, add tests and examples so that coverage and documentation improve, not decline.

### 3.3 Documentation first

Every component, function, or feature should be documented.  For UI components, update or add Storybook stories to demonstrate usage.  For back‑end functions, add docstrings and update relevant markdown files.  Clear documentation helps both humans and AI understand how to use and extend the code correctly.

### 3.4 No unapproved releases

The project’s packages follow semantic versioning and are published using automated tooling.  Do **not** increment version numbers or run `npm publish` yourself.  All version bumps and publishes go through the release workflow, after CI has passed and maintainers have approved the changes.

## 4. Additional Notes

* **Source code language** – the majority of the back‑end code is Python, while UI packages use TypeScript with React.  When contributing to Python modules, follow PEP 8 and existing project style.  When working in TypeScript/React, follow our ESLint and Prettier rules and keep components strictly typed.
* **Repository search** – you can use the provided API connectors to search files, issues, and pull requests within this repository.  For example, the search results for this project show Python and script files relevant to the back‑end【305570136764227†L1-L27】, reminding you that not all guidelines will apply equally to every package.
* **Asking for help** – if you are uncertain about a requirement, read the detailed documents or ask a human maintainer.  The guidelines are meant to assist, not replace human judgement.
