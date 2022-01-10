#[derive(Clone)]
pub enum UsageTime {
    Standard,
    Minor,
}

impl UsageTime {
    pub fn latex_ability_header(&self) -> Option<&str> {
        match self {
            UsageTime::Standard => None,
            UsageTime::Minor => Some(r"\par \noindent Usage time: One \glossterm{minor action}."),
        }
    }
}
