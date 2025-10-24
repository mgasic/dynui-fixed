# Release & Publishing Guidelines

Publishing a new version of the library is a significant step.  It makes your changes available to everyone who depends on the package, so it must be done carefully and consistently.  This document outlines how releases are prepared, what checks are required and why manual publishing is not allowed for AI agents.

## 1. Automated release process

The project uses **semantic‑release** (or a similar tool) to automate version bumps, changelog generation and publishing to npm.  Semantic‑release analyses commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) standard to determine whether a release is a patch, minor or major version (see [SemVer & Changelog](semver_changelog.md)).  It then runs after CI passes on the main branch, generates a changelog entry and publishes the package.

Because this process is automated:

* **Do not manually edit version numbers** in `package.json`.  Semantic‑release will handle versioning based on your commit messages.
* **Do not run `npm publish` locally.**  Publishing is done by the CI pipeline with appropriate authentication tokens.
* **Do not bypass CI** – if your branch does not pass all quality gates, it will not be merged and no release will be triggered.

## 2. Preparing a release

Before a release can be published, the following must be true:

1. **All quality gates pass** – see [Quality Gates](quality_gates.md) for details.  You should verify your changes locally and in the pull request pipeline.  A release will not happen if any tests fail, coverage drops below the threshold, or accessibility/performance regressions are detected.
2. **Documentation is up to date** – update relevant markdown files, Storybook stories and API references.  A release is only valuable if users know how to use the new features.
3. **Changelog entries are provided** – each user‑facing change should be documented.  When writing commit messages, use the appropriate prefix (`feat`, `fix`, `docs`, etc.) so semantic‑release can populate the changelog automatically.  For breaking changes, include a footer describing what changed and migration steps.
4. **Code owners approve** – changes must be reviewed and approved by at least one maintainer.  Merging a pull request without review is not allowed.

## 3. Release channels

The library may publish **pre‑release** versions (e.g. `1.0.0-beta.1`) to allow testing before a stable release.  Semantic‑release manages these channels based on tags in commit messages or branch names.  Only maintainers should decide when to publish pre‑releases or stable releases.

If you need to test a feature locally or provide early access to a user, consider using a GitHub registry or installing from a Git branch rather than publishing to npm.

## 4. Why manual publishing is forbidden

Manual publishing introduces risks: incorrect versioning, incomplete changelog, missing quality checks, misconfigured package metadata and credentials leaks.  By centralising the release process in CI, we reduce these risks and ensure that releases are predictable and auditable.

As an AI agent, **you must not** perform any of the following:

* Running `npm publish` or similar commands.
* Editing `package.json` versions directly.
* Pushing tags or creating GitHub releases manually.
* Changing release scripts or CI configurations without explicit instruction.

If a task involves preparing for a release (e.g. refactoring code, updating documentation, adding tests), you may do so.  The actual publishing will be triggered by maintainers once everything is ready.

## 5. Post‑release tasks

After a release is published, the following tasks might be needed:

* **Communicate the release** – update internal documentation, blog posts or announce in appropriate channels.  Include a summary of new features, fixes and migration notes.
* **Monitor adoption** – watch for issues or bug reports that arise from the new version.  Be prepared to release patches if regressions are discovered.
* **Plan next iterations** – use feedback from users to prioritise future work.  Maintain the backlog and write clear issues for improvements.

By adhering to this release process, we ensure that every published version is reliable, well‑documented and consistent with the expectations of our users.
