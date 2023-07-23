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
        creature.add_modifier( Modifier::Maneuver(Maneuver::CertainStrike), None, None);
        assert_eq!(
            2,
            creature.calc_all_attacks().len(),
            "Should have 2 attacks, since maneuvers do not override existing weapons"
        );
        creature.add_special_attack(
            Maneuver::CertainStrike.attack(StandardWeapon::Greatsword.weapon(), creature.rank()),
        );
        assert_eq!(
            3,
            creature.calc_all_attacks().len(),
            "Should have 3 attacks, since maneuvers can add new weapons"
        );
        creature.weapons.push(StandardWeapon::Battleaxe.weapon());
        assert_eq!(
            4,
            creature.calc_all_attacks().len(),
            "Should have 4 attacks, since weapons without maneuvers can still be used to attack"
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
            vec![
                "Certain Broadsword +2 (1d8 slashing damage.)",
                "Broadsword +0 (1d8 slashing damage.)"
            ],
            creature
                .calc_all_attacks()
                .iter()
                .map(|a| a.shorthand_description(&creature))
                .collect::<Vec<String>>(),
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
        vec![
            "Elemental Broadsword +5 (2d6+8 bludgeoning, fire, and slashing damage.)",
            "Broadsword +5 (2d6+6 slashing damage.)"
        ],
        druid
            .creature.calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&druid.creature))
            .collect::<Vec<String>>(),
    );
    }
}
