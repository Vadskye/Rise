# Rise Character Sheet Generation Runner (Windows/PowerShell)

# Ensure we are in the script directory
$repoRoot = Resolve-Path "$PSScriptRoot\.."

# 1. Compile the sheet worker
Write-Host "Compiling TypeScript sheet worker..." -ForegroundColor Cyan
Set-Location -Path "$repoRoot\typescript"
npx tsc --incremental
if ($LASTEXITCODE -ne 0) { 
    Write-Error "TypeScript compilation failed."
    exit $LASTEXITCODE
}

# 2. Setup Python environment
Set-Location -Path "$repoRoot\character_sheet"

$venvPaths = @(
    "$repoRoot\.venv\Scripts\Activate.ps1",
    "$repoRoot\venv\Scripts\Activate.ps1",
    "$env:USERPROFILE\Envs\rise_book\Scripts\Activate.ps1"
)

$activated = $false
foreach ($path in $venvPaths) {
    if (Test-Path $path) {
        Write-Host "Activating virtual environment: $path" -ForegroundColor Green
        . $path
        $activated = $true
        break
    }
}

if (-not $activated) {
    Write-Warning "No virtual environment found. Attempting to run with system Python."
    Write-Host "To create one, run: python -m venv .venv" -ForegroundColor Gray
}

# 3. Generate Character Sheets
Write-Host "Generating paper character sheet..." -ForegroundColor Cyan
python sheet.py
if ($LASTEXITCODE -ne 0) { Write-Error "Paper sheet generation failed." }

Write-Host "Generating Roll20 character sheet..." -ForegroundColor Cyan
python sheet.py -d roll20
if ($LASTEXITCODE -ne 0) { Write-Error "Roll20 sheet generation failed." }

# 4. Transfer files
& "$PSScriptRoot\rtransfer.ps1"

Set-Location -Path $repoRoot
