#[derive(Clone, PartialEq)]
pub enum AbilityType {
    Instant,
    Duration,
    Sustain(String),
    Attune(String),
}

impl AbilityType {
    pub fn name(&self) -> String {
        match self {
            Self::Instant => "Instant".to_string(),
            Self::Duration => "Duration".to_string(),
            Self::Sustain(action) => format!("Sustain {}", action),
            Self::Attune(action) => format!("Attune {}", action),
        }
    }

    pub fn environment(&self) -> &str {
        match self {
            Self::Instant => "instantability",
            Self::Duration => "durationability",
            Self::Sustain(_) => "durationability",
            Self::Attune(_) => "attuneability",
        }
    }

    fn environment_tag(&self) -> String {
        match self {
            Self::Instant => "".to_string(),
            Self::Duration => "[Duration]".to_string(),
            Self::Sustain(action) => format!("[\\abilitytag<Sustain> {}]", action),
            Self::Attune(action) => format!("[\\abilitytag<Attune> {}]", action),
        }
    }

    pub fn begin(&self, name: &str) -> String {
        return format!(
            "\\begin<{environment}>*<{name}>{tag}",
            environment = self.environment(),
            name = name,
            tag = self.environment_tag()
        );
    }

    pub fn end(&self) -> String {
        return format!("\\end<{environment}>", environment = self.environment())
    }
}
