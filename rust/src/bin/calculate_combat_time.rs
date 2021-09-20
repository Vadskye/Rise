use rise::calculations::statistical_combat::run_combat;
use rise::core_mechanics::HasDamageAbsorption;
use rise::creatures::{Character, Monster};
use rise::monsters::ChallengeRating;

fn main() {
    for level in vec![2, 8, 14, 20] {
        for challenge_ratings in vec![
            vec![
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
                ChallengeRating::Half,
            ],
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
            let blue_damage_absorption: i32 = blue
                .iter()
                .map(|c| c.calc_hit_points() + c.calc_damage_resistance())
                .sum();
            let red_damage_absorption: i32 = red
                .iter()
                .map(|c| c.calc_hit_points() + c.calc_damage_resistance())
                .sum();
            let results = run_combat(blue.iter().collect(), red.iter().collect());
            println!(
                "CR{:.1}, L{:>2}, BDA{:>4}, RDA{:>4}, {}",
                challenge_ratings[0].to_string(),
                level,
                blue_damage_absorption,
                red_damage_absorption,
                results
            );
        }
    }
}
