use super::SpecialDefenseType;

#[derive(Clone, Debug)]
pub enum Debuff {
    Blinded,
    Charmed(String),
    Confused,
    Dazzled,
    Deafened,
    Dominated,
    Frightened(String),
    Goaded,
    Grappled,
    Immobilized,
    Panicked(String),
    Paralyzed,
    PartiallyUnaware,
    Prone,
    Slowed,
    Squeezing,
    Stunned,
    Unaware,
    Unconscious,
    Vulnerable(Box<SpecialDefenseType>),
}

impl Debuff {
    pub fn mental_debuffs() -> Vec<Self> {
        vec![]
    }

    pub fn direct_upgrade(&self) -> Option<Self> {
        match self {
            Self::Blinded => None,
            Self::Charmed(_) => None,
            Self::Confused => None,
            Self::Dazzled => None,
            Self::Deafened => None,
            Self::Dominated => None,
            Self::Frightened(source) => Some(Self::Panicked(source.to_string())),
            Self::Goaded => None,
            Self::Grappled => None,
            Self::Immobilized => Some(Self::Paralyzed),
            Self::Panicked(_) => None,
            Self::Paralyzed => None,
            Self::PartiallyUnaware => None,
            Self::Prone => None,
            Self::Slowed => None,
            Self::Squeezing => None,
            Self::Stunned => None,
            Self::Unaware => None,
            Self::Unconscious => None,
            Self::Vulnerable(_) => None,
        }
    }

    pub fn tier(&self) -> i32 {
        match self {
            Self::Blinded => 3,
            Self::Charmed(_) => 3,
            Self::Confused => 3,
            Self::Dazzled => 1,
            Self::Deafened => 0,
            Self::Dominated => 4,
            Self::Frightened(_) => 2,
            Self::Goaded => 1,
            Self::Grappled => 3,
            Self::Immobilized => 3,
            Self::Panicked(_) => 3,
            Self::Paralyzed => 4,
            Self::PartiallyUnaware => 1,
            Self::Prone => 2,
            Self::Slowed => 2,
            Self::Squeezing => 2,
            Self::Stunned => 2,
            Self::Unaware => 3,
            Self::Unconscious => 4,
            Self::Vulnerable(_) => 2,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Blinded => "blinded",
            Self::Charmed(_) => "charmed",
            Self::Confused => "confused",
            Self::Dazzled => "dazzled",
            Self::Deafened => "deafened",
            Self::Dominated => "dominated",
            Self::Frightened(_) => "frightened",
            Self::Goaded => "goaded",
            Self::Grappled => "grappled",
            Self::Immobilized => "immobilized",
            Self::Panicked(_) => "panicked",
            Self::Paralyzed => "paralyzed",
            Self::PartiallyUnaware => "partially unaware",
            Self::Prone => "prone",
            Self::Slowed => "slowed",
            Self::Squeezing => "squeezing",
            Self::Stunned => "stunned",
            Self::Unaware => "unaware",
            Self::Unconscious => "unconscious",
            Self::Vulnerable(_) => "vulnerable",
        }
    }

    pub fn latex_link(&self) -> String {
        match self {
            Self::Blinded => "\\blinded".to_string(),
            Self::Charmed(source) => format!("\\charmed by {}", source),
            Self::Confused => "\\confused".to_string(),
            Self::Dazzled => "\\dazzled".to_string(),
            Self::Deafened => "\\deafened".to_string(),
            Self::Dominated => "\\dominated".to_string(),
            Self::Frightened(source) => format!("\\frightened by {}", source),
            Self::Goaded => "\\goaded".to_string(),
            Self::Grappled => "\\grappled".to_string(),
            Self::Immobilized => "\\immobilized".to_string(),
            Self::Panicked(source) => format!("\\panicked by {}", source),
            Self::Paralyzed => "\\paralyzed".to_string(),
            Self::PartiallyUnaware => "partially \\unaware".to_string(),
            Self::Prone => "\\prone".to_string(),
            Self::Slowed => "\\slowed".to_string(),
            Self::Squeezing => "\\squeezing".to_string(),
            Self::Stunned => "\\stunned".to_string(),
            Self::Unaware => "\\unaware".to_string(),
            Self::Unconscious => "\\unconscious".to_string(),
            Self::Vulnerable(t) => format!("\\vulnerable to {}", t.description()),
        }
    }
}
