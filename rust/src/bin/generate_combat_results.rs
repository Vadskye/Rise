// The file paths used here assume that this is being run from the Rise/rust directory.

use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Character;
use rise::monsters::ChallengeRating;
use serde::Serialize;
use std::fs::File;
use std::io;

fn main() -> io::Result<()> {
    let mut difficult_combat_results = vec![];
    let mut standard_combat_results = vec![];
    for level in 1..22 {
        for monster_count in vec![1, 2, 4, 8] {
            difficult_combat_results.push(run_difficult_combat(level, monster_count));
            standard_combat_results.push(run_standard_combat(level, monster_count));
        }
    }

    let mut difficult_writer = csv::Writer::from_writer(File::create("combat_results/difficult_encounter.csv")?);
    for r in &difficult_combat_results {
        difficult_writer.serialize(r)?;
    }

    let mut standard_writer = csv::Writer::from_writer(File::create("combat_results/standard_encounter.csv")?);
    for r in &standard_combat_results {
        standard_writer.serialize(r)?;
    }

    Ok(())
}

#[derive(Serialize)]
struct StandardCombatResult {
    level: i32,
    monster_count: i32,
    // All fields from CombatResult
    blue_hit_probability: f64,
    red_hit_probability: f64,
    blue_damage_per_round: i32,
    blue_living_count: usize,
    blue_rounds_to_live: f64,
    blue_survival_percent: f64,
    rounds: f64,
    red_damage_per_round: i32,
    red_living_count: usize,
    red_rounds_to_live: f64,
    red_survival_percent: f64,
}

fn run_difficult_combat(level: i32, monster_count: i32) -> StandardCombatResult {
    let pcs = vec![
        Character::fighter_shield(level).creature,
        Character::fighter_greatmace(level).creature,
        Character::barbarian_greatmace(level).creature,
        Character::sorcerer_dexterity(level).creature,
    ];
    let monsters = ChallengeRating::difficult_encounter(level, monster_count);
    let combat_result = run_combat(pcs, monsters);
    return StandardCombatResult {
        level,
        monster_count,
        blue_hit_probability: combat_result.blue_hit_probability,
        red_hit_probability: combat_result.red_hit_probability,
        blue_damage_per_round: combat_result.blue_damage_per_round,
        blue_living_count: combat_result.blue_living_count,
        blue_rounds_to_live: combat_result.blue_rounds_to_live,
        blue_survival_percent: combat_result.blue_survival_percent,
        rounds: combat_result.rounds,
        red_damage_per_round: combat_result.red_damage_per_round,
        red_living_count: combat_result.red_living_count,
        red_rounds_to_live: combat_result.red_rounds_to_live,
        red_survival_percent: combat_result.red_survival_percent,
    };
}

fn run_standard_combat(level: i32, monster_count: i32) -> StandardCombatResult {
    let pcs = vec![
        Character::fighter_shield(level).creature,
        Character::fighter_greatmace(level).creature,
        Character::barbarian_greatmace(level).creature,
        Character::sorcerer_dexterity(level).creature,
    ];
    let monsters = ChallengeRating::standard_encounter(level, monster_count);
    let combat_result = run_combat(pcs, monsters);
    return StandardCombatResult {
        level,
        monster_count,
        blue_hit_probability: combat_result.blue_hit_probability,
        red_hit_probability: combat_result.red_hit_probability,
        blue_damage_per_round: combat_result.blue_damage_per_round,
        blue_living_count: combat_result.blue_living_count,
        blue_rounds_to_live: combat_result.blue_rounds_to_live,
        blue_survival_percent: combat_result.blue_survival_percent,
        rounds: combat_result.rounds,
        red_damage_per_round: combat_result.red_damage_per_round,
        red_living_count: combat_result.red_living_count,
        red_rounds_to_live: combat_result.red_rounds_to_live,
        red_survival_percent: combat_result.red_survival_percent,
    };
}
