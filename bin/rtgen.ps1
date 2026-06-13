# Rise TypeScript Generator (Windows/PowerShell)
# Compiles TypeScript and generates LaTeX content

# Ensure we are in the script directory
$repoRoot = Resolve-Path "$PSScriptRoot\.."
Set-Location -Path "$repoRoot\typescript"

# 1. Compile TypeScript
# The --incremental flag speeds up subsequent builds
Write-Host "Compiling TypeScript..." -ForegroundColor Cyan
npx tsc --incremental
if ($LASTEXITCODE -ne 0) {
    Write-Error "TypeScript compilation failed."
    exit $LASTEXITCODE
}

# 2. Ensure generated directories exist
$generatedDirs = @(
    "$repoRoot\core_book\generated",
    "$repoRoot\comprehensive_codex\generated"
)

foreach ($dir in $generatedDirs) {
    if (-not (Test-Path $dir)) {
        Write-Host "Creating directory: $dir" -ForegroundColor Gray
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# 3. Generate LaTeX Files
# This runs the generate_latex.js script for various categories
Write-Host "Generating LaTeX files..." -ForegroundColor Cyan

$tasks = @(
    @{ type = "monster_descriptions"; output = "..\core_book\generated\monster_descriptions.tex" },
    @{ type = "modules"; output = "..\core_book\generated\modules.tex" },
    @{ type = "mystic_sphere_lists"; output = "..\comprehensive_codex\generated\mystic_sphere_lists.tex" },
    @{ type = "mystic_sphere_spell_summaries"; output = "..\comprehensive_codex\generated\mystic_sphere_spell_summaries.tex" },
    @{ type = "mystic_sphere_ritual_summaries"; output = "..\comprehensive_codex\generated\mystic_sphere_ritual_summaries.tex" },
    @{ type = "mystic_sphere_descriptions"; output = "..\comprehensive_codex\generated\mystic_sphere_descriptions.tex" },
    @{ type = "ritual_descriptions"; output = "..\comprehensive_codex\generated\ritual_descriptions.tex" },
    @{ type = "archetype_descriptions"; output = "..\comprehensive_codex\generated\archetype_descriptions.tex" },
    @{ type = "classes_chapter"; output = "..\comprehensive_codex\generated\classes.tex" },
    @{ type = "combat_style_lists"; output = "..\comprehensive_codex\generated\combat_style_lists.tex" },
    @{ type = "combat_style_summaries"; output = "..\comprehensive_codex\generated\combat_style_summaries.tex" },
    @{ type = "combat_style_descriptions"; output = "..\comprehensive_codex\generated\combat_style_descriptions.tex" },
    # Equipment
    @{ type = "equipment_magic_armor_descriptions"; output = "..\comprehensive_codex\generated\magic_armor.tex" },
    @{ type = "equipment_magic_armor_tables"; output = "..\comprehensive_codex\generated\magic_armor_table.tex" },
    @{ type = "equipment_magic_weapons_descriptions"; output = "..\comprehensive_codex\generated\magic_weapons.tex" },
    @{ type = "equipment_magic_weapons_tables"; output = "..\comprehensive_codex\generated\magic_weapons_table.tex" },
    @{ type = "equipment_implements_descriptions"; output = "..\comprehensive_codex\generated\implements.tex" },
    @{ type = "equipment_implements_tables"; output = "..\comprehensive_codex\generated\implements_table.tex" },
    @{ type = "equipment_apparel_descriptions"; output = "..\comprehensive_codex\generated\apparel.tex" },
    @{ type = "equipment_apparel_tables"; output = "..\comprehensive_codex\generated\apparel_table.tex" },
    @{ type = "equipment_consumable_tools_descriptions"; output = "..\comprehensive_codex\generated\consumable_tools.tex" },
    @{ type = "equipment_consumable_tools_tables"; output = "..\comprehensive_codex\generated\consumable_tools_table.tex" },
    @{ type = "equipment_permanent_tools_descriptions"; output = "..\comprehensive_codex\generated\permanent_tools.tex" },
    @{ type = "equipment_permanent_tools_tables"; output = "..\comprehensive_codex\generated\permanent_tools_table.tex" },
    @{ type = "equipment_relic_descriptions"; output = "..\comprehensive_codex\generated\relics.tex" },
    @{ type = "equipment_relic_tables"; output = "..\comprehensive_codex\generated\relics_table.tex" },
    @{ type = "equipment_everything_table"; output = "..\comprehensive_codex\generated\everything_table.tex" }
)

foreach ($task in $tasks) {
    Write-Host "Generating $($task.type)..." -ForegroundColor Gray
    # Use npm run script which handles path registration and source maps
    npm run generate_latex -- -t $($task.type) -o $($task.output)
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to generate $($task.type)."
        exit $LASTEXITCODE
    }
}

Write-Host "Generating uncommon species classes..." -ForegroundColor Gray
npm run generate_uncommon_species_classes
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to generate uncommon species classes."
    exit $LASTEXITCODE
}

Set-Location -Path $repoRoot
Write-Host "Done!" -ForegroundColor Green
