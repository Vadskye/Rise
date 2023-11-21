// Write "golden files" containing standard monster and character calculations.
// These golden files are checked into git, so changes to calculations will change the files.
// They function as change detector tests that are very low effort to write and approve,
// and are formatted usefully so you can quickly eyeball whether the change seems reasonable.
// Golden files use markdown formatting to make them easier to read.
// The file paths used here assume that this is being run from the Rise/rust directory.

use rise::calculations::statistical_combat::{explain_monster_adpr, explain_standard_adpr, find_best_attack};
use rise::core_mechanics::attacks::{HasAttacks, Maneuver};

use rise::equipment::Weapon;
use rise::creatures::{Character, Creature, Monster, HasModifiers, Modifier};
use std::{fs, io};

fn main() -> io::Result<()> {
    write_character_goldens().expect("Should write character goldens");
    write_monster_goldens().expect("Should write monster goldens");

    Result::Ok(())
}

fn write_golden_file(subpath: &str, data: String) -> io::Result<()> {
    fs::write(format!("test_goldens/{}.md", subpath), data.trim())
}

fn write_character_goldens() -> io::Result<()> {
    write_standard_character_attacks_golden().expect("Should write standard character attacks");
    write_perception_greataxe_attacks_golden().expect("Should write perception greataxe attacks");

    Result::Ok(())
}

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

fn write_standard_character_attacks_golden() -> io::Result<()> {
    fn explain_character_attacks(level: i32, elite: bool) -> String {
        let attacker = Character::standard_character(level, true).creature;
        let defender = Monster::example_monster(elite, level, None, None).creature;

        format_character_attacks(attacker, defender)
    }

    write_golden_file("standard_character_attack_dpr", format_character_dpr_vs_monster(&explain_character_attacks))
}

fn write_perception_greataxe_attacks_golden() -> io::Result<()> {
    fn explain_character_attacks(level: i32, elite: bool) -> String {
        let attacker = Character::perception_greataxe(level).creature;
        let defender = Monster::example_monster(elite, level, None, None).creature;

        format_character_attacks(attacker, defender)
    }

    write_golden_file("perception_greataxe_attack_dpr", format_character_dpr_vs_monster(&explain_character_attacks))
}

fn write_monster_goldens() -> io::Result<()> {
    write_monster_attacks_golden().expect("Should write monster attacks");
    write_monster_to_section_golden().expect("Should write to_section");

    Result::Ok(())
}

fn write_monster_attacks_golden() -> io::Result<()> {
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

fn write_monster_to_section_golden() -> io::Result<()> {
    fn create_monster_section(level: i32, elite: bool) -> String {
        let mut monster = Monster::example_monster(elite, level, None, None);
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
