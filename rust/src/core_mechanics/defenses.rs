use crate::core_mechanics::attributes;

pub trait HasDefenses {
    fn calc_defense(&self, defense: &'static Defense) -> i8;
}

pub enum Defense {
    Armor,
    Fortitude,
    Mental,
    Reflex,
}

pub static ARMOR: &Defense = &Defense::Armor;
pub static FORT: &Defense = &Defense::Fortitude;
pub static REF: &Defense = &Defense::Reflex;
pub static MENT: &Defense = &Defense::Mental;

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

    pub fn associated_attribute(&self) -> &'static attributes::Attribute {
        match self {
            Self::Armor => &attributes::DEX,
            Self::Fortitude => &attributes::CON,
            Self::Mental => &attributes::WIL,
            Self::Reflex => &attributes::DEX,
        }
    }
}
