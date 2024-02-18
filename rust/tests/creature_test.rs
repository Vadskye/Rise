#[cfg(test)]
mod creature_tests {
    use rise::core_mechanics::attacks::HasAttacks;
    use rise::core_mechanics::{Defense, HasDamageAbsorption, HasDefenses};
    use rise::creatures::creature::Creature;
    use rise::creatures::{CreatureCategory, HasModifiers, Modifier};
    use rise::equipment::{Armor, HasArmor};
    use rise::skills::{HasSkills, Skill};

    #[test]
    fn it_calculates_armor_effects() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        assert_eq!(
            0,
            creature.calc_defense(&Defense::Armor),
            "Should have 0 AD"
        );
        assert_eq!(
            0,
            creature.calc_skill_modifier(&Skill::Climb),
            "Should have 0 Climb"
        );
        assert_eq!(
            0,
            creature.calc_skill_modifier(&Skill::Devices),
            "Should have 0 Devices"
        );

        creature.add_armor(Armor::Brigandine(None));
        assert_eq!(
            4,
            creature.calc_defense(&Defense::Armor),
            "Should have 4 AD"
        );
        assert_eq!(
            -4,
            creature.calc_skill_modifier(&Skill::Climb),
            "Should have -4 Climb"
        );
        // Encumbrance should only modify str/dex skill checks, not Devices
        assert_eq!(
            0,
            creature.calc_skill_modifier(&Skill::Devices),
            "Should have 0 Devices"
        );
    }

    #[test]
    fn it_calculates_modifiers() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        assert_eq!(
            0,
            creature.calc_defense(&Defense::Armor),
            "Should have 0 AD"
        );
        assert_eq!(
            0,
            creature.calc_skill_modifier(&Skill::Climb),
            "Should have 0 Climb"
        );
        assert_eq!(
            0,
            creature.calc_skill_modifier(&Skill::Devices),
            "Should have 0 Devices"
        );

        creature.add_modifier(Modifier::Defense(Defense::Armor, 2), None, None);
        creature.add_modifier(Modifier::DamageResistance(1), None, None);
        creature.add_modifier(Modifier::DamageResistance(2), None, None);
        assert_eq!(
            2,
            creature.calc_defense(&Defense::Armor),
            "Should have 2 AD"
        );
        assert_eq!(
            0,
            creature.calc_defense(&Defense::Fortitude),
            "Should have 0 Fort"
        );
        assert_eq!(3, creature.calc_damage_resistance(), "Should have 3 DR");
    }

    #[test]
    fn it_replaces_modifiers_by_priority() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        assert_eq!(0, creature.calc_accuracy(), "Should have 0 accuracy");
        creature.add_modifier(Modifier::Accuracy(2), Some("accuracy"), Some(1));
        assert_eq!(2, creature.calc_accuracy(), "Should have 2 accuracy");
        creature.add_modifier(Modifier::Accuracy(1), Some("accuracy"), Some(2));
        assert_eq!(
            1,
            creature.calc_accuracy(),
            "Should have 1 accuracy, since lower priority modifier was replaced"
        );
        creature.add_modifier(Modifier::Accuracy(5), Some("accuracy"), Some(0));
        assert_eq!(
            1,
            creature.calc_accuracy(),
            "Should have 1 accuracy, since lower priority modifier was ignored"
        );
    }

    #[test]
    fn it_calculates_magic_bonuses() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        assert_eq!(
            0,
            creature.calc_defense(&Defense::Armor),
            "Should have 0 AD"
        );
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 2));
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 1));
        assert_eq!(
            2,
            creature.calc_defense(&Defense::Armor),
            "Should have 2 AD; magic modifier was added first"
        );
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 3));
        assert_eq!(
            3,
            creature.calc_defense(&Defense::Armor),
            "Should have 3 AD; magic modifier was added last"
        );
    }
}
