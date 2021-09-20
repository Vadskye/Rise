use rise::calculations::statistical_combat::run_combat;
use rise::core_mechanics::{Attribute, HasAttributes};
use rise::creatures::Character;

fn main() {
    for level in vec![2, 8, 14, 20] {
        for attribute in vec![
            Attribute::Strength,
            Attribute::Dexterity,
            Attribute::Constitution,
            Attribute::Perception,
        ] {
            let mut blue = vec![Character::standard_character(level, false).creature];
            blue[0].set_base_attribute(attribute, 4);
            let red = vec![Character::standard_character(level, false).creature];
            let results = run_combat(blue.iter().collect(), red.iter().collect());
            println!(
                "L{:>2}, A{}, {}",
                level,
                attribute.shorthand_name(),
                results
            );
        }
    }
}
