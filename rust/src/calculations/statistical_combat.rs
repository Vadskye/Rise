use crate::calculations::CombatAgent;
use crate::core_mechanics::creatures::attacks::Attack;
use crate::core_mechanics::creatures::{attacks, HasCreatureMechanics};
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

pub fn run_combat<T: HasCreatureMechanics, TT: HasCreatureMechanics>(
    blue: Vec<T>,
    red: Vec<TT>,
) -> CombatResult {
    let mut damageable: CombatStep<Vec<CombatAgent<T>>, Vec<CombatAgent<TT>>> = CombatStep {
        blue: blue.iter().map(|c| CombatAgent::from_creature(c)).collect(),
        red: red.iter().map(|c| CombatAgent::from_creature(c)).collect(),
    };
    let mut rounds = 0.0;
    // For now, don't do intelligent target prioritization - just proceed linearly through the
    // array of creatures. In the future, we can intelligently sort the vectors before entering
    // this block, so the code here won't have to change.
    loop {
        let mut living: CombatStep<Vec<&mut CombatAgent<T>>, Vec<&mut CombatAgent<TT>>> =
            CombatStep {
                blue: damageable
                    .blue
                    .iter_mut()
                    .filter(|d| d.is_alive())
                    .collect(),
                red: damageable.red.iter_mut().filter(|d| d.is_alive()).collect(),
            };
        let living_creatures: CombatStep<Vec<&T>, Vec<&TT>> = CombatStep {
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

fn survival_percent<T: HasCreatureMechanics>(creatures: &Vec<CombatAgent<T>>) -> f64 {
    let total_damage_absorption: i32 = creatures.iter().map(|d| d.total_damage_absorption()).sum();
    let total_damage_taken: i32 = creatures.iter().map(|d| d.damage_taken).sum();
    return max(0, total_damage_absorption - total_damage_taken) as f64
        / total_damage_absorption as f64;
}

fn calc_damage_per_round<T: HasCreatureMechanics, TT: HasCreatureMechanics>(
    attackers: &Vec<&T>,
    defender: &TT,
) -> f64 {
    return attackers
        .iter()
        .map(|a| calc_individual_dpr(*a, defender))
        .sum();
}

fn calc_rounds_to_live<T: HasCreatureMechanics, TT: HasCreatureMechanics>(
    attackers: &Vec<&T>,
    defender: &CombatAgent<TT>,
) -> f64 {
    let damage_per_round: f64 = calc_damage_per_round(attackers, defender.creature);
    let damage_absorption = defender.remaining_damage_absorption();
    let rounds_to_survive = damage_absorption as f64 / damage_per_round;
    // In a real fight, rounds would be broken up into discrete units, but we'd also have to
    // deal with the variance of high and low rolls. Dropping to quarter-round precision
    // precision still leaves some awareness of the downsides of excess overkill while being
    // more precise than true integer rounds
    return (rounds_to_survive * 4.0).ceil() / 4.0;
}

fn calc_individual_dpr(
    attacker: &dyn HasCreatureMechanics,
    defender: &dyn HasCreatureMechanics,
) -> f64 {
    let attacks = attacker.calc_all_attacks();
    let mut best_damage_per_round = 0.0;
    let mut best_attack: Option<Attack> = None;
    for attack in attacks {
        let hit_probability = calculate_hit_probability(&attack, attacker, defender);
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
    attacker: &dyn HasCreatureMechanics,
    defender: &dyn HasCreatureMechanics,
) -> HitProbability {
    // hardcoded
    let max_explosion_depth = 2.0;

    let mut single_hit_probability = 0.0;
    let mut including_crit_probability = 0.0;
    let mut crit_count = 0.0;
    let mut explosion_count = 0.0;
    loop {
        let hit_probability: f64 = ((attack.accuracy + attacker.calc_accuracy()) as f64 + 11.0
            - crit_count * 10.0
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
