use super::*;
use crate::core_mechanics::attacks::HasAttacks;
use crate::core_mechanics::HasDefenses;
use creature::Creature;

#[test]
fn it_calculates_rank_abilities() {
    let mut fighter_1_abilities = calc_rank_abilities(
        1,
        &[
            ClassArchetype::MartialMastery,
            ClassArchetype::EquipmentTraining,
            ClassArchetype::CombatDiscipline,
        ],
    )
    .iter()
    .map(|a| a.name)
    .collect::<Vec<&str>>();
    fighter_1_abilities.sort();
    assert_eq!(
        vec!["Maneuvers", "Martial Maneuvers",],
        fighter_1_abilities,
        "Should have correct abilities for a level 1 fighter",
    );

    let mut fighter_10_abilities = calc_rank_abilities(
        10,
        &[
            ClassArchetype::MartialMastery,
            ClassArchetype::EquipmentTraining,
            ClassArchetype::CombatDiscipline,
        ],
    )
    .iter()
    .map(|a| a.name)
    .collect::<Vec<&str>>();
    fighter_10_abilities.sort();
    assert_eq!(
        vec![
            "Armor Expertise",
            "Augmented Maneuvers",
            "Augmented Maneuvers+",
            "Disciplined Reaction",
            "Disciplined Strike",
            "Enduring Discipline",
            "Equipment Efficiency",
            "Exotic Weapon Training",
            // 2 extra since they are used for maneuver scaling at ranks 3 and 4
            "Maneuvers",
            "Maneuvers",
            "Martial Maneuvers",
            "Martial Maneuvers+",
            "Weapon Training"
        ],
        fighter_10_abilities,
        "Should have correct abilities for a level 10 fighter",
    );
}

#[test]
fn it_calculates_level_21_fighter_defenses() {
    let baseline = Creature::new(21, CreatureCategory::Character);
    let fighter = Character::new(
        Class::Fighter,
        21,
        [
            ClassArchetype::MartialMastery,
            ClassArchetype::CombatDiscipline,
            ClassArchetype::EquipmentTraining,
        ],
    )
    .creature;

    // Note that this fighter doesn't have any items, so armor defense is lower than the standard
    // character.
    assert_eq!(
        "Armor b10 f11",
        format!(
            "Armor b{} f{}",
            baseline.calc_defense(&Defense::Armor),
            fighter.calc_defense(&Defense::Armor)
        ),
        "10 level scaling + 1 class",
    );
    assert_eq!(
        "Fort b13 f14",
        format!(
            "Fort b{} f{}",
            baseline.calc_defense(&Defense::Fortitude),
            fighter.calc_defense(&Defense::Fortitude)
        ),
        "3 base + 10 level scaling + 1 con",
    );
    assert_eq!(
        "Ref b13 f13",
        format!(
            "Ref b{} f{}",
            baseline.calc_defense(&Defense::Reflex),
            fighter.calc_defense(&Defense::Reflex)
        ),
        "3 base + 10 level scaling",
    );
    assert_eq!(
        "Ment b13 f15",
        format!(
            "Ment b{} f{}",
            baseline.calc_defense(&Defense::Mental),
            fighter.calc_defense(&Defense::Mental)
        ),
        "3 base + 10 level scaling + 1 CD1 + 1 CD5",
    );
}

#[test]
fn it_calculates_level_21_fighter_attacks() {
    let baseline = Creature::new(21, CreatureCategory::Character);
    let mut fighter = Character::new(
        Class::Fighter,
        21,
        [
            ClassArchetype::MartialMastery,
            ClassArchetype::CombatDiscipline,
            ClassArchetype::EquipmentTraining,
        ],
    )
    .creature;
    assert_eq!(
        "Accuracy b10 f12",
        format!(
            "Accuracy b{} f{}",
            baseline.calc_accuracy(),
            fighter.calc_accuracy(),
        ),
        "10 level scaling + 2 equipment training",
    );
    assert_eq!(
        0,
        fighter.calc_all_attacks().len(),
        "Should have no attacks without a weapon"
    );
    fighter.weapons.push(StandardWeapon::Battleaxe.weapon());
    assert_eq!(
        vec![
            "Generic Accuracy Battleaxe +19 (1d6+5 slashing damage.)",
            "Certain Battleaxe +21 (1d6+2 slashing damage.)",
            "Powerful Battleaxe +15 (2d6+10 slashing damage.)",
            "Certain Strike+ -- Battleaxe +21 (1d6+5 slashing damage.)",
            "Power Strike+ -- Battleaxe +12 (3d6+15 slashing damage.)",
            "Extra Damage Battleaxe +13 (1d6+5d8+5 slashing damage.)",
            "Generic Triple Damage -- Battleaxe +13 (3d6+15 slashing damage.)",
            "Battleaxe +13 (1d6+5 slashing damage.)"
        ],
        fighter
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&fighter))
            .collect::<Vec<String>>(),
        "Should have attacks with a weapon"
    );
}

#[test]
fn it_calculates_level_21_fighter_resources() {
    let baseline = Creature::new(21, CreatureCategory::Character);
    let fighter = Character::new(
        Class::Fighter,
        21,
        [
            ClassArchetype::MartialMastery,
            ClassArchetype::CombatDiscipline,
            ClassArchetype::EquipmentTraining,
        ],
    )
    .creature;
    assert_eq!(
        "AP b4 f5",
        format!(
            "AP b{} f{}",
            baseline.calc_resource(&Resource::AttunementPoint),
            fighter.calc_resource(&Resource::AttunementPoint)
        ),
        "2 base + 2 level + 1 equipment training"
    );
    assert_eq!(
        "FT b3 f6",
        format!(
            "FT b{} f{}",
            baseline.calc_resource(&Resource::FatigueTolerance),
            fighter.calc_resource(&Resource::FatigueTolerance)
        ),
        "3 base + 2 combat discipline + 1 con",
    );
    assert_eq!(
        "Insight b3 f3",
        format!(
            "Insight b{} f{}",
            baseline.calc_resource(&Resource::InsightPoint),
            fighter.calc_resource(&Resource::InsightPoint)
        ),
        "1 base + 2 level",
    );
    assert_eq!(
        "Skills b0 f3",
        format!(
            "Skills b{} f{}",
            baseline.calc_resource(&Resource::TrainedSkill),
            fighter.calc_resource(&Resource::TrainedSkill)
        ),
        "3 class",
    );
}
