#[derive(Clone)]
pub enum Debuff {
    Blinded,
    Charmed,
    Confused,
    Dazed,
    Dazzled,
    Deafened,
    Decelerated,
    Disoriented,
    Dominated,
    Fascinated,
    Frightened(String),
    Goaded,
    Grappled,
    Immobilizd,
    Panicked(String),
    Paralyzed,
    PartiallyUnaware,
    Prone,
    Shaken(String),
    Slowed,
    Squeezing,
    Stunned,
    Surrounded,
    Unaware,
    Unconscious,
}

impl Debuff {
    pub fn mental_debuffs() -> Vec<Self> {
        return vec![];
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Blinded => "blinded",
            Self::Charmed => "charmed",
            Self::Confused => "confused",
            Self::Dazed => "dazed",
            Self::Dazzled => "dazzled",
            Self::Deafened => "deafened",
            Self::Decelerated => "decelerated",
            Self::Disoriented => "disoriented",
            Self::Dominated => "dominated",
            Self::Fascinated => "fascinated",
            Self::Frightened(_) => "frightened",
            Self::Goaded => "goaded",
            Self::Grappled => "grappled",
            Self::Immobilizd => "immobilizd",
            Self::Panicked(_) => "panicked",
            Self::Paralyzed => "paralyzed",
            Self::PartiallyUnaware => "partially unaware",
            Self::Prone => "prone",
            Self::Shaken(_) => "shaken",
            Self::Slowed => "slowed",
            Self::Squeezing => "squeezing",
            Self::Stunned => "stunned",
            Self::Surrounded => "surrounded",
            Self::Unaware => "unaware",
            Self::Unconscious => "unconscious",
        }
    }

    pub fn latex_link(&self) -> String {
        match self {
            Self::Blinded => "\\blinded".to_string(),
            Self::Charmed => "\\charmed".to_string(),
            Self::Confused => "\\confused".to_string(),
            Self::Dazed => "\\dazed".to_string(),
            Self::Dazzled => "\\dazzled".to_string(),
            Self::Deafened => "\\deafened".to_string(),
            Self::Decelerated => "\\decelerated".to_string(),
            Self::Disoriented => "\\disoriented".to_string(),
            Self::Dominated => "\\dominated".to_string(),
            Self::Fascinated => "\\fascinated".to_string(),
            Self::Frightened(source) => format!("\\frightened by {}", source),
            Self::Goaded => "\\goaded".to_string(),
            Self::Grappled => "\\grappled".to_string(),
            Self::Immobilizd => "\\immobilizd".to_string(),
            Self::Panicked(source) => format!("\\panicked by {}", source),
            Self::Paralyzed => "\\paralyzed".to_string(),
            Self::PartiallyUnaware => "partially \\unaware".to_string(),
            Self::Prone => "\\prone".to_string(),
            Self::Shaken(source) => format!("\\shaken by {}", source),
            Self::Slowed => "\\slowed".to_string(),
            Self::Squeezing => "\\squeezing".to_string(),
            Self::Stunned => "\\stunned".to_string(),
            Self::Surrounded => "\\surrounded".to_string(),
            Self::Unaware => "\\unaware".to_string(),
            Self::Unconscious => "\\unconscious".to_string(),
        }
    }
}
