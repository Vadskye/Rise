// Write "golden files" containing standard monster and character calculations.
// These golden files are checked into git, so changes to calculations will change the files.
// They function as change detector tests that are very low effort to write and approve,
// and are formatted usefully so you can quickly eyeball whether the change seems reasonable.
// Golden files use markdown formatting to make them easier to read.
// The file paths used here assume that this is being run from the Rise/rust directory.

use rise::testing::golden_file_generation;
use std::io;

fn main() -> io::Result<()> {
    write_character_goldens().expect("Should write character goldens");
    write_monster_goldens().expect("Should write monster goldens");

    golden_file_generation::write_attribute_statistics_golden()
        .expect("Should write attribute statistics golden");
    golden_file_generation::write_run_pve_combat_golden().expect("Should write PVE combat golden");
    golden_file_generation::write_run_pvp_combat_golden().expect("Should write PVP combat golden");
    golden_file_generation::write_pve_accuracy_golden().expect("Should write PVE accuracy golden");
    golden_file_generation::write_pvp_accuracy_golden().expect("Should write PVP accuracy golden");

    Result::Ok(())
}

fn write_character_goldens() -> io::Result<()> {
    golden_file_generation::write_class_statistics_golden()
        .expect("Should write class statistics golden");
    golden_file_generation::write_fighter_greatmace_attacks_golden()
        .expect("Should write fighter greatmace attacks");
    golden_file_generation::write_fighter_shield_attacks_golden()
        .expect("Should write fighter shield attacks");
    golden_file_generation::write_perception_greataxe_attacks_golden()
        .expect("Should write perception greataxe attacks");

    golden_file_generation::write_attack_comparison_golden()
        .expect("Should write attack comparison");
    golden_file_generation::write_character_rounds_to_live_golden()
        .expect("Should write character rounds to live golden");
    golden_file_generation::write_character_defenses_golden()
        .expect("Should write character defenses golden");
    golden_file_generation::write_standard_character_statistics_golden()
        .expect("Should write standard character statistics golden");

    Result::Ok(())
}

fn write_monster_goldens() -> io::Result<()> {
    golden_file_generation::write_mystic_attacks_golden().expect("Should write mystic attacks");
    golden_file_generation::write_brute_attacks_golden().expect("Should write brute attacks");
    golden_file_generation::write_monster_attacks_golden().expect("Should write monster attacks");
    golden_file_generation::write_monster_to_section_golden().expect("Should write to_section");
    golden_file_generation::write_monster_defenses_golden().expect("Should write monster defenses");
    golden_file_generation::write_monster_rounds_to_live_golden()
        .expect("Should write monster rounds to live golden");

    Result::Ok(())
}
