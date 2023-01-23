#[derive(Clone, Debug)]
pub enum UsageTime {
    Standard,
    Minor,
    Triggered,
}

impl UsageTime {
    pub fn latex_ability_header(&self) -> Option<String> {
        match self {
            UsageTime::Standard => None,
            UsageTime::Minor => {
                Some(r"\par \noindent Usage time: One \glossterm{minor action}.".to_string())
            }
            UsageTime::Triggered => Some(r"\par \noindent Usage time: Triggered.".to_string()),
        }
    }
}
