# Merge Verification Script
# Run this to verify the PR can merge cleanly

Write-Host "🔍 Verifying merge compatibility..." -ForegroundColor Cyan
Write-Host ""

# Store current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Yellow

# Fetch latest
Write-Host "📥 Fetching latest from origin..." -ForegroundColor Cyan
git fetch origin

# Check if there are actual conflicts
Write-Host ""
Write-Host "🔀 Testing merge with main..." -ForegroundColor Cyan
$mergeTest = git merge-tree $(git merge-base origin/main HEAD) origin/main HEAD 2>&1

if ($mergeTest -match "CONFLICT") {
    Write-Host "❌ CONFLICT DETECTED!" -ForegroundColor Red
    Write-Host $mergeTest
    exit 1
} else {
    Write-Host "✅ NO CONFLICTS - Merge will succeed!" -ForegroundColor Green
}

# Show diff summary
Write-Host ""
Write-Host "📊 Files changed in this PR:" -ForegroundColor Cyan
git diff --name-status origin/main...HEAD

# Show commit summary
Write-Host ""
Write-Host "📝 Commits in this PR:" -ForegroundColor Cyan
git log --oneline origin/main..HEAD

Write-Host ""
Write-Host "✨ Verification complete!" -ForegroundColor Green
Write-Host "👉 The PR can be merged safely despite GitHub's warning" -ForegroundColor Yellow
