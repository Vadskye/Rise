#!/usr/bin/env fish
set FILENAME (status filename)
set DIR (dirname $FILENAME)
cd "$DIR/../../.."
mkdir -p core_book/generated
mkdir -p tome_of_creation/generated
cd rust

# TODO: Convert uncommon species to be Rust-generated
# cargo run --bin uncommon_classes
cargo run --bin monsters_chapter > ../core_book/generated/monster_descriptions.tex
cargo run --bin monster_reference_table > ../core_book/generated/monster_reference_table.tex
# cargo run --bin modules_chapter > ../core_book/generated/modules.tex
cargo run --bin classes_chapter > ../tome_of_creation/generated/classes.tex

cargo run --bin item_latex -- --category 'apparel' --descriptions > ../tome_of_creation/generated/apparel.tex
cargo run --bin item_latex -- --category 'apparel' --table > ../tome_of_creation/generated/apparel_table.tex

cargo run --bin item_latex -- --category 'implements' --descriptions > ../tome_of_creation/generated/implements.tex
cargo run --bin item_latex -- --category 'implements' --table > ../tome_of_creation/generated/implements_table.tex

cargo run --bin item_latex -- --category 'magic armor' --descriptions > ../tome_of_creation/generated/magic_armor.tex
cargo run --bin item_latex -- --category 'magic armor' --table > ../tome_of_creation/generated/magic_armor_table.tex

cargo run --bin item_latex -- --category 'magic weapons' --descriptions > ../tome_of_creation/generated/magic_weapons.tex
cargo run --bin item_latex -- --category 'magic weapons' --table > ../tome_of_creation/generated/magic_weapons_table.tex

cargo run --bin item_latex -- --category 'consumable tools' --descriptions > ../tome_of_creation/generated/consumable_tools.tex
cargo run --bin item_latex -- --category 'consumable tools' --table > ../tome_of_creation/generated/consumable_tools_table.tex

cargo run --bin item_latex -- --category 'permanent tools' --descriptions > ../tome_of_creation/generated/permanent_tools.tex
cargo run --bin item_latex -- --category 'permanent tools' --table > ../tome_of_creation/generated/permanent_tools_table.tex

mkdir -p combat_results
cargo run --bin generate_combat_results
cp combat_results/difficult_encounter.csv (p utransfer)
cp combat_results/standard_encounter.csv (p utransfer)

mkdir -p test_goldens
rm test_goldens/*
cargo run --bin generate_golden_files
