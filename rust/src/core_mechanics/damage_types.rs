use crate::latex_formatting;
use std::fmt;

#[derive(Clone, Copy, Debug)]
pub enum DamageType {
    Acid,
    Bludgeoning,
    Cold,
    Electricity,
    Energy,
    Fire,
    Psychic,
    Physical,
    Piercing,
    Slashing,
}

impl DamageType {
    pub fn name(&self) -> &str {
        match self {
            Self::Acid => "acid",
            Self::Bludgeoning => "bludgeoning",
            Self::Cold => "cold",
            Self::Electricity => "electricity",
            Self::Energy => "energy",
            Self::Fire => "fire",
            Self::Psychic => "psychic",
            Self::Physical => "physical",
            Self::Piercing => "piercing",
            Self::Slashing => "slashing",
        }
    }

    pub fn format_damage_types(damage_types: &Vec<Self>) -> String {
        let mut damage_types = damage_types.clone();
        damage_types.sort_by_key(|a| a.name().to_lowercase());
        latex_formatting::join_formattable_list(&damage_types).unwrap_or(String::from(""))
    }
}

impl fmt::Display for DamageType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

pub enum DamageTypeEffect {
    Immune(DamageType),
    Impervious(DamageType),
    Vulnerable(DamageType),
}
