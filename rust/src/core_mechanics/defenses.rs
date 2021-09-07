use crate::core_mechanics::{Attribute, DamageType, Debuff};
use std::fmt;

pub trait HasDefenses {
    fn calc_defense(&self, defense: &Defense) -> i32;
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

    pub fn associated_attribute(&self) -> Option<Attribute> {
        match self {
            // Armor has a more complicated calculation
            Self::Armor => None,
            Self::Fortitude => Some(Attribute::Constitution),
            Self::Mental => Some(Attribute::Willpower),
            Self::Reflex => Some(Attribute::Dexterity),
        }
    }
}

impl fmt::Display for Defense {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

pub enum SpecialDefenseModifier {
    Immune(SpecialDefenseType),
    Impervious(SpecialDefenseType),
    Vulnerable(SpecialDefenseType),
}

pub enum SpecialDefenseType {
    Damage(DamageType),
    Debuff(Debuff),
    CriticalHits,
}

impl SpecialDefenseModifier {
    pub fn immune_damage(damage_type: DamageType) -> Self {
        return Self::Immune(SpecialDefenseType::Damage(damage_type));
    }

    pub fn impervious_damage(damage_type: DamageType) -> Self {
        return Self::Impervious(SpecialDefenseType::Damage(damage_type));
    }

    pub fn vulnerable_damage(damage_type: DamageType) -> Self {
        return Self::Vulnerable(SpecialDefenseType::Damage(damage_type));
    }

    pub fn immune_debuff(debuff: Debuff) -> Self {
        return Self::Immune(SpecialDefenseType::Debuff(debuff));
    }

    pub fn impervious_debuff(debuff: Debuff) -> Self {
        return Self::Impervious(SpecialDefenseType::Debuff(debuff));
    }

    pub fn vulnerable_debuff(debuff: Debuff) -> Self {
        return Self::Vulnerable(SpecialDefenseType::Debuff(debuff));
    }
}

impl SpecialDefenseType {
    pub fn description(&self) -> String {
        match self {
            Self::Damage(damage_type) => format!("{} damage", damage_type.name()),
            Self::Debuff(debuff) => debuff.name().to_string(),
            Self::CriticalHits => "critical hits".to_string(),
        }
    }
}
