use crate::calculations::statistical_combat::{explain_standard_adpr, find_best_attack};
use crate::core_mechanics::attacks::HasAttacks;
use crate::creatures::{Character, Creature, Monster};
use std::io;

use super::write_golden_file;

fn format_character_attacks(attacker: Creature, defender: Creature) -> String {
    format!(
        "### Attacks
{attacks}

### Results
{results}

### Best attack
{best}",
        attacks = attacker.explain_attacks().join("\n"),
        results = explain_standard_adpr(&attacker, &defender).join("\n"),
        best = find_best_attack(&attacker, &defender).unwrap().name,
    )
}

fn format_character_dpr_vs_monster(explainer: &dyn Fn(i32, bool) -> String) -> String {
    format!(
        "# Character Attack DPR

## Level 1 vs Normal Monster

{level_1_normal}

## Level 1 vs Elite Monster

{level_1_elite}

## Level 10 vs Normal Monster

{level_10_normal}

## Level 10 vs Elite Monster

{level_10_elite}

## Level 20 vs Normal Monster

{level_20_normal}

## Level 20 vs Elite Monster

{level_20_elite}",
        level_1_normal = explainer(1, false),
        level_1_elite = explainer(1, true),
        level_10_normal = explainer(10, false),
        level_10_elite = explainer(10, true),
        level_20_normal = explainer(20, false),
        level_20_elite = explainer(20, true),
    )
}

pub fn write_standard_character_attacks_golden() -> io::Result<()> {
    fn explain_character_attacks(level: i32, elite: bool) -> String {
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::example_monster(elite, level, None, None).creature;

        format_character_attacks(attacker, defender)
    }

    write_golden_file(
        "standard_character_attack_dpr",
        format_character_dpr_vs_monster(&explain_character_attacks),
    )
}

pub fn write_perception_greataxe_attacks_golden() -> io::Result<()> {
    fn explain_character_attacks(level: i32, elite: bool) -> String {
        let attacker = Character::perception_greataxe(level).creature;
        let defender = Monster::example_monster(elite, level, None, None).creature;

        format_character_attacks(attacker, defender)
    }

    write_golden_file(
        "perception_greataxe_attack_dpr",
        format_character_dpr_vs_monster(&explain_character_attacks),
    )
}
