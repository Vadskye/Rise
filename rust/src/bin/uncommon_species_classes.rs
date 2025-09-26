use rise::classes::{Class, generate_latex_basic_class_abilities};
use rise::latex_formatting::latexify;
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

        let archetype = &class.archetypes()[0];
        let content = latexify(format!(
            "
                {archetype}

                {base_class}
            ",
            archetype = archetype.latex_description(class.shorthand_name()).trim(),
            base_class = generate_latex_basic_class_abilities(&class).trim(),
        ));
        fs::write(&filepath, content).expect(&format!("Failed to write to {:?}", filepath));
    }
}
