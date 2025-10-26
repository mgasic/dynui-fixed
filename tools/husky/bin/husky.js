#!/usr/bin/env node
import { chmodSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const command = process.argv[2] ?? 'install'

const projectDir = process.cwd()
const huskyDir = resolve(projectDir, '.husky')
const bootstrapDir = resolve(huskyDir, '_')
const bootstrapScript = resolve(bootstrapDir, 'husky.sh')

const bootstrapContents = `#!/usr/bin/env sh
if [ "$HUSKY" = "0" ]; then
  exit 0
fi

if [ -n "$HUSKY_GIT_PARAMS" ]; then
  export GIT_PARAMS="$HUSKY_GIT_PARAMS"
fi

if [ -n "$HUSKY_GIT_STDIN" ]; then
  export GIT_STDIN="$HUSKY_GIT_STDIN"
fi
`

function installHooks() {
  if (!existsSync(huskyDir)) {
    mkdirSync(huskyDir, { recursive: true })
  }

  if (!existsSync(bootstrapDir)) {
    mkdirSync(bootstrapDir, { recursive: true })
  }

  if (!existsSync(bootstrapScript)) {
    writeFileSync(bootstrapScript, bootstrapContents, { mode: 0o755 })
  }

  chmodSync(bootstrapScript, 0o755)
  console.log('husky - hooks installed')
}

switch (command) {
  case 'install':
    installHooks()
    break
  default:
    console.error(`husky - unknown command "${command}"`)
    process.exit(1)
}
