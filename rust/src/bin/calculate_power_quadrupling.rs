use rise::calculations::statistical_combat::run_combat;
use rise::creatures::Character;

fn main() {
    for level in vec![8, 11, 14, 17, 20] {
        let blue = vec![Character::fighter_shield(level).creature];
        let level_difference = 7;
        let red = vec![
            Character::sorcerer_dexterity(level - level_difference).creature,
            Character::sorcerer_dexterity(level - level_difference).creature,
            Character::sorcerer_dexterity(level - level_difference).creature,
            Character::sorcerer_dexterity(level - level_difference).creature,
        ];
        let results = run_combat(blue, red);
        println!("L{}: {}", level, results);
    }
}
