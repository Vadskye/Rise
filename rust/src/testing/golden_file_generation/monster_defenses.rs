use crate::calculations::statistical_combat::generic_attack_outcome;
use crate::classes::{Class, ClassArchetype};
use crate::core_mechanics::attacks::{Attack, HasAttacks};
use crate::core_mechanics::{Attribute, Defense, HasAttributes, HasDefenses};
use crate::creatures::{Character, Creature, CreatureCategory, Monster};
use crate::monsters::{CreatureType, Role};

use std::io;

use super::write_golden_file;

pub fn write_monster_defenses_golden() -> io::Result<()> {
    let golden = format!(
        "# Monster Defenses

{level_1}

{level_5}

{level_10}

{level_15}

{level_20}",
        level_1 = format_monsters_at_level(1),
        level_5 = format_monsters_at_level(5),
        level_10 = format_monsters_at_level(10),
        level_15 = format_monsters_at_level(15),
        level_20 = format_monsters_at_level(20),
    );

    write_golden_file("monster_defenses", golden)
}

fn format_monsters_at_level(level: i32) -> String {
    format!(
        "## Level {level}

{brute}

{mystic}

{skirmisher}

{sniper}

{warrior}",
        brute = format_monster_defenses(Monster::standard_brute(level)),
        mystic = format_monster_defenses(Monster::standard_mystic(level)),
        skirmisher = format_monster_defenses(Monster::standard_skirmisher(level)),
        sniper = format_monster_defenses(Monster::standard_sniper(level)),
        warrior = format_monster_defenses(Monster::standard_warrior(level)),
    )
}

fn format_monster_defenses(monster: Monster) -> String {
    let creature = monster.creature;

    let armor = creature.calc_defense(&Defense::Armor);
    let fort = creature.calc_defense(&Defense::Fortitude);
    let reflex = creature.calc_defense(&Defense::Reflex);
    let ment = creature.calc_defense(&Defense::Mental);

    let average = (armor + fort + reflex + ment) as f64 / 4.0;
    let average_non_armor = (fort + reflex + ment) as f64 / 3.0;
    let points = armor * 2 + fort + reflex + ment;
    let self_hit = (generic_attack_outcome(&creature, &creature).hit_probability * 100.0) as i32;

    format!(
        "### {name}
A/F/R/M: {armor} / {fort} / {reflex} / {ment}
Avg / Avg non-Armor / Points: {average} / {average_non_armor:.2} / {points}
Self-hit: {self_hit}%
",
        name = creature.name.unwrap(),
    )
}
