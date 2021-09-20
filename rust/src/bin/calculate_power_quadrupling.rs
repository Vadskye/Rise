use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Character;

fn main() {
    for level in vec![8, 11, 14, 17, 20] {
        let blue = vec![Character::standard_character(level, true).creature];
        let level_difference = 6;
        let red = vec![
            Character::standard_sorcerer(level - level_difference, true).creature,
            Character::standard_sorcerer(level - level_difference, true).creature,
            Character::standard_sorcerer(level - level_difference, true).creature,
            Character::standard_sorcerer(level - level_difference, true).creature,
        ];
        let results = run_combat(blue.iter().collect(), red.iter().collect());
        println!("L{}: {}", level, results);
    }
}
