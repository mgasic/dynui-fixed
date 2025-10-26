#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const invocationScopedVars = [
  'TURBO_HASH',
  'TURBO_INVOCATION_ID'
]

const isRunningInsideTurbo = invocationScopedVars.some(
  (key) => Boolean(process.env[key])
)

if (isRunningInsideTurbo) {
  process.exit(0)
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('No turbo task specified.')
  process.exit(1)
}

const [task, ...rest] = args

const turboArgs = [task]

if (rest.length > 0) {
  if (rest[0] === '--turbo') {
    turboArgs.push(...rest.slice(1))
  } else {
    const separatorIndex = rest.indexOf('--')

    if (separatorIndex === -1) {
      turboArgs.push(...rest)
    } else {
      turboArgs.push(
        ...rest.slice(0, separatorIndex),
        '--',
        ...rest.slice(separatorIndex + 1)
      )
    }
  }
}

const result = spawnSync('turbo', turboArgs, {
  stdio: 'inherit',
  env: process.env
})

process.exit(result.status ?? 0)
