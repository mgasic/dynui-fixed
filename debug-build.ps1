Set-StrictMode -Version Latest

Write-Host '=== Testing Turbo Build Debug ===' -ForegroundColor Green

Write-Host ''
Write-Host '1) Testing direct turbo command with verbose output...' -ForegroundColor Yellow
turbo build --verbosity=2

Write-Host ''
Write-Host '2) Testing core package build directly...' -ForegroundColor Yellow
Push-Location 'packages/core'
pnpm build

Write-Host ''
Write-Host '3) Checking if dist directory was created (core)...' -ForegroundColor Yellow
if (Test-Path 'dist') {
Write-Host '✓ dist directory exists (core)' -ForegroundColor Green
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime
} else {
Write-Host '✗ dist directory not found (core)' -ForegroundColor Red
}
Pop-Location

Write-Host ''
Write-Host '4) Testing design-tokens package build...' -ForegroundColor Yellow
Push-Location 'packages/design-tokens'
pnpm build

Write-Host ''
Write-Host '5) Checking if dist directory was created (design-tokens)...' -ForegroundColor Yellow
if (Test-Path 'dist') {
Write-Host '✓ dist directory exists (design-tokens)' -ForegroundColor Green
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime
} else {
Write-Host '✗ dist directory not found (design-tokens)' -ForegroundColor Red
}
Pop-Location

Write-Host ''
Write-Host '6) Testing icons package build...' -ForegroundColor Yellow
Push-Location 'packages/icons'
pnpm build

Write-Host ''
Write-Host '7) Checking if dist directory was created (icons)...' -ForegroundColor Yellow
if (Test-Path 'dist') {
Write-Host '✓ dist directory exists (icons)' -ForegroundColor Green
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime
} else {
Write-Host '✗ dist directory not found (icons)' -ForegroundColor Red
}
Pop-Location

Write-Host ''
Write-Host '=== Debug Complete ===' -ForegroundColor Green

Ako i dalje želiš batch varijantu (bez PS), radi i sledeće (test-build.bat sadržaj):

# PowerShell-ified debug build script
Write-Host '=== Testing Turbo Build Debug ===' -ForegroundColor Green

Write-Host ''
Write-Host '1) Testing direct turbo build with verbose output...' -ForegroundColor Yellow
turbo build --verbosity=2

Write-Host ''
Write-Host '2) Building core package...' -ForegroundColor Yellow
Push-Location 'packages/core'
pnpm build
Write-Host 'Listing dist:' -ForegroundColor Gray
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime

Pop-Location

Write-Host ''
Write-Host '3) Building design-tokens package...' -ForegroundColor Yellow
Push-Location 'packages/design-tokens'
pnpm build
Write-Host 'Listing dist:' -ForegroundColor Gray
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime

Pop-Location

Write-Host ''
Write-Host '4) Building icons package...' -ForegroundColor Yellow
Push-Location 'packages/icons'
pnpm build
Write-Host 'Listing dist:' -ForegroundColor Gray
Get-ChildItem 'dist' | Format-Table Name, Length, LastWriteTime

Pop-Location

Write-Host ''
Write-Host '=== Debug Complete ===' -ForegroundColor Green