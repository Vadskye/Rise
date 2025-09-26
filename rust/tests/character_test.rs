#[cfg(test)]
mod character_tests {
    use rise::classes::{calc_rank_abilities, Class, ClassArchetype};
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
            ability_names,
            vec!["Sacrificial Covenant"],
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
            modifier_descriptions,
            vec![
                "defense armor by 2",
                "defense brawn by 3",
                "defense fortitude by 3",
                "defense mental by 3",
                "defense reflex by 3",
                "durability 2",
                "resource attunement point by 1",
                "resource fatigue tolerance by 2",
                "resource trained skill by 3",
                "vital roll 1"
            ],
            "Should match expected names"
        );
    }
}
