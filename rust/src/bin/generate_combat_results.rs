use rise::calculations::statistical_combat::{run_combat, CombatResult};
use rise::creatures::{Character, Monster};
use rise::monsters::ChallengeRating;
use serde::{Deserialize, Serialize};
use serde_json::Result;

fn main() {
    let mut standard_combat_results = vec![];
    for level in 1..22 {
        for cr in vec![
            ChallengeRating::Half,
            ChallengeRating::One,
            ChallengeRating::Two,
            ChallengeRating::Four,
        ] {
            standard_combat_results.push(run_standard_combat(level, cr));
        }
    }

    let json_string: Result<String> = serde_json::to_string_pretty(&standard_combat_results);

    if let Ok(s) = json_string {
        println!("{}", s);
    }
}

#[derive(Deserialize, Serialize)]
struct StandardCombatResult {
    cr: ChallengeRating,
    level: i32,
    result: CombatResult,
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
        monsters.push(Monster::standard_monster(cr, level, None, None).creature);
    }
    return StandardCombatResult {
        cr,
        level,
        result: run_combat(pcs, monsters),
    };
}
