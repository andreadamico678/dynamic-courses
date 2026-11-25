param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# Ensure we run from repository root
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $RepoRoot

Write-Host "==> [1/5] Running course linter..." -ForegroundColor Cyan
pnpm lint
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> [2/5] Building Astro site..." -ForegroundColor Cyan
$env:NODE_OPTIONS = "--max-old-space-size=8192"
pnpm build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> [3/5] Exporting LLM study artifacts..." -ForegroundColor Cyan
pnpm export-llm
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> [4/5] Committing changes..." -ForegroundColor Cyan
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No uncommitted changes to commit." -ForegroundColor Yellow
} else {
    if ([string]::IsNullOrWhiteSpace($Message)) {
        $ts = Get-Date -Format "yyyy-MM-dd HH:mm"
        $Message = "chore: update courses ($ts)"
    }
    git add -A
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "==> [5/5] Pushing to remote (triggers GitHub Pages deploy)..." -ForegroundColor Cyan
git push
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Done! Pushed to remote; GitHub Actions will deploy to GitHub Pages." -ForegroundColor Green
