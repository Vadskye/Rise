use rise::{
    creatures::{Character, Monster},
    monsters::ChallengeRating,
};

fn compare_classes() {
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

fn level_scaling() {
    println!(
        "Level 2: {}",
        Character::standard_character(2, true).description()
    );
    println!(
        "Level 5: {}",
        Character::standard_character(5, true).description()
    );
    println!(
        "Level 8: {}",
        Character::standard_character(8, true).description()
    );
    println!(
        "Level 14: {}",
        Character::standard_character(14, true).description()
    );
    println!(
        "Level 20: {}",
        Character::standard_character(20, true).description()
    );
}

fn sorcerer_scaling() {
    println!(
        "Level 2: {}",
        Character::standard_sorcerer(2, true).description()
    );
    println!(
        "Level 5: {}",
        Character::standard_sorcerer(5, true).description()
    );
    println!(
        "Level 8: {}",
        Character::standard_sorcerer(8, true).description()
    );
    println!(
        "Level 14: {}",
        Character::standard_sorcerer(14, true).description()
    );
    println!(
        "Level 20: {}",
        Character::standard_sorcerer(20, true).description()
    );
}

fn main() {
    let standard_monster = Monster::standard_example_monster(20);
    println!("standard monster {}", standard_monster.to_section(None));

    // compare_classes();
    // level_scaling();
    sorcerer_scaling();
}
