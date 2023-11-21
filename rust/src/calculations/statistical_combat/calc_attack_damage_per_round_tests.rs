use super::*;
use crate::core_mechanics::Defense;
use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Character, Monster};
use crate::monsters::ChallengeRating;

#[cfg(test)]
mod perception_greataxe {
    use super::*;

    #[test]
    fn level_1_vs_monster() {
        let attacker = Character::perception_greataxe(1).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;
        assert_eq!(
            vec![
                "Certain Greataxe +5 (2d6+1 slashing damage.)",
                "Generic Scaling Greataxe +2 (2d6+4 slashing damage.)",
                "Mighty Greataxe +1 (12+2 slashing damage.)",
                "Greataxe +2 (2d6+2 slashing damage.)"
            ],
            attacker.explain_attacks(),
        );

        assert_eq!(6, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec![
            "8.77 = (8.0 dph * 1.00 hpr) + (7.0 dpc * 0.11 cpr) + (1.0 dpg * 0.00 gpr) = 8.00 hdpr + 0.77 cdpr + 0.00 gdpr",
            "9.04 = (11.0 dph * 0.70 hpr) + (7.0 dpc * 0.08 cpr) + (4.0 dpg * 0.20 gpr) = 7.70 hdpr + 0.54 cdpr + 0.80 gdpr",
            "9.59 = (14.0 dph * 0.60 hpr) + (12.0 dpc * 0.07 cpr) + (2.0 dpg * 0.20 gpr) = 8.40 hdpr + 0.79 cdpr + 0.40 gdpr",
            "7.24 = (9.0 dph * 0.70 hpr) + (7.0 dpc * 0.08 cpr) + (2.0 dpg * 0.20 gpr) = 6.30 hdpr + 0.54 cdpr + 0.40 gdpr",
        ];
        assert_eq!(
            expected_strike_results,
            explain_standard_adpr(&attacker, &defender),
            "Strikes should have expected results",
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Greataxe",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn level_10_vs_monster() {
        let attacker = Character::perception_greataxe(10).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, 10, None, None).creature;
        assert_eq!(12, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec![
            "19.55 = (18.0 dph * 1.00 hpr) + (14.0 dpc * 0.11 cpr) + (4.0 dpg * 0.00 gpr) = 18.00 hdpr + 1.55 cdpr + 0.00 gdpr",
            "25.43 = (27.0 dph * 0.80 hpr) + (14.0 dpc * 0.09 cpr) + (13.0 dpg * 0.20 gpr) = 21.60 hdpr + 1.23 cdpr + 2.60 gdpr",
            "26.75 = (33.0 dph * 0.70 hpr) + (24.0 dpc * 0.08 cpr) + (9.0 dpg * 0.20 gpr) = 23.10 hdpr + 1.85 cdpr + 1.80 gdpr",
            "21.43 = (23.0 dph * 0.80 hpr) + (14.0 dpc * 0.09 cpr) + (9.0 dpg * 0.20 gpr) = 18.40 hdpr + 1.23 cdpr + 1.80 gdpr",
        ];
        assert_eq!(
            expected_strike_results,
            explain_standard_adpr(&attacker, &defender),
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Greataxe",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn level_10_vs_elite() {
        let attacker = Character::perception_greataxe(10).creature;
        let defender = Monster::standard_monster(ChallengeRating::Four, 10, None, None).creature;
        assert_eq!(14, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec![
            "17.99 = (18.0 dph * 0.90 hpr) + (14.0 dpc * 0.10 cpr) + (4.0 dpg * 0.10 gpr) = 16.20 hdpr + 1.39 cdpr + 0.40 gdpr",
            "19.72 = (27.0 dph * 0.60 hpr) + (14.0 dpc * 0.07 cpr) + (13.0 dpg * 0.20 gpr) = 16.20 hdpr + 0.92 cdpr + 2.60 gdpr",
            "19.62 = (33.0 dph * 0.50 hpr) + (24.0 dpc * 0.06 cpr) + (9.0 dpg * 0.20 gpr) = 16.50 hdpr + 1.32 cdpr + 1.80 gdpr",
            "16.52 = (23.0 dph * 0.60 hpr) + (14.0 dpc * 0.07 cpr) + (9.0 dpg * 0.20 gpr) = 13.80 hdpr + 0.92 cdpr + 1.80 gdpr",
        ];
        assert_eq!(
            expected_strike_results,
            explain_standard_adpr(&attacker, &defender),
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Generic Scaling Greataxe",
            "Generic Strike should be the best attack",
        );
    }

    #[test]
    fn level_20_vs_monster() {
        let attacker = Character::perception_greataxe(20).creature;
        let defender = Monster::standard_monster(ChallengeRating::One, 20, None, None).creature;
        assert_eq!(18, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec![
            "61.05 = (52.5 dph * 1.00 hpr) + (38.5 dpc * 0.22 cpr) + (14.0 dpg * 0.00 gpr) = 52.50 hdpr + 8.55 cdpr + 0.00 gdpr",
            "83.46 = (83.5 dph * 0.90 hpr) + (38.5 dpc * 0.10 cpr) + (45.0 dpg * 0.10 gpr) = 75.15 hdpr + 3.81 cdpr + 4.50 gdpr",
            "91.16 = (99.0 dph * 0.80 hpr) + (70.0 dpc * 0.09 cpr) + (29.0 dpg * 0.20 gpr) = 79.20 hdpr + 6.16 cdpr + 5.80 gdpr",
            "67.46 = (67.5 dph * 0.90 hpr) + (38.5 dpc * 0.10 cpr) + (29.0 dpg * 0.10 gpr) = 60.75 hdpr + 3.81 cdpr + 2.90 gdpr",
        ];
        assert_eq!(
            expected_strike_results,
            explain_standard_adpr(&attacker, &defender),
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Mighty Greataxe",
            "Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn level_20_vs_elite() {
        let attacker = Character::perception_greataxe(20).creature;
        let defender = Monster::standard_monster(ChallengeRating::Four, 20, None, None).creature;
        assert_eq!(20, defender.calc_defense(&Defense::Armor));

        let expected_strike_results = vec![
            "56.73 = (52.5 dph * 1.00 hpr) + (38.5 dpc * 0.11 cpr) + (14.0 dpg * 0.00 gpr) = 52.50 hdpr + 4.24 cdpr + 0.00 gdpr",
            "70.41 = (83.5 dph * 0.70 hpr) + (38.5 dpc * 0.08 cpr) + (45.0 dpg * 0.20 gpr) = 58.45 hdpr + 2.96 cdpr + 9.00 gdpr",
            "69.82 = (99.0 dph * 0.60 hpr) + (70.0 dpc * 0.07 cpr) + (29.0 dpg * 0.20 gpr) = 59.40 hdpr + 4.62 cdpr + 5.80 gdpr",
            "56.01 = (67.5 dph * 0.70 hpr) + (38.5 dpc * 0.08 cpr) + (29.0 dpg * 0.20 gpr) = 47.25 hdpr + 2.96 cdpr + 5.80 gdpr",
        ];
        assert_eq!(
            expected_strike_results,
            explain_standard_adpr(&attacker, &defender),
        );

        assert_eq!(
            find_best_attack(&attacker, &defender).unwrap().name,
            "Generic Scaling Greataxe",
            "Generic Strike should be the best attack",
        );
    }
}

#[cfg(test)]
mod best_attacks {
    use super::*;

    #[test]
    fn standard_character_vs_monster() {
        let mut level = 1;
        let mut attacker = Character::standard_character(level, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 1, Generic Scaling Strike should be the best attack",
        );

        level = 10;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 10, Generic Strike should be the best attack",
        );

        level = 20;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 20, Generic Scaling Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_vs_weak_monster() {
        let mut level = 1;
        let mut attacker = Character::standard_character(level, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 1, Generic Scaling Strike should be the best attack",
        );

        level = 10;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker.get_attack_by_name("Mighty Battleaxe").unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 10, Mighty Strike should be the best attack",
        );

        level = 20;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        defender.set_base_attribute(Attribute::Dexterity, -1);
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker.get_attack_by_name("Mighty Battleaxe").unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 20, Mighty Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_vs_elite() {
        let mut level = 1;
        let mut attacker = Character::standard_character(level, true).creature;
        let mut defender =
            Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 1, Generic Scaling Battleaxe should be the best attack",
        );

        level = 10;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 10, Generic Scaling Strike should be the best attack",
        );

        level = 20;
        attacker = Character::standard_character(level, true).creature;
        defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            calc_attack_damage_per_round(
                &attacker
                    .get_attack_by_name("Generic Scaling Battleaxe")
                    .unwrap(),
                &attacker,
                &defender
            )
            .total(),
            calc_individual_dpr(&attacker, &defender),
            "At level 20, Generic Scaling Strike should be the best attack",
        );
    }
}
