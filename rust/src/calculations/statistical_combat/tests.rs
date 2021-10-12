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
            "Should be 4.5 dph * 1.111 hit % = 5 dpr",
        );

        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "2.498",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 4.5 dph * 0.555 hit % = 2.498 dpr after increasing defender Armor defense",
        );

        attacker.add_special_attack(StandardAttack::DivineJudgment(1).attack());
        assert_eq!(
            "6.111",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 5.5 dph * 1.111 hit % = 6.111 dpr after adding Divine Judgment",
        );
    }

    #[test]
    fn damage_per_round_with_modifier() {
        let mut attacker = Creature::new(1, CreatureCategory::Character);
        let mut defender = Creature::new(1, CreatureCategory::Character);
        attacker.add_special_attack(StandardWeapon::Broadsword.weapon().attack());
        attacker.add_modifier(Modifier::MundanePower(2), None, None);
        assert_eq!(
            "7.000",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 6.5 dph * 1.00 hit % + 4.5 dpc * .111 crit % = 6.9995 dpr",
        );
        defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
        assert_eq!(
            "3.498",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
            "Should be 6.5 dph * 0.5 hit % + 4.5 dpc * .055 crit % = 3.4975 dpr",
        );
    }

    #[test]
    fn standard_character_vs_monster_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "3.498",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn standard_character_vs_monster_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "27.689",
            format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        );
    }

    #[test]
    fn monster_vs_standard_character_level_1() {
        let level = 1;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["2.442", "4.553", "7.495", "11.242", "21.540"];
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
            "as raw damage per round",
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
            vec!["0.081%", "0.152%", "0.250%", "0.375%", "0.718%"],
            percentage,
            "as % of total damage absorption"
        );
    }

    #[test]
    fn monster_vs_standard_character_level_20() {
        let level = 20;
        let defender = Character::standard_character(level, true).creature;

        let expected_combat_results = vec!["25.252", "44.191", "63.117", "97.826", "151.486"];
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
            "as raw damage per round",
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
            vec!["0.088%", "0.154%", "0.220%", "0.341%", "0.528%"],
            percentage,
            "as % of total damage absorption"
        );
    }
}

#[cfg(test)]
mod calc_attack_damage_per_round {
    use crate::core_mechanics::{Attribute, HasAttributes};

    use super::*;

    #[test]
    fn standard_character_level_1_vs_self() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Character::standard_character(1, true).creature;
        assert_eq!(7, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "3.342",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 0.7 hit % + 2.5 dpc * 0.077 crit % = 3.15 + 0.1925 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "3.498",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.5 hit % + 4.5 dpc * 0.055 crit % = 3.4975 dpr",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "2.931",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike: 9 dph * 0.3 hit % + 7 dpc * 0.033 crit % = 2.7 + .231 dpr",
        );

        assert_eq!(
            calc_attack_damage_per_round(&generic, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Generic should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_1_vs_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 1, None, None).creature;
        assert_eq!(7, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "3.342",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 0.7 hit % + 2.5 dpc * 0.077 crit % = 3.15 + 0.1925 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "3.498",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.5 hit % + 4.5 dpc * 0.055 crit % = 3.4975 dpr",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "2.931",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike: 9 dph * 0.3 hit % + 7 dpc * 0.033 crit % = 2.7 + .231 dpr",
        );

        assert_eq!(
            calc_attack_damage_per_round(&generic, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Generic should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_1_vs_weak_monster() {
        let attacker = Character::standard_character(1, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::Two, 1, Some(0), None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(4, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "4.775",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 1.0 hit % + 2.5 dpc * 0.110 crit % = 4.5 + 0.275 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "5.596",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.8 hit % + 4.5 dpc * 0.088 crit % = 5.2 + 0.396 dpr",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "5.862",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike: 9 dph * 0.6 hit % + 7 dpc * 0.066 crit % = 5.4 + 0.462 dpr",
        );

        assert_eq!(
            calc_attack_damage_per_round(&power_strike, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_10_vs_cr2() {
        let attacker = Character::standard_character(10, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 10, None, None).creature;
        assert_eq!(13, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "12.546",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 13.5 dph * 0.8 hit % + 4.5 dpc * 0.088 crit % + 6.75 dpg * 0.2 glance % = 10.8 + 0.396 + 1.35 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "11.295",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 18 dph * 0.5 hit % + 9 dpc * 0.055 crit % + 9 dpg * 0.2 glance % = 9 + 0.495 + 1.8 dpr",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "9.662",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike: 23 dph * 0.3 hit % + 14 dpc * 0.033 crit % + 11.5 dpg * 0.2 glance % = 6.9 + 0.462 + 2.3 dpr",
        );

        assert_eq!(
            calc_attack_damage_per_round(&certain_strike, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Certain Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_20_vs_cr2() {
        let attacker = Character::standard_character(20, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 20, None, None).creature;
        assert_eq!(19, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "27.689",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "26.452",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "19.268",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike",
        );

        assert_eq!(
            calc_attack_damage_per_round(&certain_strike, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
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

        let certain_strike = attacker.get_attack_by_name("Certain Broadsword").unwrap();
        assert_eq!(
            "30.442",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike",
        );

        let generic = attacker
            .get_attack_by_name("Generic Scaling Broadsword")
            .unwrap();
        assert_eq!(
            "42.541",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic",
        );

        let power_strike = attacker.get_attack_by_name("Mighty Broadsword").unwrap();
        assert_eq!(
            "39.020",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Mighty Strike",
        );

        assert_eq!(
            calc_attack_damage_per_round(&generic, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Generic should be the best attack",
        );
    }
}

#[cfg(test)]
mod calc_rounds_to_live {
    use super::*;

    #[test]
    fn standard_character_mirror_match() {
        let attacker = Character::standard_character(1, true).creature;
        let defender = Character::standard_character(1, true).creature;

        assert_eq!(
            9.0,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "at level 1",
        );

        let attacker = Character::standard_character(20, true).creature;
        let defender = Character::standard_character(20, true).creature;
        assert_eq!(
            9.25,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "at level 20",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;

        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            5.5,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 1",
        );

        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        assert_eq!(
            10.75,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 2",
        );

        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            29.0,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 4",
        );

        let defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
        assert_eq!(
            54.25,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 6",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;

        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            5.5,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 1",
        );

        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        assert_eq!(
            11.0,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 2",
        );

        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            26.5,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 4",
        );

        let defender = Monster::standard_monster(ChallengeRating::Six, level, None, None).creature;
        assert_eq!(
            46.75,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 6",
        );
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
            "Rounds  9.50 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 1",
        );

        let attacker = Character::standard_character(20, true).creature;
        let defender = Character::standard_character(20, true).creature;
        assert_eq!(
            "Rounds 10.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
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
            "Rounds  5.25 Blue 3 ( 0.61%) Red 0 ( 0.00%)",
            "Rounds  7.75 Blue 2 ( 0.39%) Red 0 ( 0.00%)",
            "Rounds  6.50 Blue 3 ( 0.50%) Red 0 ( 0.00%)",
            "Rounds  9.50 Blue 2 ( 0.25%) Red 0 ( 0.00%)",
            "Rounds  7.00 Blue 0 ( 0.00%) Red 1 ( 0.64%)",
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
            "Rounds  3.75 Blue 3 ( 0.73%) Red 0 ( 0.00%)",
            "Rounds  7.00 Blue 2 ( 0.49%) Red 0 ( 0.00%)",
            "Rounds  6.25 Blue 3 ( 0.58%) Red 0 ( 0.00%)",
            "Rounds  7.75 Blue 2 ( 0.48%) Red 0 ( 0.00%)",
            "Rounds 11.00 Blue 0 ( 0.00%) Red 1 ( 0.40%)",
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
            "Rounds 10.00 Blue 0 ( 0.00%) Red 2 ( 0.17%)",
            "Rounds  7.50 Blue 0 ( 0.00%) Red 3 ( 0.46%)",
            "Rounds  8.50 Blue 0 ( 0.00%) Red 2 ( 0.36%)",
            "Rounds  8.00 Blue 0 ( 0.00%) Red 2 ( 0.47%)",
            "Rounds  7.00 Blue 0 ( 0.00%) Red 1 ( 0.64%)",
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
            "Rounds  8.00 Blue 2 ( 0.34%) Red 0 ( 0.00%)",
            "Rounds 10.00 Blue 0 ( 0.00%) Red 2 ( 0.32%)",
            "Rounds 14.75 Blue 0 ( 0.00%) Red 1 ( 0.04%)",
            "Rounds 11.25 Blue 0 ( 0.00%) Red 1 ( 0.26%)",
            "Rounds 11.00 Blue 0 ( 0.00%) Red 1 ( 0.40%)",
        ];
        let actual_combat_results: Vec<String> = ChallengeRating::all()
            .iter()
            .map(|cr| run_combat(attackers.clone(), cr.difficult_encounter(level)).to_string())
            .collect();
        assert_eq!(expected_combat_results, actual_combat_results);
    }
}
