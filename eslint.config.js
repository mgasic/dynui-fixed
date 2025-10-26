import js from '@eslint/js'
import react from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    },
    settings: { react: { version: 'detect' } }
  },
  stylistic.configs['recommended-flat'],
  prettier,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } }
    }
  }
]
