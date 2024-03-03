use crate::calculations::statistical_combat::generic_attack_outcome;
use crate::classes::{Class, ClassArchetype};
use crate::core_mechanics::{Attribute, HasAttributes};
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

fn format_pve_accuracy(level: i32) -> String {
    let attackers = standard_attackers(level);
    let defenders = standard_defenders(level);

    format!(
        "## Level {level}

{low_attacker}

{med_attacker}

{high_attacker}",
        low_attacker = format_attacker_accuracy(&attackers[0], &defenders),
        med_attacker = format_attacker_accuracy(&attackers[1], &defenders),
        high_attacker = format_attacker_accuracy(&attackers[2], &defenders),
    )
}

fn standard_attackers(level: i32) -> [Creature; 3] {
    let mut low_accuracy_creature = Creature::new(level, CreatureCategory::Character);
    low_accuracy_creature.set_name("Low accuracy");

    // +1 accuracy at rank 1 from perception, +1 at ranks 2 and 5 from Tactician
    let mut medium_accuracy_creature = Character::new(
        Class::Fighter,
        level,
        [
            ClassArchetype::MartialMastery,
            ClassArchetype::Tactician,
            ClassArchetype::CombatDiscipline,
        ],
    )
    .creature;
    medium_accuracy_creature.set_base_attributes([4, 0, 2, 0, 2, 0]);
    medium_accuracy_creature.set_name("Medium accuracy");

    let mut high_accuracy_creature = Character::new(
        Class::Barbarian,
        level,
        [
            ClassArchetype::Battlerager,
            ClassArchetype::Totemist,
            ClassArchetype::MartialMastery,
        ],
    )
    .creature;
    high_accuracy_creature.set_base_attributes([2, 0, 2, 0, 4, 0]);
    high_accuracy_creature
        .set_attribute_scaling(level, [Attribute::Perception, Attribute::Strength]);
    high_accuracy_creature.set_name("High accuracy");

    [
        low_accuracy_creature,
        medium_accuracy_creature,
        high_accuracy_creature,
    ]
}

fn standard_defenders(level: i32) -> [Creature; 4] {
    let mystic = Monster::standard_mystic(level).creature;

    let brute = Monster::standard_brute(level).creature;

    let warrior = Monster::standard_warrior(level).creature;

    let skirmisher = Monster::standard_skirmisher(level).creature;

    [mystic, brute, warrior, skirmisher]
}

fn format_attacker_accuracy(attacker: &Creature, defenders: &[Creature; 4]) -> String {
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
