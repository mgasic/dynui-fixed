# Debug script for turbo build issues
Write-Host "=== Testing Turbo Build Debug ==" -ForegroundColor Green

Write-Host "`n1. Testing direct turbo command with verbose output..." -ForegroundColor Yellow
turbo build --verbosity=2

Write-Host "`n2. Testing core package build directly..." -ForegroundColor Yellow
Set-Location "packages/core"
pnpm build

Write-Host "`n3. Checking if dist directory was created..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Write-Host "✓ dist directory exists" -ForegroundColor Green
    Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "✗ dist directory not found" -ForegroundColor Red
}

Set-Location "../.."

Write-Host "`n4. Testing design-tokens package build..." -ForegroundColor Yellow  
Set-Location "packages/design-tokens"
pnpm build

if (Test-Path "dist") {
    Write-Host "✓ design-tokens dist directory exists" -ForegroundColor Green
    Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "✗ design-tokens dist directory not found" -ForegroundColor Red
}

Set-Location "../.."

Write-Host "`n5. Testing icons package build..." -ForegroundColor Yellow
Set-Location "packages/icons" 
pnpm build

if (Test-Path "dist") {
    Write-Host "✓ icons dist directory exists" -ForegroundColor Green
    Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "✗ icons dist directory not found" -ForegroundColor Red
}

Set-Location "../.."

Write-Host "`n=== Debug Complete ==" -ForegroundColor Green