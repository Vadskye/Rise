use rise::classes::Character;
use rise::core_mechanics::{Attribute, HasAttributes};

use rise::monsters::{ChallengeRating, Monster};
use rise::simulation::combat::run_combat;

fn main() {
    for level in vec![2, 8, 14, 20] {
        for attribute in vec![
            Attribute::Strength,
            Attribute::Dexterity,
            Attribute::Constitution,
            Attribute::Perception,
        ] {
            let mut blue = vec![Character::standard_character(level, false)];
            blue[0].set_base_attribute(attribute, 4);
            let red = vec![Monster::standard_monster(
                ChallengeRating::Two,
                level,
                Some(0),
                None,
            )];
            let results = run_combat(blue, red);
            println!(
                "L{:>2}, A{}, {}",
                level,
                attribute.shorthand_name(),
                results
            );
        }
    }
}
