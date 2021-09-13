use rise::calculations::statistical_combat::run_combat;
use rise::creatures::{Character, Monster};
use rise::monsters::ChallengeRating;

fn main() {
    for level in vec![2, 5, 8, 11, 14, 17, 20] {
        for challenge_ratings in vec![
            vec![
                ChallengeRating::One,
                ChallengeRating::One,
                ChallengeRating::One,
                ChallengeRating::One,
            ],
            vec![ChallengeRating::Two, ChallengeRating::Two],
            vec![ChallengeRating::Three, ChallengeRating::One],
            vec![ChallengeRating::Four],
        ] {
            // PCs
            let blue = vec![
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
                Character::standard_character(level, true).creature,
            ];
            let mut red = vec![];
            for cr in &challenge_ratings {
                red.push(Monster::standard_monster(*cr, level, None, None).creature);
            }
            let results = run_combat(blue, red);
            println!(
                "CR{}, L{} {}",
                challenge_ratings[0].to_string(),
                level,
                results
            );
        }
    }
}
