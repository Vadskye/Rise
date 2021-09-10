use rise::classes::Character;
use rise::core_mechanics::{Attribute, HasAttributes};
use rise::calculations::statistical_combat::run_combat;

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
            let red = vec![Character::standard_character(level, false)];
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
