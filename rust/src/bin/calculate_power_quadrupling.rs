use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Monster;
use rise::monsters::ChallengeRating;

fn main() {
    for level in vec![8, 11, 14, 17, 20] {
        let blue =
            vec![Monster::standard_monster(ChallengeRating::Two, level, None, None).creature];
        let level_difference = 6;
        let red = vec![
            Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None)
                .creature,
            Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None)
                .creature,
            Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None)
                .creature,
            Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None)
                .creature,
        ];
        let results = run_combat(blue, red);
        println!("L{}: {}", level, results);
    }
}
