const path = require('path')
const ts = require('typescript')

const eslintPath = require.resolve('eslint')
const espree = require(require.resolve('espree', { paths: [path.dirname(eslintPath)] }))

function transpile(code, filePath) {
  return ts.transpileModule(code, {
    fileName: filePath ?? 'file.ts',
    compilerOptions: {
      target: ts.ScriptTarget.ES2023,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      sourceMap: false,
      inlineSourceMap: false,
      inlineSources: false
    },
    reportDiagnostics: false
  }).outputText
}

function parseWithEspree(source, options = {}) {
  const parserOptions = {
    ecmaVersion: options.ecmaVersion ?? 2023,
    sourceType: options.sourceType ?? 'module',
    ecmaFeatures: {
      jsx: true,
      ...(options.ecmaFeatures ?? {})
    },
    loc: true,
    range: true,
    comment: true,
    tokens: true
  }

  return espree.parse(source, parserOptions)
}

function buildResult(code, options) {
  const filePath = options.filePath || options.filename
  const transpiled = transpile(code, filePath)
  const ast = parseWithEspree(transpiled, options)

  return {
    ast,
    services: {
      tsTranspile: {
        filePath,
        outputText: transpiled,
        originalText: code
      }
    },
    text: transpiled
  }
}

module.exports = {
  parse(code, options = {}) {
    return buildResult(code, options).ast
  },
  parseForESLint(code, options = {}) {
    return buildResult(code, options)
  }
}
