use crate::calculations::statistical_combat::calc_rounds_to_live;
use crate::creatures::{Character, Creature, Monster};
use std::io;

use super::write_golden_file;

pub fn write_character_rounds_to_live_golden() -> io::Result<()> {
    fn rtl_by_level(
        attacker_gen: &dyn Fn(i32) -> Creature,
        defender_gen: &dyn Fn(i32) -> Creature,
    ) -> String {
        vec![1, 5, 10, 15, 20]
            .into_iter()
            .map(|level| {
                let attacker = attacker_gen(level);
                let defender = defender_gen(level);

                format!(
                    "Level {}: {}",
                    level,
                    calc_rounds_to_live(&vec![&attacker], &vec![&defender])
                )
            })
            .collect::<Vec<String>>()
            .join("\n")
    }

    let barb = |level: i32| Character::standard_barbarian(level, true).creature;
    let fighter = |level: i32| Character::standard_character(level, true).creature;
    let greataxe = |level: i32| Character::perception_greataxe(level).creature;
    let sorc = |level: i32| Character::standard_sorcerer(level, true).creature;
    let standard_monster = |level: i32| Monster::standard_example_monster(level).creature;
    let elite_monster = |level: i32| Monster::elite_example_monster(level).creature;

    let golden = format!(
        "# Character Rounds to Live

## Barbarian vs Barbarian
{barb_vs_barb}

## Fighter vs Fighter
{fighter_vs_fighter}

## Fighter vs Greataxe Perception Fighter
{fighter_vs_greataxe}

## Fighter vs Standard Monster
{fighter_vs_standard}

## Fighter vs Elite Monster
{fighter_vs_elite}

## Fighter vs Sorcerer
{fighter_vs_sorc}

## Greataxe Perception vs Greataxe Perception
{greataxe_vs_greataxe}

## Sorcerer vs Sorcerer
{sorc_vs_sorc}",
        barb_vs_barb = rtl_by_level(&barb, &barb),
        fighter_vs_fighter = rtl_by_level(&fighter, &fighter),
        fighter_vs_greataxe = rtl_by_level(&fighter, &greataxe),
        fighter_vs_standard = rtl_by_level(&fighter, &standard_monster),
        fighter_vs_elite = rtl_by_level(&fighter, &elite_monster),
        fighter_vs_sorc = rtl_by_level(&fighter, &sorc),
        greataxe_vs_greataxe = rtl_by_level(&greataxe, &greataxe),
        sorc_vs_sorc = rtl_by_level(&sorc, &sorc),
    );

    write_golden_file("character_rounds_to_live", golden)
}
