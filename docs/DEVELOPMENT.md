# DynUI Development Guide

This repository implements the complete DynUI component library per functional specifications FS-01, FS-02, and FS-03.

## Architecture Overview

### Type System (FS-02 Compliance)
- **Centralized Types**: All types in `src/types/` with component-specific modules
- **Common Patterns**: `ControlProps<T>` for form controls, `Size/Variant/Color` unions
- **Export Strategy**: Barrel exports at `src/types/index.ts` and `src/components/index.ts`

### Component Structure
- **Controlled/Uncontrolled**: All form components support both patterns
- **WAI-ARIA Compliance**: role, aria-* attributes per W3C specifications
- **Compound Components**: Context pattern for Tabs, Menu, Stepper

### Quality Gates (FS-03)

#### Gate A: Static Analysis
- TypeScript `--noEmit` (strict mode)
- ESLint (no errors)
- Prettier formatting

#### Gate B: Unit Tests
- Vitest with jsdom
- >80% code coverage
- React Testing Library patterns

#### Gate C: Accessibility
- jest-axe integration
- No "serious" or "critical" violations
- Keyboard navigation tests

#### Gate D: Bundle Analysis
- Bundle size limits
- Tree-shaking verification

## Development Workflow

### Setup
```bash
pnpm install
pnpm dev          # Watch mode build
pnpm storybook    # Component development
```

### Testing
```bash
pnpm test         # Unit tests
pnpm test:a11y    # Accessibility tests
pnpm typecheck    # TypeScript validation
pnpm lint         # Code quality
```

### Component Guidelines

1. **API Design (FS-02)**:
   - Always extend appropriate base interfaces (`ControlProps<T>` for form controls)
   - Include `aria-label`, `aria-labelledby`, `data-testid` props
   - Use `as` prop for polymorphic components
   - Consistent prop naming (`onChange`, not `onValueChanged`)

2. **Accessibility (FS-01)**:
   - Proper semantic HTML and ARIA roles
   - Keyboard navigation (Tab, Arrow keys, Enter/Space, Escape)
   - Focus management and visual focus indicators
   - Screen reader compatibility

3. **Testing**:
   - Unit tests for logic and user interactions
   - A11y tests with jest-axe
   - Storybook stories for visual testing

### File Structure
```
src/
├── components/          # Barrel exports
├── icons/              # Icon system
├── theme/              # Theming system
├── types/              # TypeScript definitions
│   ├── common.types.ts # Shared interfaces
│   └── components/     # Per-component types
├── ui/                 # Component implementations
└── utils/              # Utility functions

stories/                # Storybook stories
tests/                  # Test files
├── a11y/              # Accessibility tests
├── components/        # Component tests
└── utils/             # Utility tests
```

## Component Status

### ✅ Implemented (Phase 1)
- DynTabs/DynTab/DynTabPanel
- DynStepper/DynStep  
- DynMenu/DynMenuItem
- DynListView
- DynInput
- DynButton
- DynAvatar
- DynBadge
- DynBox
- DynTable
- DynTreeView/DynTreeNode
- DynSelect/DynSelectOption
- DynCheckbox
- DynModal

### 🚧 Next Phase
- DynDatePicker
- DynTextArea
- DynRadioGroup
- Advanced keyboard navigation
- Visual regression testing

## Contributing

1. Follow the functional specifications (FS-01/02/03)
2. All PRs must pass quality gates
3. Include tests and Storybook stories
4. Update this documentation for new components
