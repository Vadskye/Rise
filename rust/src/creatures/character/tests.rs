use super::*;
use crate::core_mechanics::attacks::HasAttacks;
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use crate::creatures::HasModifiers;
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
            "Cleansing Discipline",
            "Disciplined Strike",
            "Enduring Discipline",
            "Enhanced Maneuvers",
            "Enhanced Maneuvers+",
            "Equipment Efficiency",
            "Maneuvers",
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
    // chaaracter.
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
        "Ment b10 f17",
        format!(
            "Ment b{} f{}",
            baseline.calc_defense(&Defense::Mental),
            fighter.calc_defense(&Defense::Mental)
        ),
        "10 level scaling + 5 class + 1 CD1 + 1 CD5",
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
        "Accuracy b10 f13",
        format!(
            "Accuracy b{} f{}",
            baseline.calc_accuracy(),
            fighter.calc_accuracy(),
        ),
        "10 level scaling + 1 equipment training + 2 martial mastery",
    );
    assert_eq!(
        0,
        fighter.calc_all_attacks().len(),
        "Should have no attacks without a weapon"
    );
    fighter.weapons.push(StandardWeapon::Battleaxe.weapon());
    assert_eq!(
        vec![
            "Certain Battleaxe +17 (The target takes 1d6+1d10 (w) slashing damage.)",
            "Powerful Battleaxe +11 (The target takes 2d6+2d10 slashing damage.)",
            "Generic Scaling Battleaxe +16 (The target takes 4d6+1d10 slashing damage.)",
            "Battleaxe +14 (The target takes 1d6+1d10 slashing damage.)"
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
        "AP b2 f5",
        format!(
            "AP b{} f{}",
            baseline.calc_resource(&Resource::AttunementPoint),
            fighter.calc_resource(&Resource::AttunementPoint)
        ),
        "2 class + 2 level + 1 equipment training"
    );
    assert_eq!(
        "FT b0 f6",
        format!(
            "FT b{} f{}",
            baseline.calc_resource(&Resource::FatigueTolerance),
            fighter.calc_resource(&Resource::FatigueTolerance)
        ),
        "4 class + 2 combat discipline",
    );
    assert_eq!(
        "Insight b2 f3",
        format!(
            "Insight b{} f{}",
            baseline.calc_resource(&Resource::InsightPoint),
            fighter.calc_resource(&Resource::InsightPoint)
        ),
        "2 level + 1 class",
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

#[cfg(test)]
mod standard_character_statistics {
    use super::*;

    #[test]
    fn level_1() {
        let creature = Character::standard_character(1, true).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Generic Scaling Strike",
            "Maneuvers: maneuver Power Strike",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 2",
            "fighter: resource fatigue tolerance by 4",
            "fighter: resource insight point by 1",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![4, 0, 2, 0, 2, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            1,
            creature.calc_encumbrance(),
            "Encumbrance: 5 scale mail - 4 str",
        );

        // HasAttacks
        assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
        assert_eq!(0, creature.calc_magical_power(), "Magical power: 0");
        assert_eq!(4, creature.calc_mundane_power(), "Mundane power: 4");
        assert_eq!(
            vec![
                "Certain Battleaxe +3 (The target takes 1d8+1 slashing damage.)",
                "Generic Scaling Battleaxe +1 (The target takes 1d8+5 slashing damage.)",
                "Mighty Battleaxe -1 (The target takes 1d8+7 slashing damage.)",
                "Battleaxe +1 (The target takes 1d8+3 slashing damage.)"
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            6,
            creature.calc_defense(&Defense::Armor),
            "Armor: 3 breastplate + 2 shield + 1 fighter",
        );
        assert_eq!(
            9,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 7 fighter + 2 con",
        );
        assert_eq!(3, creature.calc_defense(&Defense::Reflex), "Ref: 3 fighter",);
        assert_eq!(
            5,
            creature.calc_defense(&Defense::Mental),
            "Ment: 5 fighter",
        );

        // HasDamageAbsorption
        assert_eq!(
            16,
            creature.calc_hit_points(),
            "HP: (1 level + 2 con + 3 fighter)"
        );
        assert_eq!(5, creature.calc_damage_resistance(), "DR: 5 scale",);

        // HasResources
        assert_eq!(
            4,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class",
        );
        assert_eq!(
            7,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 2 con",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }

    #[test]
    fn level_10() {
        let creature = Character::standard_character(10, true).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Power Strike",
            "Weapon Training: accuracy 1",
            "Enduring Discipline: defense mental by 1",
            "Enduring Discipline: vital roll 1",
            "Enduring Discipline: resource fatigue tolerance by 1",
            "Equipment Efficiency: resource attunement point by 1",
            "Maneuvers: maneuver Generic Scaling Strike",
            "Armor Expertise: encumbrance -1",
            "Maneuvers: accuracy 1",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 2",
            "fighter: resource fatigue tolerance by 4",
            "fighter: resource insight point by 1",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
            "attribute scaling with level: base attribute strength by 2",
            "attribute scaling with level: base attribute constitution by 2",
            "magic: strike damage dice 1",
            "magic: DR 8",
            "magic: HP 4",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![5, 0, 3, 0, 2, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            0,
            creature.calc_encumbrance(),
            "Encumbrance: 5 layered hide - 5 str",
        );

        // HasAttacks
        assert_eq!(
            8,
            creature.calc_accuracy(),
            "Accuracy: 5 level + 1 per + 1 equip train + 1 maneuvers",
        );
        assert_eq!(
            7,
            creature.calc_magical_power(),
            "Magical power: as level 10"
        );
        assert_eq!(
            14,
            creature.calc_mundane_power(),
            "Mundane power: 10 level + 5 str = as level 15"
        );
        assert_eq!(
            vec![
                "Certain Battleaxe +10 (The target takes 2d8+7 slashing damage.)",
                "Generic Scaling Battleaxe +8 (The target takes 2d8+18 slashing damage.)",
                "Mighty Battleaxe +6 (The target takes 2d8+22 slashing damage.)",
                "Battleaxe +8 (The target takes 2d8+14 slashing damage.)",
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            12,
            creature.calc_defense(&Defense::Armor),
            "Armor: 5 level + 4 layered hide + 2 shield + 1 fighter",
        );
        assert_eq!(
            15,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 5 level + 7 fighter + 3 con",
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
            54,
            creature.calc_hit_points(),
            "HP: (10 level + 3 con + 3 fighter = as level 16) + 4 magic item",
        );
        assert_eq!(
            44,
            creature.calc_damage_resistance(),
            "DR: (as level 10) + 24 magic full plate + 8 magic item",
        );

        // HasResources
        assert_eq!(
            5,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class + 1 equipment training",
        );
        assert_eq!(
            9,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 3 con + 1 combat discipline",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }

    #[test]
    fn level_20() {
        let creature = Character::standard_character(20, true).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Power Strike",
            "Weapon Training: accuracy 1",
            "Enduring Discipline: defense mental by 1",
            "Enduring Discipline: vital roll 1",
            "Enduring Discipline: resource fatigue tolerance by 1",
            "Equipment Efficiency: resource attunement point by 1",
            "Armor Expertise: encumbrance -1",
            "Enduring Discipline+: defense mental by 1",
            "Enduring Discipline+: vital roll 1",
            "Enduring Discipline+: resource fatigue tolerance by 1",
            "Maneuvers: accuracy 2",
            "Armor Expertise+: encumbrance -1",
            "Maneuvers: maneuver Generic Scaling Strike",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 2",
            "fighter: resource fatigue tolerance by 4",
            "fighter: resource insight point by 1",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
            "attribute scaling with level: base attribute strength by 3",
            "attribute scaling with level: base attribute constitution by 3",
            "magic: strike damage dice 2",
            "magic: DR 16",
            "magic: HP 16",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![7, 0, 5, 0, 2, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            0,
            creature.calc_encumbrance(),
            "Encumbrance: 6 full plate - 4 str - 2 equip train",
        );

        // HasAttacks
        assert_eq!(
            14,
            creature.calc_accuracy(),
            "Accuracy: 10 level + 1 per + 1 equip train + 2 martial mastery",
        );
        assert_eq!(
            24,
            creature.calc_magical_power(),
            "Magical power: as level 20"
        );
        assert_eq!(
            38,
            creature.calc_mundane_power(),
            "Mundane power: 20 lvl + 7 str = as level 21 + 12"
        );
        assert_eq!(
            vec![
                "Certain Battleaxe +16 (The target takes 5d10+19 slashing damage.)",
                "Generic Scaling Battleaxe +14 (The target takes 5d10+54 slashing damage.)",
                "Mighty Battleaxe +12 (The target takes 5d10+62 slashing damage.)",
                "Battleaxe +14 (The target takes 5d10+38 slashing damage.)"
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            17,
            creature.calc_defense(&Defense::Armor),
            "Armor: 10 level + 4 full plate + 2 shield + 1 fighter",
        );
        assert_eq!(
            22,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 10 level + 7 fighter + 5 con",
        );
        assert_eq!(
            13,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 10 level + 3 fighter",
        );
        assert_eq!(
            19,
            creature.calc_defense(&Defense::Mental),
            "Ment: 10 level + 5 fighter + 4 combat discipline",
        );

        // HasDamageAbsorption
        assert_eq!(
            176,
            creature.calc_hit_points(),
            "HP: (20 level + 5 con + 3 fighter = as level 21 + 70) + 16 magic item",
        );
        assert_eq!(
            128,
            creature.calc_damage_resistance(),
            "DR: (as level 20) + 72 magic full plate + 16 magic item",
        );

        // HasResources
        assert_eq!(
            5,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class + 1 equipment training",
        );
        assert_eq!(
            12,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 5 con + 2 combat discipline",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }
}

#[cfg(test)]
mod standard_perception_character_statistics {
    use super::*;

    #[test]
    fn level_1() {
        let creature = Character::standard_perception_character(1).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Generic Scaling Strike",
            "Maneuvers: maneuver Mighty Strike",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 4",
            "fighter: resource fatigue tolerance by 5",
            "fighter: resource insight point by 2",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![2, 0, 2, 0, 4, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            3,
            creature.calc_encumbrance(),
            "Encumbrance: 5 scale mail - 2 str",
        );

        // HasAttacks
        assert_eq!(2, creature.calc_accuracy(), "Accuracy: 2 per");
        assert_eq!(1, creature.calc_magical_power(), "Magical power: 1");
        assert_eq!(2, creature.calc_mundane_power(), "Mundane power: 2");
        assert_eq!(
            vec![
                "Certain Battleaxe +4 (The target takes 1d8+1 slashing damage.)",
                "Generic Scaling Battleaxe +2 (The target takes 1d8+4 slashing damage.)",
                "Mighty Battleaxe +0 (The target takes 1d8+6 slashing damage.)",
                "Battleaxe +2 (The target takes 1d8+2 slashing damage.)"
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            6,
            creature.calc_defense(&Defense::Armor),
            "Armor: 3 breastplate + 2 shield + 1 fighter",
        );
        assert_eq!(
            9,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 7 fighter + 2 con",
        );
        assert_eq!(3, creature.calc_defense(&Defense::Reflex), "Ref: 3 fighter",);
        assert_eq!(
            5,
            creature.calc_defense(&Defense::Mental),
            "Ment: 5 fighter",
        );

        // HasDamageAbsorption
        assert_eq!(
            16,
            creature.calc_hit_points(),
            "HP: (1 level + 2 con + 3 fighter)"
        );
        assert_eq!(5, creature.calc_damage_resistance(), "DR: 5 scale",);

        // HasResources
        assert_eq!(
            4,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class",
        );
        assert_eq!(
            7,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 2 con",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }

    #[test]
    fn level_10() {
        let creature = Character::standard_perception_character(10).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Power Strike",
            "Weapon Training: accuracy 1",
            "Enduring Discipline: defense mental by 1",
            "Enduring Discipline: vital roll 1",
            "Enduring Discipline: resource fatigue tolerance by 1",
            "Equipment Efficiency: resource attunement point by 1",
            "Maneuvers: maneuver Generic Scaling Strike",
            "Armor Expertise: encumbrance -1",
            "Maneuvers: accuracy 1",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 2",
            "fighter: resource fatigue tolerance by 4",
            "fighter: resource insight point by 1",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
            "magic: strike damage dice 1",
            "magic: DR 8",
            "magic: HP 4",
            "attribute scaling with level: base attribute perception by 2",
            "attribute scaling with level: base attribute constitution by 2",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![2, 0, 3, 0, 5, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            3,
            creature.calc_encumbrance(),
            "Encumbrance: 6 full plate - 2 str - 1 armor expertise",
        );

        // HasAttacks
        assert_eq!(
            9,
            creature.calc_accuracy(),
            "Accuracy: 5 level + 2 per + 1 equip train + 1 maneuvers",
        );
        assert_eq!(
            7,
            creature.calc_magical_power(),
            "Magical power: as level 10"
        );
        assert_eq!(
            9,
            creature.calc_mundane_power(),
            "Mundane power: 10 level + 2 str = as level 12"
        );
        assert_eq!(
            vec![
                "Certain Battleaxe +11 (The target takes 2d8+4 slashing damage.)",
                "Generic Scaling Battleaxe +9 (The target takes 2d8+13 slashing damage.)",
                "Mighty Battleaxe +7 (The target takes 2d8+17 slashing damage.)",
                "Battleaxe +9 (The target takes 2d8+9 slashing damage.)",
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            12,
            creature.calc_defense(&Defense::Armor),
            "Armor: 5 level + 4 layered hide + 2 shield + 1 fighter",
        );
        assert_eq!(
            15,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 5 level + 7 fighter + 3 con",
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
            54,
            creature.calc_hit_points(),
            "HP: (10 level + 3 con + 3 fighter = as level 16) + 4 magic item",
        );
        assert_eq!(
            44,
            creature.calc_damage_resistance(),
            "DR: (as level 10) + 24 magic full plate + 8 magic item",
        );

        // HasResources
        assert_eq!(
            5,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class + 1 equipment training",
        );
        assert_eq!(
            9,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 3 con + 1 combat discipline",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }

    #[test]
    fn level_20() {
        let creature = Character::standard_perception_character(20).creature;

        let expected_modifiers: Vec<&str> = vec![
            "Maneuvers: maneuver Certain Strike",
            "Maneuvers: maneuver Power Strike",
            "Weapon Training: accuracy 1",
            "Enduring Discipline: defense mental by 1",
            "Enduring Discipline: vital roll 1",
            "Enduring Discipline: resource fatigue tolerance by 1",
            "Equipment Efficiency: resource attunement point by 1",
            "Armor Expertise: encumbrance -1",
            "Enduring Discipline+: defense mental by 1",
            "Enduring Discipline+: vital roll 1",
            "Enduring Discipline+: resource fatigue tolerance by 1",
            "Maneuvers: accuracy 2",
            "Armor Expertise+: encumbrance -1",
            "Maneuvers: maneuver Generic Scaling Strike",
            "fighter: defense armor by 1",
            "fighter: defense fortitude by 7",
            "fighter: defense mental by 5",
            "fighter: defense reflex by 3",
            "fighter: resource attunement point by 2",
            "fighter: resource fatigue tolerance by 4",
            "fighter: resource insight point by 1",
            "fighter: resource trained skill by 3",
            "fighter: HP from level 3",
            "magic: strike damage dice 2",
            "magic: DR 16",
            "magic: HP 16",
            "attribute scaling with level: base attribute perception by 3",
            "attribute scaling with level: base attribute constitution by 3",
        ];
        assert_eq!(
            expected_modifiers,
            creature.explain_modifiers(),
            "List of modifiers"
        );

        // HasAttributes
        assert_eq!(
            vec![2, 0, 5, 0, 7, 0],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasArmor
        assert_eq!(
            2,
            creature.calc_encumbrance(),
            "Encumbrance: 6 full plate - 2 str - 2 equip train",
        );

        // HasAttacks
        assert_eq!(
            16,
            creature.calc_accuracy(),
            "Accuracy: 10 level + 3 per + 1 equip train + 2 martial mastery",
        );
        assert_eq!(
            24,
            creature.calc_magical_power(),
            "Magical power: as level 20"
        );
        assert_eq!(
            28,
            creature.calc_mundane_power(),
            "Mundane power: 20 lvl + 2 str = as level 21 + 2"
        );
        assert_eq!(
            vec![
                "Certain Battleaxe +18 (The target takes 5d10+14 slashing damage.)",
                "Generic Scaling Battleaxe +16 (The target takes 5d10+44 slashing damage.)",
                "Mighty Battleaxe +14 (The target takes 5d10+52 slashing damage.)",
                "Battleaxe +16 (The target takes 5d10+28 slashing damage.)"
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            "Attack descriptions",
        );

        // HasDefenses
        assert_eq!(
            17,
            creature.calc_defense(&Defense::Armor),
            "Armor: 10 level + 4 full plate + 2 shield + 1 fighter",
        );
        assert_eq!(
            22,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 10 level + 7 fighter + 5 con",
        );
        assert_eq!(
            13,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 10 level + 3 fighter",
        );
        assert_eq!(
            19,
            creature.calc_defense(&Defense::Mental),
            "Ment: 10 level + 5 fighter + 4 combat discipline",
        );

        // HasDamageAbsorption
        assert_eq!(
            176,
            creature.calc_hit_points(),
            "HP: (20 level + 5 con + 3 fighter = as level 21 + 70) + 16 magic item",
        );
        assert_eq!(
            128,
            creature.calc_damage_resistance(),
            "DR: (as level 20) + 72 magic full plate + 16 magic item",
        );

        // HasResources
        assert_eq!(
            5,
            creature.calc_resource(&Resource::AttunementPoint),
            "AP: 4 class + 1 equipment training",
        );
        assert_eq!(
            12,
            creature.calc_resource(&Resource::FatigueTolerance),
            "FT: 5 fighter + 5 con + 2 combat discipline",
        );
        assert_eq!(
            2,
            creature.calc_resource(&Resource::InsightPoint),
            "Insight: 2 fighter",
        );
        assert_eq!(
            3,
            creature.calc_resource(&Resource::TrainedSkill),
            "Trained skills: 3 fighter",
        );
    }
}
