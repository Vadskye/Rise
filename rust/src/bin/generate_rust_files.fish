#!/usr/bin/env fish
set FILENAME (status filename)
set DIR (dirname $FILENAME)
cd "$DIR/../../.."
mkdir -p core_book/generated
cd rust

# TODO: Convert uncommon species to be Rust-generated
# cargo run --bin uncommon_classes
cargo run --bin monsters_chapter > ../core_book/generated/monster_descriptions.tex
cargo run --bin monster_reference_table > ../core_book/generated/monster_reference_table.tex
# cargo run --bin modules_chapter > ../core_book/generated/modules.tex
cargo run --bin classes_chapter > ../core_book/generated/classes.tex

cargo run --bin item_latex -- --category 'apparel' --descriptions > ../core_book/generated/apparel.tex
cargo run --bin item_latex -- --category 'apparel' --table > ../core_book/generated/apparel_table.tex

cargo run --bin item_latex -- --category 'implements' --descriptions > ../core_book/generated/implements.tex
cargo run --bin item_latex -- --category 'implements' --table > ../core_book/generated/implements_table.tex

cargo run --bin item_latex -- --category 'magic armor' --descriptions > ../core_book/generated/magic_armor.tex
cargo run --bin item_latex -- --category 'magic armor' --table > ../core_book/generated/magic_armor_table.tex

cargo run --bin item_latex -- --category 'magic weapons' --descriptions > ../core_book/generated/magic_weapons.tex
cargo run --bin item_latex -- --category 'magic weapons' --table > ../core_book/generated/magic_weapons_table.tex

cargo run --bin item_latex -- --category 'consumable tools' --descriptions > ../core_book/generated/consumable_tools.tex
cargo run --bin item_latex -- --category 'consumable tools' --table > ../core_book/generated/consumable_tools_table.tex

cargo run --bin item_latex -- --category 'permanent tools' --descriptions > ../core_book/generated/permanent_tools.tex
cargo run --bin item_latex -- --category 'permanent tools' --table > ../core_book/generated/permanent_tools_table.tex

mkdir -p combat_results
cargo run --bin generate_combat_results
cp combat_results/difficult_encounter.csv (p utransfer)
cp combat_results/standard_encounter.csv (p utransfer)

mkdir -p test_goldens
rm test_goldens/*
cargo run --bin generate_golden_files
