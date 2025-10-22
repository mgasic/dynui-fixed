# Changelog

All notable changes to DynUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete TypeScript type system with centralized exports
- Theme system with ThemeProvider and useTheme hook
- Icon dictionary system with IconDictionaryProvider
- Utility functions: classNames, generateInitials, styleProps
- Quality Gates CI/CD pipeline (Gates A-D)
- Comprehensive test infrastructure with jest-axe
- Storybook integration with a11y addon

### Components Added
- DynTabs with WAI-ARIA compliant tablist implementation
- DynStepper with forwardRef and focus management
- DynMenu with Context pattern and keyboard navigation
- DynListView with single/multi-select support
- DynInput with controlled/uncontrolled patterns
- DynButton with variants, sizes, and loading states
- DynAvatar with image fallback and initial generation
- DynBadge for status indication
- DynBox for layout with spacing utilities
- DynTable with sorting functionality
- DynTreeView with hierarchical data support
- DynSelect with searchable dropdown
- DynCheckbox with indeterminate state
- DynModal with focus trap and escape handling

### Technical
- TypeScript strict mode configuration
- Vitest test runner with jsdom environment
- ESLint and Prettier configuration
- Bundle analysis and size limits
- Accessibility testing with jest-axe
- Storybook stories for component development

## [0.1.0] - 2025-10-22

### Added
- Initial project bootstrap
- Basic component structure
- Development tooling setup
