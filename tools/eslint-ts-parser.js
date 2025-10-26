import { createRequire } from 'node:module'
import path from 'node:path'
const require = createRequire(import.meta.url)
const eslintPackagePath = require.resolve('eslint/package.json')
const eslintDir = path.dirname(eslintPackagePath)
const tsParserPath = require.resolve('@typescript-eslint/parser', { paths: [eslintDir] })
const tsParser = require(tsParserPath)

const DEFAULT_ECMA_VERSION = 2023

function createParserOptions(options = {}) {
  const ecmaVersion = options.ecmaVersion ?? DEFAULT_ECMA_VERSION
  const sourceType = options.sourceType ?? 'module'
  const ecmaFeatures = {
    jsx: true,
    ...(options.ecmaFeatures ?? {})
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
