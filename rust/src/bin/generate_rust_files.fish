#!/usr/bin/env fish
set FILENAME (status filename)
set DIR (dirname $FILENAME)
cd "$DIR/../../.."
mkdir -p core_book/generated
mkdir -p comprehensive_codex/generated
cd rust

cargo build; or exit 1

# cargo run --bin modules_chapter > ../core_book/generated/modules.tex
cargo run --bin classes_chapter > ../comprehensive_codex/generated/classes.tex
cargo run --bin uncommon_species_classes

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
