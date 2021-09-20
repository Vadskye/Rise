use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Character;

fn main() {
    for level in vec![4, 7, 10, 13, 16, 19] {
        let blue = vec![Character::standard_character(level, true).creature];
        let level_difference = 3;
        let red = vec![
            Character::standard_character(level - level_difference, true).creature,
            Character::standard_character(level - level_difference, true).creature,
        ];
        let results = run_combat(blue.iter().collect(), red.iter().collect());
        println!("L{}: {}", level, results);
    }
}
