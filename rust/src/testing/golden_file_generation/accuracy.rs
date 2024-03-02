use crate::calculations::statistical_combat;
use crate::calculations::statistical_combat::{explain_standard_adpr, find_best_attack};
use crate::classes::{calc_rank_abilities, Class, ClassArchetype};
use crate::core_mechanics::attacks::{Attack, HasAttacks};
use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDefenses, HasResources, Resource,
};
use crate::creatures::{creature, latex, HasModifiers, Modifier};
use crate::creatures::{Character, Creature, CreatureCategory, Monster};
use crate::equipment::{Armor, ArmorMaterial, ArmorUsageClass, HasArmor, StandardWeapon};
use crate::monsters::{ChallengeRating, CreatureType, Knowledge, Role};
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
    let mystic = Monster::new(false, CreatureType::Planeforged, Role::Mystic, level).creature;

    let mut brute = Monster::new(false, CreatureType::Planeforged, Role::Brute, level).creature;
    brute.set_base_attribute(Attribute::Dexterity, 2);

    let mut warrior = Monster::new(false, CreatureType::Planeforged, Role::Warrior, level).creature;

    let mut skirmisher =
        Monster::new(false, CreatureType::Planeforged, Role::Skirmisher, level).creature;
    skirmisher.set_base_attribute(Attribute::Dexterity, 4);
    // Perception is irrelevant here, but we need to provide two attributes for normal scaling
    skirmisher.set_attribute_scaling(level, [Attribute::Dexterity, Attribute::Perception]);

    [mystic, brute, warrior, skirmisher]
}

fn format_attacker_accuracy(attacker: &Creature, defenders: &[Creature; 4]) -> String {
    format!(
        "### {name}
Mystic/Brute/Warrior/Skirmisher: {mystic} / {brute} / {warrior} / {skirmisher}",
        name = attacker.name.as_ref().unwrap(),
        mystic = generic_attack_hit_probability(attacker, &defenders[0]),
        brute = generic_attack_hit_probability(attacker, &defenders[1]),
        warrior = generic_attack_hit_probability(attacker, &defenders[2]),
        skirmisher = generic_attack_hit_probability(attacker, &defenders[3]),
    )
}

fn generic_attack_hit_probability(attacker: &Creature, defender: &Creature) -> f64 {
    statistical_combat::calculate_attack_outcome(
        &Attack::default(),
        attacker.calc_accuracy(),
        defender.calc_defense(&Defense::Armor),
        attacker.calc_explosion_target(),
    )
    .hit_probability
}
