import { createRequire } from 'node:module'
import path from 'node:path'
const require = createRequire(import.meta.url)
const eslintPackagePath = require.resolve('eslint/package.json')
const eslintDir = path.dirname(eslintPackagePath)
const tsParserPath = require.resolve('@typescript-eslint/parser', { paths: [eslintDir] })
const tsParser = require(tsParserPath)

const DEFAULT_ECMA_VERSION = 2023

function isTSXFile(filePath) {
  if (!filePath) return false

  const normalizedPath = filePath.toLowerCase()
  return normalizedPath.endsWith('.tsx')
}

function extractFilePath(context) {
  if (!context) return undefined

  if (typeof context === 'string') return context

  if (typeof context === 'object') {
    if ('filePath' in context && typeof context.filePath === 'string') {
      return context.filePath
    }

    if ('filename' in context && typeof context.filename === 'string') {
      return context.filename
    }
  }

  return undefined
}

function createParserOptions(options = {}, filePath) {
  const ecmaVersion = options.ecmaVersion ?? DEFAULT_ECMA_VERSION
  const sourceType = options.sourceType ?? 'module'
  const resolvedFilePath = filePath ?? options.filePath
  const jsxEnabled =
    options.ecmaFeatures?.jsx ?? (resolvedFilePath ? isTSXFile(resolvedFilePath) : false)
  const ecmaFeatures = {
    ...(options.ecmaFeatures ?? {}),
    jsx: jsxEnabled
  }

  return {
    ecmaVersion,
    sourceType,
    ecmaFeatures,
    allowHashBang: options.allowHashBang ?? true,
    loc: true,
    range: true,
    tokens: true,
    comment: true
  }
}

export function parse(code, options = {}) {
  return parseForESLint(code, options).ast
}

export function parseForESLint(code, options = {}) {
  const baseParserOptions = createParserOptions(options)
  const parserOptions = {
    ...options,
    ...baseParserOptions,
    ecmaFeatures: baseParserOptions.ecmaFeatures,
    loc: true,
    range: true,
    tokens: true,
    comment: true
  }

  return tsParser.parseForESLint(code, parserOptions)
}

export default {
  parse,
  parseForESLint
}
