use crate::calculations::statistical_combat::calc_rounds_to_live;
use crate::creatures::{Character, Creature, Monster};
use std::io;

use super::write_golden_file;

pub fn write_character_rounds_to_live_golden() -> io::Result<()> {
    fn rtl_by_level(attacker_gen: &dyn Fn(i32) -> Creature) -> String {
        vec![1, 5, 10, 15, 20]
            .into_iter()
            .map(|level| {
                let attacker = attacker_gen(level);

                let mut defenders: Vec<Creature> = Character::standard_set(level)
                    .into_iter()
                    .map(|c| c.creature)
                    .collect();
                defenders.append(
                    &mut Monster::standard_set(level)
                        .into_iter()
                        .map(|c| c.creature)
                        .collect(),
                );

                format!(
                    "### Level {}

{}",
                    level,
                    defenders
                        .iter()
                        .map(|c| format!(
                            "{: <20}: {:.2}",
                            c.name.as_ref().unwrap(),
                            calc_rounds_to_live(&vec![&attacker], &vec![&c])
                        ))
                        .collect::<Vec<String>>()
                        .join("\n"),
                )
            })
            .collect::<Vec<String>>()
            .join("\n\n")
    }

    let barbarian_greatmace = |level: i32| Character::barbarian_greatmace(level).creature;
    let fighter_shield = |level: i32| Character::fighter_shield(level).creature;
    let fighter_greatmace = |level: i32| Character::fighter_greatmace(level).creature;
    let rogue_smallsword = |level: i32| Character::rogue_smallsword(level).creature;
    let sorcerer_dexterity = |level: i32| Character::sorcerer_dexterity(level).creature;
    let wizard_perception = |level: i32| Character::wizard_perception(level).creature;

    let golden = format!(
        "# Character Rounds to Live

## Barbarian Greatmace

{barbarian_greatmace_rtl}

## Fighter Greatmace

{fighter_greatmace_rtl}

## Fighter Shield

{fighter_shield_rtl}

## Rogue Smallsword

{rogue_smallsword_rtl}

## Sorcerer Dexterity

{sorcerer_dexterity_rtl}

## Wizard Perception

{wizard_perception_rtl}",
        barbarian_greatmace_rtl = rtl_by_level(&barbarian_greatmace),
        fighter_greatmace_rtl = rtl_by_level(&fighter_greatmace),
        fighter_shield_rtl = rtl_by_level(&fighter_shield),
        rogue_smallsword_rtl = rtl_by_level(&rogue_smallsword),
        sorcerer_dexterity_rtl = rtl_by_level(&sorcerer_dexterity),
        wizard_perception_rtl = rtl_by_level(&wizard_perception),
    );

    write_golden_file("character_rounds_to_live", golden)
}
