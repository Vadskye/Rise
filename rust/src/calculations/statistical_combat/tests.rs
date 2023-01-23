use super::*;
use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::Defense;
use crate::creatures::{Character, Creature, CreatureCategory, HasModifiers, Modifier, Monster};
use crate::equipment::{Armor, HasArmor, StandardWeapon};
use crate::monsters::ChallengeRating;

#[cfg(test)]
mod calculate_hit_probability {
    use super::*;

    #[test]
    fn simple_hit_probability() {
        let hit_probability =
            calculate_hit_probability(&StandardWeapon::Broadsword.weapon().attack(), 0, 6);
        assert_eq!(
            "0.500 single, 0.055 crit",
            hit_probability.short_description(),
            "Should be around 50% with +0 vs 6",
        );

        let hit_probability =
            calculate_hit_probability(&StandardWeapon::Broadsword.weapon().attack(), 0, 0);
        assert_eq!(
            "1.000 single, 0.111 crit",
            hit_probability.short_description(),
            "Should be around 100% with +0 vs 0",
        );

        let hit_probability =
            calculate_hit_probability(&StandardWeapon::Claw.weapon().attack(), 1, 10);
        assert_eq!(
            "0.400 single, 0.044 crit",
            hit_probability.short_description(),
            "Should include weapon accuracy modifier and non-weapon accuracy modifier",
        );
    }

    #[test]
    fn extreme_hit_probability() {
        let hit_probability =
            calculate_hit_probability(&StandardWeapon::Broadsword.weapon().attack(), 0, 16);
        assert_eq!(
            "0.050 single, 0.005 crit",
            hit_probability.short_description(),
            "Should be around 5% with +0 vs 16",
        );

        let hit_probability =
            calculate_hit_probability(&StandardWeapon::Broadsword.weapon().attack(), 10, 6);
        assert_eq!(
            "1.000 single, 0.555 crit",
            hit_probability.short_description(),
            "Should be over 100% with +10 vs 6",
        );
    }

    #[test]
    fn glance_probability() {
        let attack = &StandardWeapon::Broadsword.weapon().attack();
        assert_eq!(
            "0.200",
            format!("{:.3}", calculate_glance_probability(attack, 0, 6),),
            "Should be 20% with +0 vs 6",
        );
        assert_eq!(
            "0.000",
            format!("{:.3}", calculate_glance_probability(attack, 0, 0),),
            "Should be 0% with +0 vs 0",
        );
        assert_eq!(
            "0.100",
            format!("{:.3}", calculate_glance_probability(attack, 0, 11),),
            "Should be 10% with +0 vs 11",
        );
        assert_eq!(
            "0.010",
            format!("{:.3}", calculate_glance_probability(attack, 0, 12),),
            "Should be 1% with +0 vs 12",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;
        let attack = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        let expected_hit_probability = vec![
            "0.600 single, 0.066 crit",
            "0.500 single, 0.055 crit",
            "0.500 single, 0.055 crit",
            "0.400 single, 0.044 crit",
            "0.300 single, 0.033 crit",
        ];
        let actual_hit_probability: Vec<String> = ChallengeRating::all()
            .into_iter()
            .map(|cr| {
                calculate_hit_probability(
                    &attack,
                    attacker.calc_accuracy(),
                    Monster::standard_monster(cr, level, None, None)
                        .creature
                        .calc_defense(&Defense::Armor),
                )
                .short_description()
            })
            .collect();
        assert_eq!(expected_hit_probability, actual_hit_probability);
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;
        let attack = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        let expected_hit_probability = vec![
            "0.500 single, 0.055 crit",
            "0.400 single, 0.044 crit",
            "0.400 single, 0.044 crit",
            "0.300 single, 0.033 crit",
            "0.200 single, 0.022 crit",
        ];
        let actual_hit_probability: Vec<String> = ChallengeRating::all()
            .into_iter()
            .map(|cr| {
                calculate_hit_probability(
                    &attack,
                    attacker.calc_accuracy(),
                    Monster::standard_monster(cr, level, None, None)
                        .creature
                        .calc_defense(&Defense::Armor),
                )
                .short_description()
            })
            .collect();
        assert_eq!(expected_hit_probability, actual_hit_probability);
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let attacker = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        let attack = attacker.get_attack_by_name("Slam").unwrap();
        assert_eq!(
            "0.700 single, 0.077 crit",
            calculate_hit_probability(
                &attack,
                attacker.calc_accuracy(),
                Character::standard_character(level, true)
                    .creature
                    .calc_defense(&Defense::Armor)
            )
            .short_description(),
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let attacker = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        let attack = attacker.get_attack_by_name("Slam").unwrap();
        assert_eq!(
            "0.800 single, 0.088 crit",
            calculate_hit_probability(
                &attack,
                attacker.calc_accuracy(),
                Character::standard_character(level, true)
                    .creature
                    .calc_defense(&Defense::Armor)
            )
            .short_description(),
        );
    }

    #[test]
    fn standard_character_mirror_match() {
        fn calc_at_level(level: i32) -> String {
            let attacker = Character::standard_character(level, true).creature;
            let attack = attacker
                .get_attack_by_name("Generic Scaling Broadsword")
                .unwrap();
            let defender = Character::standard_character(level, true).creature;
            return calculate_hit_probability(
                &attack,
                attacker.calc_accuracy(),
                defender.calc_defense(&Defense::Armor),
            )
            .short_description();
        }

        assert_eq!(
            [
                "0.600 single, 0.066 crit",
                "0.600 single, 0.066 crit",
                "0.600 single, 0.066 crit"
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
            "1.943",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 3.5 dph * 0.555 hpr = 1.9425 dpr after increasing defender Armor defense",
        );

        attacker.add_special_attack(StandardAttack::DivineJudgment(1).attack());
        assert_eq!(
            "5.000",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 4.5 dph * 1.111 hpr = 6.111 dpr after adding Divine Judgment",
        );
    }

    #[test]
    fn damage_per_round_with_modifier() {
        let mut attacker = Creature::new(1, CreatureCategory::Character);
        let mut defender = Creature::new(1, CreatureCategory::Character);
        attacker.add_special_attack(StandardWeapon::Broadsword.weapon().attack());
        attacker.add_modifier(Modifier::Power(2), None, None);
        assert_eq!(
            "5.889",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 5.5 dph * 1.00 hpr + 3.5 dpc * .111 cpr = 5.5 + 0.389 dpr",
        );
        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "3.342",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 5.5 dph * 0.5 hpr + 3.5 dpc * .055 cpr + 2 dpg * 0.2 gpr = 2.75 + 0.1925 + 0.4 dpr",
        );
    }

    #[test]
    fn standard_character_vs_monster_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "5.173",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn standard_character_vs_monster_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "33.978",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["5.462", "7.594", "10.593", "20.652", "31.536"];
        let actual_combat_results: Vec<f64> = ChallengeRating::all()
            .into_iter()
            .map(|cr| {
                calc_individual_dpr(
                    &Monster::standard_monster(cr, level, None, None).creature,
                    &defender,
                )
            })
            .collect();
        assert_eq!(
            expected_combat_results,
            actual_combat_results
                .iter()
                .map(|d| format!("{:.3}", d))
                .collect::<Vec<String>>(),
            "CR 1/2, CR 1, CR 2, CR 4, CR 6",
        );

        let percentage: Vec<String> = actual_combat_results
            .iter()
            .map(|d| {
                d / (defender.calc_effective_combat_hit_points()
                    + defender.calc_damage_resistance()) as f64
            })
            .map(|p| format!("{:.3}%", p))
            .collect();

        assert_eq!(
            vec!["0.237%", "0.330%", "0.461%", "0.898%", "1.371%"],
            percentage,
            "CR 1/2, CR 1, CR 2, CR 4, CR 6",
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["24.715", "40.041", "61.304", "105.692", "172.923"];
        let actual_combat_results: Vec<f64> = ChallengeRating::all()
            .into_iter()
            .map(|cr| {
                calc_individual_dpr(
                    &Monster::standard_monster(cr, level, None, None).creature,
                    &defender,
                )
            })
            .collect();
        assert_eq!(
            expected_combat_results,
            actual_combat_results
                .iter()
                .map(|d| format!("{:.3}", d))
                .collect::<Vec<String>>(),
            "CR 1/2, CR 1, CR 2, CR 4, CR 6",
        );

        let percentage: Vec<String> = actual_combat_results
            .iter()
            .map(|d| {
                d / (defender.calc_effective_combat_hit_points()
                    + defender.calc_damage_resistance()) as f64
            })
            .map(|p| format!("{:.3}%", p))
            .collect();

        assert_eq!(
            vec!["0.082%", "0.133%", "0.204%", "0.352%", "0.576%"],
            percentage,
            "CR 1/2, CR 1, CR 2, CR 4, CR 6",
        );
    }
}

#[cfg(test)]
mod calc_attack_damage_per_round {
    use crate::core_mechanics::{Attribute, HasAttributes};

    use super::*;

    fn formatted_adpr(attack: &Attack, attacker: &Creature, defender: &Creature) -> String {
        return format!(
            "{:.3}",
            calc_attack_damage_per_round(&attack, &attacker, &defender)
        );
    }

    fn standard_adpr(attacker: &Creature, defender: &Creature) -> Vec<String> {
        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        let generic_strike = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        let mighty_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        return vec![
            formatted_adpr(&certain_strike, &attacker, &defender),
            formatted_adpr(&generic_strike, &attacker, &defender),
            formatted_adpr(&mighty_strike, &attacker, &defender),
        ];
    }

    #[test]
    fn standard_character_level_1_vs_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;
        assert_eq!(7, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["5.173", "4.453", "4.832"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 6.5 dph * 0.7 hpr + 5.5 dpc * 0.077 cpr + 1 dpg * 0.2 gpr = 4.55 + 0.4235 + 0.2
    Generic dpr: 7.5 dph * 0.5 hpr + 5.5 dpc * 0.055 cpr + 2 dpg * 0.2 gpr = 3.75 + 0.3025 + 0.4 gpr
    Mighty Strike dpr: 11.5 dph * 0.3 hpr + 5.5 dpc * 0.033 cpr + 6 dpg * 0.2 gpr = 3.45 + 0.1815 + 1.2"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Certain Broadsword",
            "Certain Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_1_vs_weak_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::One, 1, Some(0), None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(4, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["7.105", "6.884", "8.463"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 6.5 dph * 1.0 hpr + 5.5 dpc * 0.110 cpr = 6.5 + 0.605
    Generic dpr: 7.5 dph * 0.8 hpr + 5.5 dpc * 0.088 cpr + 2 dpg + 0.2 gpr = 6.0 + 0.484 + 0.4
    Mighty Strike dpr: 11.5 dph * 0.6 hpr + 5.5 dpc * 0.066 cpr + 6 dpg + 0.2 gpr = 6.9 + 0.363 + 1.2"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Broadsword",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_10_vs_cr4() {
        let attacker = Character::standard_character(10, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Four, 10, None, None).creature;
        assert_eq!(13, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["12.992", "13.395", "11.997"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 14 dph * 0.8 hpr + 9 dpc * 0.088 cpr + 5 dpg * 0.2 gpr = 11.2 + 0.792 + 1.0
    Generic dpr: 21 dph * 0.5 hpr + 9 dpc * 0.055 cpr + 12 dpg * 0.2 gpr = 10.5 + 0.495 + 2.4
    Mighty Strike dpr: 27 dph * 0.3 hpr + 9 dpc * 0.033 cpr + 18 dpg * 0.2 gpr = 8.1 + 0.297 + 3.6",
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Generic Scaling Broadsword",
            "Generic Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_20_vs_cr4() {
        let attacker = Character::standard_character(20, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Four, 20, None, None).creature;
        assert_eq!(19, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["33.978", "28.968", "24.084"];

        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "Certain Strike, Generic, Mighty Strike"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Certain Broadsword",
            "Certain Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_20_vs_weak_cr1() {
        let attacker = Character::standard_character(20, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::One, 20, Some(0), None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(16, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["38.884", "45.894", "45.810"];

        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "Certain Strike, Generic, Mighty Strike"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Generic Scaling Broadsword",
            "Generic Strike should be the best attack",
        );
    }

    #[cfg(test)]
    mod best_attacks {
        use super::*;

        #[test]
        fn standard_character_vs_cr1_best_attacks() {
            let mut level = 1;
            let mut attacker = Character::standard_character(level, true).creature;
            let mut defender =
                Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Certain Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 1, Certain Strike should be the best attack",
            );

            level = 10;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker
                        .get_attack_by_name("Generic Scaling Broadsword")
                        .unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 10, Generic Strike should be the best attack",
            );

            level = 20;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Certain Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 20, Certain Strike should be the best attack",
            );
        }

        #[test]
        fn standard_character_vs_weak_cr1_best_attacks() {
            let mut level = 1;
            let mut attacker = Character::standard_character(level, true).creature;
            let mut defender =
                Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            defender.set_base_attribute(Attribute::Dexterity, -1);
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Mighty Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 1, Mighty Strike should be the best attack",
            );

            level = 10;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            defender.set_base_attribute(Attribute::Dexterity, -1);
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker
                        .get_attack_by_name("Generic Scaling Broadsword")
                        .unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 10, Generic Strike should be the best attack",
            );

            level = 20;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            defender.set_base_attribute(Attribute::Dexterity, -1);
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker
                        .get_attack_by_name("Generic Scaling Broadsword")
                        .unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 20, Generic Scaling Strike should be the best attack",
            );
        }

        #[test]
        fn standard_character_vs_cr4_best_attacks() {
            let mut level = 1;
            let mut attacker = Character::standard_character(level, true).creature;
            let mut defender =
                Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Certain Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 1, Certain Strike should be the best attack",
            );

            level = 10;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Certain Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 10, Certain Strike should be the best attack",
            );

            level = 20;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Certain Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 20, Certain Strike should be the best attack",
            );
        }
    }
}

#[cfg(test)]
mod calc_rounds_to_live {
    use super::*;

    fn calc_individual_rounds_to_live(attacker: &Creature, defender: &Creature) -> f64 {
        return calc_rounds_to_live(&vec![attacker], &vec![defender]);
    }

    #[test]
    fn standard_barbarian_mirror_match() {
        fn calc_at_level(level: i32) -> f64 {
            let attacker = Character::standard_barbarian(level, true).creature;
            let defender = Character::standard_barbarian(level, true).creature;
            return calc_individual_rounds_to_live(&attacker, &defender);
        }

        assert_eq!(
            [2.5, 2.0, 3.0, 3.25, 3.25],
            [
                calc_at_level(1),
                calc_at_level(5),
                calc_at_level(10),
                calc_at_level(15),
                calc_at_level(20)
            ],
            "levels 1/5/10/15/20",
        );
    }

    #[test]
    fn standard_character_mirror_match() {
        fn calc_at_level(level: i32) -> f64 {
            let attacker = Character::standard_character(level, true).creature;
            let defender = Character::standard_character(level, true).creature;
            return calc_individual_rounds_to_live(&attacker, &defender);
        }

        assert_eq!(
            [4.0, 5.0, 6.5, 7.25, 7.5],
            [
                calc_at_level(1),
                calc_at_level(5),
                calc_at_level(10),
                calc_at_level(15),
                calc_at_level(20)
            ],
            "levels 1/5/10/15/20",
        );
    }

    #[test]
    fn standard_character_vs_sorcerer() {
        fn calc_at_level(level: i32) -> [f64; 2] {
            let attacker = Character::standard_character(level, true).creature;
            let defender = Character::standard_sorcerer(level, true).creature;
            return [
                calc_individual_rounds_to_live(&attacker, &defender),
                calc_individual_rounds_to_live(&defender, &attacker),
            ];
        }

        assert_eq!(
            [
                [2.25, 2.75],
                [3.25, 3.75],
                [3.75, 4.5],
                [4.25, 5.25],
                [4.75, 4.25]
            ],
            [
                calc_at_level(1),
                calc_at_level(5),
                calc_at_level(10),
                calc_at_level(15),
                calc_at_level(20)
            ],
            "levels 1/5/10/15/20",
        );
    }

    #[test]
    fn standard_sorcerer_mirror_match() {
        fn calc_at_level(level: i32) -> f64 {
            let attacker = Character::standard_sorcerer(level, true).creature;
            let defender = Character::standard_sorcerer(level, true).creature;
            return calc_individual_rounds_to_live(&attacker, &defender);
        }

        assert_eq!(
            [1.5, 2.75, 2.5, 3.25, 3.0],
            [
                calc_at_level(1),
                calc_at_level(5),
                calc_at_level(10),
                calc_at_level(15),
                calc_at_level(20)
            ],
            "levels 1/5/10/15/20",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;

        let expected_results = vec![3.25, 8.25, 13.75, 24.5];

        let mut actual_results = vec![];
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        actual_results.push(calc_individual_rounds_to_live(&attacker, &defender));
        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        actual_results.push(calc_individual_rounds_to_live(&attacker, &defender));

        assert_eq!(expected_results, actual_results, "CR 1, CR 4",);
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;

        let expected_results = vec![5.0, 12.75, 21.5, 36.25];

        let mut actual_results = vec![];
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        actual_results.push(calc_individual_rounds_to_live(&attacker, &defender));
        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        actual_results.push(calc_individual_rounds_to_live(&attacker, &defender));

        assert_eq!(expected_results, actual_results, "CR 1, CR 4",);
    }
}

#[cfg(test)]
mod run_combat {
    use super::*;

    #[cfg(test)]
    mod difficult_encounters {
        use super::*;

        #[test]
        fn sword_and_board_vs_greataxe() {
            let expected_combat_results = vec![
                "Rounds  7.00/B 2.75/R 3.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
                "Rounds  7.50/B 2.75/R 3.00 Blue 0 ( 0.00%) Red 1 ( 0.00%)",
                "Rounds  9.50/B 3.75/R 3.75 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
                "Rounds 11.00/B 4.00/R 4.25 Blue 0 ( 0.00%) Red 1 ( 0.00%)",
                "Rounds 11.75/B 4.75/R 5.00 Blue 0 ( 0.00%) Red 1 ( 0.05%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 5, 10, 15, 20]
                .into_iter()
                .map(|level| {
                    let attackers = vec![
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                    ];

                    let mut defenders = vec![
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                        Character::standard_character(level, true).creature,
                    ];

                    for defender in &mut defenders {
                        defender.remove_armor(Armor::StandardShield);
                        // Replace existing weapons with a greataxe
                        defender.weapons.retain(|_| false);
                        defender.weapons.push(StandardWeapon::Greataxe.weapon());
                    }

                    run_combat(attackers.clone(), defenders.clone()).to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }

        #[test]
        fn party_vs_difficult_encounter_level_1() {
            let level = 1;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds  2.75/B 5.50/R 1.75 Blue 0 ( 0.00%) Red 8 ( 0.69%)",
                "Rounds  3.50/B 4.75/R 2.25 Blue 0 ( 0.00%) Red 4 ( 0.53%)",
                "Rounds  4.75/B 6.25/R 3.25 Blue 0 ( 0.00%) Red 2 ( 0.52%)",
                "Rounds  4.00/B 5.50/R 3.25 Blue 0 ( 0.00%) Red 2 ( 0.54%)",
                "Rounds  4.00/B 6.25/R 3.25 Blue 0 ( 0.00%) Red 1 ( 0.56%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::difficult_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }

        #[test]
        fn party_vs_difficult_encounter_level_10() {
            let level = 10;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds 11.25/B 5.25/R 3.75 Blue 1 ( 0.02%) Red 0 ( 0.00%)",
                "Rounds 11.75/B 6.25/R 4.75 Blue 0 ( 0.00%) Red 1 ( 0.08%)",
                "Rounds 13.75/B 7.75/R 6.25 Blue 0 ( 0.00%) Red 1 ( 0.04%)",
                "Rounds 12.00/B 7.25/R 6.50 Blue 0 ( 0.00%) Red 1 ( 0.12%)",
                "Rounds  8.00/B 8.25/R 5.50 Blue 0 ( 0.00%) Red 1 ( 0.38%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::difficult_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }

        #[test]
        fn party_vs_difficult_encounter_level_20() {
            let level = 20;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds 12.25/B 6.75/R 4.50 Blue 0 ( 0.00%) Red 2 ( 0.13%)",
                "Rounds 12.50/B 7.50/R 5.25 Blue 0 ( 0.00%) Red 1 ( 0.12%)",
                "Rounds 13.50/B 9.50/R 6.75 Blue 0 ( 0.00%) Red 1 ( 0.22%)",
                "Rounds 15.25/B 8.50/R 7.25 Blue 0 ( 0.00%) Red 1 ( 0.02%)",
                "Rounds 10.00/B 9.25/R 7.00 Blue 0 ( 0.00%) Red 1 ( 0.31%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::difficult_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }
    }

    #[cfg(test)]
    mod standard_encounters {
        use super::*;
        #[test]
        fn party_vs_standard_encounter_level_1() {
            let level = 1;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds  4.75/B 3.50/R 2.75 Blue 0 ( 0.00%) Red 2 ( 0.29%)",
                "Rounds  7.00/B 3.25/R 3.25 Blue 1 ( 0.02%) Red 0 ( 0.00%)",
                "Rounds  5.75/B 4.25/R 4.75 Blue 2 ( 0.25%) Red 0 ( 0.00%)",
                "Rounds  4.25/B 3.50/R 4.75 Blue 2 ( 0.25%) Red 0 ( 0.00%)",
                "Rounds  4.00/B 6.25/R 3.25 Blue 0 ( 0.00%) Red 1 ( 0.56%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::standard_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }

        #[test]
        fn party_vs_standard_encounter_level_10() {
            let level = 10;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds  4.00/B 3.50/R 6.00 Blue 3 ( 0.69%) Red 0 ( 0.00%)",
                "Rounds  5.25/B 4.25/R 7.25 Blue 3 ( 0.60%) Red 0 ( 0.00%)",
                "Rounds  6.25/B 5.25/R 9.50 Blue 3 ( 0.57%) Red 0 ( 0.00%)",
                "Rounds  5.50/B 4.75/R 9.75 Blue 3 ( 0.50%) Red 0 ( 0.00%)",
                "Rounds  8.00/B 8.25/R 5.50 Blue 0 ( 0.00%) Red 1 ( 0.38%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::standard_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }

        #[test]
        fn party_vs_standard_encounter_level_20() {
            let level = 20;
            let attackers = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];

            let expected_combat_results = vec![
                "Rounds  6.00/B 4.50/R 7.00 Blue 3 ( 0.60%) Red 0 ( 0.00%)",
                "Rounds  5.75/B 5.00/R 7.75 Blue 3 ( 0.62%) Red 0 ( 0.00%)",
                "Rounds  7.50/B 6.50/R10.00 Blue 3 ( 0.53%) Red 0 ( 0.00%)",
                "Rounds  6.00/B 5.50/R11.50 Blue 3 ( 0.55%) Red 0 ( 0.00%)",
                "Rounds 10.00/B 9.25/R 7.00 Blue 0 ( 0.00%) Red 1 ( 0.31%)",
            ];
            let actual_combat_results: Vec<String> = vec![1, 2, 4, 8]
                .iter()
                .map(|count| {
                    run_combat(
                        attackers.clone(),
                        ChallengeRating::standard_encounter(level, *count),
                    )
                    .to_string()
                })
                .collect();
            assert_eq!(expected_combat_results, actual_combat_results);
        }
    }

    #[test]
    fn standard_character_mirror_match() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Character::standard_character(1, true).creature;
        assert_eq!(
            "Rounds  4.25/B 4.00/R 4.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 1",
        );

        let attacker = Character::standard_character(20, true).creature;
        let defender = Character::standard_character(20, true).creature;
        assert_eq!(
            "Rounds  8.25/B 7.50/R 7.50 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 20",
        );
    }

    #[test]
    fn standard_barbarian_mirror_match() {
        let attacker = Character::standard_barbarian(1, true).creature;
        let defender = Character::standard_barbarian(1, true).creature;
        assert_eq!(
            "Rounds  2.75/B 2.50/R 2.50 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 1",
        );

        let attacker = Character::standard_barbarian(20, true).creature;
        let defender = Character::standard_barbarian(20, true).creature;
        assert_eq!(
            "Rounds  4.00/B 3.25/R 3.25 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 20",
        );
    }
}
