use crate::calculations::CombatAgent;
use crate::core_mechanics::HasDefenses;
use crate::creatures::attacks::{Attack, HasAttacks};
use crate::creatures::{attacks, Creature};
use std::cmp::max;
use std::fmt;

pub struct CombatResult {
    blue_living_count: usize,
    blue_survival_percent: f64,
    rounds: f64,
    red_living_count: usize,
    red_survival_percent: f64,
}

struct CombatStep<T, TT> {
    blue: T,
    red: TT,
}

impl fmt::Display for CombatResult {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "Rounds {:>5.2} Blue {} ({:>5.2}%) Red {} ({:.2}%)",
            self.rounds,
            self.blue_living_count,
            self.blue_survival_percent,
            self.red_living_count,
            self.red_survival_percent,
        )
    }
}

pub fn run_combat(blue: Vec<Creature>, red: Vec<Creature>) -> CombatResult {
    let mut damageable: CombatStep<Vec<CombatAgent>, Vec<CombatAgent>> = CombatStep {
        blue: blue.iter().map(|c| CombatAgent::from_creature(c)).collect(),
        red: red.iter().map(|c| CombatAgent::from_creature(c)).collect(),
    };
    let mut rounds = 0.0;
    // For now, don't do intelligent target prioritization - just proceed linearly through the
    // array of creatures. In the future, we can intelligently sort the vectors before entering
    // this block, so the code here won't have to change.
    loop {
        let mut living: CombatStep<Vec<&mut CombatAgent>, Vec<&mut CombatAgent>> = CombatStep {
            blue: damageable
                .blue
                .iter_mut()
                .filter(|d| d.is_alive())
                .collect(),
            red: damageable.red.iter_mut().filter(|d| d.is_alive()).collect(),
        };
        let living_creatures: CombatStep<Vec<&Creature>, Vec<&Creature>> = CombatStep {
            blue: living.blue.iter().map(|d| d.creature).collect(),
            red: living.red.iter().map(|d| d.creature).collect(),
        };
        if living.blue.len() == 0 || living.red.len() == 0 {
            return CombatResult {
                blue_living_count: living.blue.len(),
                red_living_count: living.red.len(),
                blue_survival_percent: survival_percent(&damageable.blue),
                rounds,
                red_survival_percent: survival_percent(&damageable.red),
            };
        }

        let defender = CombatStep {
            blue: &mut living.blue[0],
            red: &mut living.red[0],
        };
        let rounds_to_first_death = CombatStep {
            blue: calc_rounds_to_live(&living_creatures.blue, defender.red),
            red: calc_rounds_to_live(&living_creatures.red, defender.blue),
        };
        let min_rounds_to_first_death = if rounds_to_first_death.blue <= rounds_to_first_death.red {
            rounds_to_first_death.blue
        } else {
            rounds_to_first_death.red
        };
        defender.blue.take_damage(
            min_rounds_to_first_death
                * calc_damage_per_round(&living_creatures.red, defender.blue.creature),
        );
        defender.red.take_damage(
            min_rounds_to_first_death
                * calc_damage_per_round(&living_creatures.blue, defender.red.creature),
        );
        rounds += min_rounds_to_first_death;
    }
}

fn survival_percent(creatures: &Vec<CombatAgent>) -> f64 {
    let total_damage_absorption: i32 = creatures.iter().map(|d| d.total_damage_absorption()).sum();
    let total_damage_taken: i32 = creatures.iter().map(|d| d.damage_taken).sum();
    return max(0, total_damage_absorption - total_damage_taken) as f64
        / total_damage_absorption as f64;
}

fn calc_damage_per_round(attackers: &Vec<&Creature>, defender: &Creature) -> f64 {
    return attackers
        .iter()
        .map(|a| calc_individual_dpr(*a, defender))
        .sum();
}

fn calc_rounds_to_live(attackers: &Vec<&Creature>, defender: &CombatAgent) -> f64 {
    let damage_per_round: f64 = calc_damage_per_round(attackers, defender.creature);
    let damage_absorption = defender.remaining_damage_absorption();
    let rounds_to_survive = damage_absorption as f64 / damage_per_round;
    // In a real fight, rounds would be broken up into discrete units, but we'd also have to
    // deal with the variance of high and low rolls. Dropping to quarter-round precision
    // precision still leaves some awareness of the downsides of excess overkill while being
    // more precise than true integer rounds
    return (rounds_to_survive * 4.0).ceil() / 4.0;
}

fn calc_individual_dpr(attacker: &Creature, defender: &Creature) -> f64 {
    let attacks = attacker.calc_all_attacks();
    let mut best_damage_per_round = 0.0;
    let mut best_attack: Option<Attack> = None;
    for attack in attacks {
        let hit_probability = calculate_hit_probability(
            &attack,
            attacker.calc_accuracy(),
            defender.calc_defense(&attack.defense),
        );
        if let Some(_) = attack.damage_effect() {
            let damage_dice = attack.calc_damage_dice(attacker).unwrap();
            let damage_modifier = attack.calc_damage_modifier(attacker).unwrap();
            let average_damage_per_round = hit_probability.single_hit_probability
                * damage_modifier as f64
                + hit_probability.including_crit_probability * damage_dice.average_damage() as f64;
            if average_damage_per_round > best_damage_per_round {
                best_damage_per_round = average_damage_per_round;
                best_attack = Some(attack);
            }
        }
    }

    // println!("Best attack: {}", best_attack.unwrap().name);

    return best_damage_per_round * attacker.calc_damage_per_round_multiplier();
}

struct HitProbability {
    single_hit_probability: f64,
    including_crit_probability: f64,
}

fn calculate_hit_probability(
    attack: &attacks::Attack,
    accuracy: i32,
    defense: i32,
) -> HitProbability {
    // hardcoded
    let max_explosion_depth = 2.0;

    let mut single_hit_probability = 0.0;
    let mut including_crit_probability = 0.0;
    let mut crit_count = 0.0;
    let mut explosion_count = 0.0;
    loop {
        let hit_probability: f64 = ((attack.accuracy + accuracy) as f64 + 11.0 - crit_count * 10.0
            + explosion_count * 10.0
            - (defense as f64))
            / 10.0;
        let hit_probability = if hit_probability > 1.0 {
            1.0
        } else {
            hit_probability
        };
        let hit_probability = if hit_probability < 0.0 {
            0.0
        } else {
            hit_probability
        };
        if hit_probability > 0.0 {
            if crit_count == 0.0 {
                single_hit_probability = hit_probability;
            }
            crit_count += 1.0;
            including_crit_probability += hit_probability * f64::powf(0.1, explosion_count);
        } else if explosion_count < max_explosion_depth {
            explosion_count += 1.0;
        } else {
            return HitProbability {
                single_hit_probability,
                including_crit_probability,
            };
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core_mechanics::Defense;
    use crate::creatures::attack_effects::AttackEffect;
    use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier, StandardAttack};
    use crate::equipment::Weapon;

    #[test]
    fn it_calculates_simple_hit_probability() {
        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 0, 6);
        assert_eq!(
            "0.500 single, 0.555 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.including_crit_probability
            ),
            "Should be around 50% with +0 vs 6",
        );

        let hit_probability =
            calculate_hit_probability(&Attack::from_weapon(Weapon::Broadsword), 0, 0);
        assert_eq!(
            "1.000 single, 1.111 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.including_crit_probability
            ),
            "Should be around 100% with +0 vs 0",
        );

        let hit_probability = calculate_hit_probability(&Attack::from_weapon(Weapon::Claw), 1, 10);
        assert_eq!(
            "0.400 single, 0.444 crit",
            format!(
                "{:.3} single, {:.3} crit",
                hit_probability.single_hit_probability, hit_probability.including_crit_probability
            ),
            "Should include weapon accuracy modifier and non-weapon accuracy modifier",
        );
    }

    // #[test]
    // fn it_calculates_accuracy_with_glancing_blows() {
    //     let attack = &Attack::from_weapon(Weapon::Broadsword).except(|a| a.glance = Some(AttackEffect::HalfDamage));
    //     let hit_probability =
    //         calculate_hit_probability(attack, 0, 6);
    //     assert_eq!(
    //         "0.600 single, 0.655 crit",
    //         format!(
    //             "{:.3} single, {:.3} crit",
    //             hit_probability.single_hit_probability, hit_probability.including_crit_probability
    //         ),
    //     );
    // }

    #[test]
    fn it_calculates_creature_dpr() {
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

    // #[test]
    // fn it_calculates_glancing_blows_dpr() {
    //     let mut attacker = Creature::new(1, CreatureCategory::Character);
    //     let mut defender = Creature::new(1, CreatureCategory::Character);
    //     defender.add_modifier(Modifier::Defense(Defense::Armor, 6), None, None);
    //     attacker.add_special_attack(Attack::from_weapon(Weapon::Broadsword));
    //     assert_eq!(
    //         "2.498",
    //         format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
    //         "Should be 4.5 dph * 0.555 hit % = 2.498 dpr without glancing blows",
    //     );
    //     attacker.add_special_attack(
    //         Attack::from_weapon(Weapon::Broadsword)
    //             .except(|a| a.glance = Some(AttackEffect::HalfDamage)),
    //     );
    //     assert_eq!(
    //         "2.948",
    //         format!("{:.3}", calc_individual_dpr(&attacker, &defender)),
    //         "Should be 4.5 dph * 0.655 hit % = 2.948 dpr with glancing blows",
    //     );
    // }
}
