use rise::core_mechanics::combat::run_combat;
use rise::monsters;
use rise::monsters::ChallengeRating;

fn main() {
    for level in vec![5, 8, 11, 14, 17, 20] {
        let blue = vec![monsters::Monster::standard_monster(
            ChallengeRating::Two,
            level,
            None,
            None,
        )];
        let level_difference = 3;
        let red = vec![
            monsters::Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None),
            monsters::Monster::standard_monster(ChallengeRating::Two, level - level_difference, None, None),
        ];
        let results = run_combat(blue, red);
        println!("L{}: {}", level, results);
    }
}
