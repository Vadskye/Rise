use super::*;

use crate::core_mechanics::Defense;
use crate::creatures::{Character, Creature, CreatureCategory, HasModifiers, Modifier, Monster};
use crate::equipment::StandardWeapon;

fn assert_float_eq(expected: f64, actual: f64, message: &str) {
    assert_eq!(
        format!("{actual:.2}"),
        format!("{expected:.2}"),
        "{message}",
    )
}

#[cfg(test)]
mod calc_accuracy_bonus_from_explosions {
    use super::*;

    #[test]
    fn no_explosion() {
        assert_float_eq(
            0.0,
            calc_accuracy_bonus_from_explosions(100, 0),
            "Target 100",
        );

        assert_float_eq(
            0.0,
            calc_accuracy_bonus_from_explosions(-100, 0),
            "Target -100",
        );
    }

    #[test]
    fn single_explosion() {
        assert_float_eq(
            10.0,
            calc_accuracy_bonus_from_explosions(10, 1),
            "Target 10",
        );

        assert_float_eq(9.0, calc_accuracy_bonus_from_explosions(8, 1), "Target 8");

        assert_float_eq(5.5, calc_accuracy_bonus_from_explosions(1, 1), "Target 1");

        assert_float_eq(
            5.5,
            calc_accuracy_bonus_from_explosions(-100, 1),
            "Target -100",
        );
    }
}

#[cfg(test)]
mod calc_probability_of_explosions {
    use super::*;

    #[test]
    fn no_explosion() {
        assert_float_eq(1.0, calc_probability_of_explosions(100, 0), "Target 100");

        assert_float_eq(1.0, calc_probability_of_explosions(-100, 0), "Target -100");
    }

    #[test]
    fn single_explosion() {
        assert_float_eq(0.1, calc_probability_of_explosions(100, 1), "Target 100");

        assert_float_eq(0.1, calc_probability_of_explosions(10, 1), "Target 10");

        assert_float_eq(0.2, calc_probability_of_explosions(9, 1), "Target 9");

        assert_float_eq(0.9, calc_probability_of_explosions(2, 1), "Target 2");

        assert_float_eq(1.0, calc_probability_of_explosions(-100, 1), "Target -100");
    }

    #[test]
    fn double_explosion() {
        assert_float_eq(0.01, calc_probability_of_explosions(100, 2), "Target 100");

        assert_float_eq(0.01, calc_probability_of_explosions(10, 2), "Target 10");

        assert_float_eq(0.02, calc_probability_of_explosions(9, 2), "Target 9");

        assert_float_eq(0.1, calc_probability_of_explosions(1, 2), "Target 1");

        assert_float_eq(1.0, calc_probability_of_explosions(-100, 2), "Target -100");
    }
}

#[cfg(test)]
mod calculate_attack_outcome {
    use super::*;

    #[test]
    fn simple_hit_probability() {
        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 0, 6, 10);
        assert_eq!(
            outcome.short_description(),
            "0.500 single, 0.055 crit",
            "Should be around 50% with +0 vs 6",
        );

        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 0, 0, 10);
        assert_eq!(
            outcome.short_description(),
            "1.000 single, 0.111 crit",
            "Should be around 100% with +0 vs 0",
        );

        let outcome = calculate_attack_outcome(&StandardWeapon::Claw.weapon().attack(), 1, 10, 10);
        assert_eq!(
            outcome.short_description(),
            "0.400 single, 0.044 crit",
            "Should include weapon accuracy modifier and non-weapon accuracy modifier",
        );
    }

    #[test]
    fn extreme_hit_probability() {
        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 0, 16, 10);
        assert_eq!(
            outcome.short_description(),
            "0.050 single, 0.005 crit",
            "Should be around 5% with +0 vs 16",
        );

        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 10, 6, 10);
        assert_eq!(
            outcome.short_description(),
            "1.000 single, 0.555 crit",
            "Should be over 100% with +10 vs 6",
        );
    }

    #[test]
    fn glance_probability() {
        let attack = &StandardWeapon::Broadsword.weapon().attack();
        assert_eq!(
            format!("{:.3}", calculate_glance_probability(attack, 0, 6, 10)),
            "0.200",
            "Should be 20% with +0 vs 6",
        );
        assert_eq!(
            format!("{:.3}", calculate_glance_probability(attack, 0, 0, 10)),
            "0.000",
            "Should be 0% with +0 vs 0",
        );
        assert_eq!(
            format!("{:.3}", calculate_glance_probability(attack, 0, 11, 10)),
            "0.100",
            "Should be 10% with +0 vs 11",
        );
        assert_eq!(
            format!("{:.3}", calculate_glance_probability(attack, 0, 12, 10)),
            "0.010",
            "Should be 1% with +0 vs 12",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_1() {
        let level = 1;
        let attacker = Character::barbarian_shield(level).creature;
        let attack = attacker
            .get_attack_by_name("Extra Damage Broadsword")
            .unwrap();
        let expected_hit_probability = vec!["0.700 single, 0.077 crit", "0.500 single, 0.055 crit"];
        let actual_hit_probability: Vec<String> = [false, true]
            .iter()
            .map(|elite| {
                calculate_attack_outcome(
                    &attack,
                    attacker.calc_accuracy(),
                    Monster::example_monster(*elite, level)
                        .creature
                        .calc_defense(&Defense::Armor),
                    attacker.calc_explosion_target(),
                )
                .short_description()
            })
            .collect();
        assert_eq!(actual_hit_probability, expected_hit_probability);
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::barbarian_shield(level).creature;
        let attack = attacker
            .get_attack_by_name("Extra Damage Broadsword")
            .unwrap();
        let expected_hit_probability = vec!["0.600 single, 0.066 crit", "0.200 single, 0.022 crit"];
        let actual_hit_probability: Vec<String> = [false, true]
            .iter()
            .map(|elite| {
                calculate_attack_outcome(
                    &attack,
                    attacker.calc_accuracy(),
                    Monster::example_monster(*elite, level)
                        .creature
                        .calc_defense(&Defense::Armor),
                    attacker.calc_explosion_target(),
                )
                .short_description()
            })
            .collect();
        assert_eq!(actual_hit_probability, expected_hit_probability);
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let attacker = Monster::standard_example_monster(level).creature;
        let attack = attacker.get_attack_by_name("Bite").unwrap();
        assert_eq!(
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                Character::barbarian_shield(level)
                    .creature
                    .calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description(),
            "0.500 single, 0.055 crit",
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let attacker = Monster::standard_example_monster(level).creature;
        let attack = attacker.get_attack_by_name("Bite").unwrap();
        assert_eq!(
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                Character::barbarian_shield(level)
                    .creature
                    .calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description(),
            "0.700 single, 0.077 crit",
        );
    }

    #[test]
    fn standard_character_mirror_match() {
        fn calc_at_level(level: i32) -> String {
            let attacker = Character::barbarian_shield(level).creature;
            let attack = attacker
                .get_attack_by_name("Extra Damage Broadsword")
                .unwrap();
            let defender = Character::barbarian_shield(level).creature;
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                defender.calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description()
        }

        assert_eq!(
            [calc_at_level(1), calc_at_level(10), calc_at_level(20)],
            [
                "0.500 single, 0.055 crit",
                "0.700 single, 0.077 crit",
                "0.700 single, 0.077 crit"
            ],
            "at levels 1/10/20",
        );
    }
}

#[cfg(test)]
mod calc_individual_dpr {
    use super::*;

    #[test]
    fn damage_per_round_no_modifier() {
        let mut attacker = Creature::new(1, CreatureCategory::Character);
        let mut defender = Creature::new(1, CreatureCategory::Character);
        defender.add_modifier(Modifier::Defense(Defense::Brawn, 3), None, None);
        defender.add_modifier(Modifier::Defense(Defense::Fortitude, 3), None, None);
        defender.add_modifier(Modifier::Defense(Defense::Reflex, 3), None, None);
        defender.add_modifier(Modifier::Defense(Defense::Mental, 3), None, None);
        assert_eq!(
            calc_individual_dpr(&attacker, &defender),
            0.0,
            "Should be 0.0 when attacker has no attacks",
        );

        // Ensure that the starting conditions match our expectations
        assert_eq!(
            attacker.calc_accuracy(),
            0,
            "Attacker should have 0 accuracy",
        );
        assert_eq!(
            Defense::all()
                .iter()
                .map(|d| defender.calc_defense(d))
                .collect::<Vec<i32>>(),
            vec![0, 3, 3, 3, 3],
            "Defender should have 0/3/3/3 defenses",
        );

        attacker.add_special_attack(StandardWeapon::Broadsword.weapon().attack());
        assert_eq!(
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "3.889",
            "Should be 3.5 dph * 1.111 hpr = 3.889 dpr",
        );

        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "2.292",
            "Should be 3.5 dph * 0.555 hpr + 1.75dpg * 0.2gpr = 2.2925 dpr after increasing defender Armor defense",
        );
    }
}
