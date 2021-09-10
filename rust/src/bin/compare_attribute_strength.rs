use rise::classes::Character;
use rise::core_mechanics::{Attribute, HasAttributes};

use rise::simulation::combat::run_combat;

fn main() {
    for level in vec![2, 8, 14, 20] {
        for attribute_pair in vec![
            [Attribute::Strength, Attribute::Dexterity],
            [Attribute::Strength, Attribute::Constitution],
            [Attribute::Dexterity, Attribute::Constitution],
            [Attribute::Strength, Attribute::Perception],
            [Attribute::Dexterity, Attribute::Perception],
            [Attribute::Constitution, Attribute::Perception],
            [Attribute::Strength, Attribute::Intelligence],
            [Attribute::Dexterity, Attribute::Intelligence],
            [Attribute::Constitution, Attribute::Intelligence],
            [Attribute::Perception, Attribute::Intelligence],
        ] {
            let mut blue = vec![Character::standard_character(level, false)];
            blue[0].set_base_attribute(attribute_pair[0], 4);
            let mut red = vec![Character::standard_character(level, false)];
            red[0].set_base_attribute(attribute_pair[1], 4);
            let results = run_combat(blue, red);
            println!(
                "L{:>2}, A1{}, A2{}, {}",
                level,
                attribute_pair[0].shorthand_name(),
                attribute_pair[1].shorthand_name(),
                results
            );
        }
    }
}
