use crate::core_mechanics::attacks::{Attack, HasAttacks};
use crate::core_mechanics::{Defense, HasDamageAbsorption, HasDefenses, HasVitalWounds};
use crate::creatures::{Creature, HasDamageTracking};
use std::cmp::max;
use std::fmt;

pub type LeveledPartyGen = dyn Fn(i32) -> Vec<Creature>;

pub struct CombatResult {
    pub blue_hit_probability: f64,
    pub blue_damage_per_round: i32,
    pub blue_living_count: usize,
    pub blue_rounds_to_live: f64,
    pub blue_survival_percent: f64,
    pub rounds: f64,
    pub red_damage_per_round: i32,
    pub red_hit_probability: f64,
    pub red_living_count: usize,
    pub red_rounds_to_live: f64,
    pub red_survival_percent: f64,
}

struct CombatStep<T, TT> {
    blue: T,
    red: TT,
}

impl fmt::Display for CombatResult {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "Rounds {:>5.2}/B{:>5.2}/R{:>5.2} Blue {} ({:>5.2}%) Red {} ({:>5.2}%)",
            self.rounds,
            self.blue_rounds_to_live,
            self.red_rounds_to_live,
            self.blue_living_count,
            self.blue_survival_percent,
            self.red_living_count,
            self.red_survival_percent,
        )
    }
}

pub fn run_combat(blue: Vec<Creature>, red: Vec<Creature>) -> CombatResult {
    let mut blue = blue.clone();
    let mut red = red.clone();
    let mut rounds = 0.0;
    let blue_damage_per_round = calc_damage_per_round(&blue.iter().collect(), &red[0]) as i32;
    let red_damage_per_round = calc_damage_per_round(&red.iter().collect(), &blue[0]) as i32;
    let blue_hit_probability = calc_best_attack_hit_probability(&blue[0], &red[0]);
    let blue_rounds_to_live = calc_rounds_to_live(&red.iter().collect(), &blue.iter().collect());
    let red_rounds_to_live = calc_rounds_to_live(&blue.iter().collect(), &red.iter().collect());
    let red_hit_probability = calc_best_attack_hit_probability(&red[0], &blue[0]);

    // For now, don't do intelligent target prioritization - just proceed linearly through the
    // array of creatures. In the future, we can intelligently sort the vectors before entering
    // this block, so the code here won't have to change.
    loop {
        let damage_taken: CombatStep<i32, i32>;
        let min_rounds_to_first_death;
        {
            let living: CombatStep<Vec<&Creature>, Vec<&Creature>> = CombatStep {
                blue: blue
                    .iter()
                    .filter(|d| !d.is_vitally_unconscious())
                    .collect(),
                red: red.iter().filter(|d| !d.is_vitally_unconscious()).collect(),
            };
            if living.blue.is_empty() || living.red.is_empty() {
                return CombatResult {
                    blue_hit_probability,
                    red_hit_probability,
                    blue_damage_per_round,
                    red_damage_per_round,
                    blue_living_count: living.blue.len(),
                    red_living_count: living.red.len(),
                    blue_rounds_to_live,
                    red_rounds_to_live,
                    blue_survival_percent: survival_percent(&blue),
                    rounds,
                    red_survival_percent: survival_percent(&red),
                };
            }

            let defender = CombatStep {
                blue: &living.blue[0],
                red: &living.red[0],
            };
            let rounds_to_first_death = CombatStep {
                blue: calc_rounds_to_live(&living.blue, &vec![defender.red]),
                red: calc_rounds_to_live(&living.red, &vec![defender.blue]),
            };
            min_rounds_to_first_death = if rounds_to_first_death.blue <= rounds_to_first_death.red {
                rounds_to_first_death.blue
            } else {
                rounds_to_first_death.red
            };

            damage_taken = CombatStep {
                blue: (min_rounds_to_first_death
                    * calc_damage_per_round(&living.red, defender.blue))
                .ceil() as i32,
                red: (min_rounds_to_first_death * calc_damage_per_round(&living.blue, defender.red))
                    .ceil() as i32,
            };
        }
        let blue_defender = blue
            .iter_mut()
            .find(|d| !d.is_vitally_unconscious())
            .unwrap();
        blue_defender.take_damage(damage_taken.blue);
        blue_defender.apply_vital_wounds_from_damage();
        let red_defender = red
            .iter_mut()
            .find(|d| !d.is_vitally_unconscious())
            .unwrap();
        red_defender.take_damage(damage_taken.red);
        red_defender.apply_vital_wounds_from_damage();
        rounds += min_rounds_to_first_death;

        if rounds > 1000.0 {
            panic!("Trapped in an endless fight");
        }
    }
}

pub fn run_combat_at_standard_levels(
    blue_gen: &LeveledPartyGen,
    red_gen: &LeveledPartyGen,
) -> Vec<CombatResult> {
    vec![1, 5, 10, 15, 20]
        .into_iter()
        .map(|level| run_combat(blue_gen(level), red_gen(level)))
        .collect()
}

fn survival_percent(creatures: &Vec<Creature>) -> f64 {
    let remaining_damage_absorption: i32 = creatures
        .iter()
        .map(|d| d.remaining_damage_resistance() + d.remaining_hit_points())
        .sum();
    let max_damage_absorption: i32 = creatures
        .iter()
        .map(|d| d.calc_damage_resistance() + d.calc_effective_combat_hit_points())
        .sum();
    max(0, remaining_damage_absorption) as f64 / max_damage_absorption as f64
}

fn calc_damage_per_round(attackers: &Vec<&Creature>, defender: &Creature) -> f64 {
    return attackers
        .iter()
        .map(|a| calc_individual_dpr(a, defender))
        .sum();
}

pub fn calc_rounds_to_live(attackers: &Vec<&Creature>, defenders: &Vec<&Creature>) -> f64 {
    let mut damage_per_round = 0.0;
    let mut damage_absorption = 0;
    for defender in defenders {
        // Divide to average the dpr across all defenders
        damage_per_round += calc_damage_per_round(attackers, defender) / (defenders.len() as f64);
        // Add 1 HP since creatures need to drop below 0 to die, not just go to 0
        damage_absorption +=
            defender.remaining_damage_resistance() + defender.remaining_hit_points() + 1;
    }

    let rounds_to_survive = damage_absorption as f64 / damage_per_round;
    // In a real fight, rounds would be broken up into discrete units, but we'd also have to
    // deal with the variance of high and low rolls. Dropping to quarter-round precision
    // precision still leaves some awareness of the downsides of excess overkill while being
    // more precise than true integer rounds
    (rounds_to_survive * 4.0).ceil() / 4.0
}

fn calc_individual_dpr(attacker: &Creature, defender: &Creature) -> f64 {
    let best_attack: Option<Attack> = find_best_attack(attacker, defender);

    // println!("Best attack: {}", best_attack.unwrap().name);

    if let Some(attack) = best_attack {
        calc_attack_damage_per_round(&attack, attacker, defender).total()
            * attacker.calc_damage_per_round_multiplier()
    } else {
        0.0
    }
}

fn calc_best_attack_hit_probability(attacker: &Creature, defender: &Creature) -> f64 {
    let best_attack: Option<Attack> = find_best_attack(attacker, defender);
    if let Some(ref a) = best_attack {
        calculate_attack_outcome(
            a,
            attacker.calc_accuracy(),
            defender.calc_defense(&a.defense),
            attacker.calc_explosion_target(),
        )
        .hit_probability
    } else {
        0.0
    }
}

pub fn find_best_attack(attacker: &Creature, defender: &Creature) -> Option<Attack> {
    let attacks = attacker.calc_all_attacks();
    let mut best_damage_per_round = 0.0;
    let mut best_attack: Option<Attack> = None;
    for attack in attacks {
        let average_damage_per_round =
            calc_attack_damage_per_round(&attack, attacker, defender).total();
        if average_damage_per_round > best_damage_per_round {
            best_damage_per_round = average_damage_per_round;
            best_attack = Some(attack);
        }
    }

    best_attack
}

// This only makes sense in the context of a specific defender.
pub struct AttackDamagePerRound {
    pub hit_probability: f64,
    pub glance_probability: f64,
    pub crit_probability: f64,
    pub damage_per_glance: f64,
    pub damage_per_hit: f64,
    pub damage_per_crit: f64,
}

impl AttackDamagePerRound {
    pub fn total(&self) -> f64 {
        self.hit_probability * self.damage_per_hit
            + self.glance_probability * self.damage_per_glance
            + self.crit_probability * self.damage_per_crit
    }

    pub fn explain(&self, attack_name: &str) -> String {
        format!(
            "{attack_name: <7}: {total} = ({damage_per_hit} dph * {hit_probability} hpr) + ({damage_per_crit} dpc * {crit_probability} cpr) + ({damage_per_glance} dpg * {glance_probability} gpr) = {hdpr} hdpr + {cdpr} cdpr + {gdpr} gdpr",
            total=dec2(self.total()),
            damage_per_hit=dec1(self.damage_per_hit),
            hit_probability=dec2(self.hit_probability),
            damage_per_crit=dec1(self.damage_per_crit),
            crit_probability=dec2(self.crit_probability),
            damage_per_glance=dec1(self.damage_per_glance),
            glance_probability=dec2(self.glance_probability),
            hdpr=dec2(self.damage_per_hit * self.hit_probability),
            cdpr=dec2(self.damage_per_crit * self.crit_probability),
            gdpr=dec2(self.damage_per_glance * self.glance_probability),
        )
    }
}

pub fn calc_attack_damage_per_round(
    attack: &Attack,
    attacker: &Creature,
    defender: &Creature,
) -> AttackDamagePerRound {
    let attack_outcome_probability = calculate_attack_outcome(
        attack,
        attacker.calc_accuracy(),
        defender.calc_defense(&attack.defense),
        attacker.calc_explosion_target(),
    );

    let mut damage_per_crit = 0.0;
    let mut damage_per_glance = 0.0;
    let mut damage_per_hit = 0.0;
    if attack.damage_effect().is_some() {
        let damage_dice = attack.calc_dice_pool(attacker).unwrap();

        damage_per_crit = damage_dice.average_damage();
        damage_per_glance = damage_dice.average_damage() / 2.0;
        damage_per_hit = damage_dice.average_damage();
    }

    AttackDamagePerRound {
        crit_probability: attack_outcome_probability.crit_probability,
        glance_probability: calculate_glance_probability(
            attack,
            attacker.calc_accuracy(),
            defender.calc_defense(&attack.defense),
            attacker.calc_explosion_target(),
        ),
        hit_probability: attack_outcome_probability.hit_probability,
        damage_per_crit,
        damage_per_glance,
        damage_per_hit,
    }
}

pub struct AttackOutcomeProbability {
    pub hit_probability: f64,
    pub crit_probability: f64,
}

#[cfg(test)]
impl AttackOutcomeProbability {
    fn short_description(&self) -> String {
        format!(
            "{:.3} single, {:.3} crit",
            self.hit_probability, self.crit_probability
        )
    }
}

fn cap_range_float(val: f64, min: f64, max: f64) -> f64 {
    if min > max {
        panic!("Flipped min and max");
    }
    return if val < min {
        min
    } else if val > max {
        max
    } else {
        val
    };
}

fn cap_range_int(val: i32, min: i32, max: i32) -> i32 {
    if min > max {
        panic!("Flipped min and max");
    }
    return if val < min {
        min
    } else if val > max {
        max
    } else {
        val
    };
}

// Assuming that we exploded, what was the average accuracy bonus from all explosions so far?
// If explosion target is lower, we are more likely to explode, but get less benefit from
// explosions on average.
fn calc_accuracy_bonus_from_explosions(
    explosion_target: i32,
    successful_explosion_count: i32,
) -> f64 {
    let mut sum = 0.0;
    for e in 0..successful_explosion_count {
        // A character who reduces their target down to 0 cascades that to the next roll. They
        // would always explode on the first roll, and they explode on a 9+ on the second roll.
        let current_explosion_target = cap_range_int(explosion_target + 9 * e, 1, 10);
        sum += ((current_explosion_target as f64) + 10.0) / 2.0;
    }

    sum
}

// What is the probability (0.0-1.0) that we get the given number of explosions? The lower the
// explosion target, the more likely we are to explode.
fn calc_probability_of_explosions(explosion_target: i32, successful_explosion_count: i32) -> f64 {
    let mut probability = 1.0;
    for e in 0..successful_explosion_count {
        let current_explosion_target = cap_range_int(explosion_target + 9 * e, 1, 10);
        // With an explosion target of 10, there is a 10% chance.
        // With an explosion target of 1, there is a 100% chance.
        probability *= (11 - current_explosion_target) as f64 / 10.0;
    }

    probability
}

pub fn calculate_attack_outcome(
    attack: &Attack,
    accuracy: i32,
    defense: i32,
    // The number required to explode. With no special modifiers, this should be 10. This can go
    // to 0 or below, which cascades into additional rolls. Note that this is the explosion target
    // for the creature, and the Attack may have additional local explosion target scaling.
    explosion_target: i32,
) -> AttackOutcomeProbability {
    // hardcoded
    let max_explosion_depth = 2;

    let mut single_hit_probability = 0.0;
    let mut crit_probability = 0.0;
    let mut crit_count = 0.0;
    let mut successful_explosion_count = 0;
    loop {
        let hit_probability: f64 = ((attack.accuracy + accuracy) as f64 + 11.0 - crit_count * 10.0
            + calc_accuracy_bonus_from_explosions(explosion_target, successful_explosion_count)
            - (defense as f64))
            / 10.0;

        let hit_probability = cap_range_float(hit_probability, 0.0, 1.0);
        let hit_probability = hit_probability
            * calc_probability_of_explosions(explosion_target, successful_explosion_count);
        if hit_probability > 0.0 {
            if single_hit_probability == 0.0 {
                single_hit_probability = hit_probability;
            } else {
                crit_probability += hit_probability;
            }
            crit_count += 1.0;
        } else if successful_explosion_count < max_explosion_depth {
            successful_explosion_count += 1;
        } else {
            return AttackOutcomeProbability {
                crit_probability,
                hit_probability: single_hit_probability,
            };
        }
    }
}

// TODO: handle dual-wielding, which should set this to 0.
fn calculate_glance_probability(
    attack: &Attack,
    accuracy: i32,
    defense: i32,
    explosion_target: i32,
) -> f64 {
    calculate_attack_outcome(attack, accuracy + 2, defense, explosion_target).hit_probability
        - calculate_attack_outcome(attack, accuracy, defense, explosion_target).hit_probability
}

// Format to one decimal place
fn dec1(val: f64) -> String {
    format!("{:.1}", val)
}

// Format to two decimal places
fn dec2(val: f64) -> String {
    format!("{:.2}", val)
}

pub fn explain_monster_adpr(attacker: &Creature, defender: &Creature) -> Vec<String> {
    let claws = attacker.get_attack_by_substring("Claw").unwrap();
    // TODO: this used to be a slam, so all of the damage values are wrong
    let bite = attacker.get_attack_by_substring("Bite").unwrap();
    vec![
        calc_attack_damage_per_round(&claws, attacker, defender).explain("Claws"),
        calc_attack_damage_per_round(&bite, attacker, defender).explain("Bite"),
    ]
}

pub fn explain_standard_adpr(attacker: &Creature, defender: &Creature) -> Vec<String> {
    let normal_strike = attacker.get_attack_by_substring("Generic Accuracy").unwrap();
    let certain_strike = attacker.get_attack_by_substring("Certain").unwrap();
    let generic_strike = attacker.get_attack_by_substring("Generic Scaling").unwrap();
    let power_strike = attacker.get_attack_by_substring("Power").unwrap();
    vec![
        calc_attack_damage_per_round(&normal_strike, attacker, defender).explain("Accuracy"),
        calc_attack_damage_per_round(&certain_strike, attacker, defender).explain("Certain"),
        calc_attack_damage_per_round(&generic_strike, attacker, defender).explain("Extra"),
        calc_attack_damage_per_round(&power_strike, attacker, defender).explain("Power"),
    ]
}

pub fn generic_attack_outcome(
    attacker: &Creature,
    defender: &Creature,
) -> AttackOutcomeProbability {
    // If the attacker has a specific weapon listed, use its accuracy. But we're fine using a
    // generic accuracy.
    let weapon_accuracy = if let Some(weapon) = attacker.weapons.get(0) {
        weapon.accuracy
    } else {
        0
    };
    calculate_attack_outcome(
        &Attack {
            accuracy: weapon_accuracy,
            ..Default::default()
        },
        attacker.calc_accuracy(),
        defender.calc_defense(&Defense::Armor),
        attacker.calc_explosion_target(),
    )
}

#[cfg(test)]
mod tests;
