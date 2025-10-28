#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

const eslintArgs = process.argv.slice(2);

if (eslintArgs.length === 0) {
  console.error('Usage: run-eslint-if-files <eslint args...>');
  process.exit(1);
}

const result = spawnSync('pnpm', ['exec', 'eslint', ...eslintArgs], {
  stdio: 'pipe',
  encoding: 'utf8',
});

if (result.stdout) {
  process.stdout.write(result.stdout);
}

if (result.stderr) {
  process.stderr.write(result.stderr);
}

if (
  result.status === 2 &&
  /No files matching the pattern/.test(result.stderr || '')
) {
  console.log('No files to lint');
  process.exit(0);
}

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
