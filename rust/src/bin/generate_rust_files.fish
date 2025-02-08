#!/usr/bin/env fish
set FILENAME (status filename)
set DIR (dirname $FILENAME)
cd "$DIR/../../.."
mkdir -p core_book/generated
mkdir -p comprehensive_codex/generated
cd rust

cargo build; or exit 1

# TODO: Convert uncommon species to be Rust-generated
# cargo run --bin uncommon_classes
cargo run --bin monsters_chapter > ../core_book/generated/monster_descriptions.tex
cargo run --bin monster_reference_table > ../core_book/generated/monster_reference_table.tex
# cargo run --bin modules_chapter > ../core_book/generated/modules.tex
cargo run --bin classes_chapter > ../comprehensive_codex/generated/classes.tex

cargo run --bin item_latex -- --category 'apparel' --descriptions > ../comprehensive_codex/generated/apparel.tex
cargo run --bin item_latex -- --category 'apparel' --table > ../comprehensive_codex/generated/apparel_table.tex

cargo run --bin item_latex -- --category 'implements' --descriptions > ../comprehensive_codex/generated/implements.tex
cargo run --bin item_latex -- --category 'implements' --table > ../comprehensive_codex/generated/implements_table.tex

cargo run --bin item_latex -- --category 'magic armor' --descriptions > ../comprehensive_codex/generated/magic_armor.tex
cargo run --bin item_latex -- --category 'magic armor' --table > ../comprehensive_codex/generated/magic_armor_table.tex

cargo run --bin item_latex -- --category 'magic weapons' --descriptions > ../comprehensive_codex/generated/magic_weapons.tex
cargo run --bin item_latex -- --category 'magic weapons' --table > ../comprehensive_codex/generated/magic_weapons_table.tex

cargo run --bin item_latex -- --category 'consumable tools' --descriptions > ../comprehensive_codex/generated/consumable_tools.tex
cargo run --bin item_latex -- --category 'consumable tools' --table > ../comprehensive_codex/generated/consumable_tools_table.tex

cargo run --bin item_latex -- --category 'permanent tools' --descriptions > ../comprehensive_codex/generated/permanent_tools.tex
cargo run --bin item_latex -- --category 'permanent tools' --table > ../comprehensive_codex/generated/permanent_tools_table.tex

cargo run --bin item_latex -- --category 'everything' --table > ../core_book/generated/everything_table.tex

mkdir -p combat_results
cargo run --bin generate_combat_results
cp combat_results/difficult_encounter.csv (p utransfer)
cp combat_results/standard_encounter.csv (p utransfer)

mkdir -p test_goldens
rm test_goldens/*
cargo run --bin generate_golden_files
