#[derive(Clone, Debug, PartialEq)]
pub enum UsageTime {
    Standard,
    Elite,
    Minor,
    Triggered,
}

impl UsageTime {
    pub fn latex_ability_header(&self) -> String {
        let specific_text = match self {
            UsageTime::Standard => "Standard action",
            UsageTime::Elite => r"Elite action",
            UsageTime::Minor => r"Minor action",
            UsageTime::Triggered => r"Triggered",
        };
        return format!(
            "\\par \\noindent Usage: {}.",
            specific_text,
        );
    }
}
