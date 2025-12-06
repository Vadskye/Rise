#[cfg(test)]
mod creature_tests {
    use rise::core_mechanics::attacks::HasAttacks;
    use rise::core_mechanics::{Defense, HasDefenses};
    use rise::creatures::creature::Creature;
    use rise::creatures::{HasModifiers, Modifier};
    use rise::equipment::{Armor, HasArmor};
    use rise::skills::{HasSkills, Skill};

    #[test]
    fn it_calculates_armor_effects() {
        let mut creature = Creature::new(1);
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            0,
            "Should have 0 Armor"
        );
        assert_eq!(
            creature.calc_skill_modifier(&Skill::Climb),
            0,
            "Should have 0 Climb"
        );
        assert_eq!(
            creature.calc_skill_modifier(&Skill::Devices),
            0,
            "Should have 0 Devices"
        );

        creature.add_armor(Armor::Brigandine(None));
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            4,
            "Should have 4 Armor"
        );
    }

    #[test]
    fn it_calculates_modifiers() {
        let mut creature = Creature::new(1);
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            0,
            "Should have 0 Armor"
        );
        assert_eq!(
            creature.calc_skill_modifier(&Skill::Climb),
            0,
            "Should have 0 Climb"
        );
        assert_eq!(
            creature.calc_skill_modifier(&Skill::Devices),
            0,
            "Should have 0 Devices"
        );

        creature.add_modifier(Modifier::Defense(Defense::Armor, 2), None, None);
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            2,
            "Should have 2 Armor"
        );
        assert_eq!(
            creature.calc_defense(&Defense::Brawn),
            0,
            "Should have 0 Brawn."
        );
        assert_eq!(
            creature.calc_defense(&Defense::Fortitude),
            0,
            "Should have 0 Fortitude."
        );
    }

    #[test]
    fn it_replaces_modifiers_by_priority() {
        let mut creature = Creature::new(1);
        assert_eq!(creature.calc_accuracy(), 0, "Should have 0 accuracy");
        creature.add_modifier(Modifier::Accuracy(2), Some("accuracy"), Some(1));
        assert_eq!(creature.calc_accuracy(), 2, "Should have 2 accuracy");
        creature.add_modifier(Modifier::Accuracy(1), Some("accuracy"), Some(2));
        assert_eq!(
            creature.calc_accuracy(),
            1,
            "Should have 1 accuracy, since lower priority modifier was replaced"
        );
        creature.add_modifier(Modifier::Accuracy(5), Some("accuracy"), Some(0));
        assert_eq!(
            creature.calc_accuracy(),
            1,
            "Should have 1 accuracy, since lower priority modifier was ignored"
        );
    }

    #[test]
    fn it_calculates_magic_bonuses() {
        let mut creature = Creature::new(1);
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            0,
            "Should have 0 Armor"
        );
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 2));
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 1));
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            2,
            "Should have 2 Armor; magic modifier was added first"
        );
        creature.add_magic_modifier(Modifier::Defense(Defense::Armor, 3));
        assert_eq!(
            creature.calc_defense(&Defense::Armor),
            3,
            "Should have 3 Armor; magic modifier was added last"
        );
    }
}
