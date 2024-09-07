use crate::core_mechanics::{Defense, HasDamageAbsorption, HasDefenses, HasResources, Resource};
use crate::core_mechanics::attacks::HasAttacks;
use crate::creatures::{Character, Creature, CreatureCategory};
use std::cmp::max;

// Get a rough idea of how effective a character is. This includes calculations unique to
// characters that don't directly affect combat power, like insight points.
pub fn calculate_character_points(character: &Character) -> i32 {
    let creature = &character.creature;
    let class = &character.class;

    // 5 points per attunement point
    creature.calc_resource(&Resource::AttunementPoint) * 5
        // 2 points per fatigue tolerance
        + creature.calc_resource(&Resource::FatigueTolerance) * 2
        // 2 points per insight point
        + creature.calc_resource(&Resource::InsightPoint) * 2
        // 1 point per trained skill
        + creature.calc_resource(&Resource::TrainedSkill)
        // 1 point per armor proficiency
        + (class.armor_proficiencies().usage_classes.len() as i32)
        // 1 point for custom weapons
        + if class.weapon_proficiencies().custom_weapons.is_some() { 1 } else { 0 }
        // 2 points for all nonexotics
        + if class.weapon_proficiencies().non_exotic_weapons { 2 } else { 0 }
        + calculate_creature_points(creature)
}

// This only counts raw combat statistics.
pub fn calculate_creature_points(creature: &Creature) -> i32 {
    let min_hp =
        Creature::new(creature.level, CreatureCategory::Character).calc_hit_points() as f64;
    let hp_multiplier = creature.calc_hit_points() as f64 / min_hp;
    // 1 point for every 10% more HP
    let hp_points = max(0, ((hp_multiplier - 1.0) * 10.0) as i32);

    hp_points
        + creature.calc_defense(&Defense::Armor) * 2
        + creature.calc_defense(&Defense::Fortitude)
        + creature.calc_defense(&Defense::Reflex)
        + creature.calc_defense(&Defense::Mental)
        + creature.calc_accuracy() * 4
        + max(creature.calc_mundane_power(), creature.calc_magical_power()) * 2
}
