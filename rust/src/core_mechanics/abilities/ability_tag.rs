pub enum AbilityTag {
    Attune(AttuneType),
    Auditory,
    Compulsion,
    Creation,
    Curse,
    Detection,
    Emotion,
    Healing,
    Magical,
    Manifestation,
    // Ritual,
    Scrying,
    Speech,
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
            Self::Auditory => format!("Auditory"),
            Self::Compulsion => format!("Compulsion"),
            Self::Creation => format!("Creation"),
            Self::Curse => format!("Curse"),
            Self::Detection => format!("Detection"),
            Self::Emotion => format!("Emotion"),
            Self::Healing => format!("Healing"),
            Self::Magical => format!("Magical"),
            Self::Manifestation => format!("Manifestation"),
            Self::Scrying => format!("Scrying"),
            Self::Speech => format!("Speech"),
            Self::Subtle => format!("Subtle"),
            Self::Sustain(action) => format!("Sustain ({})", action.description()),
            Self::Swift => format!("Swift"),
            Self::Visual => format!("Visual"),
        }
    }
}

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
