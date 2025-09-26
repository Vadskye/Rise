use rise::classes::Class;
use std::fs;
use std::path::PathBuf;

// This assumes it's being run from the `rust` directory.
fn main() {
    let classes = Class::uncommon_classes();
    let output_dir = PathBuf::from("../comprehensive_codex/generated/");
    fs::create_dir_all(&output_dir).expect("Failed to create output directory");

    for class in classes {
        let filename = format!("{}.tex", class.name());
        let filepath = output_dir.join(filename);
        let content = class.latex_section();
        fs::write(&filepath, content).expect(&format!("Failed to write to {:?}", filepath));
    }
}
