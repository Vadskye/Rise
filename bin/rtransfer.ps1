# Rise Transfer Script (Windows/PowerShell)
# Copies generated artifacts to the shared transfer directory

# Ensure we are in the script directory
$repoRoot = Resolve-Path "$PSScriptRoot\.."
$transferPath = "C:\Users\vadsk\Documents\ubuntu_transfer"

if (-not (Test-Path $transferPath)) {
    Write-Host "Creating transfer directory: $transferPath" -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $transferPath -Force | Out-Null
}

Write-Host "Transferring files to $transferPath..." -ForegroundColor Cyan

$itemsToCopy = @(
    "character_sheet\paper_sheet",
    "character_sheet\roll20.html",
    "character_sheet\roll20.css",
    "core_book\Rise.pdf",
    "comprehensive_codex\ComprehensiveCodex.pdf",
    "core_book\TomeOfGuidance.pdf",
    "html_book\Omnibook.pdf"
)

foreach ($item in $itemsToCopy) {
    $sourcePath = Join-Path $repoRoot $item
    if (Test-Path $sourcePath) {
        Write-Host "Copying $(Split-Path $sourcePath -Leaf)..." -ForegroundColor Gray
        Copy-Item -Path $sourcePath -Destination $transferPath -Recurse -Force
    } else {
        Write-Warning "Source not found: $sourcePath"
    }
}

Write-Host "Done!" -ForegroundColor Green
