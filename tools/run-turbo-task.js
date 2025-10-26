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

const TURBO_FLAG_PREFIXES = new Set([
  '--cache',
  '--version',
  '--force',
  '--skip-infer',
  '--no-update-notifier',
  '--remote-only',
  '--api',
  '--remote-cache-read-only',
  '--color',
  '--no-cache',
  '--cache-workers',
  '--cwd',
  '--dry-run',
  '--heap',
  '--graph',
  '--ui',
  '--daemon',
  '--login',
  '--no-color',
  '--no-daemon',
  '--preflight',
  '--profile',
  '--anon-profile',
  '--remote-cache-timeout',
  '--summarize',
  '--team',
  '--parallel',
  '--token',
  '--cache-dir',
  '--trace',
  '--concurrency',
  '--verbosity',
  '--continue',
  '--single-package',
  '--framework-inference',
  '--dangerously-disable-package-manager-check',
  '--global-deps',
  '--env-mode',
  '--filter',
  '--scope',
  '--since',
  '--root-turbo-json',
  '--affected',
  '--output-logs',
  '--log-order',
  '--only',
  '--log-prefix',
  '--help'
])

const TURBO_SHORT_FLAGS = new Set(['-F', '-h'])

const [task, ...rest] = args

const turboArgs = [task]

const isTurboOption = (arg) => {
  if (!arg || arg === '--turbo' || arg === '--') {
    return false
  }

  if (TURBO_SHORT_FLAGS.has(arg)) {
    return true
  }

  if (!arg.startsWith('--')) {
    return false
  }

  const flag = arg.includes('=') ? arg.slice(0, arg.indexOf('=')) : arg

  return TURBO_FLAG_PREFIXES.has(flag)
}

if (rest.length > 0) {
  const forwardedArgs = rest[0] === '--turbo' ? rest.slice(1) : rest
  const hasExplicitSeparator = forwardedArgs.includes('--')
  const containsTurboFlags = forwardedArgs.some((arg) => isTurboOption(arg))

  if (rest[0] === '--turbo' || hasExplicitSeparator || containsTurboFlags) {
    turboArgs.push(...forwardedArgs)
  } else {
    turboArgs.push('--', ...forwardedArgs)
  }
}

const result = spawnSync('turbo', turboArgs, {
  stdio: 'inherit',
  env: process.env
})

process.exit(result.status ?? 0)
