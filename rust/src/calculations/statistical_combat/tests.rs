use super::*;
use crate::core_mechanics::Defense;
use crate::creatures::attack_effects::AttackEffect;
use crate::creatures::{Character, Creature, CreatureCategory, HasModifiers, Modifier, StandardAttack};
use crate::equipment::Weapon;

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

#[test]
fn simple_damage_per_round() {
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

fn standard_character_damage_per_round() {
    let attacker = Creature::new(1, CreatureCategory::Character);
    let defender = Creature::new(1, CreatureCategory::Character);

    assert_eq!(
        "5.000",
        format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
        "Should be 4.5 dph * 1.111 hit % = 5 dpr",
    );
}
