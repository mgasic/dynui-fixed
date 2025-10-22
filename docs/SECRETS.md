# GitHub Repository Secrets Setup

For CI/CD and publishing to work properly, set up these secrets in GitHub repo settings:

## Repository Settings → Secrets and Variables → Actions

### Required Secrets

1. **CHROMATIC_PROJECT_TOKEN**
   - Value: `chpt_044047285d65091`
   - Purpose: Visual regression testing with Chromatic
   - Used in: `.github/workflows/chromatic.yml`

2. **GITHUB_PACKAGES_TOKEN**
   - Value: `[TOKEN_PROVIDED_SEPARATELY]`
   - Purpose: Publishing to GitHub Packages registry
   - Permissions needed: `read:packages`, `write:packages`
   - Used in: `.npmrc` and publishing workflows

## How to Add Secrets

1. Go to repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add name and value for each secret above
4. Save

## Verification

After adding secrets, the following workflows should work:

- Visual regression tests with Chromatic
- Publishing to GitHub Packages (`@mgasic/dynui-fixed`)
- All Quality Gates (A through E)

## Security Notes

- These tokens are scoped to this repository only
- GitHub Packages token has minimal required permissions
- Chromatic token is project-specific
- Never commit these values to code
