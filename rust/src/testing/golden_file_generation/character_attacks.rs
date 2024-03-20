use crate::calculations::statistical_combat::{
    calc_attack_damage_per_round, explain_full_adpr, explain_maneuver_adpr, find_best_attack,
};
use crate::core_mechanics::attacks::HasAttacks;
use crate::creatures::{Character, Creature, Monster};
use std::io;

use super::write_golden_file;

fn format_attack_results(attacker: &Creature, defender: &Creature) -> String {
    format!(
        "### Defender: {defender_name}
Best attack: {best}

#### Detailed attack results
{results}",
        defender_name = defender.name.as_ref().unwrap(),
        best = find_best_attack(attacker, defender).unwrap().name,
        // This is hacky. `explain_maneuver_adpr` has cleaner formatting for people who only have
        // maneuvers, but we don't have an easy way to identify that.
        results = if attacker.get_attack_by_substring("Bolt").is_some() {
            explain_full_adpr(attacker, defender)
        } else {
            explain_maneuver_adpr(attacker, defender)
        }
        .join("\n"),
    )
}

fn format_character_dpr_vs_monster(attacker_generator: &dyn Fn(i32) -> Creature) -> String {
    let attacker_name = attacker_generator(1).name.unwrap();
    let levels = [1, 5, 10, 15, 20];
    format!(
        "# {} Attack Comparison

{}",
        attacker_name,
        levels
            .iter()
            .map(|level| explain_character_attacks(*level, &attacker_generator(*level)))
            .collect::<Vec<String>>()
            .join("\n\n")
    )
}

fn explain_character_attacks(level: i32, attacker: &Creature) -> String {
    let defenders = Character::standard_set(level)
        .into_iter()
        .map(|c| c.creature)
        .collect();

    format_attacks_at_level(level, attacker, &defenders)
}

pub fn write_brute_attacks_golden() -> io::Result<()> {
    write_golden_file(
        "brute_attacks",
        format_character_dpr_vs_monster(&|level| Monster::standard_brute(level).creature),
    )
}

pub fn write_mystic_attacks_golden() -> io::Result<()> {
    write_golden_file(
        "mystic_attacks",
        format_character_dpr_vs_monster(&|level| Monster::standard_mystic(level).creature),
    )
}

pub fn write_fighter_shield_attacks_golden() -> io::Result<()> {
    write_golden_file(
        "fighter_shield_attacks",
        format_character_dpr_vs_monster(&|level| Character::fighter_shield(level).creature),
    )
}

pub fn write_fighter_greatmace_attacks_golden() -> io::Result<()> {
    write_golden_file(
        "fighter_greatmace_attacks",
        format_character_dpr_vs_monster(&|level| Character::fighter_greatmace(level).creature),
    )
}

pub fn write_perception_greataxe_attacks_golden() -> io::Result<()> {
    write_golden_file(
        "fighter_perception_greataxe",
        format_character_dpr_vs_monster(&|level| {
            Character::fighter_perception_greataxe(level).creature
        }),
    )
}

fn format_attacks_at_level(level: i32, attacker: &Creature, defenders: &Vec<Creature>) -> String {
    format!(
        "## Level {level}

{formatted_attacks}

{formatted_defenders}",
        formatted_attacks = attacker.explain_attacks().join("\n"),
        formatted_defenders = defenders
            .iter()
            .map(|c| format_attack_results(attacker, c))
            .collect::<Vec<String>>()
            .join("\n\n"),
    )
}

// This provides much less detail about the best attacks are calculated, and just shows the
// best attack for many combinations of attackers and defenders.
pub fn write_attack_comparison_golden() -> io::Result<()> {
    fn at_level(level: i32) -> String {
        let defenders = Creature::standard_set(level);
        let formatted_attackers = Creature::standard_set(level)
            .iter()
            .map(|c| format_attacker(&c, &defenders))
            .collect::<Vec<String>>()
            .join("\n\n");

        format!(
            "## Level {level}

{formatted_attackers}"
        )
    }

    let golden = format!(
        "# Attack Comparison

{}",
        [1, 5, 10, 15, 20]
            .iter()
            .map(|level| at_level(*level))
            .collect::<Vec<String>>()
            .join("\n\n"),
    );

    write_golden_file("attack_comparison", golden)
}

fn format_attacker(attacker: &Creature, defenders: &Vec<Creature>) -> String {
    format!(
        "### Attacker: {}

{}",
        attacker.name.as_ref().unwrap(),
        defenders
            .iter()
            .map(|c| format_best_attack_shorthand(attacker, c))
            .collect::<Vec<String>>()
            .join("\n")
    )
}

fn format_best_attack_shorthand(attacker: &Creature, defender: &Creature) -> String {
    let best_attack = find_best_attack(attacker, defender).unwrap();

    format!(
        "vs {: <20}: {: <20} ({:.0}% hit chance)",
        defender.name.as_ref().unwrap(),
        best_attack.name,
        calc_attack_damage_per_round(&best_attack, attacker, defender).hit_probability * 100.0
    )
}
