

use crate::core_mechanics::HasDamageAbsorption;
use crate::creatures::{Character, HasModifiers};

use crate::latex_formatting::remove_indentation;


use std::{io};

use super::write_golden_file;

pub fn write_standard_character_statistics_golden() -> io::Result<()> {
    fn character_statistics(level: i32) -> String {
        let character = Character::standard_character(level, true);
        format!(
            "
## Level {level}

### Damage Absorption
{damage_absorption}

### Description
{description}

### Modifiers
{modifiers}
            ",
            level = level,
            damage_absorption = character.creature.explain_damage_absorption().trim(),
            description = remove_indentation(character.description().trim()),
            modifiers = character.creature.explain_modifiers().join("\n").trim(),
        )
    }

    let golden = format!(
        "
# Standard Character Statistics

{level_1}

{level_10}

{level_20}
        ",
        level_1 = character_statistics(1).trim(),
        level_10 = character_statistics(10).trim(),
        level_20 = character_statistics(20).trim(),
    );

    write_golden_file("standard_character_statistics", golden)
}
