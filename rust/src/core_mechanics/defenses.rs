use crate::core_mechanics::attributes::Attribute;
use std::fmt;

pub trait HasDefenses {
    fn calc_defense(&self, defense: &Defense) -> i8;
}

#[derive(Clone)]
pub enum Defense {
    Armor,
    Fortitude,
    Mental,
    Reflex,
}

impl Defense {
    pub fn name(&self) -> &str {
        match self {
            Self::Armor => "armor",
            Self::Fortitude => "fortitude",
            Self::Mental => "mental",
            Self::Reflex => "reflex",
        }
    }

    pub fn shorthand_name(&self) -> &str {
        match self {
            Self::Armor => "AD",
            Self::Fortitude => "Fort",
            Self::Mental => "Ment",
            Self::Reflex => "Ref",
        }
    }

    pub fn associated_attribute(&self) -> &Attribute {
        match self {
            Self::Armor => &Attribute::Dexterity,
            Self::Fortitude => &Attribute::Constitution,
            Self::Mental => &Attribute::Willpower,
            Self::Reflex => &Attribute::Dexterity,
        }
    }
}

impl fmt::Display for Defense {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}
