// Write "golden files" containing standard monster and character calculations.
// These golden files are checked into git, so changes to calculations will change the files.
// They function as change detector tests that are very low effort to write and approve,
// and are formatted usefully so you can quickly eyeball whether the change seems reasonable.
// Golden files use markdown formatting to make them easier to read.
// The file paths used here assume that this is being run from the Rise/rust directory.








use rise::testing::golden_files;
use std::{io};

fn main() -> io::Result<()> {
    write_character_goldens().expect("Should write character goldens");
    write_monster_goldens().expect("Should write monster goldens");

    golden_files::write_run_pve_combat_golden().expect("Should write PVE combat golden");
    golden_files::write_run_pvp_combat_golden().expect("Should write PVP combat golden");

    Result::Ok(())
}

fn write_character_goldens() -> io::Result<()> {
    golden_files::write_standard_character_attacks_golden().expect("Should write standard character attacks");
    golden_files::write_perception_greataxe_attacks_golden().expect("Should write perception greataxe attacks");
    golden_files::write_character_rounds_to_live_golden().expect("Should write rounds to live golden");
    golden_files::write_standard_character_statistics_golden()
        .expect("Should write standard character statistics golden");

    Result::Ok(())
}

fn write_monster_goldens() -> io::Result<()> {
    golden_files::write_monster_attacks_golden().expect("Should write monster attacks");
    golden_files::write_monster_to_section_golden().expect("Should write to_section");

    Result::Ok(())
}
