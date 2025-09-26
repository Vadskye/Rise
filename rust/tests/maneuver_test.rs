#[cfg(test)]
mod maneuver_tests {
    use rise::classes::{Class, ClassArchetype};
    use rise::core_mechanics::attacks::{HasAttacks, Maneuver};
    use rise::core_mechanics::{Attribute, HasAttributes};
    use rise::creatures::creature::Creature;
    use rise::creatures::{Character, CreatureCategory, HasModifiers, Modifier};
    use rise::equipment::StandardWeapon;

    #[test]
    fn it_calculates_attack_counts() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        creature.weapons.push(StandardWeapon::Broadsword.weapon());
        creature.add_modifier(Modifier::Maneuver(Maneuver::CertainStrike), None, None);
        assert_eq!(
            creature.calc_all_attacks().len(),
            2,
            "Should have 2 attacks, since maneuvers do not override existing weapons"
        );
        creature.add_special_attack(
            Maneuver::CertainStrike.attack(StandardWeapon::Greatsword.weapon(), creature.rank()),
        );
        assert_eq!(
            creature.calc_all_attacks().len(),
            3,
            "Should have 3 attacks, since maneuvers can add new weapons"
        );
        creature.weapons.push(StandardWeapon::Battleaxe.weapon());
        assert_eq!(
            creature.calc_all_attacks().len(),
            5,
            "Should have 5 attacks, since the battleaxe can be used alone or with a maneuver"
        );
    }

    #[test]
    fn it_calculates_attack_effects() {
        let mut creature = Creature::new(1, CreatureCategory::Character);
        // It's useful to have a nonzero power to make sure power multipliers are calculated correctly
        creature.set_base_attribute(Attribute::Strength, 3);
        creature.weapons.push(StandardWeapon::Broadsword.weapon());
        creature.add_modifier(Modifier::Maneuver(Maneuver::CertainStrike), None, None);
        assert_eq!(
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
            vec![
                "Certain Broadsword +2 (1d6 damage.)",
                "Broadsword +0 (1d6+1 damage.)"
            ],
        );
    }

    #[test]
    fn it_derives_elemental_strike_from_archetypes() {
        let mut druid = Character::new(
            Class::Druid,
            10,
            [
                ClassArchetype::Elementalist,
                ClassArchetype::Shifter,
                ClassArchetype::Wildspeaker,
            ],
        );
        // It's useful to have a nonzero power to make sure power multipliers are calculated correctly
        druid.creature.set_base_attribute(Attribute::Strength, 3);
        druid
            .creature
            .weapons
            .push(StandardWeapon::Broadsword.weapon());
        assert_eq!(
            druid
                .creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&druid.creature))
                .collect::<Vec<String>>(),
            vec![
                "Elemental Broadsword +6 (1d4+1d6+4 damage.)",
                "Broadsword +5 (1d6+4 damage.)"
            ],
        );
    }
}
