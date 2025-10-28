function createEmptyAst(sourceType = 'module') {
  return {
    type: 'Program',
    body: [],
    sourceType,
    range: [0, 0],
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 1, column: 0 }
    },
    tokens: [],
    comments: []
  }
}

function createScopeManager(ast) {
  const globalScope = {
    type: 'global',
    set: new Map(),
    variables: [],
    references: [],
    through: [],
    childScopes: [],
    upper: null,
    block: ast,
    functionExpressionScope: false
  }

  return {
    scopes: [globalScope],
    globalScope,
    acquire() {
      return null
    },
    acquireAll() {
      return []
    },
    getScope() {
      return globalScope
    },
    release() {
      return null
    }
  }
}

export function parseForESLint(_code, options = {}) {
  const sourceType = options.sourceType ?? 'module'
  const ast = createEmptyAst(sourceType)
  const scopeManager = createScopeManager(ast)

  return {
    ast,
    services: {},
    scopeManager,
    visitorKeys: {}
  }
}

export default {
  parseForESLint
}
