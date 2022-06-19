use rise::calculations::statistical_combat::run_combat;
use rise::creatures::{Character, Monster};
use rise::monsters::ChallengeRating;
use serde::Serialize;
use std::io;

fn main() {
    let mut standard_combat_results = vec![];
    for level in 1..22 {
        for cr in vec![
            ChallengeRating::Half,
            ChallengeRating::One,
            ChallengeRating::Two,
            ChallengeRating::Four,
            ChallengeRating::Six,
        ] {
            standard_combat_results.push(run_standard_combat(level, cr));
        }
    }

    let mut writer = csv::Writer::from_writer(io::stdout());
    for r in &standard_combat_results {
        if let Err(err) = writer.serialize(r) {
            eprintln!("{}", err);
        }
    }
}

#[derive(Serialize)]
struct StandardCombatResult {
    cr: ChallengeRating,
    level: i32,
    // All fields from CombatResult
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

fn run_standard_combat(level: i32, cr: ChallengeRating) -> StandardCombatResult {
    let pcs = vec![
        Character::standard_character(level, true).creature,
        Character::standard_character(level, true).creature,
        Character::standard_character(level, true).creature,
        Character::standard_character(level, true).creature,
    ];
    let count = match cr {
        ChallengeRating::Half => 8,
        ChallengeRating::One => 4,
        ChallengeRating::Two => 2,
        ChallengeRating::Four => 1,
        ChallengeRating::Six => 1,
    };
    let mut monsters = vec![];
    for _ in 0..count {
        if matches!(cr, ChallengeRating::Six) && level >= 3 {
            monsters.push(Monster::standard_monster(cr, level - 2, None, None).creature);
        } else {
            monsters.push(Monster::standard_monster(cr, level, None, None).creature);
        }
    }
    let combat_result = run_combat(pcs, monsters);
    return StandardCombatResult {
        cr,
        level,
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
