#[derive(Clone, Debug)]
pub enum AbilityTag {
    Attune(AttuneType),
    Auditory,
    Compulsion,
    Creation,
    Curse,
    Detection,
    Emotion,
    Manifestation,
    // Ritual,
    Scrying,
    Speech,
    Spell,
    // Spell,
    Subtle,
    Sustain(SustainAction),
    Swift,
    Visual,
}

impl AbilityTag {
    pub fn description(&self) -> String {
        match self {
            Self::Attune(attune_type) => format!("Attune ({})", attune_type.description()),
            Self::Auditory => r"Auditory".to_string(),
            Self::Compulsion => r"Compulsion".to_string(),
            Self::Creation => r"Creation".to_string(),
            Self::Curse => r"Curse".to_string(),
            Self::Detection => r"Detection".to_string(),
            Self::Emotion => r"Emotion".to_string(),
            Self::Manifestation => r"Manifestation".to_string(),
            Self::Scrying => r"Scrying".to_string(),
            Self::Speech => r"Speech".to_string(),
            Self::Spell => r"Spell".to_string(),
            Self::Subtle => r"Subtle".to_string(),
            Self::Sustain(action) => format!("Sustain ({})", action.description()),
            Self::Swift => r"Swift".to_string(),
            Self::Visual => r"Visual".to_string(),
        }
    }

    pub fn latex(&self) -> String {
        match self {
            Self::Attune(attune_type) => {
                format!("\\abilitytag{{Attune}} ({})", attune_type.description())
            }
            Self::Auditory => r"\abilitytag{Auditory}".to_string(),
            Self::Compulsion => r"\abilitytag{Compulsion}".to_string(),
            Self::Creation => r"\abilitytag{Creation}".to_string(),
            Self::Curse => r"\abilitytag{Curse}".to_string(),
            Self::Detection => r"\abilitytag{Detection}".to_string(),
            Self::Emotion => r"\abilitytag{Emotion}".to_string(),
            Self::Manifestation => r"\abilitytag{Manifestation}".to_string(),
            Self::Scrying => r"\abilitytag{Scrying}".to_string(),
            Self::Speech => r"\abilitytag{Speech}".to_string(),
            Self::Spell => r"\abilitytag{Spell}".to_string(),
            Self::Subtle => r"\abilitytag{Subtle}".to_string(),
            Self::Sustain(action) => format!("\\abilitytag{{Sustain}} ({})", action.description()),
            Self::Swift => r"\abilitytag{Swift}".to_string(),
            Self::Visual => r"\abilitytag{Visual}".to_string(),
        }
    }
}

#[derive(Clone, Debug)]
pub enum AttuneType {
    Ritual,
    Personal,
    Target,
}

impl AttuneType {
    pub fn description(&self) -> &str {
        match self {
            Self::Ritual => "ritual",
            Self::Personal => "self",
            Self::Target => "target",
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
