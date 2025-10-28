# DynUI Components & Stories

This directory contains all DynUI React components along with their **co-located Storybook stories**.

## 📁 **Co-located Structure**

Each component follows this pattern:
```
packages/core/src/ui/
├── dyn-button.tsx           # Component implementation
├── dyn-button.stories.tsx    # 🆕 Co-located stories
├── dyn-input.tsx
├── dyn-input.stories.tsx
├── dyn-tabs.tsx
└── dyn-tabs.stories.tsx
```

## ✨ **Benefits of Co-location**

### 🔗 **Tight Coupling**
- Stories stay synchronized with component changes
- Easier refactoring (move component = move stories)
- TypeScript types automatically shared

### 📈 **Better Maintainability**
- No need to hunt for stories in separate directories
- Component authors write stories immediately
- Less context switching during development

### 🚀 **CI/CD Integration**
- Automatic story discovery via glob patterns
- New components get stories automatically included
- No manual Storybook configuration updates needed

## 📝 **Story File Convention**

### **Naming Pattern**
```
{component-name}.stories.tsx
```

### **CSF v3 Format**
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { DynComponent } from './dyn-component'

const meta: Meta<typeof DynComponent> = {
  title: 'Components/DynComponent',
  component: DynComponent,
  parameters: {
    docs: {
      description: {
        component: 'Component description here'
      }
    },
    a11y: {
      config: {
        rules: [/* accessibility rules */]
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // component props
  }
}
```

### **Required Story Variants**
Each component should include these stories:

- ✅ **Default** - Basic usage example
- ✅ **AllVariants** - All visual variants
- ✅ **AllSizes** - Different sizes (if applicable)
- ✅ **States** - Loading, disabled, error states
- ✅ **Keyboard** - Keyboard navigation demo
- ✅ **Interactive** - User interaction examples

## 🔧 **Storybook Configuration**

### **Root Config** (`.storybook/main.ts`)
```typescript
stories: [
  // Legacy stories (backward compatibility)
  '../stories/**/*.stories.@(ts|tsx)',
  // 🆕 CO-LOCATED: Primary pattern
  '../packages/*/src/**/*.stories.@(ts|tsx)',
]
```

### **Apps Config** (`apps/storybook/.storybook/main.ts`)
```typescript
stories: [
  // 🆕 CO-LOCATED: Monorepo pattern
  '../../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)',
]
```

## 👥 **Developer Workflow**

### **Creating New Component**
1. Create `dyn-new-component.tsx`
2. **Immediately** create `dyn-new-component.stories.tsx`
3. Run Storybook - stories appear automatically
4. No additional configuration needed

### **Modifying Existing Component**
1. Update component implementation
2. Update co-located stories in same commit
3. Stories stay synchronized with implementation

### **Running Storybook**
```bash
# Root Storybook (includes co-located stories)
pnpm storybook

# Apps Storybook (dedicated app)
cd apps/storybook
pnpm storybook
```

## 🛠️ **Migration Status**

### ✅ **Migrated Components**
- `dyn-button.stories.tsx` - ✨ Complete with accessibility tests
- `dyn-input.stories.tsx` - ✨ Complete with interactive examples
- `dyn-tabs.stories.tsx` - ✨ Complete with keyboard navigation

### ⏳ **Legacy Stories** (to be migrated)
- Located in `/stories/` directory
- Will be migrated incrementally
- Backward compatibility maintained

## 🎨 **Story Quality Standards**

### **Accessibility**
- All stories include a11y testing configuration
- Keyboard navigation examples required
- Screen reader compatibility verified

### **Documentation**
- Component description in meta
- Story descriptions for complex examples
- Usage instructions for interactive stories

### **Coverage**
- All component props demonstrated
- Edge cases covered
- Error states included

## 🚀 **Next Steps**

1. **Complete Migration** - Move remaining stories from `/stories/`
2. **Template Creation** - Story template for new components
3. **Automation** - Automatic story generation for new components
4. **Testing Integration** - Stories as test cases

---

**📚 For more information, see the [Storybook Documentation](https://storybook.js.org/docs/react/writing-stories/introduction) and [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/).**
