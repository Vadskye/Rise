use super::*;
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use crate::creatures::attacks::HasAttacks;
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
            "Greater Armor Expertise",
            "Greater Martial Expertise",
            "Greater Mental Discipline",
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
        "Ment b10 f18",
        format!(
            "Ment b{} f{}",
            baseline.calc_defense(&Defense::Mental),
            fighter.calc_defense(&Defense::Mental)
        ),
        "10 level scaling + 4 class + 2 CD0 + 1 CD3 + 1 CD6",
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
    fighter.weapons.push(StandardWeapon::Broadsword.weapon());
    assert_eq!(
        vec![
            "Certain Broadsword +16 (The target takes 4d8 slashing damage.)",
            "Generic Scaling Broadsword +11 (The target takes 4d8+8 slashing damage.)",
            "Mighty Broadsword +9 (The target takes 4d8+24 slashing damage.)",
            // +2d from discipline, +2d from equip train, +2d from martial mastery
            "Broadsword +11 (The target takes 4d8 slashing damage.)",
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
        "AP b0 f4",
        format!(
            "AP b{} f{}",
            baseline.calc_resource(&Resource::AttunementPoint),
            fighter.calc_resource(&Resource::AttunementPoint)
        ),
        "3 class + 1 equipment training"
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

#[test]
fn standard_character_statistics_level_1() {
    let creature = Character::standard_character(1, true).creature;

    // HasArmor
    assert_eq!(
        0,
        creature.calc_encumbrance(),
        "Encumbrance: 5 scale mail - 4 str - 1 equipment training",
    );

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(0, creature.calc_power(true), "Magical power: 0",);
    assert_eq!(2, creature.calc_power(false), "Mundane power: 2 str",);

    // HasAttributes
    assert_eq!(
        vec![4, 0, 2, 1, 2, 0],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
            .collect::<Vec<i32>>(),
        "Attributes",
    );

    // HasDefenses
    assert_eq!(
        7,
        creature.calc_defense(&Defense::Armor),
        "Armor: 3 breastplate + 2 shield + 1 fighter + 1 con",
    );
    assert_eq!(
        9,
        creature.calc_defense(&Defense::Fortitude),
        "Fort: 7 fighter + 2 con",
    );
    assert_eq!(3, creature.calc_defense(&Defense::Reflex), "Ref: 3 fighter",);
    assert_eq!(
        6,
        creature.calc_defense(&Defense::Mental),
        "Ment: 4 fighter + 2 combat discipline",
    );

    // HasDamageAbsorption
    assert_eq!(
        15,
        creature.calc_hit_points(),
        "HP: 11 level + 2 martial mastery + 2 con",
    );
    assert_eq!(8, creature.calc_damage_resistance(), "DR: 6 scale + 2 con",);

    // HasResources
    assert_eq!(
        3,
        creature.calc_resource(&Resource::AttunementPoint),
        "AP: 3 class",
    );
    assert_eq!(
        7,
        creature.calc_resource(&Resource::FatigueTolerance),
        "FT: 3 fighter + 4 str",
    );
    assert_eq!(
        3,
        creature.calc_resource(&Resource::InsightPoint),
        "Insight: 2 fighter + 1 int",
    );
    assert_eq!(
        5,
        creature.calc_resource(&Resource::TrainedSkill),
        "Trained skills: 4 fighter + 1 int",
    );
}

#[test]
fn standard_character_statistics_level_10() {
    let creature = Character::standard_character(10, true).creature;

    // HasArmor
    assert_eq!(
        0,
        creature.calc_encumbrance(),
        "Encumbrance: 5 layered hide - 4 str - 1 equip train",
    );

    // HasAttacks
    assert_eq!(
        7,
        creature.calc_accuracy(),
        "Accuracy: 5 level + 1 per + 1 equip train",
    );
    assert_eq!(4, creature.calc_power(true), "Magical power: 4 magic item",);
    assert_eq!(
        9,
        creature.calc_power(false),
        "Mundane power: 4 magic item + 5 str",
    );
    assert_eq!(
        vec![
            "Certain Broadsword +10 (The target takes 2d6+4 slashing damage.)",
            "Generic Scaling Broadsword +7 (The target takes 2d6+11 slashing damage.)",
            "Mighty Broadsword +5 (The target takes 2d6+17 slashing damage.)",
            "Broadsword +7 (The target takes 2d6+9 slashing damage.)",
        ],
        creature
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&creature))
            .collect::<Vec<String>>(),
        "Attack descriptions",
    );

    // HasAttributes
    assert_eq!(
        vec![11, 0, 4, 1, 4, 0],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
            .collect::<Vec<i32>>(),
        "Attributes",
    );

    // HasDefenses
    assert_eq!(
        13,
        creature.calc_defense(&Defense::Armor),
        "Armor: 5 level + 4 layered hide + 2 shield + 1 fighter + 1 con",
    );
    assert_eq!(
        14,
        creature.calc_defense(&Defense::Fortitude),
        "Fort: 5 level + 7 fighter + 2 con",
    );
    assert_eq!(
        8,
        creature.calc_defense(&Defense::Reflex),
        "Ref: 5 level + 3 fighter",
    );
    assert_eq!(
        12,
        creature.calc_defense(&Defense::Mental),
        "Ment: 5 level + 4 fighter + 3 combat discipline",
    );

    // HasDamageAbsorption
    assert_eq!(
        51,
        creature.calc_hit_points(),
        "HP: 31 level + 12 martial mastery + 4 con + 4 magic item",
    );
    assert_eq!(
        24,
        creature.calc_damage_resistance(),
        "DR: 16 elvenweave layered hide + 4 con + 4 magic item",
    );

    // HasResources
    assert_eq!(
        4,
        creature.calc_resource(&Resource::AttunementPoint),
        "AP: 3 class + 1 equipment training",
    );
    assert_eq!(
        8,
        creature.calc_resource(&Resource::FatigueTolerance),
        "FT: 3 fighter + 4 str + 1 combat discipline",
    );
    assert_eq!(
        3,
        creature.calc_resource(&Resource::InsightPoint),
        "Insight: 2 fighter + 1 int",
    );
    assert_eq!(
        5,
        creature.calc_resource(&Resource::TrainedSkill),
        "Trained skills: 4 fighter + 1 int",
    );
}

#[test]
fn standard_character_statistics_level_20() {
    let creature = Character::standard_character(20, true).creature;

    // HasArmor
    assert_eq!(
        0,
        creature.calc_encumbrance(),
        "Encumbrance: 6 full plate - 4 str - 2 equip train",
    );

    // HasAttacks
    assert_eq!(
        12,
        creature.calc_accuracy(),
        "Accuracy: 10 level + 1 per + 1 equip train",
    );
    assert_eq!(8, creature.calc_power(true), "Magical power: 8 magic item",);
    assert_eq!(
        17,
        creature.calc_power(false),
        "Mundane power: 8 magic item + 9 str",
    );
    assert_eq!(
        vec![
            "Certain Broadsword +17 (The target takes 4d8+8 slashing damage.)",
            "Generic Scaling Broadsword +12 (The target takes 4d8+25 slashing damage.)",
            "Mighty Broadsword +10 (The target takes 4d8+41 slashing damage.)",
            "Broadsword +12 (The target takes 4d8+17 slashing damage.)"
        ],
        creature
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&creature))
            .collect::<Vec<String>>(),
        "Attack descriptions",
    );

    // HasAttributes
    assert_eq!(
        vec![19, 0, 7, 1, 7, 0],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
            .collect::<Vec<i32>>(),
        "Attributes",
    );

    // HasDefenses
    assert_eq!(
        18,
        creature.calc_defense(&Defense::Armor),
        "Armor: 10 level + 4 full plate + 2 shield + 1 fighter + 1 con",
    );
    assert_eq!(
        19,
        creature.calc_defense(&Defense::Fortitude),
        "Fort: 10 level + 7 fighter + 2 con",
    );
    assert_eq!(
        13,
        creature.calc_defense(&Defense::Reflex),
        "Ref: 10 level + 3 fighter",
    );
    assert_eq!(
        18,
        creature.calc_defense(&Defense::Mental),
        "Ment: 10 level + 4 fighter + 4 combat discipline",
    );

    // HasDamageAbsorption
    assert_eq!(
        151,
        creature.calc_hit_points(),
        "HP: 100 level + 28 martial mastery + 7 con + 16 magic item",
    );
    assert_eq!(
        71,
        creature.calc_damage_resistance(),
        "DR: 48 pure deepforged full plate + 7 con + 16 magic item",
    );

    // HasResources
    assert_eq!(
        4,
        creature.calc_resource(&Resource::AttunementPoint),
        "AP: 3 class + 1 equipment training",
    );
    assert_eq!(
        9,
        creature.calc_resource(&Resource::FatigueTolerance),
        "FT: 3 fighter + 4 str + 2 combat discipline",
    );
    assert_eq!(
        3,
        creature.calc_resource(&Resource::InsightPoint),
        "Insight: 2 fighter + 1 int",
    );
    assert_eq!(
        5,
        creature.calc_resource(&Resource::TrainedSkill),
        "Trained skills: 4 fighter + 1 int",
    );
}
