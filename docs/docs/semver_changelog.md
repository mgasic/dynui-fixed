# SemVer & Changelog Guidelines

Semantic Versioning (SemVer) and clear changelogs are critical for communicating changes to users.  They help consumers understand when updates introduce breaking changes, new features or bug fixes.  This document explains our versioning scheme, how commit messages drive version bumps and how to maintain a useful changelog.

## 1. Semantic Versioning

We follow [Semantic Versioning](https://semver.org/) for all public packages.  A version number has three components: `MAJOR.MINOR.PATCH` (e.g. `1.2.3`).

* **PATCH** (e.g. `1.0.1`) – increment for backwards‑compatible bug fixes.  These changes do not add new features but correct incorrect behaviour.
* **MINOR** (e.g. `1.1.0`) – increment for new backwards‑compatible features.  Adding a new component, new optional prop or performance improvement belongs here.
* **MAJOR** (e.g. `2.0.0`) – increment when making backwards‑incompatible changes.  Removing a component, renaming props, changing default behaviour or altering API signatures are examples.  Include migration notes for users.

Pre‑release versions can be appended with identifiers like `-beta.1` or `-rc.0` to indicate that the version is not yet stable.

## 2. Conventional Commits

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.  The format is:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

* **type** – one of `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.
* **scope** – the package or component being changed (e.g. `core`, `design-tokens`, `button`).
* **description** – a short imperative summary of the change.
* **body** – (optional) detailed explanation or reasoning.
* **footer** – (optional) metadata such as `BREAKING CHANGE:` or references to issues.

Examples:

```
feat(button): add outline variant

fix(core): ensure ThemeProvider throws outside context

chore: update dependencies

BREAKING CHANGE: removed deprecated prop `size` from Alert
```

Semantic‑release inspects commit messages to decide how to bump the version:

* `feat:` triggers a minor version bump.
* `fix:` triggers a patch version bump.
* A footer starting with `BREAKING CHANGE:` or an exclamation mark after the type (e.g. `feat!:`) triggers a major version bump.

Commit messages outside of `feat` or `fix` (e.g. `docs`, `chore`) do not bump the version by themselves, but may appear in the changelog.

## 3. Maintaining the changelog

The project maintains a `CHANGELOG.md` file that lists all notable changes for each release.  When using semantic‑release, the changelog is generated automatically from commit messages.  However, it is still important to:

* **Write good commit messages** – clear descriptions and scopes ensure that the generated changelog is useful.  Avoid vague messages like “update code”.
* **Document breaking changes** – use the `BREAKING CHANGE:` footer to describe what changed and how users can migrate.  Semantic‑release will include this text in the changelog.
* **Group similar changes** – if you make multiple related fixes or features, group them logically in commits.  This results in cleaner changelog sections.
* **Manual additions** – if necessary (e.g. non‑code documentation updates), you can edit the changelog manually, but always follow the existing format.

## 4. Versioning internal packages

Even internal packages that are not published should follow semver internally.  This helps maintainers track API changes and communicate expectations within the team.  Use commit messages and changelog updates as if the package were public.

## 5. Examples

| Commit Message | Release Version | Changelog Entry |
|---------------|----------------|----------------|
| `feat(core): add new date picker component` | Minor | Added: Introduced `DatePicker` component. |
| `fix(design-tokens): correct colour contrast for error.500` | Patch | Fixed: Improved error colour contrast. |
| `feat(button)!: remove deprecated prop size`<br>`BREAKING CHANGE: please use the 'variant' prop instead` | Major | Breaking Change: Removed deprecated prop `size` from `Button`—use `variant` instead. |

By adhering to SemVer and writing meaningful commit messages, you help automate the release process and provide clear, actionable changelogs for users.  See [Release & Publishing](release_publish.md) for details on how versions are published.
