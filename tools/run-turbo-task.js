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
const result = spawnSync('turbo', args, {
  stdio: 'inherit',
  env: process.env
})

process.exit(result.status ?? 0)
