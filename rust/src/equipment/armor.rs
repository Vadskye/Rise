use std::fmt;

pub enum ArmorUsageClass {
    Light,
    Medium,
    Heavy,
}

impl ArmorUsageClass {
    pub fn all() -> Vec<Self> {
        return vec![ArmorUsageClass::Light, ArmorUsageClass::Medium, ArmorUsageClass::Heavy];
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Light => "light",
            Self::Medium => "medium",
            Self::Heavy => "heavy",
        }
    }
}

impl fmt::Display for ArmorUsageClass {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

#[derive(Copy, Clone)]
pub enum Armor {
    Hide,
}

impl Armor {
    pub fn name(&self) -> &str {
        match self {
            Self::Hide => "hide armor",
        }
    }

    pub fn name_plural(&self) -> &str {
        match self {
            Self::Hide => "hide armor",
        }
    }
}
