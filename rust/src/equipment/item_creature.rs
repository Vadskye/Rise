use crate::core_mechanics::Attribute;
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier, calculate_minimum_level};

// Return a Creature that can be used to calculate item statistics for an item of the given rank.
// This standard creature has a power halfway between "minimum" and "maximum" reasonable power:
// R1: 2
// R2: 4
// R3: 6
// R4: 8
// R5: 10
// R6: 12
// R7: 14
pub fn item_creature(rank: i32) -> Creature {
    let level = calculate_minimum_level(rank);

    // Start with a 1 perception and increase it at each attribute scaling level.
    // This is somewhere between minimum and maximum reasonable accuracy.
    let perception = 1 + ((level + 3) / 6);

    let power_attribute = match rank {
        -1 => 0,
        0 => 0,
        1 => 2,  // target: 2
        2 => 2,  // target: 4
        3 => 3,  // target: 6
        4 => 3,  // target: 8
        5 => 4,  // target: 10
        6 => 4,  // target: 12
        7 => 5,  // target: 14
        8 => 6, // target: 16
        _ => panic!("Unsupported rank {}", rank),
    };

    let mut creature = Creature::new(level, CreatureCategory::Character);
    creature.add_modifier(
        Modifier::Attribute(Attribute::Perception, perception),
        None,
        None,
    );
    creature.add_modifier(
        Modifier::Attribute(Attribute::Strength, power_attribute),
        None,
        None,
    );
    creature.add_modifier(
        Modifier::Attribute(Attribute::Willpower, power_attribute),
        None,
        None,
    );

    return creature;
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core_mechanics::attacks::HasAttacks;

    #[test]
    fn has_correct_power_at_rank() {
        for rank in 0..8 {
            assert_eq!(
                rank * 2,
                item_creature(rank).calc_power(false),
                "Should have correct power at rank {}; {}",
                rank,
                item_creature(rank).to_latex(),
            );
        }
    }
}
