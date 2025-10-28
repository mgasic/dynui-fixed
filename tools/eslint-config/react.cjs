const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const reactPlugin = require('eslint-plugin-react')
const prettierConfig = require('eslint-config-prettier')
const typescriptParser = require('./typescript-parser.cjs')

const compat = new FlatCompat({ baseDirectory: __dirname })

module.exports = [
  {
    ignores: ['**/dist/**', '**/build/**', '**/coverage/**', '**/*.d.ts']
  },
  ...compat.config({
    env: {
      browser: true,
      node: true,
      es2023: true
    }
  }),
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react: reactPlugin
    },
    rules: {
      'no-unused-vars': 'off'
    }
  }
]
