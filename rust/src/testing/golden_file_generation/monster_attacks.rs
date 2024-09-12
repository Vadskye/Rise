use crate::calculations::statistical_combat::explain_full_adpr;
use crate::core_mechanics::attacks::HasAttacks;

use crate::creatures::{Character, Monster};

use std::io;

use super::write_golden_file;

pub fn write_monster_attacks_golden() -> io::Result<()> {
    fn explain_monster_attacks(level: i32, elite: bool) -> String {
        let attacker = Monster::example_monster(elite, level).creature;
        let defender = Character::paladin_shield(level).creature;

        format!(
            "### Attacks
{attacks}

### Results
{results}",
            attacks = attacker.explain_attacks().join(", "),
            results = explain_full_adpr(&attacker, &defender).join("\n"),
        )
    }

    fn format_levels(elite: bool) -> String {
        [1, 5, 10, 15, 20]
            .iter()
            .map(|&level| {
                format!(
                    "### Level {level}

{attacks}",
                    attacks = explain_monster_attacks(level, elite)
                )
            })
            .collect::<Vec<String>>()
            .join("\n\n")
    }

    let golden = format!(
        "
# Monster Attack DPR

## Normal

{normal}

## Elite

{elite}",
        normal = format_levels(false),
        elite = format_levels(true),
    );

    write_golden_file("monster_attack_dpr", golden)
}
