use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Character;

fn main() {
    for level in vec![4, 7, 10, 13, 16, 19] {
        let blue = vec![Character::fighter_shield(level).creature];
        let level_difference = 3;
        let red = vec![
            Character::fighter_shield(level).creature,
            Character::fighter_shield(level).creature,
        ];
        let results = run_combat(blue, red);
        println!("L{}: {}", level, results);
    }
}
