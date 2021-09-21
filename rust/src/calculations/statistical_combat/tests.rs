use super::*;
use crate::core_mechanics::Defense;
use crate::creatures::{
    Character, Creature, CreatureCategory, HasModifiers, Modifier, Monster, StandardAttack,
};
use crate::equipment::Weapon;
use crate::monsters::ChallengeRating;

#[cfg(test)]
mod calculate_hit_probability {
    use super::*;

    #[test]
    fn simple_hit_probability() {
        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 0, 6);
        assert_eq!(
            "0.500 single, 0.055 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.crit_probability
            ),
            "Should be around 50% with +0 vs 6",
        );

        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 0, 0);
        assert_eq!(
            "1.000 single, 0.111 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.crit_probability
            ),
            "Should be around 100% with +0 vs 0",
        );

        let hit_probability = calculate_hit_probability(&Attack::from_weapon(Weapon::Claw), 1, 10);
        assert_eq!(
            "0.400 single, 0.044 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.crit_probability
            ),
            "Should include weapon accuracy modifier and non-weapon accuracy modifier",
        );
    }

    #[test]
    fn extreme_hit_probability() {
        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 0, 16);
        assert_eq!(
            "0.050 single, 0.005 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.crit_probability
            ),
            "Should be around 5% with +0 vs 16",
        );

        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 10, 6);
        assert_eq!(
            "1.000 single, 0.555 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.crit_probability
            ),
            "Should be over 100% with +10 vs 6",
        );
    }

    #[test]
    fn glance_probability() {
        let attack = &Attack::from_weapon(Weapon::Broadsword);
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

        attacker.add_special_attack(Attack::from_weapon(Weapon::Broadsword));
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
        attacker.add_special_attack(Attack::from_weapon(Weapon::Broadsword));
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

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "3.342",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 0.7 hit % + 2.5 dpc * 0.077 crit % = 3.15 + 0.1925 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "3.498",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.5 hit % + 4.5 dpc * 0.055 crit % = 3.4975 dpr",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "2.931",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike: 9 dph * 0.3 hit % + 7 dpc * 0.033 crit % = 2.7 + .231 dpr",
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

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "3.342",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 0.7 hit % + 2.5 dpc * 0.077 crit % = 3.15 + 0.1925 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "3.498",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.5 hit % + 4.5 dpc * 0.055 crit % = 3.4975 dpr",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "2.931",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike: 9 dph * 0.3 hit % + 7 dpc * 0.033 crit % = 2.7 + .231 dpr",
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

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "4.775",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 4.5 dph * 1.0 hit % + 2.5 dpc * 0.110 crit % = 4.5 + 0.275 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "5.596",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 6.5 dph * 0.8 hit % + 4.5 dpc * 0.088 crit % = 5.2 + 0.396 dpr",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "5.862",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike: 9 dph * 0.6 hit % + 7 dpc * 0.066 crit % = 5.4 + 0.462 dpr",
        );

        assert_eq!(
            calc_attack_damage_per_round(&power_strike, &attacker, &defender),
            calc_individual_dpr(&attacker, &defender),
            "Power Strike should be the best attack",
        );
    }

    #[test]
    fn standard_character_level_10_vs_cr2() {
        let attacker = Character::standard_character(10, true).creature;
        let defender = Monster::standard_monster(ChallengeRating::Two, 10, None, None).creature;
        assert_eq!(13, defender.calc_defense(&Defense::Armor));

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "12.546",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike: 13.5 dph * 0.8 hit % + 4.5 dpc * 0.088 crit % + 6.75 dpg * 0.2 glance % = 10.8 + 0.396 + 1.35 dpr",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "11.295",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic: 18 dph * 0.5 hit % + 9 dpc * 0.055 crit % + 9 dpg * 0.2 glance % = 9 + 0.495 + 1.8 dpr",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "9.662",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike: 23 dph * 0.3 hit % + 14 dpc * 0.033 crit % + 11.5 dpg * 0.2 glance % = 6.9 + 0.462 + 2.3 dpr",
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

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "30.836",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "29.444",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "21.039",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike",
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

        let certain_strike = attacker
            .get_attack_by_name("Broadsword Certain Strike")
            .unwrap();
        assert_eq!(
            "34.108",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&certain_strike, &attacker, &defender)
            ),
            "Certain Strike",
        );

        let generic = attacker
            .get_attack_by_name("Broadsword Generic Scaling Strike")
            .unwrap();
        assert_eq!(
            "47.364",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&generic, &attacker, &defender)
            ),
            "Generic",
        );

        let power_strike = attacker
            .get_attack_by_name("Broadsword Power Strike")
            .unwrap();
        assert_eq!(
            "42.623",
            format!(
                "{:.3}",
                calc_attack_damage_per_round(&power_strike, &attacker, &defender)
            ),
            "Power Strike",
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
            8.25,
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

        let defender =
            Monster::standard_monster(ChallengeRating::Three, level, None, None).creature;
        assert_eq!(
            17.25,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 3",
        );

        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            23.75,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 4",
        );
    }

    #[test]
    fn standard_character_vs_monsters_level_20() {
        let level = 20;
        let attacker = Character::standard_character(level, true).creature;

        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            5.0,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 1",
        );

        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        assert_eq!(
            10.0,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 2",
        );

        let defender =
            Monster::standard_monster(ChallengeRating::Three, level, None, None).creature;
        assert_eq!(
            16.25,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 3",
        );

        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            22.5,
            calc_rounds_to_live(&vec![&attacker], &defender,),
            "vs CR 4",
        );
    }
}

#[cfg(test)]
mod run_combat {
    use super::*;

    fn generate_monsters(cr: ChallengeRating, l: i32) -> Vec<Creature> {
        match cr {
            ChallengeRating::Half => vec![
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
            ],
            ChallengeRating::One => vec![
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
            ],
            ChallengeRating::Two => vec![
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(cr, l, None, None).creature,
            ],
            ChallengeRating::Three => vec![
                Monster::standard_monster(cr, l, None, None).creature,
                Monster::standard_monster(ChallengeRating::One, l, None, None).creature,
            ],
            ChallengeRating::Four => vec![Monster::standard_monster(cr, l, None, None).creature],
        }
    }

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
            "Rounds  9.00 Blue 0 ( 0.00%) Red 0 ( 0.00%)",
            run_combat(vec![attacker], vec![defender]).to_string(),
            "at level 20",
        );
    }

    #[test]
    fn standard_character_vs_solo_monster_level_1() {
        let level = 1;
        let attacker = Character::standard_character(level, true).creature;

        let defender = Monster::standard_monster(ChallengeRating::One, level, None, None).creature;
        assert_eq!(
            "Rounds  5.50 Blue 1 ( 0.13%) Red 0 ( 0.00%)",
            run_combat(vec![attacker.clone()], vec![defender]).to_string(),
            "vs CR 1",
        );

        let defender = Monster::standard_monster(ChallengeRating::Two, level, None, None).creature;
        assert_eq!(
            "Rounds  4.75 Blue 0 ( 0.00%) Red 1 ( 0.53%)",
            run_combat(vec![attacker.clone()], vec![defender]).to_string(),
            "vs CR 2",
        );

        let defender =
            Monster::standard_monster(ChallengeRating::Three, level, None, None).creature;
        assert_eq!(
            "Rounds  4.75 Blue 0 ( 0.00%) Red 1 ( 0.71%)",
            run_combat(vec![attacker.clone()], vec![defender]).to_string(),
            "vs CR 3",
        );

        let defender = Monster::standard_monster(ChallengeRating::Four, level, None, None).creature;
        assert_eq!(
            "Rounds  2.50 Blue 0 ( 0.00%) Red 1 ( 0.89%)",
            run_combat(vec![attacker.clone()], vec![defender]).to_string(),
            "vs CR 4",
        );
    }

    #[test]
    fn party_vs_monsters_level_1() {
        let level = 1;
        let attackers = vec![
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
        ];

        assert_eq!(
            "Rounds  7.75 Blue 2 ( 0.39%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::One, level),
            )
            .to_string(),
            "vs CR 1",
        );

        assert_eq!(
            "Rounds  6.50 Blue 3 ( 0.50%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Two, level),
            )
            .to_string(),
            "vs CR 2",
        );

        assert_eq!(
            "Rounds  6.75 Blue 3 ( 0.50%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Three, level),
            )
            .to_string(),
            "vs CR 3",
        );

        assert_eq!(
            "Rounds  8.25 Blue 1 ( 0.16%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Four, level),
            )
            .to_string(),
            "vs CR 4",
        );
    }

    #[test]
    fn party_vs_monsters_level_20() {
        let level = 20;
        let attackers = vec![
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
            Character::standard_character(level, true).creature,
        ];

        assert_eq!(
            "Rounds  6.00 Blue 3 ( 0.57%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::One, level),
            )
            .to_string(),
            "vs CR 1",
        );

        assert_eq!(
            "Rounds  5.50 Blue 3 ( 0.67%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Two, level),
            )
            .to_string(),
            "vs CR 2",
        );

        assert_eq!(
            "Rounds  6.00 Blue 3 ( 0.64%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Three, level),
            )
            .to_string(),
            "vs CR 3",
        );

        assert_eq!(
            "Rounds  6.25 Blue 3 ( 0.54%) Red 0 ( 0.00%)",
            run_combat(
                attackers.clone(),
                generate_monsters(ChallengeRating::Four, level),
            )
            .to_string(),
            "vs CR 4",
        );
    }
}
