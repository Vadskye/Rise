use super::*;

use crate::core_mechanics::Defense;
use crate::creatures::{Character, Creature, CreatureCategory, HasModifiers, Modifier, Monster};
use crate::equipment::StandardWeapon;

fn assert_float_eq(expected: f64, actual: f64, message: &str) {
    assert_eq!(
        format!("{expected:.2}"),
        format!("{actual:.2}"),
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

        assert_float_eq(
            9.0,
            calc_accuracy_bonus_from_explosions(8, 1),
            "Target 8",
        );

        assert_float_eq(
            5.5,
            calc_accuracy_bonus_from_explosions(1, 1),
            "Target 1",
        );

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
        assert_float_eq(
            1.0,
            calc_probability_of_explosions(100, 0),
            "Target 100",
        );

        assert_float_eq(
            1.0,
            calc_probability_of_explosions(-100, 0),
            "Target -100",
        );
    }

    #[test]
    fn single_explosion() {
        assert_float_eq(
            0.1,
            calc_probability_of_explosions(100, 1),
            "Target 100",
        );

        assert_float_eq(
            0.1,
            calc_probability_of_explosions(10, 1),
            "Target 10",
        );

        assert_float_eq(
            0.2,
            calc_probability_of_explosions(9, 1),
            "Target 9",
        );

        assert_float_eq(
            0.9,
            calc_probability_of_explosions(2, 1),
            "Target 2",
        );

        assert_float_eq(
            1.0,
            calc_probability_of_explosions(-100, 1),
            "Target -100",
        );
    }

    #[test]
    fn double_explosion() {
        assert_float_eq(
            0.01,
            calc_probability_of_explosions(100, 2),
            "Target 100",
        );

        assert_float_eq(
            0.01,
            calc_probability_of_explosions(10, 2),
            "Target 10",
        );

        assert_float_eq(
            0.02,
            calc_probability_of_explosions(9, 2),
            "Target 9",
        );

        assert_float_eq(
            0.1,
            calc_probability_of_explosions(1, 2),
            "Target 1",
        );

        assert_float_eq(
            1.0,
            calc_probability_of_explosions(-100, 2),
            "Target -100",
        );
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
            "0.500 single, 0.055 crit",
            outcome.short_description(),
            "Should be around 50% with +0 vs 6",
        );

        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 0, 0, 10);
        assert_eq!(
            "1.000 single, 0.111 crit",
            outcome.short_description(),
            "Should be around 100% with +0 vs 0",
        );

        let outcome = calculate_attack_outcome(&StandardWeapon::Claw.weapon().attack(), 1, 10, 10);
        assert_eq!(
            "0.400 single, 0.044 crit",
            outcome.short_description(),
            "Should include weapon accuracy modifier and non-weapon accuracy modifier",
        );
    }

    #[test]
    fn extreme_hit_probability() {
        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 0, 16, 10);
        assert_eq!(
            "0.050 single, 0.005 crit",
            outcome.short_description(),
            "Should be around 5% with +0 vs 16",
        );

        let outcome =
            calculate_attack_outcome(&StandardWeapon::Broadsword.weapon().attack(), 10, 6, 10);
        assert_eq!(
            "1.000 single, 0.555 crit",
            outcome.short_description(),
            "Should be over 100% with +10 vs 6",
        );
    }

    #[test]
    fn glance_probability() {
        let attack = &StandardWeapon::Broadsword.weapon().attack();
        assert_eq!(
            "0.200",
            format!("{:.3}", calculate_glance_probability(attack, 0, 6, 10)),
            "Should be 20% with +0 vs 6",
        );
        assert_eq!(
            "0.000",
            format!("{:.3}", calculate_glance_probability(attack, 0, 0, 10)),
            "Should be 0% with +0 vs 0",
        );
        assert_eq!(
            "0.100",
            format!("{:.3}", calculate_glance_probability(attack, 0, 11, 10)),
            "Should be 10% with +0 vs 11",
        );
        assert_eq!(
            "0.010",
            format!("{:.3}", calculate_glance_probability(attack, 0, 12, 10)),
            "Should be 1% with +0 vs 12",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_1() {
        let level = 1;
        let attacker = Character::fighter_shield(level).creature;
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
                    Monster::example_monster(*elite, level, None, None)
                        .creature
                        .calc_defense(&Defense::Armor),
                    attacker.calc_explosion_target(),
                )
                .short_description()
            })
            .collect();
        assert_eq!(expected_hit_probability, actual_hit_probability);
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::fighter_shield(level).creature;
        let attack = attacker
            .get_attack_by_name("Extra Damage Broadsword")
            .unwrap();
        let expected_hit_probability = vec!["0.800 single, 0.088 crit", "0.600 single, 0.066 crit"];
        let actual_hit_probability: Vec<String> = [false, true]
            .iter()
            .map(|elite| {
                calculate_attack_outcome(
                    &attack,
                    attacker.calc_accuracy(),
                    Monster::example_monster(*elite, level, None, None)
                        .creature
                        .calc_defense(&Defense::Armor),
                    attacker.calc_explosion_target(),
                )
                .short_description()
            })
            .collect();
        assert_eq!(expected_hit_probability, actual_hit_probability);
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let attacker = Monster::standard_example_monster(level).creature;
        let attack = attacker.get_attack_by_name("Bite").unwrap();
        assert_eq!(
            "0.500 single, 0.055 crit",
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                Character::fighter_shield(level)
                    .creature
                    .calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description(),
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let attacker = Monster::standard_example_monster(level).creature;
        let attack = attacker.get_attack_by_name("Bite").unwrap();
        assert_eq!(
            "0.500 single, 0.055 crit",
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                Character::fighter_shield(level)
                    .creature
                    .calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description(),
        );
    }

    #[test]
    fn standard_character_mirror_match() {
        fn calc_at_level(level: i32) -> String {
            let attacker = Character::fighter_shield(level).creature;
            let attack = attacker
                .get_attack_by_name("Extra Damage Broadsword")
                .unwrap();
            let defender = Character::fighter_shield(level).creature;
            calculate_attack_outcome(
                &attack,
                attacker.calc_accuracy(),
                defender.calc_defense(&Defense::Armor),
                attacker.calc_explosion_target(),
            )
            .short_description()
        }

        assert_eq!(
            [
                "0.500 single, 0.055 crit",
                "0.900 single, 0.099 crit",
                "0.800 single, 0.088 crit"
            ],
            [calc_at_level(1), calc_at_level(10), calc_at_level(20)],
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
        assert_eq!(
            0.0,
            calc_individual_dpr(&attacker, &defender),
            "Should be 0.0 when attacker has no attacks",
        );

        // Ensure that the starting conditions match our expectations
        assert_eq!(
            0,
            attacker.calc_accuracy(),
            "Attacker should have 0 accuracy",
        );
        assert_eq!(
            vec![0, 0, 0, 0],
            Defense::all()
                .iter()
                .map(|d| defender.calc_defense(d))
                .collect::<Vec<i32>>(),
            "Defender should have all defenses 0",
        );

        attacker.add_special_attack(StandardWeapon::Broadsword.weapon().attack());
        assert_eq!(
            "3.889",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 3.5 dph * 1.111 hpr = 3.889 dpr",
        );

        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "2.292",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 3.5 dph * 0.555 hpr + 1.75dpg * 0.2gpr = 2.2925 dpr after increasing defender Armor defense",
        );
    }
}
