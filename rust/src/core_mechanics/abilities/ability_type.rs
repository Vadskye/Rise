#[derive(Clone, Debug, PartialEq)]
pub enum AbilityType {
    Normal,
    Sustain(String),
    Attune(Option<String>),
}

impl AbilityType {
    pub fn sustain(action: &str) -> Self {
        return Self::Sustain(action.to_string());
    }

    pub fn name(&self) -> String {
        match self {
            Self::Normal => "".to_string(),
            Self::Sustain(action) => format!("Sustain {}", action),
            Self::Attune(subtype) => format!("Attune{}", attune_suffix(subtype)),
        }
    }

    pub fn environment(&self, is_magical: bool) -> String {
        let base_tag = match self {
            Self::Normal => "activeability",
            Self::Sustain(_) => "sustainability",
            Self::Attune(_) => "attuneability",
        };
        return if is_magical {
            format!("magical{}", base_tag)
        } else {
            base_tag.to_string()
        };
    }

    fn environment_tag(&self) -> String {
        match self {
            Self::Normal => "".to_string(),
            Self::Sustain(action) => format!("<\\abilitytag<Sustain> {}>", action),
            Self::Attune(subtype) => format!("<\\abilitytag<Attune>{}>", attune_suffix(subtype)),
        }
    }

    pub fn begin(&self, name: &str, is_magical: bool) -> String {
        return format!(
            "\\begin<{environment}>*<{name}>{tag}",
            environment = self.environment(is_magical),
            name = name,
            tag = self.environment_tag()
        );
    }

    pub fn end(&self, is_magical: bool) -> String {
        return format!(
            "\\end<{environment}>",
            environment = self.environment(is_magical)
        );
    }
}

fn attune_suffix(subtype: &Option<String>) -> String {
    if let Some(s) = subtype {
        return format!(" ({})", s);
    } else {
        return "".to_string();
    }
}
