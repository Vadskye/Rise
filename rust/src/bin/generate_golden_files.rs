// Write "golden files" containing standard monster and character calculations.
// These golden files are checked into git, so changes to calculations will change the files.
// They function as change detector tests that are very low effort to write and approve,
// and are formatted usefully so you can quickly eyeball whether the change seems reasonable.
// Golden files use markdown formatting to make them easier to read.
// The file paths used here assume that this is being run from the Rise/rust directory.

use rise::core_mechanics::attacks::Maneuver;
use rise::monsters::ChallengeRating;
use rise::equipment::Weapon;
use rise::creatures::{Monster, HasModifiers, Modifier};
use std::{fs, io};

fn main() -> io::Result<()> {
    // TODO: figure out how to combine results
    write_monster_goldens()
}

fn write_monster_goldens() -> io::Result<()> {
    // TODO: figure out how to combine results
    write_monster_to_section_golden()
}

fn write_monster_to_section_golden() -> io::Result<()> {
    fn create_monster_section(level: i32, elite: bool) -> String {
        let cr = if elite {
            ChallengeRating::Four
        } else {
            ChallengeRating::One
        };
        let mut monster = Monster::standard_monster(cr, level, None, None);
        // Add some stock maneuvers so we can see how the maneuvers are used
        // TODO: convert this to the ability syntax
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
            # Standard Monster To Section

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

fn write_golden_file(subpath: &str, data: String) -> io::Result<()> {
    fs::write(format!("test_goldens/{}.md", subpath), data)
}
