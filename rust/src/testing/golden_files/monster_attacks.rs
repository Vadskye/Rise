use crate::calculations::statistical_combat::{
    explain_monster_adpr,
};
use crate::core_mechanics::attacks::{HasAttacks};

use crate::creatures::{Character, Monster};




use std::{io};

use super::write_golden_file;

pub fn write_monster_attacks_golden() -> io::Result<()> {
    fn explain_monster_attacks(level: i32, elite: bool) -> String {
        let attacker = Monster::example_monster(elite, level, None, None).creature;
        let defender = Character::standard_character(level, true).creature;

        format!(
            "### Attacks
{attacks}

### Results
{results}",
            attacks = attacker.explain_attacks().join(", "),
            results = explain_monster_adpr(&attacker, &defender).join("\n"),
        )
    }

    let golden = format!(
        "
# Monster Attack DPR

## Level 1 Normal

{level_1_normal}

## Level 1 Elite

{level_1_elite}

## Level 10 Normal

{level_10_normal}

## Level 10 Elite

{level_10_elite}
        ",
        level_1_normal = explain_monster_attacks(1, false),
        level_1_elite = explain_monster_attacks(1, true),
        level_10_normal = explain_monster_attacks(10, false),
        level_10_elite = explain_monster_attacks(10, true),
    );

    write_golden_file("monster_attack_dpr", golden)
}
