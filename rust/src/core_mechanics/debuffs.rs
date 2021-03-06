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
    Frightened,
    Goaded,
    Grappled,
    Immobilizd,
    Nauseated,
    Panicked,
    Paralyzed,
    PartiallyUnaware,
    Prone,
    Shaken,
    Sickened,
    Slowed,
    Squeezing,
    Stunned,
    Surrounded,
    Unaware,
    Unconscious,
}

impl Debuff {
    pub fn mental_debuffs() -> Vec<Self> {
        return vec![

        ];
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
            Self::Frightened => "frightened",
            Self::Goaded => "goaded",
            Self::Grappled => "grappled",
            Self::Immobilizd => "immobilizd",
            Self::Nauseated => "nauseated",
            Self::Panicked => "panicked",
            Self::Paralyzed => "paralyzed",
            Self::PartiallyUnaware => "partially unaware",
            Self::Prone => "prone",
            Self::Shaken => "shaken",
            Self::Sickened => "sickened",
            Self::Slowed => "slowed",
            Self::Squeezing => "squeezing",
            Self::Stunned => "stunned",
            Self::Surrounded => "surrounded",
            Self::Unaware => "unaware",
            Self::Unconscious => "unconscious",
        }
    }

    pub fn latex_link(&self) -> &str {
        match self {
            Self::Blinded => "\\blinded",
            Self::Charmed => "\\charmed",
            Self::Confused => "\\confused",
            Self::Dazed => "\\dazed",
            Self::Dazzled => "\\dazzled",
            Self::Deafened => "\\deafened",
            Self::Decelerated => "\\decelerated",
            Self::Disoriented => "\\disoriented",
            Self::Dominated => "\\dominated",
            Self::Fascinated => "\\fascinated",
            Self::Frightened => "\\frightened",
            Self::Goaded => "\\goaded",
            Self::Grappled => "\\grappled",
            Self::Immobilizd => "\\immobilizd",
            Self::Nauseated => "\\nauseated",
            Self::Panicked => "\\panicked",
            Self::Paralyzed => "\\paralyzed",
            Self::PartiallyUnaware => "partially \\unaware",
            Self::Prone => "\\prone",
            Self::Shaken => "\\shaken",
            Self::Sickened => "\\sickened",
            Self::Slowed => "\\slowed",
            Self::Squeezing => "\\squeezing",
            Self::Stunned => "\\stunned",
            Self::Surrounded => "\\surrounded",
            Self::Unaware => "\\unaware",
            Self::Unconscious => "\\unconscious",
        }
    }
}
