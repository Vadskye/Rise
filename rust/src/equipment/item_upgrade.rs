#[derive(Clone, Debug)]
pub struct ItemUpgrade {
    pub description: String,
    pub rank: i32,
    pub short_description: String,
}

impl ItemUpgrade {
    // This avoids having to call .to_string() manually, which would be necessary if you
    // constructed the struct directly
    pub fn new(rank: i32, short_description: &str, description: &str) -> Self {
        if short_description.len() > description.len() {
            eprintln!("Item upgrade has longer short description than description. They may be inverted: '{}'", description)
        }
        if !description.trim().ends_with(".") {
            eprintln!("Item upgrade description should end with '.': '{}'", description)
        }
        if short_description.trim().ends_with(".") {
            eprintln!("Item upgrade short description should not end with '.': '{}'", short_description)
        }

        Self {
            description: description.to_string(),
            rank,
            short_description: short_description.to_string(),
        }
    }
}
