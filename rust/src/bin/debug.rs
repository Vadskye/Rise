use rise::{
    creatures::{Character, Monster},
    monsters::ChallengeRating,
};

fn main() {
    let standard_monster = Monster::standard_monster(ChallengeRating::Two, 10, None, None);
    println!("standard monster {}", standard_monster.to_section(None));

    let standard_character = Character::standard_character(1, true);
    println!("standard character {}", standard_character.description());
    let standard_sorcerer = Character::standard_sorcerer(1, true);
    println!("standard sorcerer {}", standard_sorcerer.description());

    let standard_character = Character::standard_character(10, true);
    println!("standard character {}", standard_character.description());
    let standard_sorcerer = Character::standard_sorcerer(10, true);
    println!("standard sorcerer {}", standard_sorcerer.description());

    let standard_character = Character::standard_character(20, true);
    println!("standard character {}", standard_character.description());
    let standard_barbarian = Character::standard_barbarian(20, true);
    println!("standard barbarian {}", standard_barbarian.description());
    let standard_sorcerer = Character::standard_sorcerer(20, true);
    println!("standard sorcerer {}", standard_sorcerer.description());
}
