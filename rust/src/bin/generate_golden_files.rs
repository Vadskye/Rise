// Write "golden files" containing standard monster and character calculations.
// These golden files are checked into git, so changes to calculations will change the files.
// They function as change detector tests that are very low effort to write and approve,
// and are formatted usefully so you can quickly eyeball whether the change seems reasonable.
// Golden files use markdown formatting to make them easier to read.
// The file paths used here assume that this is being run from the Rise/rust directory.

use rise::calculations::statistical_combat::{
    calc_rounds_to_live, explain_monster_adpr, explain_standard_adpr, find_best_attack,
    run_combat_at_standard_levels, CombatResult, LeveledPartyGen,
};
use rise::core_mechanics::attacks::{HasAttacks, Maneuver};
use rise::core_mechanics::HasDamageAbsorption;
use rise::creatures::{Character, Creature, HasModifiers, Modifier, Monster};
use rise::monsters::ChallengeRating;
use rise::equipment::Weapon;
use rise::latex_formatting::remove_indentation;
use std::{fs, io};

fn main() -> io::Result<()> {
    write_character_goldens().expect("Should write character goldens");
    write_monster_goldens().expect("Should write monster goldens");

    Result::Ok(())
}

fn write_golden_file(subpath: &str, data: String) -> io::Result<()> {
    fs::write(format!("test_goldens/{}.md", subpath), format!("{}\n", data.trim()))
}

fn write_character_goldens() -> io::Result<()> {
    write_standard_character_attacks_golden().expect("Should write standard character attacks");
    write_perception_greataxe_attacks_golden().expect("Should write perception greataxe attacks");
    write_character_rounds_to_live_golden().expect("Should write rounds to live golden");
    write_standard_character_statistics_golden()
        .expect("Should write standard character statistics golden");
    write_run_pve_combat_golden().expect("Should write PVE combat golden");
    write_run_pvp_combat_golden().expect("Should write PVP combat golden");

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

    write_golden_file(
        "standard_character_attack_dpr",
        format_character_dpr_vs_monster(&explain_character_attacks),
    )
}

fn write_perception_greataxe_attacks_golden() -> io::Result<()> {
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

fn write_character_rounds_to_live_golden() -> io::Result<()> {
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

fn write_standard_character_statistics_golden() -> io::Result<()> {
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

fn write_run_pve_combat_golden() -> io::Result<()> {
    fn difficult_encounter_gen(count: i32) -> Box<LeveledPartyGen> {
        Box::new(move |level| ChallengeRating::difficult_encounter(level, count))
    }

    fn standard_encounter_gen(count: i32) -> Box<LeveledPartyGen> {
        Box::new(move |level| ChallengeRating::standard_encounter(level, count))
    }

    fn multi_monster_counts(party: &LeveledPartyGen, monsters: &dyn Fn(i32) -> Box<LeveledPartyGen>) -> String {
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

    let standard_vs_standard = multi_monster_counts(&standard_character_party, &standard_encounter_gen);
    let standard_vs_difficult = multi_monster_counts(&standard_character_party, &difficult_encounter_gen);
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

fn write_run_pvp_combat_golden() -> io::Result<()> {
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
