use std::fmt;

#[derive(Clone, Copy)]
pub enum DamageType {
    Acid,
    Bludgeoning,
    Cold,
    Electricity,
    Energy,
    Fire,
    Physical,
    Piercing,
    Slashing,
    Sonic,
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
            Self::Physical => "physical",
            Self::Piercing => "piercing",
            Self::Slashing => "slashing",
            Self::Sonic => "sonic",
        }
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
