use super::*;
use crate::{core_mechanics::HasDefenses, creatures::attacks::HasAttacks};
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
        vec![
            "Armor Expertise",
            "Combat Styles",
            "Maneuvers",
            "Martial Expertise",
            "Martial Expertise",
            "Mental Discipline",
        ],
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
            "Cleansing Discipline",
            "Combat Style Rank (2)",
            "Combat Style Rank (3)",
            "Combat Style Rank (4)",
            "Combat Styles",
            "Disciplined Force",
            "Enduring Discipline",
            "Equipment Efficiency",
            "Glancing Strikes",
            "Greater Armor Expertise",
            // 2 of these since they are used for maneuver scaling at ranks 1 and 3
            "Maneuvers",
            "Maneuvers",
            // 5 of these since there are 4 ranks in this archetype plus the rank 0
            "Martial Expertise",
            "Martial Expertise",
            "Martial Expertise",
            "Martial Expertise",
            "Martial Expertise",
            "Martial Force",
            "Martial Maneuver",
            "Mental Discipline",
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
    assert_eq!(
        "Armor b10 f11",
        format!(
            "Armor b{} f{}",
            baseline.calc_defense(&Defense::Armor),
            fighter.calc_defense(&Defense::Armor)
        ),
    );
    assert_eq!(
        "Fort b10 f17",
        format!(
            "Fort b{} f{}",
            baseline.calc_defense(&Defense::Fortitude),
            fighter.calc_defense(&Defense::Fortitude)
        ),
        "10 level scaling + 7 class",
    );
    assert_eq!(
        "Ref b10 f13",
        format!(
            "Ref b{} f{}",
            baseline.calc_defense(&Defense::Reflex),
            fighter.calc_defense(&Defense::Reflex)
        ),
        "10 level scaling + 3 class",
    );
    assert_eq!(
        "Ment b10 f16",
        format!(
            "Ment b{} f{}",
            baseline.calc_defense(&Defense::Mental),
            fighter.calc_defense(&Defense::Mental)
        ),
        "10 level scaling + 4 class + 2 D0",
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
        "Accuracy b10 f11",
        format!(
            "Accuracy b{} f{}",
            baseline.calc_accuracy(),
            fighter.calc_accuracy(),
        ),
        "10 level scaling + 1 equipment training",
    );
    assert_eq!(
        0,
        fighter.calc_all_attacks().len(),
        "Should have no attacks without a weapon"
    );
    fighter.add_weapon(Weapon::Broadsword);
    assert_eq!(
        vec![
            "Broadsword Certain Strike +17 (The subject takes 4d6 slashing damage.)",
            "Broadsword Generic Scaling Strike +11 (The subject takes 7d10 slashing damage.)",
            "Broadsword Power Strike +9 (The subject takes 9d10 slashing damage.)",
            // +2d from discipline, +3d from equip train, +2d from martial mastery
            "Broadsword +11 (The subject takes 4d10 slashing damage.)",
        ],
        fighter
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&fighter))
            .collect::<Vec<String>>(),
        "Should have attacks with a weapon"
    );
    assert_eq!(
        4,
        fighter.calc_all_attacks().iter().filter(|a| a.glance.is_some()).count(),
        "All attacks should have glancing blows",
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
        "AP b3 f7",
        format!(
            "AP b{} f{}",
            baseline.calc_resource(&Resource::AttunementPoint),
            fighter.calc_resource(&Resource::AttunementPoint)
        ),
        "2 class + 3 scaling + 2 equipment training"
    );
    assert_eq!(
        "FT b0 f5",
        format!(
            "FT b{} f{}",
            baseline.calc_resource(&Resource::FatigueTolerance),
            fighter.calc_resource(&Resource::FatigueTolerance)
        ),
        "3 class + 2 combat discipline",
    );
    assert_eq!(
        "Insight b0 f2",
        format!(
            "Insight b{} f{}",
            baseline.calc_resource(&Resource::InsightPoint),
            fighter.calc_resource(&Resource::InsightPoint)
        ),
        "2 class",
    );
    assert_eq!(
        "Skills b0 f4",
        format!(
            "Skills b{} f{}",
            baseline.calc_resource(&Resource::TrainedSkill),
            fighter.calc_resource(&Resource::TrainedSkill)
        ),
        "4 class",
    );
}
