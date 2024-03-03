use crate::calculations::statistical_combat::generic_attack_outcome;
use crate::core_mechanics::{Defense, HasDefenses};
use crate::creatures::{Character, Creature, CreatureCategory, Monster};

use std::io;

use super::write_golden_file;

pub fn write_pve_accuracy_golden() -> io::Result<()> {
    let golden = format!(
        "# PvE Accuracy

{level_1}

{level_5}

{level_10}

{level_15}

{level_20}",
        level_1 = format_pve_accuracy(1),
        level_5 = format_pve_accuracy(5),
        level_10 = format_pve_accuracy(10),
        level_15 = format_pve_accuracy(15),
        level_20 = format_pve_accuracy(20),
    );

    write_golden_file("pve_accuracy", golden)
}

pub fn write_pvp_accuracy_golden() -> io::Result<()> {
    let golden = format!(
        "# PvP Accuracy

{level_1}

{level_5}

{level_10}

{level_15}

{level_20}",
        level_1 = format_pvp_accuracy(1),
        level_5 = format_pvp_accuracy(5),
        level_10 = format_pvp_accuracy(10),
        level_15 = format_pvp_accuracy(15),
        level_20 = format_pvp_accuracy(20),
    );

    write_golden_file("pvp_accuracy", golden)
}

fn format_pve_accuracy(level: i32) -> String {
    let attackers = standard_attackers(level);
    let defenders = monster_defenders(level);

    format!(
        "## Level {level}

{low_attacker}

{med_attacker}

{high_attacker}",
        low_attacker = format_accuracy_vs_monsters(&attackers[0], &defenders),
        med_attacker = format_accuracy_vs_monsters(&attackers[1], &defenders),
        high_attacker = format_accuracy_vs_monsters(&attackers[2], &defenders),
    )
}

fn standard_attackers(level: i32) -> [Creature; 3] {
    let mut low_accuracy_creature = Creature::new(level, CreatureCategory::Character);
    low_accuracy_creature.set_name("Low accuracy");

    // +1 accuracy at rank 1 from perception, +1 at ranks 2 and 5 from Tactician
    let mut medium_accuracy_creature = Character::fighter_shield_tactician(level).creature;
    medium_accuracy_creature.set_name("Medium accuracy");

    let mut high_accuracy_creature = Character::barbarian_glass(level).creature;
    high_accuracy_creature.set_name("High accuracy");

    [
        low_accuracy_creature,
        medium_accuracy_creature,
        high_accuracy_creature,
    ]
}

fn monster_defenders(level: i32) -> [Creature; 4] {
    let mystic = Monster::standard_mystic(level).creature;

    let brute = Monster::standard_brute(level).creature;

    let warrior = Monster::standard_warrior(level).creature;

    let skirmisher = Monster::standard_skirmisher(level).creature;

    [mystic, brute, warrior, skirmisher]
}

fn format_accuracy_vs_monsters(attacker: &Creature, defenders: &[Creature; 4]) -> String {
    format!(
        "### {name}
Mystic/Brute/Warrior/Skirmisher: {mystic} / {brute} / {warrior} / {skirmisher}",
        name = attacker.name.as_ref().unwrap(),
        mystic = generic_attack_outcome(attacker, &defenders[0]).hit_probability,
        brute = generic_attack_outcome(attacker, &defenders[1]).hit_probability,
        warrior = generic_attack_outcome(attacker, &defenders[2]).hit_probability,
        skirmisher = generic_attack_outcome(attacker, &defenders[3]).hit_probability,
    )
}

fn format_pvp_accuracy(level: i32) -> String {
    let attackers = standard_attackers(level);
    let defenders = character_defenders(level);

    format!(
        "## Level {level}

{low_attacker}

{med_attacker}

{high_attacker}",
        low_attacker = format_accuracy_vs_characters(&attackers[0], &defenders),
        med_attacker = format_accuracy_vs_characters(&attackers[1], &defenders),
        high_attacker = format_accuracy_vs_characters(&attackers[2], &defenders),
    )
}

fn character_defenders(level: i32) -> Vec<Creature> {
    Character::standard_character_set(level)
        .into_iter()
        .map(|c| c.creature)
        .collect()
}

fn format_accuracy_vs_characters(attacker: &Creature, defenders: &Vec<Creature>) -> String {
    let components = defenders
        .iter()
        .map(|c| {
            format!(
                "{}: {:.2} ({})",
                c.name.as_ref().unwrap(),
                generic_attack_outcome(attacker, c).hit_probability,
                c.calc_defense(&Defense::Armor),
            )
        })
        .collect::<Vec<String>>()
        .join("\n");

    format!(
        "### {name}
{components}",
        name = attacker.name.as_ref().unwrap(),
    )
}
