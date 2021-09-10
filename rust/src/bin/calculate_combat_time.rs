use rise::classes::Character;
use rise::monsters;
use rise::monsters::ChallengeRating;
use rise::simulation::combat::run_combat;

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
                Character::standard_character(level, true),
                Character::standard_character(level, true),
                Character::standard_character(level, true),
                Character::standard_character(level, true),
            ];
            let mut red = vec![];
            for cr in &challenge_ratings {
                red.push(monsters::Monster::standard_monster(*cr, level, None, None));
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
