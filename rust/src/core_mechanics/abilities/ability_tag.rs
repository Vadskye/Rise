#[derive(Clone, Debug)]
pub enum AbilityTag {
    Attune(AttuneType),
    Auditory,
    Brawling,
    Compulsion,
    Creation,
    Curse,
    Detection,
    Emotion,
    Exertion,
    Manifestation,
    Scrying,
    SizeBased,
    Speech,
    Subtle,
    Sustain(SustainAction),
    Swift,
    Visual,
}

impl AbilityTag {
    pub fn description(&self) -> String {
        match self {
            Self::Attune(attune_type) => format!("Attune{}", attune_type.parentheses_suffix()),
            Self::Auditory => r"Auditory".to_string(),
            Self::Brawling => r"Brawling".to_string(),
            Self::Compulsion => r"Compulsion".to_string(),
            Self::Creation => r"Creation".to_string(),
            Self::Curse => r"Curse".to_string(),
            Self::Detection => r"Detection".to_string(),
            Self::Emotion => r"Emotion".to_string(),
            Self::Exertion => r"Exertion".to_string(),
            Self::Manifestation => r"Manifestation".to_string(),
            Self::Scrying => r"Scrying".to_string(),
            Self::SizeBased => r"Size-Based".to_string(),
            Self::Speech => r"Speech".to_string(),
            Self::Subtle => r"Subtle".to_string(),
            Self::Sustain(action) => format!("Sustain ({})", action.description()),
            Self::Swift => r"Swift".to_string(),
            Self::Visual => r"Visual".to_string(),
        }
    }

    pub fn latex(&self) -> String {
        match self {
            Self::Attune(attune_type) => {
                format!("\\abilitytag{{Attune}}{}", attune_type.parentheses_suffix())
            }
            Self::Sustain(action) => format!("\\abilitytag{{Sustain}} ({})", action.description()),
            _ => format!("\\abilitytag{{{}}}", self.description()),
        }
    }
}

#[derive(Clone, Debug)]
pub enum AttuneType {
    Deep,
    Ritual,
    Personal,
    Target,
}

impl AttuneType {
    pub fn parentheses_suffix(&self) -> &str {
        match self {
            Self::Deep => " (deep)",
            Self::Ritual => " (ritual)",
            Self::Personal => "",
            Self::Target => " (target)",
        }
    }
}

#[derive(Clone, Debug)]
pub enum SustainAction {
    Standard,
    Minor,
}

impl SustainAction {
    pub fn description(&self) -> &str {
        match self {
            Self::Standard => "standard",
            Self::Minor => "minor",
        }
    }
}
