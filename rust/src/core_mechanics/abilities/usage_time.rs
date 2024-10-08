#[derive(Clone, Debug, Default, PartialEq)]
pub enum UsageTime {
    #[default]
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
        format!("\\abilityusagetime {}.", specific_text,)
    }
}
