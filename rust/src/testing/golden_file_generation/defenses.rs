use crate::calculations::statistical_combat::generic_attack_outcome;


use crate::core_mechanics::{Defense, HasDamageAbsorption, HasDefenses};
use crate::creatures::{Character, Creature, Monster};


use std::io;

use super::write_golden_file;

pub fn write_character_defenses_golden() -> io::Result<()> {
    let golden = format!(
        "# Character Defenses

{level_1}

{level_5}

{level_10}

{level_15}

{level_20}",
        level_1 = format_characters_at_level(1),
        level_5 = format_characters_at_level(5),
        level_10 = format_characters_at_level(10),
        level_15 = format_characters_at_level(15),
        level_20 = format_characters_at_level(20),
    );

    write_golden_file("character_defenses", golden)
}

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

fn format_characters_at_level(level: i32) -> String {
    let formatted = Character::standard_set(level)
        .iter()
        .map(|c| format_defenses(&c.creature))
        .collect::<Vec<String>>()
        .join("\n\n");
    format!(
        "## Level {level}

{formatted}",
    )
}

fn format_monsters_at_level(level: i32) -> String {
    let monsters = vec![
        Monster::standard_brute(level),
        Monster::standard_leader(level),
        Monster::standard_mystic(level),
        Monster::standard_skirmisher(level),
        Monster::standard_sniper(level),
        Monster::standard_warrior(level),
    ];
    let formatted = monsters
        .iter()
        .map(|m| format_defenses(&m.creature))
        .collect::<Vec<String>>()
        .join("\n\n");
    format!(
        "## Level {level}

{formatted}",
    )
}

fn format_defenses(creature: &Creature) -> String {
    let armor = creature.calc_defense(&Defense::Armor);
    let brawn = creature.calc_defense(&Defense::Brawn);
    let fort = creature.calc_defense(&Defense::Fortitude);
    let reflex = creature.calc_defense(&Defense::Reflex);
    let ment = creature.calc_defense(&Defense::Mental);

    let hp = creature.calc_hit_points();
    let dr = creature.calc_damage_resistance();

    let points = armor * 2 + brawn + fort + reflex + ment;
    let self_hit = (generic_attack_outcome(&creature, &creature).hit_probability * 100.0) as i32;

    format!(
        "### {name}
A/B/F/R/M: {armor} / {brawn} / {fort} / {reflex} / {ment}
HP/DR/Total: {hp} / {dr} / {hp_plus_dr}
Points / Self-hit: {points} / {self_hit}%",
        name = creature.name.as_ref().unwrap(),
        hp_plus_dr = hp + dr,
    )
}
