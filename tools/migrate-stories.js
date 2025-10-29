#!/usr/bin/env node
/**
 * Migration script to move stories from /stories/ to co-located pattern
 * Usage: node tools/migrate-stories.js
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = join(__dirname, '..')
const storiesDir = join(rootDir, 'stories')
const uiDir = join(rootDir, 'packages/core/src/ui')

// Mapping of story files to component names
const STORY_COMPONENT_MAP = {
  'DynButton.stories.tsx': 'dyn-button',
  'DynInput.stories.tsx': 'dyn-input', 
  'DynTabs.stories.tsx': 'dyn-tabs',
  'DynSelect.stories.tsx': 'dyn-select',
  'DynCheckbox.stories.tsx': 'dyn-checkbox',
  'DynRadioGroup.stories.tsx': 'dyn-radio',
  'DynTable.stories.tsx': 'dyn-table',
  'DynModal.stories.tsx': 'dyn-modal',
  'DynMenu.stories.tsx': 'dyn-menu',
  'DynBreadcrumb.stories.tsx': 'dyn-breadcrumb',
  'DynTreeView.stories.tsx': 'dyn-tree',
  'DynListView.stories.tsx': 'dyn-listview',
  'DynTextArea.stories.tsx': 'dyn-textarea',
  'DynContainer.stories.tsx': 'dyn-container',
  'DynIcon.stories.tsx': 'dyn-icon'
}

// Skip these files (already migrated or special cases)
const SKIP_FILES = [
  'KitchenSink.stories.tsx',  // Special demonstration story
  'api',                       // API examples directory
  'docs',                     // Documentation stories
  'forms'                     // Form examples directory
]

function updateImportPaths(content, componentName) {
  // Convert old import path to new relative path
  const oldImport = `from '../src/ui/${componentName}'`
  const newImport = `from './${componentName}'`
  
  return content.replace(
    new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
    newImport
  )
}

function enhanceStoryWithA11y(content, componentDisplayName) {
  // Add accessibility configuration if not present
  if (!content.includes('parameters:') || !content.includes('a11y:')) {
    const metaPattern = /(const meta: Meta<typeof \w+> = \{[^}]*)(\})/s
    const replacement = `$1,
  parameters: {
    docs: {
      description: {
        component: '${componentDisplayName} component with accessibility support.'
      }
    },
    a11y: {
      config: {
        rules: [
          // Add specific accessibility rules here
        ]
      }
    }
  }
$2`
    
    content = content.replace(metaPattern, replacement)
  }
  
  return content
}

async function migrateStory(storyFile, componentName) {
  const storyPath = join(storiesDir, storyFile)
  const newStoryPath = join(uiDir, `${componentName}.stories.tsx`)
  
  try {
    console.log(`📝 Migrating ${storyFile} -> ${componentName}.stories.tsx`)
    
    // Read original story content
    let content = await readFile(storyPath, 'utf-8')
    
    // Update import paths
    content = updateImportPaths(content, componentName)
    
    // Enhance with accessibility configuration
    const componentDisplayName = componentName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    
    content = enhanceStoryWithA11y(content, componentDisplayName)
    
    // Add migration comment
    const migrationComment = `// 🔄 MIGRATED: Co-located story from /stories/${storyFile}\n// Enhanced with accessibility testing and improved structure\n\n`
    content = migrationComment + content
    
    // Write to new location
    await writeFile(newStoryPath, content)
    
    console.log(`✅ Successfully migrated ${storyFile}`)
    return true
    
  } catch (error) {
    console.error(`❌ Error migrating ${storyFile}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Starting story migration to co-located pattern...\n')
  
  try {
    // Ensure UI directory exists
    await mkdir(uiDir, { recursive: true })
    
    // Get all story files
    const files = await readdir(storiesDir)
    const storyFiles = files.filter(file => 
      file.endsWith('.stories.tsx') && 
      !SKIP_FILES.includes(file) &&
      STORY_COMPONENT_MAP[file]
    )
    
    console.log(`Found ${storyFiles.length} stories to migrate:\n`)
    storyFiles.forEach(file => {
      const componentName = STORY_COMPONENT_MAP[file]
      console.log(`  ${file} -> packages/core/src/ui/${componentName}.stories.tsx`)
    })
    
    console.log('')
    
    // Migrate each story
    let successCount = 0
    for (const storyFile of storyFiles) {
      const componentName = STORY_COMPONENT_MAP[storyFile]
      const success = await migrateStory(storyFile, componentName)
      if (success) successCount++
    }
    
    console.log(`\n🎉 Migration completed!`)
    console.log(`✅ Successfully migrated: ${successCount}/${storyFiles.length} stories`)
    
    if (successCount < storyFiles.length) {
      console.log(`⚠️  Some stories failed to migrate. Please review and migrate manually.`)
    }
    
    console.log(`\n📋 Next Steps:`)
    console.log(`1. Review migrated stories in packages/core/src/ui/`)
    console.log(`2. Test Storybook: pnpm storybook`)
    console.log(`3. Update any remaining references`)
    console.log(`4. Remove old stories from /stories/ when ready`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { migrateStory, STORY_COMPONENT_MAP }
