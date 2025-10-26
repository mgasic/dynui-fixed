import { createRequire } from 'node:module'
import path from 'node:path'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const eslintPackagePath = require.resolve('eslint/package.json')
const eslintDir = path.dirname(eslintPackagePath)
const espreePath = require.resolve('espree', { paths: [eslintDir] })
const espree = require(espreePath)

const DEFAULT_ECMA_VERSION = 2023

function isTSXFile(filePath) {
  if (!filePath) return false

  const normalizedPath = filePath.toLowerCase()
  return normalizedPath.endsWith('.tsx')
}

function createParserOptions(options = {}) {
  const ecmaVersion = options.ecmaVersion ?? DEFAULT_ECMA_VERSION
  const sourceType = options.sourceType ?? 'module'
  const jsxEnabled = options.ecmaFeatures?.jsx ?? isTSXFile(options.filePath)
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

function transpileTypeScript(code, options = {}) {
  const fileName = options.filePath ?? (options.ecmaFeatures?.jsx ? 'inline.tsx' : 'inline.ts')
  const compilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: options.ecmaFeatures?.jsx ? ts.JsxEmit.Preserve : ts.JsxEmit.None,
    useDefineForClassFields: true,
    importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    preserveValueImports: true
  }

  return ts.transpileModule(code, {
    fileName,
    compilerOptions,
    reportDiagnostics: false
  }).outputText
}

export function parse(code, options = {}) {
  return parseForESLint(code, options).ast
}

export function parseForESLint(code, options = {}) {
  const parserOptions = createParserOptions(options)
  const transpiled = transpileTypeScript(code, parserOptions)
  const ast = espree.parse(transpiled, parserOptions)

  return {
    ast,
    services: {
      transpiledText: transpiled
    },
    scopeManager: null,
    visitorKeys: null,
    tokens: ast.tokens,
    comments: ast.comments
  }
}

export default {
  parse,
  parseForESLint
}
