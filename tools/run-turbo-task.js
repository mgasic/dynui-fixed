#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const isRunningInsideTurbo = Boolean(
  process.env.TURBO_HASH ||
    process.env.TURBO_TEAM ||
    process.env.TURBO_TOKEN ||
    process.env.TURBO_API ||
    process.env.TURBO_INVOCATION_ID
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
