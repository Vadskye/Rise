use rise::classes::Class;
use std::{fs, io};

fn main() -> io::Result<()> {
    for class in Class::uncommon_classes() {
        let result = fs::write(
            // Assume we're in the Rust directory. TODO: figure out how to ensure that.
            format!("core_book/generated/{}.tex", class.name()),
            class.latex_section(),
        );
        if result.is_err() {
            return result;
        }
    }
    io::Result::Ok(())
}
