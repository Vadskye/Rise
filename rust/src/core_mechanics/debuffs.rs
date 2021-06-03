#[derive(Clone)]
pub enum Debuff {
    Paralyzed,
    Sickened,
}

impl Debuff {
    pub fn name(&self) -> &str {
        match self {
            Self::Paralyzed => "paralyzed",
            Self::Sickened => "sickened",
        }
    }

    pub fn latex_link(&self) -> &str {
        match self {
            Self::Paralyzed => r"\paralyzed",
            Self::Sickened => r"\sickened",
        }
    }
}
