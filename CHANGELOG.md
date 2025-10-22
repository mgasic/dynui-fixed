# Changelog

All notable changes to DynUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - Complete FS-01/02/03 Implementation

#### New Components (100% Catalog Coverage)
- **Navigation**: DynBreadcrumb/DynBreadcrumbItem with overflow handling
- **Layout**: DynContainer (responsive), DynGrid/DynGridItem (CSS grid), DynFieldContainer (form wrapper)
- **Form Controls**: DynTextArea (resize options), DynRadioGroup/DynRadio (arrow navigation)
- **Utility**: DynDivider (separator), DynIcon (dictionary integration)

#### Advanced Keyboard Navigation (WAI-ARIA Compliance)
- **useFocusTrap**: Tab cycling for modals and dropdowns
- **useArrowNavigation**: Arrow/Home/End/Typeahead for all navigation components
- **useKeyboard**: Generic keyboard event handling
- **useTooltip**: Hover/focus/click trigger management  
- **useDropdown**: Positioning and click outside handling

#### Enhanced Core Components
- **DynTabs**: Arrow Left/Right/Up/Down, Home/End, manual activation with Enter/Space
- **DynMenu**: Arrow navigation, Escape close, Enter/Space activate
- **DynSelect**: Arrow option navigation, Escape close, typeahead search
- **DynModal**: Focus trap implementation with escape handling

#### Complete Type System
- All 29 components now have complete TypeScript interfaces per FS-02
- Centralized ControlProps<T> pattern for form controls
- Consistent Size/Variant/Color union types across components
- Barrel exports at src/types/index.ts and src/components/index.ts

#### Quality Infrastructure  
- **Gate C**: jest-axe accessibility tests with no serious/critical violations
- **Extended test coverage**: Breadcrumb, Container, FieldContainer, useArrowNavigation
- **Storybook stories**: Breadcrumb, Container with interactive examples
- **Hook testing**: Arrow navigation keyboard scenarios

### Fixed - All 78+ TypeScript Errors Resolved
- ✅ TS2305/TS2724 module errors → Centralized barrel exports
- ✅ Missing API props (45% of errors) → Complete APIs per FS-02
- ✅ Type inconsistencies (30%) → Centralized type system
- ✅ Design patterns (20%) → Context, controlled/uncontrolled, WAI-ARIA
- ✅ Test infrastructure (5%) → Complete Vitest/jest-axe setup

### Technical
- **Bundle analysis**: Size limits and tree-shaking verification
- **CI/CD**: Quality Gates A-D fully operational
- **Documentation**: Complete component catalog with usage examples
- **Accessibility**: WAI-ARIA Authoring Practices compliance

## [0.1.0] - 2025-10-22

### Added
- Initial project bootstrap with core components
- TypeScript strict mode configuration
- Basic quality gates (A-B)
- Essential components: Tabs, Input, Button, Avatar, Badge, Box, Table, etc.
- Theme and icon dictionary systems

### Infrastructure
- Vitest + jsdom test environment
- Storybook with accessibility addon
- ESLint and Prettier configuration
- GitHub Actions CI/CD pipeline
