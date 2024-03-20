
use crate::core_mechanics::attacks::{Maneuver};

use crate::creatures::{HasModifiers, Modifier, Monster};
use crate::equipment::Weapon;



use std::{io};

use super::write_golden_file;

pub fn write_monster_to_section_golden() -> io::Result<()> {
    fn create_monster_section(level: i32, elite: bool) -> String {
        let mut monster = Monster::example_monster(elite, level);
        // Add some stock maneuvers so we can see how the maneuvers are used
        monster.creature.weapons.push(Weapon::greatsword());
        monster
            .creature
            .add_modifier(Modifier::Maneuver(Maneuver::Whirlwind), None, None);
        monster
            .creature
            .add_modifier(Modifier::Maneuver(Maneuver::CertainStrike), None, None);

        monster.to_section(None)
    }

    let golden = format!(
        "
# Standard Monster to_section()

## Level 1 Normal
{level_1_normal}

## Level 1 Elite
{level_1_elite}

## Level 10 Normal
{level_10_normal}

## Level 10 Elite
{level_10_elite}
        ",
        level_1_normal = create_monster_section(1, false),
        level_1_elite = create_monster_section(1, true),
        level_10_normal = create_monster_section(10, false),
        level_10_elite = create_monster_section(10, true),
    );

    write_golden_file("monster_to_section", golden)
}
