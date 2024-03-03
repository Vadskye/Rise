use rise::creatures::{Character, Monster};

fn compare_classes() {
    let standard_character = Character::fighter_shield(1);
    println!("standard character {}", standard_character.description());
    let sorcerer_dexterity = Character::sorcerer_dexterity(1);
    println!("standard sorcerer {}", sorcerer_dexterity.description());

    let standard_character = Character::fighter_shield(10);
    println!("standard character {}", standard_character.description());
    let sorcerer_dexterity = Character::sorcerer_dexterity(10);
    println!("standard sorcerer {}", sorcerer_dexterity.description());

    let standard_character = Character::fighter_shield(20);
    println!("standard character {}", standard_character.description());
    let standard_barbarian = Character::barbarian_greataxe(20);
    println!("standard barbarian {}", standard_barbarian.description());
    let sorcerer_dexterity = Character::sorcerer_dexterity(20);
    println!("standard sorcerer {}", sorcerer_dexterity.description());
}

fn level_scaling() {
    println!(
        "Level 2: {}",
        Character::fighter_shield(2).description()
    );
    println!(
        "Level 5: {}",
        Character::fighter_shield(5).description()
    );
    println!(
        "Level 8: {}",
        Character::fighter_shield(8).description()
    );
    println!(
        "Level 14: {}",
        Character::fighter_shield(14).description()
    );
    println!(
        "Level 20: {}",
        Character::fighter_shield(20).description()
    );
}

fn sorcerer_scaling() {
    println!(
        "Level 2: {}",
        Character::sorcerer_dexterity(2).description()
    );
    println!(
        "Level 5: {}",
        Character::sorcerer_dexterity(5).description()
    );
    println!(
        "Level 8: {}",
        Character::sorcerer_dexterity(8).description()
    );
    println!(
        "Level 14: {}",
        Character::sorcerer_dexterity(14).description()
    );
    println!(
        "Level 20: {}",
        Character::sorcerer_dexterity(20).description()
    );
}

fn main() {
    let standard_monster = Monster::standard_example_monster(20);
    println!("standard monster {}", standard_monster.to_section(None));

    // Using `if false` instead of commenting out unused sections avoid lint errors for unused
    // code. This file doesn't really matter, but we don't want to get warnings about it.
    if false {
        compare_classes();
        level_scaling();
    }
    sorcerer_scaling();
}
