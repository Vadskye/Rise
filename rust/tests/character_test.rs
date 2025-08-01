#[cfg(test)]
mod character_tests {
    use rise::classes::{calc_rank_abilities, Class, ClassArchetype};
    use rise::core_mechanics::attacks::HasAttacks;
    use rise::creatures::{Character, HasModifiers};

    #[test]
    fn it_calculates_rank_abilities() {
        let abilities = calc_rank_abilities(
            1,
            &[
                ClassArchetype::CovenantKeeper,
                ClassArchetype::PactMagic,
                ClassArchetype::PactSpellMastery,
            ],
        );
        let mut ability_names: Vec<&str> = abilities.iter().map(|a| a.name).collect();
        ability_names.sort();
        assert_eq!(
            vec!["Sacrificial Covenant",],
            ability_names,
            "Should match expected names"
        );
    }

    #[test]
    fn it_calculates_modifiers() {
        let votive = Character::new(
            Class::Votive,
            1,
            [
                ClassArchetype::CovenantKeeper,
                ClassArchetype::PactMagic,
                ClassArchetype::PactSpellMastery,
            ],
        );

        let modifiers = votive.creature.get_modifiers();
        let mut modifier_descriptions: Vec<String> =
            modifiers.iter().map(|a| a.description()).collect();
        modifier_descriptions.sort();
        // Note that this ignores the DR 1 ability from rank 0 blessings of the abyss
        assert_eq!(
            vec![
                "DR 3",
                "defense armor by 2",
                "defense mental by 2",
                "resource attunement point by 2",
                "resource insight point by 1",
                "resource trained skill by 3"
            ],
            modifier_descriptions,
            "Should match expected names"
        );
    }
}
