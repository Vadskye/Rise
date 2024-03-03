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
                ClassArchetype::BlessingsOfTheAbyss,
                ClassArchetype::PactMagic,
                ClassArchetype::PactSpellMastery,
            ],
        );
        let mut ability_names: Vec<&str> = abilities.iter().map(|a| a.name).collect();
        ability_names.sort();
        assert_eq!(
            vec!["Abyssal Rebuke",],
            ability_names,
            "Should match expected names"
        );
    }

    #[test]
    fn it_calculates_modifiers() {
        let warlock = Character::new(
            Class::Warlock,
            1,
            [
                ClassArchetype::BlessingsOfTheAbyss,
                ClassArchetype::PactMagic,
                ClassArchetype::PactSpellMastery,
            ],
        );

        let modifiers = warlock.creature.get_modifiers();
        let mut modifier_descriptions: Vec<String> =
            modifiers.iter().map(|a| a.description()).collect();
        modifier_descriptions.sort();
        // Note that this ignores the DR 1 ability from rank 0 blessings of the abyss
        assert_eq!(
            vec![
                "attack Abyssal Rebuke",
                "defense armor by 0",
                "defense fortitude by 3",
                "defense mental by 4",
                "defense reflex by 2",
                "resource attunement point by 3",
                "resource fatigue tolerance by 3",
                "resource insight point by 2",
                "resource trained skill by 4"
            ],
            modifier_descriptions,
            "Should match expected names"
        );
    }

    #[test]
    fn it_calculates_abyssal_blast() {
        let warlock = Character::new(
            Class::Warlock,
            20,
            [
                // If we take pact magic, we get the extra standard spell attacks which are not helpful
                // here.
                ClassArchetype::BlessingsOfTheAbyss,
                ClassArchetype::KeeperOfForbiddenKnowledge,
                ClassArchetype::SoulkeepersChosen,
            ],
        );

        let attacks = warlock.creature.calc_all_attacks();
        assert_eq!(1, attacks.len(), "Should have one attack");
        let abyssal_blast = &attacks[0];
        assert_eq!(
            "Abyssal Rebuke +10 (12d10 fire damage.)",
            abyssal_blast.shorthand_description(&warlock.creature),
            "Should have correct description"
        );
    }
}
