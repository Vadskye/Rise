use super::*;
use crate::core_mechanics::Defense;
use crate::creatures::{
    Character, Creature, CreatureCategory, HasModifiers, Modifier, Monster, StandardAttack,
};
use crate::equipment::StandardWeapon;
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
            "0.500 single, 0.055 crit",
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
            "0.400 single, 0.044 crit",
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
        let attacker = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        let attack = attacker.get_attack_by_name("Generic Scaling Slam").unwrap();
        assert_eq!(
            "0.500 single, 0.055 crit",
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
        let attacker = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        let attack = attacker.get_attack_by_name("Generic Scaling Slam").unwrap();
        assert_eq!(
            "0.600 single, 0.066 crit",
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
                "0.500 single, 0.055 crit",
                "0.500 single, 0.055 crit",
                "0.500 single, 0.055 crit"
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
            "5.000",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 4.5 dph * 1.111 hpr = 5 dpr",
        );

        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "2.498",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 4.5 dph * 0.555 hpr = 2.498 dpr after increasing defender Armor defense",
        );

        attacker.add_special_attack(StandardAttack::DivineJudgment(1).attack());
        assert_eq!(
            "6.111",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 5.5 dph * 1.111 hpr = 6.111 dpr after adding Divine Judgment",
        );
    }

    #[test]
    fn damage_per_round_with_modifier() {
        let mut attacker = Creature::new(1, CreatureCategory::Character);
        let mut defender = Creature::new(1, CreatureCategory::Character);
        attacker.add_special_attack(StandardWeapon::Broadsword.weapon().attack());
        attacker.add_modifier(Modifier::Power(2), None, None);
        assert_eq!(
            "7.000",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 6.5 dph * 1.00 hpr + 4.5 dpc * .111 cpr = 6.9995 dpr",
        );
        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "3.897",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 6.5 dph * 0.5 hpr + 4.5 dpc * .055 cpr + 2 dpg * 0.2 gpr = 3.8975 dpr",
        );
    }

    #[test]
    fn standard_character_vs_monster_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "4.498",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn standard_character_vs_monster_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "25.982",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["3.897", "5.152", "7.385", "12.742", "19.210"];
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
            vec!["0.144%", "0.191%", "0.274%", "0.472%", "0.711%"],
            percentage,
            "CR 1/2, CR 1, CR 2, CR 4, CR 6",
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["29.588", "37.852", "53.515", "89.367", "126.482"];
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
            vec!["0.103%", "0.132%", "0.186%", "0.311%", "0.441%"],
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
    fn standard_character_level_1_vs_self() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Character::standard_character(1, true).creature;
        assert_eq!(7, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["4.396", "3.897", "4.498"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 5.5 dph * 0.7 hpr + 4.5 dpc * 0.077 cpr + 1 dpg * 0.2 gpr = 3.85 + 0.3465 + 0.2
    Generic dpr: 6.5 dph * 0.5 hpr + 4.5 dpc * 0.055 cpr + 2 dpg + 0.2 gpr = 3.25 + 0.2475 + 0.4
    Mighty Strike dpr: 10.5 dph * 0.3 hpr + 4.5 dpc * 0.033 cpr + 6 dpg + 0.2 gpr = 3.15 + .1485 + 1.2",
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Broadsword",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_1_vs_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 1, None, None).creature;
        assert_eq!(7, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["4.396", "3.897", "4.498"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 5.5 dph * 0.7 hpr + 4.5 dpc * 0.077 cpr + 1 dpg * 0.2 gpr = 3.85 + 0.3465 + 0.2
    Generic dpr: 6.5 dph * 0.5 hpr + 4.5 dpc * 0.055 cpr + 2 dpg * 0.2 gpr = 3.25 + 0.2475 + 0.4 gpr
    Mighty Strike dpr: 10.5 dph * 0.3 hpr + 4.5 dpc * 0.033 cpr + 6 dpg * 0.2 gpr = 3.15 + 0.1485 + 1.2"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Broadsword",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_1_vs_weak_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::Two, 1, Some(0), None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(4, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["5.995", "5.996", "7.797"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike gpr: 5.5 dph * 1.0 hpr + 4.5 dpc * 0.110 cpr = 5.5 + 0.495
    Generic dpr: 6.5 dph * 0.8 hpr + 4.5 dpc * 0.088 cpr + 2 dpg + 0.2 gpr = 5.2 + 0.396 + 0.4
    Mighty Strike dpr: 10.5 dph * 0.6 hpr + 4.5 dpc * 0.066 cpr + 6 dpg + 0.2 gpr = 6.3 + 0.297 + 1.2"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Broadsword",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_10_vs_cr2() {
        let attacker = Character::standard_character(10, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 10, None, None).creature;
        assert_eq!(13, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["10.216", "11.585", "10.831"];
        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "
    Certain Strike dpr: 11 dph * 0.8 hpr + 7 dpc * 0.088 cpr + 4 dpg * 0.2 gpr = 8.8 + 0.616 + 0.8
    Generic dpr: 18 dph * 0.5 hpr + 7 dpc * 0.055 cpr + 11 dpg * 0.2 gpr = 9 + 0.385 + 2.2
    Mighty Strike dpr: 24 dph * 0.3 hpr + 7 dpc * 0.033 cpr + 17 dpg * 0.2 gpr = 7.2 + 0.231 + 3.4",
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Generic Scaling Broadsword",
            "Generic Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_20_vs_cr2() {
        let attacker = Character::standard_character(20, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 20, None, None).creature;
        assert_eq!(19, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec!["25.982", "22.992", "20.396"];

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

        let expected_strike_results = vec!["29.996", "36.486", "38.690"];

        assert_eq!(
            expected_strike_results,
            standard_adpr(&attacker, &defender),
            "Certain Strike, Generic, Mighty Strike"
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Broadsword",
            "Mighty Strike should be the best attack",
        );
    }

    #[cfg(test)]
    mod best_attacks {
        use super::*;

        #[test]
        fn standard_character_vs_cr2_best_attacks() {
            let mut level = 1;
            let mut attacker = Character::standard_character(level, true).creature;
            let mut defender =
                Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
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
            defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
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
            defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
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
                    &attacker.get_attack_by_name("Mighty Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 10, Mighty Strike should be the best attack",
            );

            level = 20;
            attacker = Character::standard_character(level, true).creature;
            defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
            defender.set_base_attribute(Attribute::Dexterity, -1);
            assert_eq!(
                calc_attack_damage_per_round(
                    &attacker.get_attack_by_name("Mighty Broadsword").unwrap(),
                    &attacker,
                    &defender
                ),
                calc_individual_dpr(&attacker, &defender),
                "At level 20, Mighty Strike should be the best attack",
            );
        }

        #[test]
        fn standard_character_vs_cr6_best_attacks() {
            let mut level = 1;
            let mut attacker = Character::standard_character(level, true).creature;
            let mut defender =
                Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
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
            defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
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
            defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
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

    #[test]
    fn standard_barbarian_mirror_match() {
        fn calc_at_level(level: i32) -> f64 {
            let attacker = Character::standard_barbarian(level, true).creature;
            let defender = Character::standard_barbarian(level, true).creature;
            return calc_rounds_to_live(&vec![&attacker], &defender);
        }

        assert_eq!(
            [3.0, 3.0, 3.25, 4.0, 4.0],
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
            return calc_rounds_to_live(&vec![&attacker], &defender);
        }

        assert_eq!(
            [5.75, 7.5, 9.0, 10.25, 10.5],
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
                calc_rounds_to_live(&vec![&attacker], &defender),
                calc_rounds_to_live(&vec![&defender], &attacker),
            ];
        }

        assert_eq!(
            [
                [3.5, 3.25],
                [4.5, 4.75],
                [5.25, 5.25],
                [6.0, 6.5],
                [6.75, 5.5]
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
            return calc_rounds_to_live(&vec![&attacker], &defender);
        }

        assert_eq!(
            [2.0, 3.25, 3.25, 4.25, 3.75],
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

        let expected_results = vec![3.5, 7.0, 16.0, 29.25];

        let mut actual_results = vec![];
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));

        assert_eq!(expected_results, actual_results, "CR 1, CR 2, CR 4, CR 6",);
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;

        let expected_results = vec![5.25, 11.5, 24.5, 43.0];

        let mut actual_results = vec![];
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));
        let defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
        actual_results.push(calc_rounds_to_live(&vec![&attacker], &defender));

        assert_eq!(expected_results, actual_results, "CR 1, CR 2, CR 4, CR 6",);
    }
}

#[cfg(test)]
mod run_combat {
    use super::*;

    #[test]
    fn standard_character_mirror_match() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Character::standard_character(1, true).creature;
        assert_eq!(
            "Rounds  5.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 1",
        );

        let attacker = Character::standard_character(20, true).creature;
        let defender = Character::standard_character(20, true).creature;
        assert_eq!(
            "Rounds  9.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 20",
        );
    }

    #[test]
    fn standard_barbarian_mirror_match() {
        let attacker = Character::standard_barbarian(1, true).creature;
        let defender = Character::standard_barbarian(1, true).creature;
        assert_eq!(
            "Rounds  2.75 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 1",
        );

        let attacker = Character::standard_barbarian(20, true).creature;
        let defender = Character::standard_barbarian(20, true).creature;
        assert_eq!(
            "Rounds  4.50 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 20",
        );
    }

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
            "Rounds  6.25 Blue 2 ( 0.25%) Red 0 ( 0.00%)",
            "Rounds  6.00 Blue 2 ( 0.41%) Red 0 ( 0.00%)",
            "Rounds  5.00 Blue 3 ( 0.50%) Red 0 ( 0.00%)",
            "Rounds  6.50 Blue 1 ( 0.02%) Red 0 ( 0.00%)",
            "Rounds  5.00 Blue 0 ( 0.00%) Red 1 ( 0.57%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.standard_encounter(level)).to_string())
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
            "Rounds  5.25 Blue 3 ( 0.61%) Red 0 ( 0.00%)",
            "Rounds  7.00 Blue 3 ( 0.61%) Red 0 ( 0.00%)",
            "Rounds  7.00 Blue 3 ( 0.57%) Red 0 ( 0.00%)",
            "Rounds  7.25 Blue 2 ( 0.43%) Red 0 ( 0.00%)",
            "Rounds  9.00 Blue 0 ( 0.00%) Red 1 ( 0.45%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.standard_encounter(level)).to_string())
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
            "Rounds  6.00 Blue 3 ( 0.66%) Red 0 ( 0.00%)",
            "Rounds  8.25 Blue 3 ( 0.59%) Red 0 ( 0.00%)",
            "Rounds  8.00 Blue 3 ( 0.57%) Red 0 ( 0.00%)",
            "Rounds  7.75 Blue 2 ( 0.48%) Red 0 ( 0.00%)",
            "Rounds 11.00 Blue 0 ( 0.00%) Red 1 ( 0.39%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.standard_encounter(level)).to_string())
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
            "Rounds  3.50 Blue 0 ( 0.00%) Red 8 ( 0.67%)",
            "Rounds  6.25 Blue 0 ( 0.00%) Red 3 ( 0.45%)",
            "Rounds  6.50 Blue 0 ( 0.00%) Red 2 ( 0.40%)",
            "Rounds  5.00 Blue 0 ( 0.00%) Red 2 ( 0.50%)",
            "Rounds  5.00 Blue 0 ( 0.00%) Red 1 ( 0.57%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.difficult_encounter(level)).to_string())
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
            "Rounds 10.50 Blue 0 ( 0.00%) Red 2 ( 0.18%)",
            "Rounds 14.25 Blue 0 ( 0.00%) Red 1 ( 0.15%)",
            "Rounds 15.50 Blue 0 ( 0.00%) Red 1 ( 0.04%)",
            "Rounds 10.00 Blue 0 ( 0.00%) Red 1 ( 0.33%)",
            "Rounds  9.00 Blue 0 ( 0.00%) Red 1 ( 0.45%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.difficult_encounter(level)).to_string())
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
            "Rounds 16.25 Blue 1 ( 0.02%) Red 0 ( 0.00%)",
            "Rounds 14.25 Blue 0 ( 0.00%) Red 2 ( 0.26%)",
            "Rounds 16.50 Blue 0 ( 0.00%) Red 1 ( 0.16%)",
            "Rounds 11.50 Blue 0 ( 0.00%) Red 1 ( 0.32%)",
            "Rounds 11.00 Blue 0 ( 0.00%) Red 1 ( 0.39%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.difficult_encounter(level)).to_string())
            .collect();
        assert_eq!(expected_combat_results, actual_combat_results);
    }
}
