use crate::core_mechanics::attacks;
use crate::core_mechanics::HasCreatureMechanics;
use std::fmt;

pub struct CombatResult {
    rounds: f64,
}

impl fmt::Display for CombatResult {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "R{}", self.rounds)
    }
}

pub fn run_combat<T: HasCreatureMechanics>(blue: Vec<&T>, red: Vec<&T>) -> CombatResult {
    let mut rounds = 0.0;
    let mut living_blue_index = 0;
    let mut living_red_index = 0;
    // For now, don't do intelligent target prioritization - just proceed linearly through the
    // array of creatures. In the future, we can intelligently sort the vectors before entering
    // this block, so the code here won't have to change.
    loop {
        let living = (
            blue[living_blue_index..].to_vec(),
            red[living_red_index..].to_vec(),
        );
        let defender = (living.0[0], living.1[0]);
        let rounds_to_live: (f64, f64) = (
            calc_rounds_to_live(living.0, defender.1),
            calc_rounds_to_live(living.1, defender.0),
        );

        if rounds_to_live.0 > rounds_to_live.1 {
            living_red_index += 1;
            rounds += rounds_to_live.1;
        } else if rounds_to_live.0 < rounds_to_live.1 {
            living_blue_index += 1;
            rounds += rounds_to_live.0;
        } else {
            living_blue_index += 1;
            living_red_index += 1;
            rounds += rounds_to_live.0;
        }
        if living_blue_index == blue.len() || living_red_index == red.len() {
            break;
        }
    }
    return CombatResult { rounds };
}

fn calc_rounds_to_live<T: HasCreatureMechanics>(attackers: Vec<&T>, defender: &T) -> f64 {
    let damage_per_round: f64 = attackers
        .iter()
        .map(|a| calc_individual_dpr(*a, defender))
        .sum();
    let damage_absorption = defender.calc_hit_points() + defender.calc_damage_resistance();
    let rounds_to_survive = damage_absorption as f64 / damage_per_round;
    // In a real fight, rounds would be broken up into discrete units, but we'd also have to
    // deal with the variance of high and low rolls. Dropping to quarter-round precision
    // precision still leaves some awareness of the downsides of excess overkill while being
    // more precise than true integer rounds
    return (rounds_to_survive * 4.0).round() / 4.0;
}

fn calc_individual_dpr<T: HasCreatureMechanics>(attacker: &T, defender: &T) -> f64 {
    let attacks = attacks::Attack::calc_strikes(attacker.weapons());
    let mut best_damage_per_round = 0.0;
    for attack in attacks {
        let hit_probability = calculate_hit_probability(&attack, attacker, defender);
        if let Some(_) = attack.damage_effect() {
            let damage_dice = attack.calc_damage_dice(attacker).unwrap();
            let damage_modifier = attack.calc_damage_modifier(attacker).unwrap();
            let average_damage_per_round = hit_probability
                * (damage_dice.average_damage() + damage_modifier as f64);
            if average_damage_per_round > best_damage_per_round {
                best_damage_per_round = average_damage_per_round;
            }
        }
    }

    return best_damage_per_round * attacker.calc_damage_per_round_multiplier();
}

fn calculate_hit_probability<T: HasCreatureMechanics>(
    attack: &attacks::Attack,
    attacker: &T,
    defender: &T,
) -> f64 {
    // hardcoded
    let max_explosion_depth = 2.0;

    let mut total_hit_probability = 0.0;
    let mut crit_count = 0.0;
    let mut explosion_count = 0.0;
    loop {
        let hit_probability: f64 = ((attack.accuracy + attacker.calc_accuracy()) as f64 + 11.0 - crit_count * 10.0
            + explosion_count * 10.0
            - (defender.calc_defense(&attack.defense) as f64))
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
            crit_count += 1.0;
            total_hit_probability += hit_probability * f64::powf(0.1, explosion_count);
        } else if explosion_count < max_explosion_depth {
            explosion_count += 1.0;
        } else {
            return total_hit_probability;
        }
    }
}
