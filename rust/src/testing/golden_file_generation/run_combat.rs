use crate::calculations::statistical_combat::{
    run_combat_at_standard_levels, CombatResult, LeveledPartyGen,
};


use crate::creatures::{Character, Creature};


use crate::monsters::ChallengeRating;

use std::{io};

use super::write_golden_file;

fn four_stack(creature: Creature) -> Vec<Creature> {
    vec![
        creature.clone(),
        creature.clone(),
        creature.clone(),
        creature.clone(),
    ]
}

fn barbarian_party(level: i32) -> Vec<Creature> {
    four_stack(Character::standard_barbarian(level, true).creature)
}

fn standard_character_party(level: i32) -> Vec<Creature> {
    four_stack(Character::standard_character(level, true).creature)
}

fn mixed_character_party(level: i32) -> Vec<Creature> {
    vec![
        Character::standard_character(level, true).creature,
        Character::perception_greataxe(level).creature,
        Character::standard_barbarian(level, true).creature,
        Character::standard_sorcerer(level, true).creature,
    ]
}

fn standard_greataxe_party(level: i32) -> Vec<Creature> {
    four_stack(Character::standard_greataxe(level, true).creature)
}

fn format_results(results: Vec<CombatResult>) -> String {
    results
        .into_iter()
        .map(|r| format!("{}", r))
        .collect::<Vec<String>>()
        .join("\n")
}

pub fn write_run_pve_combat_golden() -> io::Result<()> {
    fn difficult_encounter_gen(count: i32) -> Box<LeveledPartyGen> {
        Box::new(move |level| ChallengeRating::difficult_encounter(level, count))
    }

    fn standard_encounter_gen(count: i32) -> Box<LeveledPartyGen> {
        Box::new(move |level| ChallengeRating::standard_encounter(level, count))
    }

    fn multi_monster_counts(
        party: &LeveledPartyGen,
        monsters: &dyn Fn(i32) -> Box<LeveledPartyGen>,
    ) -> String {
        let one_monster = format_results(run_combat_at_standard_levels(party, &*monsters(1)));
        let two_monsters = format_results(run_combat_at_standard_levels(party, &*monsters(2)));
        let four_monsters = format_results(run_combat_at_standard_levels(party, &*monsters(4)));
        let eight_monsters = format_results(run_combat_at_standard_levels(party, &*monsters(8)));

        format!(
            "
### 1 monster
{one_monster}

### 2 monsters
{two_monsters}

### 4 monsters
{four_monsters}

### 8 monsters
{eight_monsters}
            ",
        )
    }

    let standard_vs_standard =
        multi_monster_counts(&standard_character_party, &standard_encounter_gen);
    let standard_vs_difficult =
        multi_monster_counts(&standard_character_party, &difficult_encounter_gen);
    let mixed_vs_standard = multi_monster_counts(&mixed_character_party, &standard_encounter_gen);
    let mixed_vs_difficult = multi_monster_counts(&mixed_character_party, &difficult_encounter_gen);

    let golden = format!(
        "
# Run Player vs Environment Combat

## Standard character vs standard encounter
{standard_vs_standard}

## Standard character vs difficult encounter
{standard_vs_difficult}

## Mixed party vs standard encounter
{mixed_vs_standard}

## Mixed party vs difficult encounter
{mixed_vs_difficult}
        ",
    );

    write_golden_file("run_pve_combat", golden)
}

pub fn write_run_pvp_combat_golden() -> io::Result<()> {
    let barbarian_vs_barbarian = format_results(run_combat_at_standard_levels(
        &barbarian_party,
        &barbarian_party,
    ));
    let standard_vs_greataxe = format_results(run_combat_at_standard_levels(
        &standard_character_party,
        &standard_greataxe_party,
    ));
    let standard_vs_standard = format_results(run_combat_at_standard_levels(
        &standard_character_party,
        &standard_character_party,
    ));

    let golden = format!(
        "
# Run Player vs Player Combat

## Player vs player

### Barbarian vs barbarian
{barbarian_vs_barbarian}

### Standard character vs standard greataxe
{standard_vs_greataxe}

### Standard character vs standard character
{standard_vs_standard}
        ",
    );

    write_golden_file("run_pvp_combat", golden)
}
