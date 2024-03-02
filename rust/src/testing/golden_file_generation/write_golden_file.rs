use std::{fs, io};

pub fn write_golden_file(subpath: &str, data: String) -> io::Result<()> {
    fs::write(
        format!("test_goldens/{}.md", subpath),
        format!("{}\n", data.trim()),
    )
}
