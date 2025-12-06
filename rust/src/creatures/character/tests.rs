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
        fighter_1_abilities,
        vec!["Maneuvers", "Martial Maneuvers"],
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
        fighter_10_abilities,
        vec![
            "Adaptive Blow",
            "Armed and Ready",
            "Armor Expertise",
            "Augmented Maneuvers",
            "Augmented Maneuvers+",
            "Disciplined Blow",
            "Disciplined Reaction",
            "Enduring Discipline",
            "Exotic Weapon Training",
            "Maneuvers",
            "Maneuvers",
            "Martial Maneuvers",
            "Martial Maneuvers+",
        ],
        "Should have correct abilities for a level 10 fighter",
    );
}

#[test]
fn it_calculates_level_21_fighter_defenses() {
    let baseline = Creature::new(21);
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
    fighter.set_base_attributes([3, 0, 4, 0, 2, 0]);
    fighter.set_attribute_scaling(21, vec![Attribute::Strength, Attribute::Constitution]); // Add scaling

    // Note that this fighter doesn't have any items, so armor defense is lower than the standard
    // character.
    assert_eq!(
        format!(
            "Armor b{} f{}",
            baseline.calc_defense(&Defense::Armor),
            fighter.calc_defense(&Defense::Armor)
        ),
        "Armor b10 f11",
        "10 level scaling + 1 class",
    );
    assert_eq!(
        format!(
            "Brn b{} f{}",
            baseline.calc_defense(&Defense::Brawn),
            fighter.calc_defense(&Defense::Brawn)
        ),
        "Brn b10 f20",
        "3 class + 10 level scaling + 7 str",
    );
    assert_eq!(
        format!(
            "Fort b{} f{}",
            baseline.calc_defense(&Defense::Fortitude),
            fighter.calc_defense(&Defense::Fortitude)
        ),
        "Fort b10 f21",
        "3 class + 10 level scaling + 8 con",
    );
    assert_eq!(
        format!(
            "Ref b{} f{}",
            baseline.calc_defense(&Defense::Reflex),
            fighter.calc_defense(&Defense::Reflex)
        ),
        "Ref b10 f13",
        "3 class + 10 level scaling",
    );
    assert_eq!(
        format!(
            "Ment b{} f{}",
            baseline.calc_defense(&Defense::Mental),
            fighter.calc_defense(&Defense::Mental)
        ),
        "Ment b10 f17",
        "3 class + 10 level scaling + 4 enduring discipline",
    );
}

#[test]
fn it_calculates_level_21_fighter_attacks() {
    let baseline = Creature::new(21);
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
        format!(
            "Accuracy b{} f{}",
            baseline.calc_accuracy(),
            fighter.calc_accuracy(),
        ),
        "Accuracy b10 f11",
        "10 level scaling + 1 equipment training",
    );
    assert_eq!(
        fighter.calc_all_attacks().len(),
        0,
        "Should have no attacks without a weapon"
    );
    fighter.weapons.push(StandardWeapon::Battleaxe.weapon());
    assert_eq!(
        fighter
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&fighter))
            .collect::<Vec<String>>(),
        vec![
            "Generic Accuracy Battleaxe +18 (1d6+5 damage.)",
            "Certain Battleaxe +20 (1d6+2 damage.)",
            "Powerful Battleaxe +14 (2d6+10 damage.)",
            "Certain Strike+ -- Battleaxe +20 (1d6+5 damage.)",
            "Power Strike+ -- Battleaxe +11 (3d6+15 damage.)",
            "Extra Damage Battleaxe +12 (1d6+5d8+5 damage.)",
            "Generic Triple Damage -- Battleaxe +12 (3d6+15 damage.)",
            "Battleaxe +12 (1d6+5 damage.)"
        ],
        "Should have attacks with a weapon"
    );
}

#[test]
fn it_calculates_level_21_fighter_resources() {
    let baseline = Creature::new(21);
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
    fighter.set_base_attributes([4, 0, 10, 0, 2, 0]); // Set base Con to 10
    fighter.set_attribute_scaling(21, vec![Attribute::Strength, Attribute::Constitution]); // Add scaling

    assert_eq!(
        format!(
            "AP b{} f{}",
            baseline.calc_resource(&Resource::AttunementPoint),
            fighter.calc_resource(&Resource::AttunementPoint)
        ),
        "AP b0 f4",
        "4 AP from fighter"
    );

    assert_eq!(
        format!(
            "FT b{} f{}",
            baseline.calc_resource(&Resource::FatigueTolerance),
            fighter.calc_resource(&Resource::FatigueTolerance)
        ),
        "FT b-5 f9",
        "0 base + 2 Con + 3 Class + 2 Enduring Discipline + 2 Enduring Discipline+"
    );
    assert_eq!(
        format!(
            "Insight b{} f{}",
            baseline.calc_resource(&Resource::InsightPoint),
            fighter.calc_resource(&Resource::InsightPoint)
        ),
        "Insight b0 f1",
        "1 fighter",
    );
    assert_eq!(
        format!(
            "Skills b{} f{}",
            baseline.calc_resource(&Resource::TrainedSkill),
            fighter.calc_resource(&Resource::TrainedSkill)
        ),
        "Skills b0 f3",
        "3 class",
    );
}
